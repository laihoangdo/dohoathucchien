import React, { useState, useMemo } from 'react';
import { Search, Users, Clock, Award, ArrowUpRight } from 'lucide-react';
import { COURSE_TABS, COURSES_DATA } from '../data/siteData';
import { Course } from '../types';

interface CourseTabsProps {
  onNavigate: (path: string) => void;
  onOpenRegisterModal: () => void;
}

export const CourseTabs: React.FC<CourseTabsProps> = ({ onNavigate, onOpenRegisterModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchTab = activeTab === 'all' || course.tab === activeTab;
      const matchSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.desc && course.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200" id="main">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-2">
            HỆ THỐNG KHÓA HỌC THỰC CHIẾN
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Chương Trình Đào Tạo Tại Đồ Họa Thực Chiến
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            Đào tạo từ căn bản cho người mới bắt đầu đến nâng cao chuyên sâu. Cầm tay chỉ việc 1 kèm 1 theo thời gian biểu của học viên.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 tab">
          {COURSE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 shadow-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/25 scale-105 active'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Course Search Box */}
        <div className="max-w-md mx-auto mb-8 relative search-box">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học theo tên hoặc phần mềm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-sm rounded-full pl-11 pr-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm search-input transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-center text-xs text-slate-500 mt-2">
              Tìm thấy <strong className="text-blue-600">{filteredCourses.length}</strong> khóa học phù hợp với từ khóa "{searchQuery}"
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 container-course">
          {filteredCourses.map((course: Course) => (
            <article
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative card"
            >
              {/* Image banner */}
              <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-blue-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {course.categoryName}
                </div>
                {course.featured && (
                  <div className="absolute top-2.5 right-2.5 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <Award className="w-3 h-3" />
                    Hot
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-4 flex-1 flex flex-col justify-between card-content">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-base leading-snug line-clamp-2 transition mb-1.5">
                    {course.title}
                  </h3>
                  {course.desc && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {course.desc}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                    {course.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        {course.duration}
                      </span>
                    )}
                    {course.studentsCount && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-500" />
                        {course.studentsCount.toLocaleString()} học viên
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-normal">Học phí:</span>
                      <span className="text-sm font-black text-red-600">{course.price || 'Liên hệ'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onNavigate(course.href)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                        title="Xem chi tiết khóa học"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={onOpenRegisterModal}
                        className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-base text-slate-600 font-semibold">
              Không tìm thấy khóa học nào phù hợp với danh mục hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Xem tất cả khóa học
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
