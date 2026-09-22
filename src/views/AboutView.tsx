import React from 'react';
import { 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Laptop
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { SITE_INFO, TEACHERS_DATA } from '../data/siteData';
import { useSEO } from '../hooks/useSEO';

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onSearch: (q: string) => void;
  onOpenRegisterModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onSearch,
  onOpenRegisterModal
}) => {
  useSEO({
    title: 'Giới Thiệu Về Trung Tâm Đồ Họa Thực Chiến | 10 Năm Phát Triển',
    description: 'Hơn 10 năm kinh nghiệm đào tạo thực hành cầm tay chỉ việc, xóa bỏ rào cản công nghệ cho người đi làm và sinh viên với hơn 50.000 học viên tại TP.HCM, Bình Dương, Đồng Nai, Hà Nội.',
    type: 'website',
    keywords: ['giới thiệu đồ họa thực chiến', 'trung tâm đào tạo đồ họa thực chiến', 'đồ họa thực chiến uy tín']
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
            Giới Thiệu Về Trung Tâm Đồ Họa Thực Chiến
          </span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-8 shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
            HƠN 10 NĂM HÌNH THÀNH & PHÁT TRIỂN
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            Trung Tâm Đào Tạo Đồ Họa Thực Chiến
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-3xl leading-relaxed">
            Hệ thống đào tạo thực chiến hàng đầu với 13 cơ sở tại TP.HCM, Bình Dương, Đồng Nai, Vũng Tàu, Hà Nội và hệ thống học trực tuyến 1 kèm 1 toàn quốc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm space-y-8">
            {/* Story */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
                1. Sứ Mệnh & Tầm Nhìn
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Được thành lập với sứ mệnh xóa bỏ rào cản công nghệ cho người đi làm và thế hệ trẻ, <strong>Trung Tâm Đồ Họa Thực Chiến</strong> ({SITE_INFO.companyName} - MST: {SITE_INFO.taxId}) mang đến phương pháp đào tạo hiện đại: <em>“Học thực hành - Làm được ngay”</em>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chúng tôi không dạy theo cách lý thuyết hàn lâm cũ kỹ. Mỗi bài giảng là một tình huống thực tế tại các phòng ban kế toán, nhân sự, hành chính, kỹ sư xây dựng, thiết kế và quản lý doanh nghiệp.
              </p>
            </div>

            {/* Legal credentials */}
            <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-100 space-y-3">
              <h3 className="font-bold text-sm text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Thông Tin Pháp Lý Doanh Nghiệp</span>
              </h3>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li>• <strong>Tên đơn vị:</strong> {SITE_INFO.companyName}</li>
                <li>• <strong>Mã số doanh nghiệp (MST):</strong> {SITE_INFO.taxId} cấp bởi Sở Kế hoạch và Đầu tư</li>
                <li>• <strong>Giấy phép hoạt động:</strong> Đào tạo thiết kế đồ họa, kỹ thuật, vi tính văn phòng và chuyển giao công nghệ</li>
                <li>• <strong>Hotline hỗ trợ:</strong> {SITE_INFO.hotline1} - {SITE_INFO.hotline2}</li>
                <li>• <strong>Email ban giám đốc:</strong> {SITE_INFO.email}</li>
              </ul>
            </div>

            {/* 4 Pillars of Excellence */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
                2. Điểm Khác Biệt Tại Đồ Họa Thực Chiến
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold mb-3">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Kèm 1-1 Cá Nhân Hóa</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Giảng viên theo sát từng thao tác click chuột, phát hiện ngay lỗ hổng kiến thức và sửa lỗi trực tiếp.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold mb-3">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Thời Gian Hoàn Toàn Tự Do</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Không cố định giờ học ép buộc. Học viên rảnh lúc nào đến học lúc đó trong các khung giờ sáng, chiều, tối.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold mb-3">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Giáo Trình Bản Quyền</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tài liệu biên soạn độc quyền cập nhật theo chuẩn Office 365, AutoCAD 2026 và các công cụ AI tạo sinh mới nhất.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold mb-3">
                    04
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Bảo Hành Vĩnh Viễn</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Học viên được quyền học lại hoàn toàn miễn phí bất kỳ khi nào quên bài hoặc cần nâng cao thêm kiến thức.
                  </p>
                </div>
              </div>
            </div>

            {/* Classrooms */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-200">
                3. Cơ Sở Vật Chất & Môi Trường Học Tập
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tất cả các cơ sở đào tạo của Đồ Họa Thực Chiến đều được trang bị hệ thống máy vi tính cấu hình cao màn hình 24-27 inch full HD, phòng học máy lạnh mát mẻ, bàn ghế thiết kế tiêu chuẩn chống mỏi lưng, wifi tốc độ cao và chỗ giữ xe an ninh miễn phí.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img
                  src="https://blogdaytinhoc.com/images/2024/8/1722958738_trung-tam-tin-hoc-sao-viet_big.jpg"
                  alt="Phòng học Đồ Họa Thực Chiến"
                  className="rounded-2xl w-full h-48 object-cover shadow"
                />
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
                  alt="Không gian đào tạo 1 kèm 1"
                  className="rounded-2xl w-full h-48 object-cover shadow"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="bg-red-700 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold">Bạn Đã Sẵn Sàng Nâng Tầm Kỹ Năng?</h4>
                <p className="text-xs text-red-100 mt-1">Đăng ký ngay hôm nay để nhận ưu đãi 20% học phí và tài liệu miễn phí!</p>
              </div>
              <button
                onClick={onOpenRegisterModal}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition shadow flex-shrink-0"
              >
                Đăng Ký Tư Vấn
              </button>
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
