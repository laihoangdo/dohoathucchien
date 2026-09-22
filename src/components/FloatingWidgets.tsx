import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, X, CheckCircle, MessageSquare, Send } from 'lucide-react';
import { SITE_INFO, COURSES_DATA, LOCATIONS_DATA } from '../data/siteData';

interface FloatingWidgetsProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ isModalOpen, onCloseModal }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('Tin học văn phòng cấp tốc cho người đi làm');
  const [branch, setBranch] = useState('Bình Thạnh - Nguyễn Xí, TP.HCM');
  const [shift, setShift] = useState('Ca tối (18h00 - 21h00)');
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setPhone('');
      setNote('');
      onCloseModal();
    }, 3500);
  };

  return (
    <>
      {/* Floating Buttons: Bottom Left & Bottom Right */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3">
        {/* Animated Phone Ring Widget */}
        <div className="relative group flex items-center">
          <a
            href={`tel:${SITE_INFO.hotline1.replace(/\./g, '')}`}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 transition"
            title="Gọi ngay hotline tư vấn 24/7"
          >
            {/* Pulsing rings */}
            <span className="absolute w-20 h-20 rounded-full border-2 border-red-500/60 phonering-alo-ph-circle pointer-events-none" />
            <span className="absolute w-16 h-16 rounded-full bg-red-500/30 phonering-alo-ph-circle-fill pointer-events-none" />
            <Phone className="w-6 h-6 phonering-alo-ph-img-circle" />
          </a>

          {/* Tooltip on desktop */}
          <div className="hidden md:group-hover:flex absolute left-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg items-center gap-1.5">
            <span>Gọi ngay: {SITE_INFO.hotline1}</span>
          </div>
        </div>

        {/* Zalo Floating Button */}
        <div className="relative group flex items-center">
          <a
            href={SITE_INFO.zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition group-hover:scale-105"
            title="Chat tư vấn qua Zalo"
          >
            <MessageSquare className="w-6 h-6" />
          </a>

          <div className="hidden md:group-hover:flex absolute left-14 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg items-center gap-1.5">
            <span>Chat Zalo tư vấn 24/7</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button: Bottom Right */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-slate-800/90 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Về đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Registration Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 text-white p-6 relative">
              <button
                onClick={onCloseModal}
                className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-yellow-400 text-slate-900 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                Đăng ký nhận ưu đãi 20% học phí
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">
                Tư Vấn & Đăng Ký Khóa Học
              </h3>
              <p className="text-xs text-blue-100 mt-1">
                Giảng viên Trung Tâm Đồ Họa Thực Chiến sẽ liên hệ tư vấn lộ trình và xếp lịch học phù hợp nhất!
              </p>
            </div>

            {/* Content / Form */}
            <div className="p-6">
              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Đăng Ký Thành Công!</h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Cảm ơn bạn đã gửi thông tin. Giảng viên của Trung tâm sẽ liên hệ với bạn trong vòng 15 phút.
                  </p>
                  <div className="pt-2 text-xs font-semibold text-blue-600">
                    Hotline hỗ trợ gấp: {SITE_INFO.hotline1}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Họ và tên của bạn <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Số điện thoại / Zalo <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0938 636 843"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Khóa học quan tâm
                      </label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {COURSES_DATA.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Cơ sở học gần nhất
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Học Online 1 kèm 1">Lớp Học Trực Tuyến Online 1 Kèm 1</option>
                        {LOCATIONS_DATA.map((loc) => (
                          <option key={loc.num} value={loc.address}>
                            Cơ sở {loc.num}: {loc.address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Ca học mong muốn
                    </label>
                    <select
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Ca sáng (08h00 - 11h00)">Ca sáng (08h00 - 11h00)</option>
                      <option value="Ca chiều (14h00 - 17h00)">Ca chiều (14h00 - 17h00)</option>
                      <option value="Ca tối (18h00 - 21h00)">Ca tối (18h00 - 21h00)</option>
                      <option value="Thứ 7 & Chủ Nhật">Lớp Thứ 7 & Chủ Nhật</option>
                      <option value="Linh hoạt giờ rảnh">Linh hoạt theo giờ rảnh học viên</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Ghi chú thêm (không bắt buộc)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mục tiêu công việc, yêu cầu học cấp tốc..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Xác Nhận Đăng Ký Tư Vấn</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
