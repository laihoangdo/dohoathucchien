import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  Eye, 
  User, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  List,
  ArrowRight
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ARTICLES_DATA, COURSES_DATA } from '../data/siteData';
import { Article } from '../types';
import { useSEO } from '../hooks/useSEO';

interface ArticleViewProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  slug,
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  // Find current article or fallback to first
  const article: Article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];

  // Dynamic SEO metadata for current article
  useSEO({
    title: `${article.title} | Đồ Họa Thực Chiến`,
    description: article.excerpt,
    image: article.img,
    type: 'article',
    article: article,
    keywords: article.tags,
    url: typeof window !== 'undefined' ? `${window.location.origin}/bai-viet/${article.slug}` : undefined,
  });

  // Comment state
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      date: '10/02/2026',
      content: 'Bài viết hướng dẫn rất chi tiết và dễ hiểu, em đã áp dụng thành công trên file báo cáo của công ty. Cảm ơn trung tâm rất nhiều!'
    },
    {
      id: 2,
      name: 'Trần Thị Thu Thảo',
      date: '02/02/2026',
      content: 'Trung tâm cho mình hỏi khóa học kèm 1-1 tại cơ sở Bình Thạnh học vào buổi tối mấy giờ khai giảng ạ?'
    }
  ]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: commentName,
      date: 'Hôm nay',
      content: commentText
    };

    setCommentsList([newComment, ...commentsList]);
    setCommentSubmitted(true);
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 4);

  return (
    <div className="w-full bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-white p-3.5 rounded-xl border border-slate-200">
          <button onClick={() => onNavigate('/')} className="hover:text-blue-600 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-blue-600" />
            <span>Trang chủ</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button 
            onClick={() => onNavigate(`/danh-muc/${article.catSlug}`)} 
            className="hover:text-blue-600 font-medium"
          >
            {article.cat}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article Content */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
            {/* Header info */}
            <div>
              <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {article.cat}
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-5 border-b border-slate-100">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-blue-600" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  {article.views.toLocaleString()} lượt xem
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Đã sao chép link bài viết vào bộ nhớ tạm!');
                  }}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Excerpt quote callout */}
            <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-600 text-slate-700 text-sm font-medium leading-relaxed italic">
              {article.excerpt}
            </div>

            {/* Quick Table of Contents (TOC) */}
            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-3">
                <List className="w-4 h-4 text-blue-600" />
                <span>Mục Lục Bài Viết</span>
              </div>
              <ul className="space-y-1.5 text-xs text-blue-700">
                <li>
                  <a href="#phan-1" className="hover:underline flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    1. Giới thiệu tổng quan & tầm quan trọng trong công việc
                  </a>
                </li>
                <li>
                  <a href="#phan-2" className="hover:underline flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    2. Các bước tiến hành thực hiện chuẩn xác từng bước
                  </a>
                </li>
                <li>
                  <a href="#phan-3" className="hover:underline flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    3. Lưu ý & các lỗi thường gặp trong quá trình thao tác
                  </a>
                </li>
                <li>
                  <a href="#phan-4" className="hover:underline flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    4. Khóa học thực hành cấp tốc tại Đồ Họa Thực Chiến
                  </a>
                </li>
              </ul>
            </div>

            {/* Article Content Rendered with HTML */}
            <div 
              className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* In-article Course Registration CTA Box */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl mt-8">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
                  Đăng ký khóa học thực hành
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Bạn Muốn Thành Thạo Kỹ Năng Này Nhanh Nhất?
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-2 mb-4 leading-relaxed">
                  Tham gia ngay khóa học tại Đồ Họa Thực Chiến. Giảng viên cầm tay chỉ việc 1 kèm 1, học theo tiến độ riêng của bạn, giải quyết ngay các bài toán công việc thực tế!
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenRegisterModal}
                    className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow"
                  >
                    Đăng Ký Xếp Lớp Ngay
                  </button>
                  <button
                    onClick={() => onNavigate('/khoa-hoc')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl transition"
                  >
                    Xem tất cả khóa học
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Từ khóa:</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">#tinhocsaoviet</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">#{article.catSlug}</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">#thuthuattinhoc</span>
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">#hocnghiemchuc</span>
            </div>

            {/* Comments & Discussion Section */}
            <div className="pt-8 border-t border-slate-200" id="comments">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Bình Luận & Hỏi Đáp ({commentsList.length})</span>
              </h3>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Để lại thắc mắc hoặc cảm nhận của bạn
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn *"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Nội dung câu hỏi hoặc phản hồi..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Bình luận sẽ được kiểm duyệt và giải đáp bởi giảng viên Đồ Họa Thực Chiến.
                  </span>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi bình luận</span>
                  </button>
                </div>

                {commentSubmitted && (
                  <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cảm ơn bạn! Bình luận của bạn đã được gửi thành công.</span>
                  </div>
                )}
              </form>

              {/* Comments list */}
              <div className="space-y-4">
                {commentsList.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-white border border-slate-100 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-800">{c.name}</span>
                      <span className="text-[11px] text-slate-400">{c.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-lg font-black text-slate-900 mb-4">
                Bài Viết Cùng Chuyên Mục
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onNavigate(`/bai-viet/${rel.slug}`)}
                    className="group cursor-pointer p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition bg-white flex items-start gap-3"
                  >
                    <img
                      src={rel.img}
                      alt={rel.title}
                      className="w-20 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {rel.date} • {rel.views.toLocaleString()} lượt xem
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar
              onNavigate={onNavigate}
              onSearch={onSearch}
              onOpenRegisterModal={onOpenRegisterModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
