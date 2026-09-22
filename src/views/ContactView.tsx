import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { LOCATIONS_DATA, SITE_INFO } from '../data/siteData';
import { useSEO } from '../hooks/useSEO';

interface ContactViewProps {
  onNavigate: (path: string) => void;
  onOpenRegisterModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onOpenRegisterModal
}) => {
  useSEO({
    title: 'Hệ Thống 13 Cơ Sở Đào Tạo & Thông Tin Liên Hệ | Đồ Họa Thực Chiến',
    description: 'Địa chỉ và hotline 13 cơ sở đào tạo Đồ Họa Thực Chiến tại TP.HCM, Bình Dương, Biên Hòa, Vũng Tàu, Hà Nội. Hỗ trợ tư vấn và xếp lớp nhanh chóng 24/7.',
    type: 'website',
    keywords: ['địa chỉ đồ họa thực chiến', 'liên hệ đồ họa thực chiến', 'cơ sở đồ họa thực chiến', 'hotline đồ họa thực chiến']
  });

  const [selectedBranch, setSelectedBranch] = useState(LOCATIONS_DATA[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

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
            Liên Hệ & Hệ Thống 13 Cơ Sở
          </span>
        </nav>

        {/* Header Hero */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-8 shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
            HỆ THỐNG PHÒNG ĐÀO TẠO TOÀN QUỐC
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
            Liên Hệ Đồ Họa Thực Chiến
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
            Học viên có thể đến trực tiếp bất kỳ cơ sở nào gần nhất để tham quan phòng học, nhận tài liệu miễn phí và đăng ký xếp lịch học ngay trong ngày.
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hotline Tư Vấn</h4>
            <a href={`tel:${SITE_INFO.hotline1.replace(/\./g, '')}`} className="text-base font-black text-red-600 hover:underline block mt-1">
              {SITE_INFO.hotline1}
            </a>
            <a href={`tel:${SITE_INFO.hotline2.replace(/\./g, '')}`} className="text-sm font-bold text-slate-700 hover:underline block mt-0.5">
              {SITE_INFO.hotline2}
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời Gian Làm Việc</h4>
            <div className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">
              {SITE_INFO.workingHours}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Thứ 2 đến Chủ Nhật hàng tuần</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hòm Thư Điện Tử</h4>
            <a href={`mailto:${SITE_INFO.email}`} className="text-xs font-bold text-blue-700 hover:underline block mt-1 truncate">
              {SITE_INFO.email}
            </a>
            <div className="text-[11px] text-slate-500 mt-0.5">Phản hồi thư trong 2 giờ</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trụ Sở Chính</h4>
            <div className="text-xs font-semibold text-slate-800 mt-1 leading-snug">
              21/8 Lê Trực, Phường 7, Q. Bình Thạnh, TP.HCM
            </div>
          </div>
        </div>

        {/* 13 Branch Locations interactive selector + Map preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Branch list */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Danh Sách 13 Cơ Sở Đào Tạo (Bấm để xem chi tiết)</span>
            </h3>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-2">
              {LOCATIONS_DATA.map((branch) => (
                <div
                  key={branch.num}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    selectedBranch.num === branch.num
                      ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedBranch.num === branch.num ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {branch.num}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {branch.address}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Hotline: {branch.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected branch detail & Quick send inquiry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full inline-block mb-2">
                Đang Chọn Cơ Sở Số {selectedBranch.num}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {selectedBranch.address}
              </h3>
              <p className="text-xs text-slate-600 mt-1 mb-4">
                Hotline xếp lớp: <strong className="text-blue-700">{selectedBranch.phone}</strong>
              </p>

              {/* Map mockup */}
              <div className="w-full h-48 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <MapPin className="w-10 h-10 text-red-600 animate-bounce mb-2" />
                <span className="text-xs font-bold text-slate-800">
                  {selectedBranch.address}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Mở cửa từ 8h00 - 21h00 mỗi ngày
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Đồ Họa Thực Chiến ' + selectedBranch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Mở Google Maps chỉ đường</span>
                </a>
              </div>
            </div>

            {/* Quick message form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-base font-black text-slate-900 mb-1">
                Gửi Yêu Cầu Hỗ Trợ Trực Tuyến
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Bộ phận học vụ sẽ liên hệ phản hồi trực tiếp qua số điện thoại hoặc Zalo của bạn.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center border border-emerald-200 space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Gửi tin nhắn thành công!</div>
                  <div className="text-xs text-emerald-700">Chúng tôi sẽ gọi lại cho bạn sớm nhất có thể.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại / Zalo *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email của bạn (không bắt buộc)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <textarea
                    rows={3}
                    placeholder="Nội dung cần tư vấn hoặc đăng ký lớp..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Tin Nhắn Cho Đồ Họa Thực Chiến</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
