import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Award } from 'lucide-react';
import { TEACHERS_DATA } from '../data/siteData';
import { SafeImage } from './SafeImage';

export const TeachersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEACHERS_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEACHERS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TEACHERS_DATA.length);
  };

  return (
    <section 
      className="py-14 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 sv-section sv-teachers"
      id="doi-ngu-giao-vien"
      aria-labelledby="sv-teachers-title"
    >
      <div className="max-w-7xl mx-auto px-4 sv-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sv-head">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-2 sv-eyebrow">
            GIẢNG VIÊN TÂM HUYẾT
          </span>
          <h2 id="sv-teachers-title" className="text-2xl md:text-3xl font-black text-[#B30000] tracking-tight">
            Danh Sách Giáo Viên
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            Đội ngũ giáo viên giỏi chuyên môn, giàu kinh nghiệm thực tế tại doanh nghiệp và luôn tận tâm với từng học viên.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group sv-carousel">
          <div className="overflow-hidden py-2 sv-car-viewport">
            <div 
              className="flex transition-transform duration-500 ease-in-out sv-car-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {/* Show items in responsive chunks: On desktop we show 4 per view, tablet 2, mobile 1 */}
              {TEACHERS_DATA.map((teacher) => (
                <div 
                  key={teacher.id} 
                  className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3 flex-shrink-0 sv-car-item"
                >
                  <article className="h-full bg-white rounded-2xl border border-slate-200/80 p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between teacher-card">
                    <div>
                      {/* Photo with avatar circle */}
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <SafeImage
                          src={teacher.photo}
                          alt={teacher.name}
                          badge={teacher.role}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto teacher-photo"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow" title="Giảng viên thực chiến">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {teacher.name}
                      </h3>

                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3 teacher-role">
                        {teacher.role}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 bio">
                        {teacher.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full teacher-exp">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {teacher.exp}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition z-10"
            aria-label="Previous Teacher"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition z-10"
            aria-label="Next Teacher"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {TEACHERS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Teacher slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
