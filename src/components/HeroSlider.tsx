import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  onNavigate: (path: string) => void;
  onOpenRegisterModal: () => void;
}

const SLIDES = [
  {
    id: 1,
    badge: 'ĐÀO TẠO THỰC HÀNH CẤP TỐC',
    title: 'KHÓA HỌC TIN HỌC VĂN PHÒNG',
    subtitle: 'Học 1 Kèm 1 - Cầm Tay Chỉ Việc - Thành Thạo Word, Excel, PowerPoint',
    points: [
      'Thời gian học linh hoạt: Sáng, chiều, tối rảnh giờ nào học giờ đó',
      'Cam kết làm được việc ngay sau khóa học, hỗ trợ sau tốt nghiệp',
      'Học lại miễn phí 100% nếu chưa thành thạo'
    ],
    ctaText: 'Đăng Ký Học Ngay',
    ctaLink: '/danh-muc/tin-hoc-van-phong',
    bgGradient: 'from-blue-900 via-blue-800 to-indigo-950',
    accentColor: '#0265ff',
    image: 'https://blogdaytinhoc.com/images/2024/8/1722958738_trung-tam-tin-hoc-sao-viet_big.jpg'
  },
  {
    id: 2,
    badge: 'ỨNG DỤNG CÔNG NGHỆ MỚI',
    title: 'KHÓA HỌC ỨNG DỤNG AI CHO DÂN VĂN PHÒNG',
    subtitle: 'Đột phá năng suất gấp 5 lần với ChatGPT, Google Gemini & Tự động hóa Excel',
    points: [
      'Xử lý bảng tính và báo cáo dữ liệu phức tạp trong 30 giây',
      'Soạn thảo văn bản, hợp đồng, email chuyên nghiệp bằng AI Agents',
      'Xây dựng trợ lý ảo hỗ trợ công việc văn phòng tự động'
    ],
    ctaText: 'Khám Phá Khóa AI',
    ctaLink: '/danh-muc/khoa-hoc-ai',
    bgGradient: 'from-slate-900 via-blue-950 to-indigo-900',
    accentColor: '#8b5cf6',
    image: 'https://blogdaytinhoc.com/images/khoa-hoc/khoa-hoc-ai.jpg'
  },
  {
    id: 3,
    badge: 'THIẾT KẾ & VẼ KỸ THUẬT',
    title: 'ĐÀO TẠO AUTOCAD 2D, 3D & SOLIDWORKS',
    subtitle: 'Dành Cho Kỹ Sư, Sinh Viên Cơ Khí, Kiến Trúc, Nội Thất & Xây Dựng',
    points: [
      'Triển khai bản vẽ kỹ thuật chi tiết theo tiêu chuẩn TCVN & Quốc tế',
      'Thực hành 100% trên dự án công trình & khuôn mẫu thực tế',
      'Giáo viên là kỹ sư giàu kinh nghiệm thực chiến tại doanh nghiệp'
    ],
    ctaText: 'Xem Khóa Kỹ Thuật',
    ctaLink: '/danh-muc/autocad',
    bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
    accentColor: '#06b6d4',
    image: 'https://blogdaytinhoc.com/images/2022/11/1668471712_Khoa-hoc-AutoCad-Tai-Tp-HCM_big.jpg'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onOpenRegisterModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const active = SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 text-white shadow-inner" id="slider">
      <div 
        className={`w-full min-h-[380px] md:min-h-[460px] bg-gradient-to-r ${active.bgGradient} transition-colors duration-700 flex items-center relative py-10 px-4`}
      >
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Slide Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-yellow-300 text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              {active.badge}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              {active.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-blue-100 font-medium leading-relaxed">
              {active.subtitle}
            </p>

            <div className="space-y-2 pt-2">
              {active.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRegisterModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(active.ctaLink)}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm sm:text-base px-5 py-3 rounded-xl transition"
              >
                Xem Chương Trình Học
              </button>
            </div>
          </div>

          {/* Slide Image Mockup */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-800">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized placeholder if offline
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                  <div className="text-white text-xs font-bold uppercase tracking-wider text-yellow-300">
                    Trung Tâm Đào Tạo Đồ Họa Thực Chiến
                  </div>
                  <div className="text-white text-sm font-semibold truncate">
                    Cam kết chất lượng - 13 Chi nhánh tại Việt Nam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back and Forward Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
          aria-label="Previous Slide"
          id="back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
          aria-label="Next Slide"
          id="forword"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20" id="dots">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom line progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10" id="line">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
