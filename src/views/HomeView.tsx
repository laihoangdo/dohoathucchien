import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Laptop, 
  Award, 
  Users, 
  Clock, 
  BookCheck,
  TrendingUp
} from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { CourseTabs } from '../components/CourseTabs';
import { TeachersCarousel } from '../components/TeachersCarousel';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Sidebar } from '../components/Sidebar';
import { ARTICLES_DATA, SITE_INFO } from '../data/siteData';
import { useSEO } from '../hooks/useSEO';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  useSEO({
    title: 'Trung Tâm Đồ Họa Thực Chiến - Đào Tạo Thiết Kế & Kỹ Năng Thực Hành',
    description: 'Đào tạo thiết kế đồ họa, Photoshop, Illustrator, AutoCAD, tin học văn phòng và AI ứng dụng. Phương pháp kèm 1-1, học là làm được việc ngay tại 13 cơ sở.',
    type: 'website',
    keywords: ['đồ họa thực chiến', 'dạy thiết kế đồ họa', 'học autocad cấp tốc', 'khóa học photoshop hcm', 'tin học thực hành']
  });

  return (
    <div className="w-full">
      {/* 1. Hero Slider Banner */}
      <HeroSlider onNavigate={onNavigate} onOpenRegisterModal={onOpenRegisterModal} />

      {/* 2. Course Tabs & Search */}
      <CourseTabs onNavigate={onNavigate} onOpenRegisterModal={onOpenRegisterModal} />

      {/* 3. Main Center Introduction & Articles with Sidebar */}
      <section className="py-12 bg-white" id="intro-articles">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (8 cols): Intro & Latest Articles */}
            <div className="lg:col-span-8 space-y-10">
              {/* Introduction Box matching blogdaytinhoc.com */}
              <div className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-white rounded-3xl p-6 md:p-8 border border-blue-100 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Về Chúng Tôi</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  Trung Tâm Đồ Họa Thực Chiến — Nơi Khởi Đầu Thành Công Của Bạn
                </h2>

                <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
                  Trung tâm Đồ Họa Thực Chiến là đơn vị tiên phong trong lĩnh vực đào tạo thực hành thực chiến cho học sinh, sinh viên, người đi làm và doanh nghiệp. Với phương châm <strong className="text-blue-700">"Học thực tế - Làm thực tế"</strong>, học viên được hướng dẫn trực tiếp 1 kèm 1 bởi các chuyên gia giàu kinh nghiệm.
                </p>

                {/* 4 Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Thời gian học linh hoạt</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Rảnh ca nào học ca đó: Sáng, chiều, tối hoặc cuối tuần.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Thực hành 100%</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Cầm tay chỉ việc 1 kèm 1 trực tiếp trên máy tính cấu hình cao.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Cấp chứng chỉ uy tín</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Chứng chỉ hoàn thành khóa học có giá trị toàn quốc, hỗ trợ thi MOS.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <BookCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Bảo hành khóa học trọn đời</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Học lại miễn phí 100% nếu chưa thành thạo, hỗ trợ kỹ thuật sau khóa.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('/gioi-thieu')}
                    className="text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <span>Tìm hiểu thêm về trung tâm</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenRegisterModal}
                    className="text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-xl transition"
                  >
                    Đăng ký tư vấn miễn phí
                  </button>
                </div>
              </div>

              {/* Latest Articles & Tutorials */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-blue-600 pb-3 mb-6">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                      CHIA SẺ KIẾN THỨC
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      Bài Viết & Hướng Dẫn Tin Học Mới Nhất
                    </h3>
                  </div>

                  <button
                    onClick={() => onNavigate('/giao-trinh')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Xem tất cả</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {ARTICLES_DATA.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => onNavigate(`/bai-viet/${article.slug}`)}
                      className="group cursor-pointer bg-white rounded-2xl p-4 md:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5"
                    >
                      {/* Thumbnail */}
                      <div className="sm:w-64 h-44 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <span className="absolute top-2.5 left-2.5 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {article.cat}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {article.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {article.views.toLocaleString()} lượt xem
                            </span>
                          </div>

                          <h4 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-blue-600 leading-snug transition mb-2">
                            {article.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">Bởi: {article.author}</span>
                          <span className="font-bold text-blue-600 group-hover:translate-x-1 transition flex items-center gap-1">
                            Đọc bài viết <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Sticky Sidebar */}
            <div className="lg:col-span-4">
              <Sidebar
                onNavigate={onNavigate}
                onSearch={onSearch}
                onOpenRegisterModal={onOpenRegisterModal}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Teachers Section */}
      <TeachersCarousel />

      {/* 5. Testimonials Section */}
      <TestimonialsCarousel />

      {/* 6. Why Choose Sao Viet Banner */}
      <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full mb-2">
              LÝ DO CHỌN CHÚNG TÔI
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Tại Sao Hơn 50,000+ Học Viên Chọn Đồ Họa Thực Chiến?
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-2">
              Chất lượng đào tạo chuẩn quốc tế, trang thiết bị đồng bộ hiện đại và đội ngũ giảng viên tâm huyết 1 kèm 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-blue-500 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phương Pháp 1 Kèm 1</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Học viên không phải theo lớp đông đúc. Giảng viên trực tiếp kèm cặp từng học viên, giúp giải quyết triệt để mọi khó khăn trong công việc thực tế.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-yellow-500 transition">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Thực Hành Trên File Thật</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Giáo trình bám sát hồ sơ chứng từ kế toán, bản vẽ kỹ thuật CAD, báo cáo Excel và văn bản hành chính thực tế đang dùng tại doanh nghiệp.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-500 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bảo Hành Kiến Thức Trọn Đời</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Học viên được quyền học lại hoàn toàn miễn phí nếu chưa nắm vững kiến thức. Hỗ trợ giải đáp các vướng mắc công việc cả sau khi đã hoàn thành khóa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
