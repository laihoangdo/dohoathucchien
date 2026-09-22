import React, { useState } from 'react';
import { Search, Flame, Clock, MapPin, Send, CheckCircle2, Tag } from 'lucide-react';
import { ARTICLES_DATA, LOCATIONS_DATA, POPULAR_TAGS, SITE_INFO } from '../data/siteData';

interface SidebarProps {
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, onSearch, onOpenRegisterModal }) => {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');
  const [searchWord, setSearchWord] = useState('');

  // Fast consultation form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [courseInterest, setCourseInterest] = useState('Tin học văn phòng');
  const [branchInterest, setBranchInterest] = useState('Bình Thạnh - Nguyễn Xí');
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchWord.trim()) {
      onSearch(searchWord.trim());
    }
  };

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
    }, 4000);
  };

  const displayedArticles = activeTab === 'latest' 
    ? ARTICLES_DATA.slice(0, 5) 
    : [...ARTICLES_DATA].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <aside className="space-y-6">
      {/* 1. Search Box Widget */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600" />
          <span>Tìm kiếm bài viết</span>
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Nhập từ khóa cần tìm..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 p-1 text-slate-500 hover:text-blue-600"
            aria-label="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 2. Quick Registration Form Widget */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <span className="inline-block text-[11px] font-black uppercase tracking-wider bg-yellow-400 text-slate-900 px-2.5 py-0.5 rounded-full mb-2">
            ƯU ĐÃI 20% HÔM NAY
          </span>
          <h3 className="text-lg font-black text-white leading-snug">
            Đăng Ký Tư Vấn Khóa Học
          </h3>
          <p className="text-xs text-red-100 mt-1 mb-4">
            Để lại thông tin, giảng viên Đồ Họa Thực Chiến sẽ liên hệ tư vấn lộ trình và xếp lớp phù hợp nhất!
          </p>

          {submitted ? (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-yellow-300 mx-auto mb-2" />
              <div className="font-bold text-sm text-white">Đăng ký thành công!</div>
              <div className="text-xs text-red-100 mt-1">
                Bộ phận tuyển sinh sẽ liên hệ với bạn trong vòng 15 phút.
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickRegister} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Họ và tên của bạn *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/95 text-slate-900 text-xs rounded-xl px-3 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium"
              />

              <input
                type="tel"
                required
                placeholder="Số điện thoại / Zalo *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/95 text-slate-900 text-xs rounded-xl px-3 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium"
              />

              <select
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full bg-white/95 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium"
              >
                <option value="Tin học văn phòng">Tin học văn phòng cấp tốc</option>
                <option value="Excel chuyên sâu">Excel phân tích dữ liệu & VBA</option>
                <option value="AutoCAD 2D 3D">Khóa học AutoCAD 2D, 3D</option>
                <option value="Kế toán thực hành">Khóa học Kế toán thực hành</option>
                <option value="Khóa học AI">Ứng dụng AI cho công việc</option>
                <option value="Thiết kế Photoshop">Thiết kế Photoshop & Đồ họa</option>
                <option value="MOS / IC3">Luyện thi chứng chỉ MOS / IC3</option>
              </select>

              <select
                value={branchInterest}
                onChange={(e) => setBranchInterest(e.target.value)}
                className="w-full bg-white/95 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium"
              >
                <option value="Bình Thạnh - Nguyễn Xí">Cơ sở Bình Thạnh (Nguyễn Xí)</option>
                <option value="Quận 7 - Him Lam">Cơ sở Quận 7 (Him Lam)</option>
                <option value="Thủ Đức - D2">Cơ sở TP. Thủ Đức (Đường D2)</option>
                <option value="Tân Phú - Thoại Ngọc Hầu">Cơ sở Tân Phú</option>
                <option value="Bình Dương - Thuận An">Cơ sở Bình Dương (Thuận An)</option>
                <option value="Đồng Nai - Biên Hòa">Cơ sở Đồng Nai (Biên Hòa)</option>
                <option value="Hà Nội - Lê Văn Lương">Cơ sở Hà Nội (Thanh Xuân)</option>
                <option value="Học Online 1 Kèm 1">Học Trực Tuyến Online 1 Kèm 1</option>
              </select>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Thông Tin Đăng Ký</span>
              </button>
            </form>
          )}

          <div className="mt-3 text-[11px] text-red-100 text-center flex items-center justify-center gap-1">
            <span>Hoặc gọi trực tiếp:</span>
            <a href={`tel:${SITE_INFO.hotline1.replace(/\./g, '')}`} className="font-bold underline text-white">
              {SITE_INFO.hotline1}
            </a>
          </div>
        </div>
      </div>

      {/* 3. Articles Tabs: Mới nhất & Xem nhiều */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex border-b border-slate-200 mb-4">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 pb-2.5 text-xs font-bold tracking-wide uppercase transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'latest'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Bài Mới Nhất</span>
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`flex-1 pb-2.5 text-xs font-bold tracking-wide uppercase transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'popular'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Xem Nhiều Nhất</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {displayedArticles.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onNavigate(`/bai-viet/${article.slug}`)}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                idx < 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {idx + 1}
              </span>
              <div className="overflow-hidden flex-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug transition">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.views.toLocaleString()} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Branch Network Quick List */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs address_aside">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>Hệ Thống Cơ Sở Đào Tạo</span>
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          13 chi nhánh hiện đại trải dài tại TP.HCM, Bình Dương, Đồng Nai, Vũng Tàu, Hà Nội:
        </p>
        <ul className="space-y-2 text-xs text-slate-700">
          {LOCATIONS_DATA.slice(0, 6).map((loc) => (
            <li key={loc.num} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {loc.num}
              </span>
              <span className="line-clamp-2">{loc.address}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onNavigate('/lien-he')}
          className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
        >
          Xem tất cả 13 cơ sở & bản đồ chỉ đường →
        </button>
      </div>

      {/* 5. Popular Tags Cloud */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span>Từ Khóa Phổ Biến</span>
        </h3>
        <div className="flex flex-wrap gap-1.5 tags">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
