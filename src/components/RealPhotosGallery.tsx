import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  X, 
  Layers, 
  Award, 
  GraduationCap, 
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SafeImage } from './SafeImage';

export interface PhotoItem {
  id: string;
  filename: string;
  src: string;
  title: string;
  category: 'banner' | 'classroom' | 'project' | 'center';
  categoryLabel: string;
  desc: string;
  tag: string;
}

export const REAL_PHOTOS: PhotoItem[] = [
  {
    id: 'p-1',
    filename: 'khoa-hoc.jpg',
    src: '/images/khoa-hoc.jpg',
    title: 'Khóa Học Photoshop Thực Hành Thực Chiến',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Học phí ưu đãi chỉ từ 1.000.000đ - Cầm tay chỉ việc 1 kèm 1, tặng trọn bộ tài nguyên thiết kế.',
    tag: 'Photoshop Thực Chiến'
  },
  {
    id: 'p-2',
    filename: 'khoa-hoc-7.jpg',
    src: '/images/khoa-hoc-7.jpg',
    title: 'Khóa Học Thiết Kế Nội Thất Thực Chiến',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Đào tạo AutoCAD, SketchUp Vray, 3Ds Max, Xuất File ABF, hậu kỳ Photoshop, bóc tách hồ sơ chi tiết.',
    tag: 'Nội Thất 3D'
  },
  {
    id: 'p-3',
    filename: 'lop-hoc-4.jpg',
    src: '/images/lop-hoc-4.jpg',
    title: 'Khóa Học Tin Học Văn Phòng Cho Người Đi Làm',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Chưa biết gì vẫn học được, học nhanh cấp tốc, thời gian linh động sáng - chiều - tối.',
    tag: 'Tin Học Văn Phòng'
  },
  {
    id: 'p-4',
    filename: 'khoa-hoc-3.jpg',
    src: '/images/khoa-hoc-3.jpg',
    title: 'Khóa Học Illustrator (AI) Chuyên In Ấn',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Học là làm được! Thiết kế namecard, hộp giấy, nhãn mác, tờ rơi bao bì chuyên nghiệp.',
    tag: 'Illustrator Vector'
  },
  {
    id: 'p-5',
    filename: 'khoa-hoc-1.jpg',
    src: '/images/khoa-hoc-1.jpg',
    title: 'Khóa Học Photoshop Chuyên Gia Thiết Kế',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Cắt ghép chuyên sâu, blend màu sắc, chỉnh sửa ảnh cưới, ảnh sản phẩm thương mại điện tử.',
    tag: 'Photoshop Chuyên Sâu'
  },
  {
    id: 'p-6',
    filename: 'khoa-hoc-4.jpg',
    src: '/images/khoa-hoc-4.jpg',
    title: 'Trở Thành Designer Chuyên Nghiệp Từ Số 0',
    category: 'banner',
    categoryLabel: 'Banner Khóa Học',
    desc: 'Lộ trình từ người mới bắt đầu đến khi tự tin thiết kế banner, poster, backdrop, standee.',
    tag: 'Designer Từ Số 0'
  },
  {
    id: 'p-7',
    filename: 'khoa-hoc-2.jpg',
    src: '/images/khoa-hoc-2.jpg',
    title: 'Thiết Kế Bảng Hiệu Quảng Cáo, In Ấn 2D, 3D',
    category: 'project',
    categoryLabel: 'Dự Án Thực Tế',
    desc: 'Dự án thực tế: Thiết kế phối cảnh 3D mặt tiền biển hiệu Nha Khoa Sài Gòn Smile.',
    tag: 'Bảng Hiệu & In Ấn'
  },
  {
    id: 'p-8',
    filename: 'khoa-hoc-6.jpg',
    src: '/images/khoa-hoc-6.jpg',
    title: 'Thiết Kế 3D Showroom Mắt Kính BV Sài Gòn',
    category: 'project',
    categoryLabel: 'Dự Án Thực Tế',
    desc: 'Dựng phối cảnh 3D nội thất showroom bán lẻ chi tiết, xuất bản vẽ kỹ thuật thi công.',
    tag: '3D Showroom'
  },
  {
    id: 'p-9',
    filename: '3d.jpg',
    src: '/images/3d.jpg',
    title: 'Phối Cảnh 3D Biệt Thự Nghỉ Dưỡng & Hồ Bơi',
    category: 'project',
    categoryLabel: 'Dự Án Thực Tế',
    desc: 'Tác phẩm dựng hình 3Ds Max & SketchUp kết hợp Vray render chất lượng điện ảnh của học viên.',
    tag: 'Kiến Trúc Ngoại Thất 3D'
  },
  {
    id: 'p-10',
    filename: 'design.jpg',
    src: '/images/design.jpg',
    title: 'Bộ Nhận Diện Thương Hiệu & Thiết Kế Đồ Họa',
    category: 'project',
    categoryLabel: 'Dự Án Thực Tế',
    desc: 'Quy chuẩn hệ thống nhận diện, bao bì, ấn phẩm truyền thông đa kênh chuyên nghiệp.',
    tag: 'Branding & Design'
  },
  {
    id: 'p-11',
    filename: 'photoshop.jpg',
    src: '/images/photoshop.jpg',
    title: 'Kỹ Xảo Hiệu Ứng Ánh Sáng Photoshop',
    category: 'project',
    categoryLabel: 'Dự Án Thực Tế',
    desc: 'Tác phẩm nghệ thuật xử lý ánh sáng, hạt ánh kim và khói lửa nghệ thuật với Photoshop.',
    tag: 'Nghệ Thuật Kỹ Thuật Số'
  },
  {
    id: 'p-12',
    filename: 'giao-vien1.jpg',
    src: '/images/giao-vien1.jpg',
    title: 'Đội Ngũ Giảng Viên Giàu Kinh Nghiệm Thực Chiến',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Giảng viên kèm cặp tận tâm từng học viên, chỉ dẫn trực tiếp trên màn hình máy tính.',
    tag: 'Giảng Viên Kèm 1-1'
  },
  {
    id: 'p-13',
    filename: 'khoa-hoc-5.jpg',
    src: '/images/khoa-hoc-5.jpg',
    title: 'Phương Pháp Dạy Cầm Tay Chỉ Việc Tại Lớp',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Học viên được sửa bài trực tiếp tại chỗ, giải đáp mọi vướng mắc kỹ thuật ngay trong buổi học.',
    tag: 'Thực Hành Trực Tiếp'
  },
  {
    id: 'p-14',
    filename: 'lop-hoc-3.jpg',
    src: '/images/lop-hoc-3.jpg',
    title: 'Lớp Học Tại Trung Tâm Tin Học Thế Hệ Mới',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Không khí học tập thân thiện, giảng viên tận tình uốn nắn từng thao tác chuột và phím tắt.',
    tag: 'Lớp Học Thân Thiện'
  },
  {
    id: 'p-15',
    filename: 'lop-hoc-1.jpg',
    src: '/images/lop-hoc-1.jpg',
    title: 'Giờ Học Thực Hành Nhóm Học Viên Đồ Họa',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Học viên thảo luận đồ án, chia sẻ kinh nghiệm xử lý file in ấn và dựng hình thực tế.',
    tag: 'Đồ Án Nhóm'
  },
  {
    id: 'p-16',
    filename: 'lop-hoc-2.jpg',
    src: '/images/lop-hoc-2.jpg',
    title: 'Lớp Học Thiết Kế Nội Thất Thực Tế',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Học viên các độ tuổi say mê thực hành triển khai bản vẽ nội thất trên phần mềm chuyên ngành.',
    tag: 'Học Nội Thất'
  },
  {
    id: 'p-17',
    filename: '89358601_3102997763154329_5568130211104423936_n.jpg',
    src: '/images/89358601_3102997763154329_5568130211104423936_n.jpg',
    title: 'Buổi Học Thực Hành Ca Tối Tại Trung Tâm',
    category: 'classroom',
    categoryLabel: 'Lớp Học Thực Tế',
    desc: 'Lớp học ca tối linh hoạt cho các bạn đi làm và sinh viên tranh thủ học thêm kỹ năng.',
    tag: 'Lớp Học Ca Tối'
  },
  {
    id: 'p-18',
    filename: 'trung-tam.jpg',
    src: '/images/trung-tam.jpg',
    title: 'Trụ Sở Trung Tâm Đào Tạo Đồ Họa 2D, 3D',
    category: 'center',
    categoryLabel: 'Cơ Sở Vật Chất',
    desc: 'Địa chỉ đào tạo thực hành uy tín tại Quận 12, TP.HCM với biển hiệu đào tạo thiết kế 2D, 3D.',
    tag: 'Trụ Sở Quận 12'
  },
  {
    id: 'p-19',
    filename: 'trung-tam2.jpg',
    src: '/images/trung-tam2.jpg',
    title: 'Không Gian Phòng Máy Thực Hành Hiện Đại',
    category: 'center',
    categoryLabel: 'Cơ Sở Vật Chất',
    desc: 'Trang bị hệ thống máy tính màn hình lớn, cấu hình mạnh mẽ đáp ứng đồ họa và render 3D mượt mà.',
    tag: 'Phòng Máy Cấu Hình Cao'
  },
  {
    id: 'p-20',
    filename: 'trung-tam3.jpg',
    src: '/images/trung-tam3.jpg',
    title: 'Khai Giảng Khóa Học Thiết Kế Đồ Họa Mới',
    category: 'center',
    categoryLabel: 'Cơ Sở Vật Chất',
    desc: 'Lễ khai giảng và hướng dẫn định hướng nghề nghiệp thiết kế đồ họa thực chiến cho học viên mới.',
    tag: 'Khai Giảng Khóa Mới'
  }
];

export const RealPhotosGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'banner' | 'classroom' | 'project' | 'center'>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = selectedCategory === 'all' 
    ? REAL_PHOTOS 
    : REAL_PHOTOS.filter(p => p.category === selectedCategory);

  const currentIndex = activePhoto ? filteredPhotos.findIndex(p => p.id === activePhoto.id) : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredPhotos.length - 1) {
      setActivePhoto(filteredPhotos[currentIndex + 1]);
    } else {
      setActivePhoto(filteredPhotos[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePhoto(filteredPhotos[currentIndex - 1]);
    } else {
      setActivePhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden" id="thu-vien-anh">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Hình Ảnh Hoạt Động Thực Tế</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug">
            Thư Viện Ảnh Lớp Học & Tác Phẩm Đồ Họa Thực Chiến
          </h2>

          <p className="text-slate-400 text-sm md:text-base mt-3">
            Tất cả hình ảnh thực tế từ không gian lớp học, banner khóa học ưu đãi, đội ngũ giảng viên cho đến các tác phẩm 3D và đồ họa do chính học viên thực hiện.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Tất cả (20)
          </button>

          <button
            onClick={() => setSelectedCategory('banner')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              selectedCategory === 'banner'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Khóa Học & Poster (6)
          </button>

          <button
            onClick={() => setSelectedCategory('classroom')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              selectedCategory === 'classroom'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Lớp Học & Giảng Viên (6)
          </button>

          <button
            onClick={() => setSelectedCategory('project')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              selectedCategory === 'project'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Dự Án 3D & Sản Phẩm (5)
          </button>

          <button
            onClick={() => setSelectedCategory('center')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              selectedCategory === 'center'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Cơ Sở Vật Chất (3)
          </button>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/60 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <SafeImage
                  src={photo.src}
                  alt={photo.title}
                  badge={photo.tag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-black/60 backdrop-blur-md text-blue-300 border border-white/10">
                    {photo.tag}
                  </span>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                  <span className="text-white text-xs font-bold drop-shadow">Xem Ảnh Lớn</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-blue-400 mb-1">
                    {photo.categoryLabel}
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {photo.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{photo.filename}</span>
                  <span className="text-blue-400/80">Click để phóng to</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600 text-white">
                  {activePhoto.tag}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white truncate max-w-[280px] md:max-w-md">
                  {activePhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline-block font-mono">
                  {currentIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Area with Navigation Arrows */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] md:min-h-[500px] overflow-hidden">
              <SafeImage
                src={activePhoto.src}
                alt={activePhoto.title}
                badge={activePhoto.tag}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-slate-800/90 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm">
              <p className="text-slate-300">
                {activePhoto.desc}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0">
                <span className="font-mono bg-slate-900 px-2 py-1 rounded border border-slate-700">
                  {activePhoto.filename}
                </span>
                <span className="text-blue-400 font-semibold">Hotline: 0938.636.843</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
