import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Info, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { SITE_INFO } from '../data/siteData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSearch: (query: string) => void;
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
    }
  };

  const toggleSubmenu = (menuName: string) => {
    setExpandedSubmenu(expandedSubmenu === menuName ? null : menuName);
  };

  const navTo = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm" id="header">
      {/* Top Banner Announcement */}
      <div 
        id="fixed-topbar" 
        className="bg-gradient-to-r from-red-700 via-red-600 to-blue-700 text-white text-xs md:text-sm py-1.5 px-4 font-semibold text-center flex items-center justify-between"
      >
        <div className="hidden lg:flex items-center gap-4 text-xs font-normal">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-yellow-300" />
            Giờ làm việc: {SITE_INFO.workingHours}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            13 chi nhánh TP.HCM, Bình Dương, Đồng Nai, Hà Nội
          </span>
        </div>
        <div className="w-full lg:w-auto text-center font-bold tracking-wide">
          🌟 KHAI GIẢNG LỚP TIN HỌC VĂN PHÒNG, AUTOCAD, KẾ TOÁN, ĐỒ HỌA & AI — GIẢM NGAY 20% HỌC PHÍ HÔM NAY!
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={onOpenRegisterModal}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-2.5 py-0.5 rounded text-xs font-bold transition shadow"
          >
            Đăng ký tư vấn
          </button>
        </div>
      </div>

      {/* Main Logo & Hotline Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navTo('/')} 
          className="cursor-pointer flex items-center gap-3 group"
          id="logo"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform">
            <Sparkles className="w-7 h-7 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black tracking-tight text-blue-700 group-hover:text-blue-800 transition">
              ĐỒ HỌA THỰC CHIẾN
            </div>
            <div className="text-[11px] md:text-xs text-slate-600 font-semibold tracking-wider uppercase">
              Blog Dạy Tin Học Thực Hành Chuyên Nghiệp
            </div>
          </div>
        </div>

        {/* Hotlines info and CTA */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <PhoneCall className="w-5 h-5 text-blue-600 animate-bounce" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium uppercase">Hotline tư vấn 24/7</div>
              <a href={`tel:${SITE_INFO.hotline1.replace(/\./g, '')}`} className="text-base font-extrabold text-red-600 hover:text-red-700">
                {SITE_INFO.hotline1}
              </a>
              <span className="text-xs text-slate-400 mx-1">-</span>
              <a href={`tel:${SITE_INFO.hotline2.replace(/\./g, '')}`} className="text-base font-extrabold text-blue-700 hover:text-blue-800">
                {SITE_INFO.hotline2}
              </a>
            </div>
          </div>

          <button
            onClick={onOpenRegisterModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-red-600/25 transition duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Đăng Ký Khóa Học
          </button>
        </div>

        {/* Mobile menu and search toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100"
            aria-label="Tìm kiếm"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Navigation Bar (Desktop) */}
      <nav 
        className="hidden md:block w-full bg-gradient-to-r from-[#0053d3] via-[#0265ff] to-[#0053d3] text-white shadow-md"
        id="mainnav"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center text-sm font-bold tracking-wide">
            {/* Home Icon */}
            <li>
              <button
                onClick={() => navTo('/')}
                className={`py-3.5 px-4 flex items-center justify-center hover:bg-white/15 transition ${
                  currentPath === '/' ? 'bg-white/20' : ''
                }`}
                title="Trang chủ Đồ Họa Thực Chiến"
              >
                <Home className="w-5 h-5 text-yellow-300" />
              </button>
            </li>

            {/* Lịch Khai Giảng Dropdown */}
            <li className="relative group">
              <button
                onClick={() => navTo('/lich-khai-giang')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath.startsWith('/lich-khai-giang') ? 'bg-white/20' : ''
                }`}
              >
                <Calendar className="w-4 h-4 text-white/80" />
                <span>Lịch Khai Giảng</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-white text-slate-800 rounded-b-xl shadow-xl border-t-2 border-red-600 py-2 z-50">
                <button onClick={() => navTo('/danh-muc/tin-hoc-van-phong')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tin học văn phòng cấp tốc
                </button>
                <button onClick={() => navTo('/danh-muc/ke-toan')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Khóa học Kế toán thực hành
                </button>
                <button onClick={() => navTo('/danh-muc/autocad')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Khóa học Vẽ AutoCAD 2D, 3D
                </button>
                <button onClick={() => navTo('/danh-muc/sketchup')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Khóa học Dựng hình SketchUp
                </button>
                <button onClick={() => navTo('/danh-muc/solidworks')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Khóa học Cơ khí SolidWorks
                </button>
                <button onClick={() => navTo('/danh-muc/tu-hoc-photoshop')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Thiết kế Đồ họa Photoshop & AI
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-quoc-te-mos')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tin học Quốc tế MOS - IC3
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-tre-em')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tin học & Lập trình Trẻ em
                </button>
              </div>
            </li>

            {/* Tin Học Dropdown */}
            <li className="relative group">
              <button
                onClick={() => navTo('/danh-muc/tin-hoc-van-phong')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath.includes('tin-hoc') ? 'bg-white/20' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 text-white/80" />
                <span>Tin Học</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-slate-800 rounded-b-xl shadow-xl border-t-2 border-red-600 py-2 z-50">
                <button onClick={() => navTo('/danh-muc/kien-thuc-may-tinh-co-ban')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Kiến Thức Máy Tính Cơ Bản
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-word')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tự Học Word Chuẩn
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-excel')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tự Học Excel Từ Cơ Bản
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-powerpoint')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Học PowerPoint Thuyết Trình
                </button>
                <button onClick={() => navTo('/danh-muc/tu-hoc-photoshop')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tự Học Photoshop
                </button>
                <button onClick={() => navTo('/danh-muc/khoa-hoc-ai')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Ứng Dụng AI Vào Công Việc
                </button>
              </div>
            </li>

            {/* Giáo Trình Dropdown */}
            <li className="relative group">
              <button
                onClick={() => navTo('/giao-trinh')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath.startsWith('/giao-trinh') ? 'bg-white/20' : ''
                }`}
              >
                <FileText className="w-4 h-4 text-white/80" />
                <span>Giáo Trình</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-white text-slate-800 rounded-b-xl shadow-xl border-t-2 border-red-600 py-2 z-50">
                <button onClick={() => navTo('/bai-viet/giao-trinh-tu-hoc-tin-hoc-van-phong-trung-tam-tin-hoc-sao-viet-bien-hoa-151')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Giáo Trình Tin Học Văn Phòng 2026
                </button>
                <button onClick={() => navTo('/bai-viet/tao-muc-luc-hinh-anh-trong-word-2010-2013-2016-22')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tài Liệu Thủ Thuật Word
                </button>
                <button onClick={() => navTo('/bai-viet/tao-nut-bam-trong-excel-de-chay-cac-lenh-lap-trinh-tu-dong-25')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tài Liệu Macro & VBA Excel
                </button>
                <button onClick={() => navTo('/danh-muc/autocad')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Bài Tập Thực Hành AutoCAD 2D, 3D
                </button>
                <button onClick={() => navTo('/danh-muc/ke-toan')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Tài Liệu Thực Hành Kế Toán Doanh Nghiệp
                </button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-quoc-te-mos')} className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold block transition">
                  Bộ Đề Luyện Thi MOS & IC3 Chuẩn
                </button>
              </div>
            </li>

            {/* Khóa Học */}
            <li>
              <button
                onClick={() => navTo('/khoa-hoc')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath === '/khoa-hoc' ? 'bg-white/20' : ''
                }`}
              >
                <GraduationCap className="w-4 h-4 text-white/80" />
                <span>Khóa Học</span>
              </button>
            </li>

            {/* Giới Thiệu */}
            <li>
              <button
                onClick={() => navTo('/gioi-thieu')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath === '/gioi-thieu' ? 'bg-white/20' : ''
                }`}
              >
                <Info className="w-4 h-4 text-white/80" />
                <span>Giới Thiệu</span>
              </button>
            </li>

            {/* Liên Hệ */}
            <li>
              <button
                onClick={() => navTo('/lien-he')}
                className={`py-3.5 px-4 flex items-center gap-1.5 hover:bg-white/15 transition ${
                  currentPath === '/lien-he' ? 'bg-white/20' : ''
                }`}
              >
                <MapPin className="w-4 h-4 text-white/80" />
                <span>Hệ Thống Cơ Sở</span>
              </button>
            </li>
          </ul>

          {/* Quick Search in Nav */}
          <div className="relative py-2">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Tìm bài viết, khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-blue-900/40 text-white placeholder-blue-200 text-xs rounded-full pl-3 pr-8 py-1.5 focus:outline-none focus:bg-white focus:text-slate-800 focus:placeholder-slate-400 w-48 transition-all duration-300 focus:w-64 border border-blue-400/30"
              />
              <button type="submit" className="absolute right-2.5 text-blue-200 hover:text-white" aria-label="Tìm">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-sm rounded-lg pl-3 pr-10 py-2 border border-slate-200 focus:outline-none focus:border-blue-600"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-500">
              <Search className="w-5 h-5" />
            </button>
          </form>

          <button onClick={() => navTo('/')} className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between">
            <span>Trang Chủ</span>
            <Home className="w-4 h-4 text-blue-600" />
          </button>

          <div>
            <button 
              onClick={() => toggleSubmenu('lich')} 
              className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between"
            >
              <span>Lịch Khai Giảng</span>
              <ChevronDown className={`w-4 h-4 transition ${expandedSubmenu === 'lich' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSubmenu === 'lich' && (
              <div className="pl-6 py-1 space-y-1 text-sm bg-slate-50 rounded-lg">
                <button onClick={() => navTo('/lich-khai-giang')} className="block w-full text-left py-1.5 text-blue-700 font-semibold">Xem Toàn Bộ Lịch Khai Giảng</button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-van-phong')} className="block w-full text-left py-1.5 text-slate-600">Lớp Tin học văn phòng cấp tốc</button>
                <button onClick={() => navTo('/danh-muc/ke-toan')} className="block w-full text-left py-1.5 text-slate-600">Lớp Kế toán thực hành</button>
                <button onClick={() => navTo('/danh-muc/autocad')} className="block w-full text-left py-1.5 text-slate-600">Lớp AutoCAD & SolidWorks</button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-quoc-te-mos')} className="block w-full text-left py-1.5 text-slate-600">Luyện thi chứng chỉ MOS / IC3</button>
              </div>
            )}
          </div>

          <div>
            <button 
              onClick={() => toggleSubmenu('tinhoc')} 
              className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between"
            >
              <span>Tin Học & Bài Viết</span>
              <ChevronDown className={`w-4 h-4 transition ${expandedSubmenu === 'tinhoc' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSubmenu === 'tinhoc' && (
              <div className="pl-6 py-1 space-y-1 text-sm bg-slate-50 rounded-lg">
                <button onClick={() => navTo('/danh-muc/tin-hoc-excel')} className="block w-full text-left py-1.5 text-slate-600">Học Excel</button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-word')} className="block w-full text-left py-1.5 text-slate-600">Học Word</button>
                <button onClick={() => navTo('/danh-muc/tin-hoc-powerpoint')} className="block w-full text-left py-1.5 text-slate-600">Học PowerPoint</button>
                <button onClick={() => navTo('/danh-muc/tu-hoc-photoshop')} className="block w-full text-left py-1.5 text-slate-600">Học Photoshop</button>
                <button onClick={() => navTo('/danh-muc/khoa-hoc-ai')} className="block w-full text-left py-1.5 text-slate-600">Khóa Học AI</button>
              </div>
            )}
          </div>

          <button onClick={() => navTo('/giao-trinh')} className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between">
            <span>Giáo Trình & Tài Liệu</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </button>

          <button onClick={() => navTo('/khoa-hoc')} className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between">
            <span>Danh Sách Khóa Học</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </button>

          <button onClick={() => navTo('/gioi-thieu')} className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between">
            <span>Về Đồ Họa Thực Chiến</span>
            <Info className="w-4 h-4 text-blue-600" />
          </button>

          <button onClick={() => navTo('/lien-he')} className="w-full text-left py-2 px-3 font-bold text-slate-800 hover:bg-blue-50 rounded-lg flex items-center justify-between">
            <span>13 Cơ Sở Đào Tạo</span>
            <MapPin className="w-4 h-4 text-blue-600" />
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full py-2.5 bg-red-600 text-white font-bold rounded-lg text-center shadow"
            >
              Đăng Ký Tư Vấn Khóa Học
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
