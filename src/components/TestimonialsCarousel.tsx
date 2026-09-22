import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/siteData';

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section 
      className="py-16 text-white relative overflow-hidden sv-section sv-testimonials"
      style={{
        background: 'linear-gradient(280.16deg, #0053d3 22.03%, #0265ff 78.2%)'
      }}
      id="cam-nhan-hoc-vien"
      aria-labelledby="sv-testimonials-title"
    >
      {/* Background circles decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 sv-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sv-head">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 sv-eyebrow">
            CHIA SẺ HỌC VIÊN
          </span>
          <h2 id="sv-testimonials-title" className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Cảm Nhận Học Viên
          </h2>
          <p className="text-sm md:text-base text-blue-100 mt-2">
            Hàng nghìn học viên đã thay đổi sự nghiệp cùng Đồ Họa Thực Chiến. Đây là những chia sẻ thật từ các bạn.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group sv-carousel">
          <div className="overflow-hidden py-2 sv-car-viewport">
            <div 
              className="flex transition-transform duration-500 ease-in-out sv-car-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {TESTIMONIALS_DATA.map((item) => (
                <div 
                  key={item.id}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-3 flex-shrink-0 sv-car-item"
                >
                  <figure className="relative h-full bg-white text-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between tm-card transition-all duration-300 hover:-translate-y-1">
                    <div>
                      {/* Student info */}
                      <figcaption className="flex items-center gap-3.5 mb-4 tm-head">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0 tm-photo"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              item.name
                            )}&background=0265ff&color=fff&size=100`;
                          }}
                        />
                        <div className="overflow-hidden">
                          <span className="block font-bold text-slate-900 text-base leading-tight truncate tm-name">
                            {item.name}
                          </span>
                          <span className="block text-xs text-slate-500 mt-0.5 truncate tm-role">
                            {item.role}
                          </span>
                          <div className="flex items-center gap-1 mt-1 text-amber-400">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                      </figcaption>

                      {/* Quote */}
                      <p className="text-sm text-slate-700 leading-relaxed italic line-clamp-4 relative tm-quote">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Đánh giá đã xác thực</span>
                      <Quote className="w-4 h-4 text-blue-200" />
                    </div>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-blue-700 flex items-center justify-center shadow-lg transition z-10"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-blue-700 flex items-center justify-center shadow-lg transition z-10"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
