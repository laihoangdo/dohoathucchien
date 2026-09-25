import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface HeroSliderProps {
  onNavigate: (path: string) => void;
  onOpenRegisterModal: () => void;
}

const SLIDES = [
  {
    id: 1,
    badge: 'ƯU ĐÃI KHUYẾN MÃI ĐẶC BIỆT',
    title: 'KHÓA HỌC PHOTOSHOP THỰC HÀNH THỰC CHIẾN',
    subtitle: 'Giá Khuyến Mãi Chỉ Từ 1.000.000đ — Cầm Tay Chỉ Việc 1 Kèm 1',
    points: [
      'Chỉnh sửa ảnh chuyên nghiệp, cắt ghép, blend màu, phục chế ảnh cưới & sản phẩm',
      'Thiết kế banner, poster, menu, backdrop, standee phục vụ in ấn & quảng cáo',
      'Ứng dụng AI tăng tốc quy trình thiết kế, tặng trọn bộ tài nguyên thiết kế cao cấp'
    ],
    ctaText: 'Đăng Ký Học Ngay',
    ctaLink: '/danh-muc/tu-hoc-photoshop',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    accentColor: '#0284c7',
    image: '/images/khoa-hoc.jpg'
  },
  {
    id: 2,
    badge: 'ĐÀO TẠO TỪ CƠ BẢN ĐẾN NÂNG CAO',
    title: 'KHÓA HỌC THIẾT KẾ NỘI THẤT THỰC CHIẾN',
    subtitle: 'Tay Ngang Trở Thành Thiết Kế Sau 5 Tuần Học — Đi Thực Tế Sau Khóa Học',
    points: [
      'Làm chủ AutoCAD, SketchUp - Vray, 3Ds Max - Vray chuyên nghiệp',
      'Kỹ năng xuất file ABF, hậu kỳ Photoshop, dựng phối cảnh Họa viên kiến trúc 3D',
      'Bóc tách - triển khai bản vẽ chi tiết, lịch học tự chọn linh hoạt'
    ],
    ctaText: 'Xem Khóa Nội Thất',
    ctaLink: '/danh-muc/sketchup',
    bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
    accentColor: '#d97706',
    image: '/images/khoa-hoc-7.jpg'
  },
  {
    id: 3,
    badge: 'HỌC NHANH CẤP TỐC — ĐĂNG KÝ HỌC NGAY',
    title: 'TIN HỌC VĂN PHÒNG CHO NGƯỜI ĐI LÀM',
    subtitle: 'Chưa Biết Gì Vẫn Học Được — Thời Gian Linh Động Sáng, Chiều, Tối',
    points: [
      'Thành thạo soạn thảo Word chuẩn công văn, bảng tính Excel tính toán tự động',
      'Thiết kế bài thuyết trình PowerPoint ấn tượng, xử lý công việc văn phòng cấp tốc',
      'Học 1 kèm 1 trực tiếp tại lớp máy tính, học lại miễn phí nếu chưa thành thạo'
    ],
    ctaText: 'Xem Khóa Tin Học',
    ctaLink: '/danh-muc/tin-hoc-van-phong',
    bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
    accentColor: '#0284c7',
    image: '/images/lop-hoc-4.jpg'
  },
  {
    id: 4,
    badge: 'THIẾT KẾ VECTOR CHUYÊN NGHIỆP',
    title: 'KHÓA HỌC ILLUSTRATOR (AI) CHUYÊN IN ẤN',
    subtitle: 'Học Là Làm Được! Cầm Tay Chỉ Việc — Tặng Trọn Bộ Tài Nguyên Thiết Kế',
    points: [
      'Thiết kế namecard, hộp giấy, nhãn mác sản phẩm, tờ rơi, catalogue, biển quảng cáo',
      'Xuất file chuẩn hệ màu CMYK phục vụ xưởng in ấn và gia công không lỗi phông',
      'Cấp chứng chỉ tốt nghiệp, hỗ trợ giải đáp kỹ thuật trọn đời sau khóa học'
    ],
    ctaText: 'Xem Khóa Illustrator',
    ctaLink: '/danh-muc/tu-hoc-photoshop',
    bgGradient: 'from-orange-950 via-slate-900 to-red-950',
    accentColor: '#ea580c',
    image: '/images/khoa-hoc-3.jpg'
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
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950">
                <SafeImage
                  src={active.image}
                  alt={active.title}
                  badge={active.badge}
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4">
                  <div className="text-white text-xs font-bold uppercase tracking-wider text-yellow-300">
                    Đồ Họa Thực Chiến — dohoathucchien.com
                  </div>
                  <div className="text-white text-sm font-semibold truncate">
                    Hotline: 0938.636.843 — Học 1 Kèm 1 Cầm Tay Chỉ Việc
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
