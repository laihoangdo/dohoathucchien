import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  Eye, 
  ArrowRight, 
  BookOpen, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ARTICLES_DATA, COURSES_DATA, COURSE_TABS } from '../data/siteData';
import { useSEO } from '../hooks/useSEO';

interface CategoryViewProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categorySlug,
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  const [viewTab, setViewTab] = useState<'articles' | 'courses'>('articles');

  // Find matching articles
  const filteredArticles = ARTICLES_DATA.filter(
    (a) => a.catSlug.toLowerCase() === categorySlug.toLowerCase() || categorySlug === 'all'
  );

  // If no direct article match, show all or related
  const articlesToDisplay = filteredArticles.length > 0 ? filteredArticles : ARTICLES_DATA.slice(0, 6);

  // Find matching courses
  const filteredCourses = COURSES_DATA.filter((c) => {
    if (categorySlug.includes('van-phong') || categorySlug.includes('word') || categorySlug.includes('excel')) {
      return c.tab === 'tab1' || c.tab === 'tab5';
    }
    if (categorySlug.includes('autocad') || categorySlug.includes('sketchup') || categorySlug.includes('solidworks')) {
      return c.tab === 'tab2';
    }
    if (categorySlug.includes('photoshop') || categorySlug.includes('do-hoa')) {
      return c.tab === 'tab3';
    }
    if (categorySlug.includes('ke-toan')) {
      return c.tab === 'tab6';
    }
    if (categorySlug.includes('ai')) {
      return c.tab === 'tab8';
    }
    return true;
  });

  const categoryName = COURSE_TABS.find((t) => t.id.includes(categorySlug))?.name || 
    categorySlug.replace(/-/g, ' ').toUpperCase();

  useSEO({
    title: `${categoryName} - Khóa Học & Bài Viết | Đồ Họa Thực Chiến`,
    description: `Khám phá các khóa học và bài viết hướng dẫn thực hành ${categoryName} chất lượng cao tại Đồ Họa Thực Chiến. Kèm 1-1, học là làm được ngay.`,
    type: 'website',
    keywords: [categoryName, 'học thiết kế', 'đồ họa thực chiến', 'đào tạo cấp tốc'],
    url: typeof window !== 'undefined' ? `${window.location.origin}/danh-muc/${categorySlug}` : undefined
  });

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
          <span className="text-slate-800 font-semibold uppercase">
            Chuyên mục: {categoryName}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 text-yellow-300 px-3 py-1 rounded-full mb-3">
              CHUYÊN MỤC TÀI LIỆU & ĐÀO TẠO
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white capitalize leading-tight">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
              Tổng hợp tất cả bài viết hướng dẫn thực hành, mẹo thiết kế đồ họa, thủ thuật phần mềm và các khóa học thực chiến 1 kèm 1 tại Đồ Họa Thực Chiến.
            </p>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setViewTab('articles')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              viewTab === 'articles'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bài viết & Giáo trình ({articlesToDisplay.length})</span>
          </button>

          <button
            onClick={() => setViewTab('courses')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              viewTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Khóa học liên quan ({filteredCourses.length})</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-6">
            {viewTab === 'articles' ? (
              <div className="space-y-5">
                {articlesToDisplay.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => onNavigate(`/bai-viet/${art.slug}`)}
                    className="group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5"
                  >
                    <div className="sm:w-56 h-36 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={art.img}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-1.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {art.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {art.views.toLocaleString()} lượt xem
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 leading-snug transition mb-1.5">
                          {art.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                      <div className="pt-2 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition group flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {c.categoryName}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm leading-snug line-clamp-2 mb-2">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                          {c.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-black text-red-600">{c.price || 'Liên hệ'}</span>
                        <button
                          onClick={onOpenRegisterModal}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                        >
                          Đăng ký học
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
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
