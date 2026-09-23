import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  LayoutDashboard,
  FileText,
  FolderPlus,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Trash2,
  Save,
  GitCommit,
  Sparkles,
  ArrowLeft,
  Layers,
  Tag,
  Image as ImageIcon,
  Heading,
  Bold,
  Italic,
  List,
  FileEdit,
  Code
} from 'lucide-react';
import { Article, TocItem } from '../types';
import {
  ARTICLES_DATA,
  COURSE_TABS,
  registerArticleRuntime,
  registerCategoryRuntime
} from '../data/siteData';
import { RichArticleEditor } from '../components/RichArticleEditor';
import { MediaManager } from '../components/MediaManager';
import {
  verifyAdminCredentials,
  createAdminJWT,
  verifyAdminJWT,
  getStoredAdminToken,
  setStoredAdminToken,
  clearStoredAdminToken,
  getGitHubToken,
  setGitHubToken,
  clearGitHubToken,
  slugify,
  checkGitHubRepoAccess,
  commitArticleToGitHub,
  commitCategoryToGitHub,
  saveLocalArticle,
  deleteLocalArticle,
  saveLocalCategory,
  getLocalArticles,
  getLocalCategories,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME
} from '../utils/adminAuth';

interface AdminViewProps {
  onNavigate: (path: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerifyingAuth, setIsVerifyingAuth] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('dohoathucchien');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new-article' | 'categories' | 'articles-list' | 'github-settings' | 'media-manager'>('dashboard');

  // GitHub Integration State
  const [githubToken, setGithubTokenState] = useState<string>(getGitHubToken() || '');
  const [isCheckingGitHub, setIsCheckingGitHub] = useState<boolean>(false);
  const [githubStatus, setGithubStatus] = useState<{
    tested: boolean;
    ok: boolean;
    message: string;
    user?: any;
    repo?: any;
  }>({ tested: false, ok: false, message: '' });
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<'article' | 'category' | null>(null);

  // Article Form State
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleSlug, setArticleSlug] = useState<string>('');
  const [isSlugCustomized, setIsSlugCustomized] = useState<boolean>(false);
  const [articleCat, setArticleCat] = useState<string>('Thiết kế đồ họa');
  const [articleCatSlug, setArticleCatSlug] = useState<string>('thiet-ke-do-hoa');
  const [articleExcerpt, setArticleExcerpt] = useState<string>('');
  const [articleAuthor, setArticleAuthor] = useState<string>('Admin Đồ Họa Thực Chiến');
  const [articleImg, setArticleImg] = useState<string>('https://blogdaytinhoc.com/images/slider/29022024/khoa-hoc-thiet-ke-do-hoa.png');
  const [articleTags, setArticleTags] = useState<string>('Thiết kế đồ họa, Đồ Họa Thực Chiến, Thực hành 1 kèm 1');
  const [articleContent, setArticleContent] = useState<string>(`<h2>1. Giới thiệu khóa học và kỹ năng</h2>
<p>Chào mừng bạn đến với giáo trình đào tạo thực tế tại <strong>Đồ Họa Thực Chiến</strong>. Bài viết này hướng dẫn chi tiết các bước thực hành từ cơ bản đến nâng cao.</p>

<h2>2. Các bước thực hiện từng phần</h2>
<p>Thực hiện lần lượt các thao tác bên dưới để đạt hiệu quả tối ưu nhất trong công việc thực tế.</p>
<ul>
  <li><strong>Bước 1:</strong> Thiết lập không gian làm việc và phím tắt thông dụng.</li>
  <li><strong>Bước 2:</strong> Áp dụng các nguyên tắc bố cục và màu sắc chuẩn in ấn.</li>
  <li><strong>Bước 3:</strong> Xuất file chất lượng cao cho khách hàng và xưởng in.</li>
</ul>

<h2>3. Tổng kết và lưu ý quan trọng</h2>
<p>Luyện tập thường xuyên và tham gia các bài tập thực chiến để làm chủ hoàn toàn kỹ năng này nhé!</p>`);
  const [articleFeatured, setArticleFeatured] = useState<boolean>(false);
  const [articleSubmitStatus, setArticleSubmitStatus] = useState<{
    loading: boolean;
    success: boolean;
    message: string;
    commitUrl?: string;
    createdSlug?: string;
  }>({ loading: false, success: false, message: '' });

  // Category Form State
  const [categoryName, setCategoryName] = useState<string>('');
  const [categorySlug, setCategorySlug] = useState<string>('');
  const [categoryDesc, setCategoryDesc] = useState<string>('');
  const [categorySubmitStatus, setCategorySubmitStatus] = useState<{
    loading: boolean;
    success: boolean;
    message: string;
    commitUrl?: string;
  }>({ loading: false, success: false, message: '' });

  // Articles List Search & Filter
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>('');
  const [articleCatFilter, setArticleCatFilter] = useState<string>('all');
  const [allArticles, setAllArticles] = useState<Article[]>(ARTICLES_DATA);

  // Check stored JWT on mount
  useEffect(() => {
    async function checkAuth() {
      setIsVerifyingAuth(true);
      const token = getStoredAdminToken();
      if (token) {
        const result = await verifyAdminJWT(token);
        if (result.valid) {
          setIsAuthenticated(true);
        } else {
          clearStoredAdminToken();
        }
      }
      setIsVerifyingAuth(false);
    }
    checkAuth();

    // Check if GitHub token is already saved
    const savedGh = getGitHubToken();
    if (savedGh) {
      checkGitHubRepoAccess(savedGh).then((res) => {
        setGithubStatus({ tested: true, ok: res.ok, message: res.message, user: res.user, repo: res.repo });
      });
    }
  }, []);

  // Update slug when title changes (unless customized)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticleTitle(title);
    if (!isSlugCustomized) {
      setArticleSlug(slugify(title));
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const isValid = await verifyAdminCredentials(usernameInput, passwordInput);
      if (isValid) {
        const token = await createAdminJWT();
        setStoredAdminToken(token);
        setIsAuthenticated(true);
      } else {
        setLoginError('Tên tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch (err: any) {
      console.error('Login authentication error:', err);
      setLoginError(err?.message ? `Lỗi xác thực: ${err.message}` : 'Đã có lỗi xảy ra trong quá trình xác thực.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    clearStoredAdminToken();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Verify GitHub Token button
  const handleVerifyGitHubToken = async (customToken?: string) => {
    const tokenToUse = customToken !== undefined ? customToken : githubToken;
    if (!tokenToUse.trim()) {
      setGithubStatus({
        tested: true,
        ok: false,
        message: 'Vui lòng nhập GitHub Personal Access Token!'
      });
      return;
    }

    setIsCheckingGitHub(true);
    const result = await checkGitHubRepoAccess(tokenToUse.trim());
    setIsCheckingGitHub(false);

    setGithubStatus({
      tested: true,
      ok: result.ok,
      message: result.message,
      user: result.user,
      repo: result.repo
    });

    if (result.ok) {
      setGitHubToken(tokenToUse.trim());
      setGithubTokenState(tokenToUse.trim());
    }
  };

  // Extract TOC items from content
  const generateTocFromContent = (htmlOrMd: string): TocItem[] => {
    const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>|<h([2-3])[^>]*>(.*?)<\/h\4>/gi;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(htmlOrMd)) !== null) {
      const level = parseInt(match[1] || match[4] || '2', 10);
      const rawTitle = (match[3] || match[5] || '').replace(/<[^>]*>/g, '').trim();
      const existingId = match[2];
      const id = existingId || slugify(rawTitle);
      if (rawTitle) {
        items.push({ id, title: rawTitle, level });
      }
    }

    if (items.length === 0) {
      return [
        { id: 'tong-quan', title: '1. Tổng quan nội dung', level: 2 },
        { id: 'chi-tiet', title: '2. Chi tiết hướng dẫn', level: 2 },
        { id: 'ket-luan', title: '3. Kết luận & Ứng dụng', level: 2 }
      ];
    }

    return items;
  };

  // Submit Article (Local or GitHub)
  const handleSaveArticle = async (mode: 'local' | 'github') => {
    if (!articleTitle.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }
    const slug = articleSlug.trim() || slugify(articleTitle);

    const newArticle: Article = {
      id: `post-${Date.now()}`,
      slug,
      title: articleTitle.trim(),
      excerpt: articleExcerpt.trim() || articleTitle.trim(),
      cat: articleCat,
      catSlug: articleCatSlug || slugify(articleCat),
      date: new Date().toLocaleDateString('vi-VN'),
      author: articleAuthor.trim() || 'Admin Đồ Họa Thực Chiến',
      views: 150,
      commentsCount: 0,
      img: articleImg.trim(),
      tags: articleTags.split(',').map((t) => t.trim()).filter(Boolean),
      featured: articleFeatured,
      toc: generateTocFromContent(articleContent),
      content: articleContent
    };

    if (mode === 'local') {
      // Save locally only
      saveLocalArticle(newArticle);
      registerArticleRuntime(newArticle);
      setAllArticles([...ARTICLES_DATA]);
      setArticleSubmitStatus({
        loading: false,
        success: true,
        message: 'Đã lưu bài viết cục bộ vào trình duyệt! Bạn có thể xem thử ngay.',
        createdSlug: slug
      });
      return;
    }

    // mode === 'github'
    const token = getGitHubToken();
    if (!token) {
      setPendingAction('article');
      setIsGitHubModalOpen(true);
      return;
    }

    setArticleSubmitStatus({
      loading: true,
      success: false,
      message: 'Đang kết nối GitHub và commit vào repository...'
    });

    // Commit to GitHub
    const res = await commitArticleToGitHub(token, newArticle);

    if (res.ok) {
      // Also save locally for immediate preview
      saveLocalArticle(newArticle);
      registerArticleRuntime(newArticle);
      setAllArticles([...ARTICLES_DATA]);

      setArticleSubmitStatus({
        loading: false,
        success: true,
        message: `Đã commit thành công lên repository ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}! GitHub Actions sẽ tự động kích hoạt deploy lên GitHub Pages trong 1-2 phút.`,
        commitUrl: res.commitUrl,
        createdSlug: slug
      });
    } else {
      setArticleSubmitStatus({
        loading: false,
        success: false,
        message: `Lỗi khi commit lên GitHub: ${res.error}`
      });
    }
  };

  // Submit Category (Local or GitHub)
  const handleSaveCategory = async (mode: 'local' | 'github') => {
    if (!categoryName.trim()) {
      alert('Vui lòng nhập tên danh mục!');
      return;
    }
    const slug = categorySlug.trim() || slugify(categoryName);
    const newCat = {
      id: `tab-${slug}`,
      name: categoryName.trim(),
      slug,
      desc: categoryDesc.trim()
    };

    if (mode === 'local') {
      saveLocalCategory(newCat);
      registerCategoryRuntime(newCat);
      setCategorySubmitStatus({
        loading: false,
        success: true,
        message: 'Đã thêm danh mục mới vào hệ thống cục bộ!'
      });
      setCategoryName('');
      setCategorySlug('');
      setCategoryDesc('');
      return;
    }

    const token = getGitHubToken();
    if (!token) {
      setPendingAction('category');
      setIsGitHubModalOpen(true);
      return;
    }

    setCategorySubmitStatus({
      loading: true,
      success: false,
      message: 'Đang commit danh mục lên GitHub...'
    });

    const res = await commitCategoryToGitHub(token, newCat);
    if (res.ok) {
      saveLocalCategory(newCat);
      registerCategoryRuntime(newCat);
      setCategorySubmitStatus({
        loading: false,
        success: true,
        message: `Đã commit danh mục lên repo thành công!`,
        commitUrl: res.commitUrl
      });
      setCategoryName('');
      setCategorySlug('');
      setCategoryDesc('');
    } else {
      setCategorySubmitStatus({
        loading: false,
        success: false,
        message: `Lỗi: ${res.error}`
      });
    }
  };

  // Delete local article
  const handleDeleteArticle = (id: string, slug: string) => {
    if (confirm('Bạn có chắc chắn muốn gỡ bài viết này khỏi danh sách xem trước cục bộ?')) {
      deleteLocalArticle(id);
      const updated = allArticles.filter((a) => a.id !== id && a.slug !== slug);
      setAllArticles(updated);
    }
  };

  // Helper for quick image insertion
  const presetImages = [
    { label: 'Thiết Kế Đồ Họa', url: 'https://blogdaytinhoc.com/images/slider/29022024/khoa-hoc-thiet-ke-do-hoa.png' },
    { label: 'AutoCAD 2D/3D', url: 'https://blogdaytinhoc.com/images/slider/29022024/khoa-hoc-ve-ky-thuat.png' },
    { label: 'Photoshop Cấp Tốc', url: 'https://blogdaytinhoc.com/images/khoa-hoc/khoa-hoc-photoshop-thiet-ke-chinh-sua-anh.png' },
    { label: 'Tin Học Văn Phòng', url: 'https://blogdaytinhoc.com/images/khoa-hoc/tin-hoc-van-phong-ung-dung.jpg' }
  ];

  // Loading state while checking JWT
  if (isVerifyingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-3" />
          <p className="text-sm text-slate-300">Đang kiểm tra phiên xác thực quản trị...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 1: LOGIN FORM (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/20">
              <Lock className="w-7 h-7 text-yellow-300" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/30 px-3 py-1 rounded-full border border-white/20 inline-block mb-1">
              CMS Management Portal
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">ĐỒ HỌA THỰC CHIẾN</h1>
            <p className="text-xs text-blue-100 mt-1">Đăng nhập quyền quản trị nội dung bài viết & danh mục</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Tài khoản quản trị
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Nhập username admin"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security note */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Bảo mật cấp cao:</strong> Mật khẩu được mã hóa SHA-256 kèm salt và cấp JWT Token ký số, không lưu trữ văn bản thô trên mã nguồn.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực bảo mật...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Đăng Nhập Quản Trị</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="text-xs text-slate-500 hover:text-blue-600 transition inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Quay lại trang chủ website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: ADMIN DASHBOARD (When authenticated)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow">
              ĐH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base text-white tracking-tight">
                  ĐỒ HỌA THỰC CHIẾN
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-400/30">
                  CMS ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Quản lý nội dung & Đồng bộ GitHub</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Status Pill */}
            <button
              type="button"
              onClick={() => setIsGitHubModalOpen(true)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
                githubStatus.ok
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {githubStatus.ok ? `GitHub: ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}` : 'GitHub: Chưa kết nối'}
              </span>
              <span className="md:hidden">GitHub</span>
            </button>

            {/* View Live Website */}
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem website</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
              title="Đăng xuất"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm sticky top-22">
            <div className="px-3 py-2 border-b border-slate-100 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Menu Quản Trị
              </span>
            </div>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Bảng Tổng Quan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('new-article')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'new-article'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Thêm Bài Viết Mới</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('articles-list')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'articles-list'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Danh Sách Bài Viết</span>
                <span className="ml-auto text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-semibold">
                  {allArticles.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('categories')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'categories'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                <span>Quản Lý Danh Mục</span>
                <span className="ml-auto text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-semibold">
                  {COURSE_TABS.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media-manager')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'media-manager'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Quản Lý Hình Ảnh (20)</span>
                <span className="ml-auto text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">
                  20 ảnh
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('github-settings')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  activeTab === 'github-settings'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GitCommit className="w-4 h-4" />
                <span>Cài Đặt GitHub & PAT</span>
              </button>
            </nav>

            <div className="mt-4 pt-3 border-t border-slate-100 px-3">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Đang đăng nhập: <strong>dohoathucchien</strong></span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-blue-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng bài viết</span>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{allArticles.length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Bài viết trên toàn hệ thống</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng danh mục</span>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{COURSE_TABS.length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Chuyên mục đào tạo & cẩm nang</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Bài tạo gần đây</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{getLocalArticles().length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Bài viết thêm mới qua Admin</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-amber-600 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GitHub Sync</span>
                    <GitCommit className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-black text-slate-900 truncate">
                    {githubStatus.ok ? 'Đã kết nối' : 'Chưa kết nối'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md">
                <h2 className="text-lg sm:text-xl font-black mb-2">Trung Tâm Điều Hành Nội Dung</h2>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed mb-5">
                  Tạo bài viết mới với giao diện trực quan, tự động tạo slug chuẩn SEO, tự động bóc tách mục lục (TOC), lưu bản xem trước ngay lập tức và commit thẳng lên GitHub repo <strong>{GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}</strong> để tự động xuất bản qua GitHub Pages!
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('new-article')}
                    className="bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Tạo bài viết mới ngay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('categories')}
                    className="bg-blue-600/60 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-white/20 flex items-center gap-2 cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>Thêm danh mục mới</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGitHubModalOpen(true)}
                    className="bg-slate-900/60 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-white/20 flex items-center gap-2 cursor-pointer"
                  >
                    <GitCommit className="w-4 h-4" />
                    <span>Quản lý GitHub Token</span>
                  </button>
                </div>
              </div>

              {/* Recent Articles */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Bài Viết Mới Nhất</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('articles-list')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Xem tất cả ({allArticles.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {allArticles.slice(0, 5).map((art) => (
                    <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                          {art.cat}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 truncate hover:text-blue-600 transition">
                          {art.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {art.date} • Slug: /{art.slug}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigate(`/bai-viet/${art.slug}`)}
                        className="text-xs text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1"
                      >
                        <span>Xem</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREATE NEW ARTICLE */}
          {activeTab === 'new-article' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Thêm Bài Viết Mới</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nhập nội dung, tự động sinh slug chuẩn SEO và commit trực tiếp lên GitHub
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveArticle('local')}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu Cục Bộ</span>
                  </button>
                  <button
                    type="button"
                    disabled={articleSubmitStatus.loading}
                    onClick={() => handleSaveArticle('github')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {articleSubmitStatus.loading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang commit...</span>
                      </>
                    ) : (
                      <>
                        <GitCommit className="w-3.5 h-3.5" />
                        <span>Submit & Commit GitHub</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Alert */}
              {articleSubmitStatus.message && (
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed flex items-start gap-3 ${
                    articleSubmitStatus.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {articleSubmitStatus.success ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold">{articleSubmitStatus.message}</p>
                    {articleSubmitStatus.commitUrl && (
                      <a
                        href={articleSubmitStatus.commitUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline font-bold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Xem chi tiết commit trên GitHub</span>
                      </a>
                    )}
                    {articleSubmitStatus.createdSlug && (
                      <div>
                        <button
                          type="button"
                          onClick={() => onNavigate(`/bai-viet/${articleSubmitStatus.createdSlug}`)}
                          className="mt-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 shadow"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Mở xem bài viết ngay</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form Grid */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Tiêu đề bài viết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={articleTitle}
                    onChange={handleTitleChange}
                    placeholder="Ví dụ: Khóa Học Photoshop Thực Chiến Từ Cơ Bản Đến Nâng Cao 2026"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                {/* Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Đường dẫn URL Slug <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setArticleSlug(slugify(articleTitle));
                        setIsSlugCustomized(false);
                      }}
                      className="text-[11px] text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Tự động tạo lại từ tiêu đề</span>
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                      /bai-viet/
                    </span>
                    <input
                      type="text"
                      value={articleSlug}
                      onChange={(e) => {
                        setArticleSlug(e.target.value);
                        setIsSlugCustomized(true);
                      }}
                      placeholder="khoa-hoc-photoshop-thuc-chien"
                      className="w-full pl-22 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Category & Author Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Danh mục
                    </label>
                    <select
                      value={articleCat}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setArticleCat(selected);
                        setArticleCatSlug(slugify(selected));
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    >
                      {COURSE_TABS.map((tab) => (
                        <option key={tab.id} value={tab.name}>
                          {tab.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Tác giả
                    </label>
                    <input
                      type="text"
                      value={articleAuthor}
                      onChange={(e) => setArticleAuthor(e.target.value)}
                      placeholder="Admin Đồ Họa Thực Chiến"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Tóm tắt bài viết (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                    placeholder="Mô tả ngắn gọn nội dung bài viết, hiển thị ở trang chủ và thẻ SEO meta description..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                {/* Image URL & Presets */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Ảnh đại diện URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={articleImg}
                      onChange={(e) => setArticleImg(e.target.value)}
                      placeholder="https://domain.com/path-to-image.jpg"
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-400">Chọn nhanh ảnh mẫu:</span>
                    {presetImages.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setArticleImg(p.url)}
                        className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-2 py-1 rounded-md border border-slate-200 transition"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags & Featured Checkbox */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Tags (phân tách bởi dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={articleTags}
                      onChange={(e) => setArticleTags(e.target.value)}
                      placeholder="Photoshop, Vẽ kỹ thuật, Thực hành"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={articleFeatured}
                        onChange={(e) => setArticleFeatured(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-slate-700">Đánh dấu bài viết nổi bật</span>
                    </label>
                  </div>
                </div>

                {/* Content Rich Editor Toolbar & Modes */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Nội dung chi tiết bài viết (Trình Soạn Thảo Đầy Đủ Công Cụ)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      🎨 Trực Quan (WYSIWYG) • 💻 Mã HTML • ⚡ Chia Đôi (Split) • 📥 Mẫu Có Sẵn • 🎥 Nhúng Video/Bảng
                    </span>
                  </div>

                  {/* Rich Article Editor Component */}
                  <RichArticleEditor
                    value={articleContent}
                    onChange={setArticleContent}
                    minHeight="460px"
                  />
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <div className="text-xs text-slate-400">
                    Trạng thái: {githubStatus.ok ? 'Đã kết nối GitHub Repo' : 'Chưa có Token GitHub'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveArticle('local')}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Lưu Cục Bộ</span>
                    </button>
                    <button
                      type="button"
                      disabled={articleSubmitStatus.loading}
                      onClick={() => handleSaveArticle('github')}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {articleSubmitStatus.loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Đang Commit Lên GitHub...</span>
                        </>
                      ) : (
                        <>
                          <GitCommit className="w-4 h-4" />
                          <span>Lưu & Commit Lên GitHub (main)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              {/* Add category card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-black text-slate-900 mb-1">Thêm Danh Mục Mới</h2>
                <p className="text-xs text-slate-500 mb-4">
                  Tạo chuyên mục mới cho các khóa học và bài viết
                </p>

                {categorySubmitStatus.message && (
                  <div
                    className={`p-3.5 mb-4 rounded-xl text-xs flex items-center gap-2.5 ${
                      categorySubmitStatus.success
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {categorySubmitStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span>{categorySubmitStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Tên danh mục <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setCategorySlug(slugify(e.target.value));
                      }}
                      placeholder="Ví dụ: Thiết Kế 3D Blender"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Slug danh mục <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value)}
                      placeholder="thiet-ke-3d-blender"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Mô tả ngắn chuyên mục
                    </label>
                    <input
                      type="text"
                      value={categoryDesc}
                      onChange={(e) => setCategoryDesc(e.target.value)}
                      placeholder="Tổng hợp các bài viết và khóa học về thiết kế và dựng hình 3D..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveCategory('local')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Lưu Cục Bộ
                  </button>
                  <button
                    type="button"
                    disabled={categorySubmitStatus.loading}
                    onClick={() => handleSaveCategory('github')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {categorySubmitStatus.loading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang commit...</span>
                      </>
                    ) : (
                      <>
                        <GitCommit className="w-3.5 h-3.5" />
                        <span>Lưu & Commit GitHub</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Existing Categories Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Danh Sách Chuyên Mục Hiện Có</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Tên Danh Mục</th>
                        <th className="py-2.5 px-3">Mã Slug / ID</th>
                        <th className="py-2.5 px-3">Số Bài Viết</th>
                        <th className="py-2.5 px-3 text-right">Xem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {COURSE_TABS.map((cat) => {
                        const count = allArticles.filter(
                          (a) => a.catSlug === cat.id || a.cat.toLowerCase() === cat.name.toLowerCase()
                        ).length;
                        return (
                          <tr key={cat.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-slate-800">{cat.name}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-500">{cat.id}</td>
                            <td className="py-2.5 px-3">
                              <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                                {count} bài viết
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => onNavigate(`/danh-muc/${cat.id}`)}
                                className="text-blue-600 hover:underline font-semibold"
                              >
                                Xem mục
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARTICLES LIST */}
          {activeTab === 'articles-list' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">Danh Sách Bài Viết</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Tìm kiếm, lọc và quản lý bài viết</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('new-article')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Viết bài mới</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={articleSearchQuery}
                    onChange={(e) => setArticleSearchQuery(e.target.value)}
                    placeholder="Tìm theo tiêu đề, slug, tác giả..."
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <select
                  value={articleCatFilter}
                  onChange={(e) => setArticleCatFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Tất cả chuyên mục</option>
                  {COURSE_TABS.map((tab) => (
                    <option key={tab.id} value={tab.name}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase">
                    <tr>
                      <th className="py-3 px-3">Bài Viết</th>
                      <th className="py-3 px-3">Chuyên Mục</th>
                      <th className="py-3 px-3">Ngày Đăng</th>
                      <th className="py-3 px-3">Lượt Xem</th>
                      <th className="py-3 px-3 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allArticles
                      .filter((a) => {
                        const matchesQuery =
                          !articleSearchQuery ||
                          a.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                          a.slug.toLowerCase().includes(articleSearchQuery.toLowerCase());
                        const matchesCat =
                          articleCatFilter === 'all' ||
                          a.cat.toLowerCase() === articleCatFilter.toLowerCase() ||
                          a.catSlug === articleCatFilter;
                        return matchesQuery && matchesCat;
                      })
                      .map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 line-clamp-1">{art.title}</div>
                            <div className="text-[11px] font-mono text-slate-400">/{art.slug}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                              {art.cat}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500">{art.date}</td>
                          <td className="py-3 px-3 text-slate-500 font-semibold">{art.views.toLocaleString('vi-VN')}</td>
                          <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => onNavigate(`/bai-viet/${art.slug}`)}
                              className="text-blue-600 hover:underline font-semibold"
                            >
                              Xem
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteArticle(art.id, art.slug)}
                              className="text-red-500 hover:underline font-semibold"
                              title="Xóa bản ghi cục bộ"
                            >
                              Gỡ
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA MANAGER */}
          {activeTab === 'media-manager' && <MediaManager />}

          {/* TAB 6: GITHUB SETTINGS */}
          {activeTab === 'github-settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">Cài Đặt Kết Nối GitHub Repository</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quản lý quyền Personal Access Token (PAT) để tự động commit bài viết lên repository
                </p>
              </div>

              {/* Status Info Box */}
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                  githubStatus.ok
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                {githubStatus.ok ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold mb-1">
                    {githubStatus.ok
                      ? `Đã kết nối thành công với GitHub Repo!`
                      : 'Chưa xác thực quyền commit GitHub'}
                  </h4>
                  <p>{githubStatus.message || 'Nhập GitHub Personal Access Token bên dưới để kích hoạt tính năng tự động commit.'}</p>
                  {githubStatus.repo && (
                    <div className="mt-2 text-[11px] font-mono text-emerald-900 space-y-0.5">
                      <div>Repository: <strong>{githubStatus.repo.full_name}</strong></div>
                      <div>Nhánh mặc định: <strong>{githubStatus.repo.default_branch}</strong></div>
                      <div>Quyền ghi (Push): <strong>{githubStatus.repo.permissions?.push ? 'Có quyền (Write: OK)' : 'Không có quyền'}</strong></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Cách lấy GitHub Personal Access Token trong 30 giây:</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 leading-relaxed">
                  <li>
                    Truy cập trang tạo token GitHub:{' '}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=DoHoaThucChien-Admin-CMS"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Mở github.com/settings/tokens</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    Đặt tên <strong>Note</strong> (ví dụ: <code>DoHoaThucChien-Admin</code>), tích chọn quyền: <strong>repo</strong> (Full control of private repositories & commit access).
                  </li>
                  <li>
                    Cuộn xuống cuối trang bấm <strong>Generate token</strong>, sao chép chuỗi mã bắt đầu bằng <code>ghp_...</code> và dán vào ô dưới đây.
                  </li>
                </ol>
              </div>

              {/* Token Input Form */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  GitHub Personal Access Token (PAT)
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubTokenState(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    disabled={isCheckingGitHub}
                    onClick={() => handleVerifyGitHubToken()}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingGitHub ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang kiểm tra...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Kiểm tra & Lưu</span>
                      </>
                    )}
                  </button>
                  {githubToken && (
                    <button
                      type="button"
                      onClick={() => {
                        clearGitHubToken();
                        setGithubTokenState('');
                        setGithubStatus({ tested: false, ok: false, message: 'Đã xóa token khỏi trình duyệt.' });
                      }}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-semibold rounded-xl border border-slate-200 transition"
                      title="Xóa token"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Request GitHub Auth when submitting without token */}
      {isGitHubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <GitCommit className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">Yêu Cầu Quyền Commit GitHub</h3>
                <p className="text-xs text-slate-500">Repository: {GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Để tự động commit bài viết mới vào mã nguồn của dự án (nhánh <strong>main</strong>) và kích hoạt GitHub Pages tự động deploy, bạn cần cung cấp một <strong>GitHub Personal Access Token</strong> có quyền <code>repo</code>.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-[11px] text-blue-900 mb-4 space-y-1">
              <div className="font-bold">Lấy token nhanh:</div>
              <a
                href="https://github.com/settings/tokens/new?scopes=repo&description=DoHoaThucChien-Admin-CMS"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline font-semibold inline-flex items-center gap-1"
              >
                <span>Bấm vào đây để tạo token có sẵn quyền repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Dán Token của bạn vào đây:
              </label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubTokenState(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {githubStatus.tested && (
              <div
                className={`p-3 rounded-xl text-xs mb-4 ${
                  githubStatus.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {githubStatus.message}
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsGitHubModalOpen(false);
                  setPendingAction(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                disabled={isCheckingGitHub || !githubToken.trim()}
                onClick={async () => {
                  await handleVerifyGitHubToken();
                  if (getGitHubToken()) {
                    setIsGitHubModalOpen(false);
                    if (pendingAction === 'article') {
                      handleSaveArticle('github');
                    } else if (pendingAction === 'category') {
                      handleSaveCategory('github');
                    }
                    setPendingAction(null);
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isCheckingGitHub ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Xác Thực & Tiến Hành Commit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
