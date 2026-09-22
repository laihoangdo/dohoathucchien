import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Filter
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { LOCATIONS_DATA } from '../data/siteData';
import { useSEO } from '../hooks/useSEO';

interface ScheduleViewProps {
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

const SCHEDULE_ITEMS = [
  {
    id: 1,
    course: 'Tin Học Văn Phòng Cấp Tốc (Word, Excel, PowerPoint)',
    subject: 'van-phong',
    city: 'hcm',
    startDate: 'Khai giảng liên tục hàng ngày',
    schedule: 'Sáng 8h-11h | Chiều 14h-17h | Tối 18h-21h',
    format: 'Trực tiếp 1 kèm 1',
    originalPrice: '1.800.000đ',
    discountPrice: '1.450.000đ',
    seats: 'Còn 3 chỗ'
  },
  {
    id: 2,
    course: 'Excel Chuyên Sâu & Phân Tích Báo Cáo Tài Chính',
    subject: 'van-phong',
    city: 'hcm',
    startDate: 'Thứ 2, 4, 6 hoặc Thứ 3, 5, 7',
    schedule: 'Ca tối: 18h30 - 20h30',
    format: 'Trực tiếp 1 kèm 1',
    originalPrice: '2.000.000đ',
    discountPrice: '1.600.000đ',
    seats: 'Còn 2 chỗ'
  },
  {
    id: 3,
    course: 'Vẽ Kỹ Thuật AutoCAD 2D, 3D Cơ Khí & Xây Dựng',
    subject: 'cad',
    city: 'binhduong',
    startDate: 'Khai giảng hàng tuần',
    schedule: 'Tối 18h00 - 21h00 hoặc Thứ 7 & CN',
    format: 'Thực hành dự án thực tế',
    originalPrice: '2.500.000đ',
    discountPrice: '1.950.000đ',
    seats: 'Còn 4 chỗ'
  },
  {
    id: 4,
    course: 'Kế Toán Thực Hành Tổng Hợp Trên Chứng Từ Thật',
    subject: 'ketoan',
    city: 'dongnai',
    startDate: 'Khai giảng Thứ 2 hàng tuần',
    schedule: 'Sáng hoặc Tối linh hoạt',
    format: 'Kèm trực tiếp chứng từ doanh nghiệp',
    originalPrice: '3.000.000đ',
    discountPrice: '2.400.000đ',
    seats: 'Còn 2 chỗ'
  },
  {
    id: 5,
    course: 'Ứng Dụng AI & ChatGPT Dành Cho Dân Văn Phòng',
    subject: 'ai',
    city: 'online',
    startDate: 'Khóa mới Thứ 4 hàng tuần',
    schedule: 'Tối 19h30 - 21h30 (Online tương tác)',
    format: 'Online kèm trực tiếp qua Google Meet',
    originalPrice: '1.500.000đ',
    discountPrice: '1.190.000đ',
    seats: 'Còn 5 chỗ'
  },
  {
    id: 6,
    course: 'Thiết Kế Đồ Họa Photoshop & Illustrator Cơ Bản Đến Nâng Cao',
    subject: 'dohoa',
    city: 'hanoi',
    startDate: 'Khai giảng hàng tuần',
    schedule: 'Tối 18h30 - 20h30',
    format: 'Thực hành 100% trên máy',
    originalPrice: '2.800.000đ',
    discountPrice: '2.200.000đ',
    seats: 'Còn 3 chỗ'
  },
  {
    id: 7,
    course: 'Luyện Thi Chứng Chỉ Quốc Tế MOS (Word, Excel, PowerPoint)',
    subject: 'van-phong',
    city: 'hcm',
    startDate: 'Khai giảng hàng tuần',
    schedule: 'Linh hoạt theo giờ rảnh học viên',
    format: 'Luyện bộ đề thi thật cam kết đỗ',
    originalPrice: '2.200.000đ',
    discountPrice: '1.750.000đ',
    seats: 'Còn 4 chỗ'
  }
];

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useSEO({
    title: 'Lịch Khai Giảng Các Khóa Học Mới Nhất 2026 | Đồ Họa Thực Chiến',
    description: 'Tra cứu lịch khai giảng các lớp thiết kế đồ họa, Photoshop, Illustrator, AutoCAD 2D/3D, SolidWorks, tin học văn phòng tại TP.HCM, Bình Dương, Đồng Nai, Hà Nội.',
    type: 'website',
    keywords: ['lịch khai giảng đồ họa', 'khóa học đồ họa mới nhất', 'lớp học cấp tốc', 'đồ họa thực chiến']
  });

  const filteredSchedule = SCHEDULE_ITEMS.filter((item) => {
    const matchCity = selectedCity === 'all' || item.city === selectedCity;
    const matchSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    return matchCity && matchSubject;
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
          <span className="text-slate-800 font-semibold">
            Lịch Khai Giảng Các Khóa Học Mới Nhất
          </span>
        </nav>

        {/* Header Hero */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-blue-700 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-yellow-400 text-slate-900 px-3 py-1 rounded-full mb-3 shadow">
              ƯU ĐÃI GIẢM 20% HỌC PHÍ KHI ĐĂNG KÝ TRƯỚC NGÀY KHAI GIẢNG
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Lịch Khai Giảng Các Khóa Học 2026
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-2 leading-relaxed">
              Các lớp học được khai giảng liên tục hàng ngày và hàng tuần tại tất cả 13 cơ sở TP.HCM, Bình Dương, Đồng Nai, Hà Nội hoặc hình thức Online 1 Kèm 1. Học viên đăng ký là có thể học ngay không phải chờ đợi ghép lớp.
            </p>
          </div>
        </div>

        {/* Highlights banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Không Cần Chờ Ghép Lớp</div>
              <div className="text-[11px] text-slate-500">Đăng ký là được xếp giáo viên học ngay</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Bảo Lưu & Học Bù Miễn Phí</div>
              <div className="text-[11px] text-slate-500">Khi bận công tác hoặc lịch thi đột xuất</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Cam Kết Chuẩn Đầu Ra</div>
              <div className="text-[11px] text-slate-500">Học lại hoàn toàn miễn phí nếu chưa thạo</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Lọc Lịch Khai Giảng</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Theo khu vực đào tạo:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'hcm', label: 'TP. Hồ Chí Minh' },
                  { id: 'binhduong', label: 'Bình Dương' },
                  { id: 'dongnai', label: 'Đồng Nai' },
                  { id: 'hanoi', label: 'Hà Nội' },
                  { id: 'online', label: 'Online Trực Tuyến' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCity(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedCity === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Theo nhóm môn học:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tất cả môn' },
                  { id: 'van-phong', label: 'Tin Học Văn Phòng' },
                  { id: 'cad', label: 'AutoCAD / Kỹ Thuật' },
                  { id: 'ketoan', label: 'Kế Toán' },
                  { id: 'dohoa', label: 'Đồ Họa' },
                  { id: 'ai', label: 'Khóa Học AI' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSubject(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedSubject === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h2 className="font-extrabold text-slate-800 text-base">
                Danh Sách Các Lớp Sắp Khai Giảng ({filteredSchedule.length})
              </h2>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ● Đang nhận hồ sơ
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredSchedule.map((item) => (
                <div key={item.id} className="p-5 hover:bg-blue-50/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                        {item.format}
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                        {item.seats}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {item.course}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-blue-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.startDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.schedule}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through block">{item.originalPrice}</span>
                      <span className="text-base font-black text-red-600">{item.discountPrice}</span>
                    </div>

                    <button
                      onClick={onOpenRegisterModal}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl shadow transition"
                    >
                      Đăng Ký Học
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
