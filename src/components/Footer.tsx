import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  GraduationCap, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LOCATIONS_DATA, SITE_INFO } from '../data/siteData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t-4 border-blue-600 footer" id="footer">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Headquarters */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block">
                  ĐỒ HỌA THỰC CHIẾN
                </span>
                <span className="text-[11px] text-blue-400 font-semibold tracking-wider uppercase block">
                  Blog Dạy Tin Học Thực Hành
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống đào tạo Tin học thực hành chuyên nghiệp hàng đầu tại Việt Nam. Giảng dạy 1 kèm 1, cầm tay chỉ việc, học theo thời gian rảnh, cam kết làm được việc ngay sau khóa học.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{SITE_INFO.companyName}</strong><br />
                  Mã số thuế: <strong>{SITE_INFO.taxId}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>
                  Hotline tư vấn: <a href={`tel:${SITE_INFO.hotline1.replace(/\./g, '')}`} className="text-yellow-400 font-bold hover:underline">{SITE_INFO.hotline1}</a> - <a href={`tel:${SITE_INFO.hotline2.replace(/\./g, '')}`} className="text-yellow-400 font-bold hover:underline">{SITE_INFO.hotline2}</a>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="text-slate-300 hover:text-white">
                  {SITE_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400">Website: https://blogdaytinhoc.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Khóa Học Tiêu Biểu
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/danh-muc/tin-hoc-van-phong')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Tin học văn phòng cấp tốc cho người đi làm
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/tin-hoc-excel')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Khóa học Excel từ cơ bản đến nâng cao
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/autocad')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Khóa học vẽ AutoCAD 2D, 3D xây dựng & cơ khí
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/ke-toan')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Khóa học Kế toán thực hành tổng hợp trên hóa đơn thật
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/tu-hoc-photoshop')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Thiết kế đồ họa Photoshop & Illustrator chuyên nghiệp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/khoa-hoc-ai')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Khóa học ứng dụng AI và ChatGPT tự động hóa công việc
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/danh-muc/tin-hoc-quoc-te-mos')} className="hover:text-blue-400 transition flex items-center gap-1.5 text-left">
                  <span>›</span> Luyện thi chứng chỉ tin học quốc tế MOS & IC3
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Tài Liệu & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/giao-trinh')} className="hover:text-blue-400 transition">
                  Giáo trình tự học miễn phí
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/lich-khai-giang')} className="hover:text-blue-400 transition">
                  Lịch khai giảng các lớp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gioi-thieu')} className="hover:text-blue-400 transition">
                  Về Đồ Họa Thực Chiến
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/lien-he')} className="hover:text-blue-400 transition">
                  Liên hệ và bản đồ
                </button>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>Fanpage Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition flex items-center gap-1">
                  <span>Kênh bài giảng YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality Commitment */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Cam Kết Đào Tạo
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3.5 space-y-2 border border-slate-700 text-xs">
              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Phương Pháp Cầm Tay Chỉ Việc</span>
              </div>
              <p className="text-[11px] text-slate-300">
                1 kèm 1 trực tiếp trên máy tính. Không dạy lý thuyết suông, thực hành 100% trên các bài toán và chứng từ thực tế của doanh nghiệp.
              </p>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1 border-t border-slate-700">
                ✓ Học lại miễn phí nếu chưa thành thạo
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">
                ✓ Cấp chứng chỉ hoàn thành khóa học
              </div>
            </div>
          </div>
        </div>

        {/* 13 Branch Locations Grid */}
        <div className="py-8 border-b border-slate-800">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Hệ Thống 13 Cơ Sở Đào Tạo Đồ Họa Thực Chiến</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {LOCATIONS_DATA.map((loc) => (
              <div 
                key={loc.num} 
                className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800 hover:border-blue-500 transition group"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue-600/80 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500">
                    {loc.num}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-200 block group-hover:text-blue-300 transition">
                      {loc.address}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Hotline: {loc.phone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Đồ Họa Thực Chiến. Bản quyền thuộc về {SITE_INFO.companyName}.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onNavigate('/gioi-thieu')} className="hover:text-slate-300 transition">Chính sách đào tạo</button>
            <span>•</span>
            <button onClick={() => onNavigate('/lien-he')} className="hover:text-slate-300 transition">Bảo mật thông tin</button>
            <span>•</span>
            <button onClick={() => onNavigate('/lich-khai-giang')} className="hover:text-slate-300 transition">Đăng ký xếp lớp</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
