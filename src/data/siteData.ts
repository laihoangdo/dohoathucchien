import { Course, Teacher, Testimonial, LocationInfo, Article, ScheduleItem } from '../types';

export const SITE_INFO = {
  brandName: 'Đồ Họa Thực Chiến',
  siteTitle: 'Đồ Họa Thực Chiến - Đào Tạo Thiết Kế & Đồ Họa Thực Hành Chất Lượng Cao',
  companyName: 'TRUNG TÂM ĐÀO TẠO THIẾT KẾ ĐỒ HỌA THỰC CHIẾN',
  taxId: '3603708616',
  taxCode: '3603708616',
  hotline1: '0938.636.843',
  hotline2: '0337.590.737',
  email: 'dohoathehemoi@gmail.com',
  workingHours: '8h00 - 21h30 (Thứ 2 - Chủ Nhật)',
  website: 'https://dohoathehemoi.com',
  zaloUrl: 'https://zalo.me/0938636843',
  zalo: 'https://zalo.me/0938636843',
  facebookUrl: 'https://www.facebook.com/dohoathehemoi/',
  youtubeUrl: 'https://www.youtube.com/@dohoathucchien',
  slogan: 'Đào tạo đồ họa thực hành - Cầm tay chỉ việc - Học là làm được việc ngay',
  intro: 'Trung tâm Đồ Họa Thực Chiến là đơn vị đào tạo thiết kế đồ họa 2D, 3D, kiến trúc nội thất và tin học văn phòng thực chiến hàng đầu tại TP.HCM. Với phương châm đào tạo thực hành cầm tay chỉ việc 1 kèm 1, học viên được trực tiếp xử lý các dự án thực tế và tự tin đi làm ngay sau khóa học.'
};

export const COURSE_TABS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'tab1', name: 'Tin học văn phòng' },
  { id: 'tab2', name: 'Thiết kế Vẽ kỹ thuật' },
  { id: 'tab3', name: 'Thiết kế đồ họa' },
  { id: 'tab4', name: 'Tin học trẻ em' },
  { id: 'tab5', name: 'Tin học Quốc tế' },
  { id: 'tab6', name: 'Kế toán' },
  { id: 'tab7', name: 'Hành chính nhân sự' },
  { id: 'tab8', name: 'Khóa Học AI' }
];

export const COURSES_DATA: Course[] = [
  // Tab 1: Tin học văn phòng
  {
    id: 'c-thvp-ud',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Khóa Học Tin Học Văn Phòng Cho Người Đi Làm',
    desc: 'Chưa biết gì vẫn học được, học nhanh cấp tốc, thời gian linh động sáng - chiều - tối.',
    img: '/images/lop-hoc-4.jpg',
    href: '/danh-muc/tin-hoc-van-phong',
    price: '1.200.000đ',
    duration: '1.5 tháng (18 buổi)',
    studentsCount: 3840,
    featured: true
  },
  {
    id: 'c-thvp-online',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Tin Học Văn Phòng Trực Tuyến',
    desc: 'Học 1 kèm 1 qua Zoom/Google Meet linh hoạt thời gian theo học viên.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/tin-hoc-van-phong-ung-dung-truc-tuyen.jpg',
    href: '/danh-muc/tin-hoc-van-phong',
    price: '1.400.000đ',
    duration: '15 buổi linh hoạt',
    studentsCount: 1920
  },
  {
    id: 'c-thvp-th',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Thực Hành Tin Học Văn Phòng',
    desc: 'Luyện đề thực tế doanh nghiệp, xử lý biểu mẫu, hợp đồng văn phòng.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/thuc-hanh-tin-hoc-van-phong.jpg',
    href: '/danh-muc/tin-hoc-van-phong',
    price: '1.100.000đ',
    duration: '12 buổi',
    studentsCount: 2210
  },
  {
    id: 'c-excel-bt',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Làm Việc Với Bảng Tính Trong Excel',
    desc: 'Làm chủ hơn 50 hàm logic, hàm tìm kiếm, xử lý chuỗi và định dạng dữ liệu.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/lam-viec-voi-bang-tinh-trong-excel.jpg',
    href: '/danh-muc/tin-hoc-excel',
    price: '950.000đ',
    duration: '10 buổi',
    studentsCount: 4120,
    featured: true
  },
  {
    id: 'c-kn-mt',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Kỹ Năng Sử Dụng Máy Tính Cơ Bản',
    desc: 'Học gõ 10 ngón, Unikey, quản lý tệp tin, Internet an toàn, cài phần mềm.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ky-nang-su-dung-may-tinh.jpg',
    href: '/danh-muc/kien-thuc-may-tinh-co-ban',
    price: '800.000đ',
    duration: '8 buổi',
    studentsCount: 1560
  },
  {
    id: 'c-excel-ptdl',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Xử Lý Và Phân Tích Dữ Liệu Trong Excel',
    desc: 'PivotTable, Power Query, biểu đồ động Dashboard, tự động hóa với Macro/VBA.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/xu-ly-va-phan-tich-du-lieu-trong-excel.jpg',
    href: '/danh-muc/tin-hoc-excel',
    price: '1.600.000đ',
    duration: '12 buổi',
    studentsCount: 2890,
    featured: true
  },
  {
    id: 'c-word-hc',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Soạn Thảo Văn Bản Hành Chính Trong Word',
    desc: 'Đúng chuẩn Nghị định 30/2020/NĐ-CP, mục lục tự động, trộn thư Mail Merge.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/soan-thao-van-ban-hanh-chinh-trong-word.jpg',
    href: '/danh-muc/tin-hoc-word',
    price: '850.000đ',
    duration: '8 buổi',
    studentsCount: 3100
  },
  {
    id: 'c-ppt-tc',
    tab: 'tab1',
    categoryName: 'Tin học văn phòng',
    title: 'Trình Chiếu Chuyên Nghiệp Với PowerPoint',
    desc: 'Thiết kế slide báo cáo, thuyết trình hiện đại, hiệu ứng Morph và Infographic.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/trinh-chieu-trong-powerpoint.jpg',
    href: '/danh-muc/tin-hoc-powerpoint',
    price: '900.000đ',
    duration: '8 buổi',
    studentsCount: 1780
  },

  // Tab 2: Vẽ Kỹ Thuật
  {
    id: 'c-cad-2d3d',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Vẽ AutoCAD 2D & 3D Cơ Bản Đến Nâng Cao',
    desc: 'Triển khai bản vẽ kiến trúc, kết cấu, điện nước, cơ khí tiêu chuẩn.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ve-autocad.jpg',
    href: '/danh-muc/autocad',
    price: '1.800.000đ',
    duration: '16 buổi',
    studentsCount: 3410,
    featured: true
  },
  {
    id: 'c-cad-ck',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Vẽ Thiết Kế Cơ Khí Chế Tạo Máy',
    desc: 'Thiết kế chi tiết máy, dung sai lắp ghép, bản vẽ chế tạo cơ khí.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ve-thiet-ke-co-khi.jpg',
    href: '/danh-muc/autocad',
    price: '2.200.000đ',
    duration: '18 buổi',
    studentsCount: 1450
  },
  {
    id: 'c-sketchup',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Dựng Hình 3D Với SketchUp & Vray',
    desc: 'Dựng phối cảnh kiến trúc, nội thất 3D, phối vật liệu và xuất ảnh thực tế.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ve-sketchup.jpg',
    href: '/danh-muc/sketchup',
    price: '2.400.000đ',
    duration: '18 buổi',
    studentsCount: 1820
  },
  {
    id: 'c-solidworks',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Thiết Kế Cơ Khí 3D Bằng SolidWorks',
    desc: 'Mô hình hóa Part, Assembly, Sheet Metal, mô phỏng chuyển động và xuất bản vẽ 2D.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ve-thiet-ke-noi-that-xay-dung.jpg',
    href: '/danh-muc/solidworks',
    price: '2.600.000đ',
    duration: '20 buổi',
    studentsCount: 1670,
    featured: true
  },
  {
    id: 'c-cnc',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Lập Trình Gia Công Tiện Phay CNC',
    desc: 'Lập trình G-code, Mastercam mô phỏng đường chạy dao gia công cơ khí chính xác.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/lap-trinh-cnc.jpg',
    href: '/danh-muc/autocad',
    price: '3.200.000đ',
    duration: '24 buổi',
    studentsCount: 920
  },
  {
    id: 'c-noi-that-thuc-chien',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Khóa Học Thiết Kế Nội Thất Thực Chiến',
    desc: 'AutoCAD, SketchUp - Vray, 3Ds Max - Vray, Xuất File ABF, hậu kỳ Photoshop, bóc tách hồ sơ chi tiết.',
    img: '/images/khoa-hoc-7.jpg',
    href: '/danh-muc/sketchup',
    price: '3.500.000đ',
    duration: '2.5 tháng',
    studentsCount: 2150,
    featured: true
  },
  {
    id: 'c-showroom-3d',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Thiết Kế 3D Showroom & Công Trình Thực Tế',
    desc: 'Dựng phối cảnh 3D showroom bán lẻ (như Mắt Kính BV Sài Gòn), xuất bản vẽ thi công hoàn chỉnh.',
    img: '/images/khoa-hoc-6.jpg',
    href: '/danh-muc/sketchup',
    price: '2.800.000đ',
    duration: '20 buổi',
    studentsCount: 1420
  },
  {
    id: 'c-biet-thu-3d',
    tab: 'tab2',
    categoryName: 'Thiết kế Vẽ kỹ thuật',
    title: 'Dựng Phối Cảnh Biệt Thự 3D Nghỉ Dưỡng & Hồ Bơi',
    desc: 'Dựng hình 3Ds Max & SketchUp kết hợp Vray render chất lượng điện ảnh, ánh sáng ngoại thất chân thực.',
    img: '/images/3d.jpg',
    href: '/danh-muc/sketchup',
    price: '3.200.000đ',
    duration: '24 buổi',
    studentsCount: 1680,
    featured: true
  },

  // Tab 3: Thiết Kế Đồ Họa
  {
    id: 'c-pts-chien',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Khóa Học Photoshop [ Thực Hành Thực Chiến ]',
    desc: 'Học phí khuyến mãi chỉ từ 1.000.000đ. Cầm tay chỉ việc 1 kèm 1, tặng trọn bộ tài nguyên thiết kế.',
    img: '/images/khoa-hoc.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.000.000đ',
    duration: '14 buổi',
    studentsCount: 4250,
    featured: true
  },
  {
    id: 'c-pts-chuyen-gia',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Khóa Học Photoshop - Biến Bạn Thành Chuyên Gia Thiết Kế',
    desc: 'Cắt ghép chuyên sâu, blend màu sắc, chỉnh sửa ảnh cưới, ảnh sản phẩm bán hàng TMĐT chuyên nghiệp.',
    img: '/images/khoa-hoc-1.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.200.000đ',
    duration: '14 buổi',
    studentsCount: 3120
  },
  {
    id: 'c-ai-in-an',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Khóa Học Illustrator (Ai) Chuyên In Ấn - Học Là Làm Được',
    desc: 'Cầm tay chỉ việc! Thiết kế namecard, hộp giấy, nhãn mác, bao bì, tờ rơi, catalogue chuẩn hệ màu CMYK.',
    img: '/images/khoa-hoc-3.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.400.000đ',
    duration: '14 buổi',
    studentsCount: 3480,
    featured: true
  },
  {
    id: 'c-designer-0',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Trở Thành Designer Chuyên Nghiệp Từ Số 0',
    desc: 'Lộ trình bài bản thiết kế Banner, Poster, Menu, Backdrop, Standee, ứng dụng AI tăng tốc thiết kế.',
    img: '/images/khoa-hoc-4.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.800.000đ',
    duration: '1.5 tháng',
    studentsCount: 2890,
    featured: true
  },
  {
    id: 'c-bang-hieu',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Thiết Kế Bảng Hiệu Quảng Cáo, In Ấn 2D, 3D',
    desc: 'Thực chiến thiết kế biển hiệu quảng cáo, alu, mica chữ nổi, hộp đèn như Nha Khoa Sài Gòn Smile.',
    img: '/images/khoa-hoc-2.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '2.000.000đ',
    duration: '16 buổi',
    studentsCount: 1950
  },
  {
    id: 'c-branding-design',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Thiết Kế Bộ Nhận Diện Thương Hiệu Chuyên Nghiệp',
    desc: 'Quy chuẩn logo, hệ thống nhận diện văn phòng, bao bì ấn phẩm truyền thông đa kênh.',
    img: '/images/design.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.600.000đ',
    duration: '12 buổi',
    studentsCount: 2130
  },
  {
    id: 'c-pts-ky-xao',
    tab: 'tab3',
    categoryName: 'Thiết kế đồ họa',
    title: 'Kỹ Xảo Hiệu Ứng Ánh Sáng & Nghệ Thuật Photoshop Master',
    desc: 'Thực hành xử lý ánh sáng nghệ thuật, kỹ xảo hạt ánh kim, khói lửa và poster phim chuyên nghiệp.',
    img: '/images/photoshop.jpg',
    href: '/danh-muc/tu-hoc-photoshop',
    price: '1.500.000đ',
    duration: '12 buổi',
    studentsCount: 1780
  },

  // Tab 4: Tin Học Trẻ Em
  {
    id: 'c-kid-app',
    tab: 'tab4',
    categoryName: 'Tin học trẻ em',
    title: 'Tin Học Ứng Dụng Dành Cho Thiếu Nhi',
    desc: 'Giúp bé làm quen máy tính, gõ phím nhanh, tạo bài tập thuyết trình sinh động.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/tin-hoc-ung-dung.jpg',
    href: '/danh-muc/tin-hoc-tre-em',
    price: '1.200.000đ',
    duration: '12 buổi',
    studentsCount: 1120
  },
  {
    id: 'c-kid-scratch',
    tab: 'tab4',
    categoryName: 'Tin học trẻ em',
    title: 'Lập Trình Trẻ Em Scratch & Python',
    desc: 'Phát triển tư duy logic, sáng tạo game 2D, lập trình hoạt hình tương tác thú vị.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/lap-trinh-tre-em.jpg',
    href: '/danh-muc/tin-hoc-tre-em',
    price: '1.600.000đ',
    duration: '16 buổi',
    studentsCount: 1420
  },

  // Tab 5: Tin Học Quốc Tế
  {
    id: 'c-mos',
    tab: 'tab5',
    categoryName: 'Tin học Quốc tế',
    title: 'Luyện Thi Chứng Chỉ Quốc Tế MOS (Word, Excel, PPT)',
    desc: 'Cam kết 100% đạt chuẩn MOS Specialist & MOS Expert của Microsoft.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/tin-hoc-quoc-te-mos.jpg',
    href: '/danh-muc/tin-hoc-quoc-te-mos',
    price: '1.500.000đ',
    duration: '12 buổi',
    studentsCount: 3120,
    featured: true
  },
  {
    id: 'c-ic3',
    tab: 'tab5',
    categoryName: 'Tin học Quốc tế',
    title: 'Luyện Thi Tin Học Quốc Tế IC3 GS5 / GS6',
    desc: 'Đạt chuẩn chứng chỉ tin học quốc tế chuẩn đầu ra các trường Đại học, Cao đẳng.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/tin-hoc-quoc-te-ic3.jpg',
    href: '/danh-muc/tin-hoc-quoc-te-ic3',
    price: '1.400.000đ',
    duration: '12 buổi',
    studentsCount: 1980
  },

  // Tab 6: Kế Toán
  {
    id: 'c-kt-th',
    tab: 'tab6',
    categoryName: 'Kế toán',
    title: 'Khóa Học Kế Toán Thực Hành Doanh Nghiệp',
    desc: 'Cầm tay chỉ việc trên chứng từ thực tế: hóa đơn điện tử, sổ sách kế toán, BCTC.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ke-toan-thuc-hanh.jpg',
    href: '/danh-muc/ke-toan',
    price: '2.500.000đ',
    duration: '20 buổi',
    studentsCount: 2650,
    featured: true
  },
  {
    id: 'c-kt-thue',
    tab: 'tab6',
    categoryName: 'Kế toán',
    title: 'Kế Toán Thuế & Báo Cáo Tài Chính Chuyên Sâu',
    desc: 'Kê khai thuế GTGT, TNCN, TNDN, quyết toán thuế, tối ưu chi phí hợp lý cho công ty.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ke-toan-thue.jpg',
    href: '/danh-muc/ke-toan',
    price: '2.800.000đ',
    duration: '22 buổi',
    studentsCount: 1740
  },
  {
    id: 'c-kt-misa',
    tab: 'tab6',
    categoryName: 'Kế toán',
    title: 'Kế Toán Thực Hành Trên Phần Mềm MISA SME',
    desc: 'Hạch toán mua hàng, bán hàng, kho, quỹ, tiền lương và kết chuyển cuối kỳ trên MISA.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ke-toan-tong-hop.jpg',
    href: '/danh-muc/ke-toan',
    price: '1.800.000đ',
    duration: '14 buổi',
    studentsCount: 2190
  },

  // Tab 7: Hành chính nhân sự
  {
    id: 'c-hcns',
    tab: 'tab7',
    categoryName: 'Hành chính nhân sự',
    title: 'Quản Trị Hành Chính Nhân Sự & C&B Chuyên Nghiệp',
    desc: 'Quy trình tuyển dụng, xây dựng thang bảng lương, bảo hiểm xã hội và hợp đồng lao động.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/hanh-chinh-nhan-su.jpg',
    href: '/danh-muc/hanh-chinh-nhan-su',
    price: '2.200.000đ',
    duration: '16 buổi',
    studentsCount: 1320
  },

  // Tab 8: AI
  {
    id: 'c-ai-office',
    tab: 'tab8',
    categoryName: 'Khóa Học AI',
    title: 'Ứng Dụng AI ChatGPT, Gemini & NotebookLM Cho Công Việc',
    desc: 'Tự động hóa xử lý bảng tính Excel, viết văn bản, lập báo cáo, xây dựng Chatbot thông minh.',
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/khoa-hoc-ai.jpg',
    href: '/danh-muc/khoa-hoc-ai',
    price: '1.800.000đ',
    duration: '10 buổi',
    studentsCount: 3450,
    featured: true
  }
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 't-1',
    name: 'Thầy Hoàng Đô',
    role: 'Giảng Viên Đồ Họa & Photoshop Thực Chiến',
    bio: 'Hơn 10 năm kinh nghiệm trong ngành in ấn quảng cáo và thiết kế thương hiệu. Đào tạo phương pháp kèm 1-1 giúp học viên làm chủ nghề nhanh nhất.',
    exp: '10+ năm kinh nghiệm',
    photo: '/images/giao-vien1.jpg'
  },
  {
    id: 't-2',
    name: 'Giảng Viên Kèm Cặp 1-1',
    role: 'Phương Pháp Cầm Tay Chỉ Việc',
    bio: 'Trực tiếp hướng dẫn thao tác trên máy tính của học viên, giải đáp tức thì và sửa bài thực tế đến khi thành thạo.',
    exp: '8 năm kinh nghiệm',
    photo: '/images/khoa-hoc-5.jpg'
  },
  {
    id: 't-3',
    name: 'Thầy Hướng Dẫn Tin Học Thế Hệ Mới',
    role: 'Tin Học Văn Phòng Cho Người Đi Làm',
    bio: 'Kiên nhẫn, tận tâm, giúp học viên chưa biết gì về máy tính cũng có thể soạn thảo văn bản và lập bảng tính Excel thuần thục.',
    exp: '9 năm kinh nghiệm',
    photo: '/images/lop-hoc-3.jpg'
  },
  {
    id: 't-4',
    name: 'Giảng Viên Thiết Kế Nội Thất 3D',
    role: 'AutoCAD, SketchUp & 3Ds Max',
    bio: 'Chuyên gia dựng hình phối cảnh không gian nội ngoại thất, hướng dẫn kỹ năng bóc tách khối lượng và xuất file ABF xưởng mộc.',
    exp: '7 năm kinh nghiệm',
    photo: '/images/lop-hoc-2.jpg'
  },
  {
    id: 't-5',
    name: 'Đội Ngũ Hỗ Trợ Đồ Án Nhóm',
    role: 'Hỗ Trợ Thực Hành & Dự Án Thực Tế',
    bio: 'Chia sẻ kinh nghiệm làm dự án thật cho khách hàng, hỗ trợ học viên hoàn thành đồ án tốt nghiệp xuất sắc.',
    exp: '6 năm kinh nghiệm',
    photo: '/images/lop-hoc-1.jpg'
  },
  {
    id: 't-6',
    name: 'Lớp Học Ca Tối & Cuối Tuần',
    role: 'Đào Tạo Thực Hành Máy Tính',
    bio: 'Phòng máy cấu hình cao, không khí học tập tích cực, linh động thời gian tối đa cho người bận rộn.',
    exp: 'Đào Tạo Hàng Ngày',
    photo: '/images/89358601_3102997763154329_5568130211104423936_n.jpg'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'tm-1',
    name: 'Phạm Thị Lan',
    role: 'Học viên lớp Tin học văn phòng (Q. Bình Thạnh)',
    quote: 'Chương trình học được xây dựng bài bản, từ cơ bản đến nâng cao, giúp tôi cải thiện đáng kể kỹ năng tin học văn phòng để phục vụ tốt cho công việc hằng ngày.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-pham-thi-lan-hoc-vien-lop-tin-hoc-van-phong.jpg',
    rating: 5
  },
  {
    id: 'tm-2',
    name: 'Trần Văn Hùng',
    role: 'Học viên lớp Vẽ Kỹ Thuật AutoCAD (Q. Tân Phú)',
    quote: 'Mình từ con số 0 mà giờ đã vẽ được bản vẽ kỹ thuật hoàn chỉnh. Học thực hành nhiều, thầy hướng dẫn rất dễ hiểu và luôn theo sát từng học viên.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-tran-van-hung-lop-ve-ky-thuat.jpg',
    rating: 5
  },
  {
    id: 'tm-3',
    name: 'Nguyễn Thị Bích Trâm',
    role: 'Kế toán viên - Học viên Kế toán thực hành (TP. Thủ Đức)',
    quote: 'Giảng viên cầm tay chỉ việc trên hóa đơn chứng từ thực tế. Sau khóa học mình tự tin làm báo cáo tài chính và kê khai thuế mà không còn lo sợ bị phạt.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-nguyen-thi-bich-tram-lop-ke-toan.jpg',
    rating: 5
  },
  {
    id: 'tm-4',
    name: 'Lê Minh Quân',
    role: 'Kỹ sư cơ khí - Học viên lớp SolidWorks (Biên Hòa, Đồng Nai)',
    quote: 'Thời gian học rất linh hoạt, giáo viên giàu kinh nghiệm thực tế tại nhà máy. Khóa học đã giúp mình thăng tiến lên vị trí trưởng nhóm thiết kế.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-le-minh-quan-lop-solidworks.jpg',
    rating: 5
  },
  {
    id: 'tm-5',
    name: 'Hoàng Kim Yến',
    role: 'Nhân viên Marketing - Học viên Khóa học AI & Photoshop',
    quote: 'Ứng dụng AI vào Excel và soạn thảo văn bản giúp mình tiết kiệm 70% thời gian mỗi ngày. Trung tâm hỗ trợ giải đáp thắc mắc ngay cả sau khi kết thúc khóa học.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-hoang-kim-yen.jpg',
    rating: 5
  },
  {
    id: 'tm-6',
    name: 'Đặng Tuấn Anh',
    role: 'Sinh viên ĐH Kinh Tế - Luyện thi MOS Excel',
    quote: 'Mình đã đạt điểm 980/1000 chứng chỉ MOS Excel ngay lần thi đầu tiên. Bộ đề luyện của trung tâm sát 100% so với đề thi thật của Certiport.',
    photo: 'https://blogdaytinhoc.com/images/hoc-vien/cam-nhan-cua-hoc-vien-dang-tuan-anh.jpg',
    rating: 5
  }
];

export const LOCATIONS_DATA: LocationInfo[] = [
  {
    num: '1',
    title: 'Tp.HCM - Cơ Sở Chính Hiệp Thành',
    address: '362/6/17 Hiệp Thành 13, Phường Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh',
    phone: '0938.636.843',
    city: 'TP.HCM'
  },
  {
    num: '2',
    title: 'Tp.HCM - Cơ Sở Đông Bắc',
    address: '93 Đông Bắc, Phường Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh',
    phone: '0337.590.737',
    city: 'TP.HCM'
  },
  {
    num: '3',
    title: 'Tp.HCM - Cơ Sở Tân Thới Hiệp',
    address: '7/16 Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh',
    phone: '0938.636.843',
    city: 'TP.HCM'
  },
  {
    num: '4',
    title: 'Tp.HCM - Chi nhánh Quận 12',
    address: 'Số 52 Đường TL17, Phường Thạnh Lộc, Quận 12, TP.HCM',
    phone: '0938.636.843',
    city: 'TP.HCM'
  },
  {
    num: '5',
    title: 'Tp.HCM - Chi nhánh TP. Thủ Đức',
    address: 'Số 123 Đường D2, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TP.HCM',
    phone: '0938.636.843',
    city: 'TP.HCM'
  },
  {
    num: '6',
    title: 'Tp.HCM - Chi nhánh Tân Phú',
    address: 'Số 364/11 Thoại Ngọc Hầu, Phường Phú Thạnh, Quận Tân Phú, TP.HCM',
    phone: '0337.590.737',
    city: 'TP.HCM'
  },
  {
    num: '7',
    title: 'Tp.HCM - Chi nhánh Điện Biên Phủ',
    address: 'Số 20 Đường D5, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
    phone: '0938.636.843',
    city: 'TP.HCM'
  },
  {
    num: '8',
    title: 'Bình Dương - KDC Vietsing Thuận An',
    address: 'Số 01 Đường D38, KDC Vietsing, An Phú, TP. Thuận An, Tỉnh Bình Dương',
    phone: '0938.636.843',
    city: 'Bình Dương'
  },
  {
    num: '9',
    title: 'Bình Dương - TP. Thủ Dầu Một',
    address: 'Số 26 Đường ĐX 071, Phường Định Hòa, TP. Thủ Dầu Một, Tỉnh Bình Dương',
    phone: '0337.590.737',
    city: 'Bình Dương'
  },
  {
    num: '10',
    title: 'Đồng Nai - TP. Biên Hòa (Tân Mai)',
    address: 'Số 46B/3, Khu Phố 2, Phường Tân Mai, TP. Biên Hòa, Tỉnh Đồng Nai',
    phone: '0938.636.843',
    city: 'Đồng Nai'
  },
  {
    num: '11',
    title: 'Đồng Nai - Huyện Long Thành',
    address: 'Tổ 19, Khu Cầu Xéo, Thị Trấn Long Thành, Huyện Long Thành, Tỉnh Đồng Nai',
    phone: '0337.590.737',
    city: 'Đồng Nai'
  },
  {
    num: '12',
    title: 'Bà Rịa - Vũng Tàu',
    address: 'Số 37/10 Đường Nguyễn Thái Học, Phường 7, TP. Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu',
    phone: '0938.636.843',
    city: 'Vũng Tàu'
  },
  {
    num: '13',
    title: 'Hà Nội - Chi nhánh Thanh Xuân',
    address: 'Tầng 3, Tòa nhà Golden Palm, 21 Lê Văn Lương, Quận Thanh Xuân, Hà Nội',
    phone: '0337.590.737',
    city: 'Hà Nội'
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "post-1790096721778",
    slug: "khoa-hoc-photoshop-thuc-chien",
    title: "Khóa học photoshop thực chiến",
    excerpt: "Khóa học photoshop thực chiến",
    cat: "Thiết kế đồ họa",
    catSlug: "thiet-ke-do-hoa",
    date: "23/9/2026",
    author: "Admin Đồ Họa Thực Chiến",
    views: 150,
    commentsCount: 0,
    img: "https://blogdaytinhoc.com/images/slider/29022024/khoa-hoc-thiet-ke-do-hoa.png",
    tags: ["Thiết kế đồ họa","Đồ Họa Thực Chiến","Thực hành 1 kèm 1"],
    featured: false,
    toc: [{"id":"1-gioi-thieu-khoa-hoc-va-ky-nang","title":"1. Giới thiệu khóa học và kỹ năng","level":2},{"id":"2-cac-buoc-thuc-hien-tung-phan","title":"2. Các bước thực hiện từng phần","level":2},{"id":"3-tong-ket-va-luu-y-quan-trong","title":"3. Tổng kết và lưu ý quan trọng","level":2}],
    content: "<h2>1. Giới thiệu khóa học và kỹ năng</h2>\n<p>Chào mừng bạn đến với giáo trình đào tạo thực tế tại <strong>Đồ Họa Thực Chiến</strong>. Bài viết này hướng dẫn chi tiết các bước thực hành từ cơ bản đến nâng cao.</p>\n\n<h2>2. Các bước thực hiện từng phần</h2>\n<p>Thực hiện lần lượt các thao tác bên dưới để đạt hiệu quả tối ưu nhất trong công việc thực tế.</p>\n<ul>\n  <li><strong>Bước 1:</strong> Thiết lập không gian làm việc và phím tắt thông dụng.</li>\n  <li><strong>Bước 2:</strong> Áp dụng các nguyên tắc bố cục và màu sắc chuẩn in ấn.</li>\n  <li><strong>Bước 3:</strong> Xuất file chất lượng cao cho khách hàng và xưởng in.</li>\n</ul>\n\n<h2>3. Tổng kết và lưu ý quan trọng</h2>\n<p>Luyện tập thường xuyên và tham gia các bài tập thực chiến để làm chủ hoàn toàn kỹ năng này nhé!</p>"
  },

  {
    id: 'post-1',
    slug: 'trung-tam-tin-hoc-thuc-hanh-sao-viet-dao-tao-vi-tinh-van-phong-cho-nguoi-di-lam-51',
    title: 'Trung Tâm Đồ Họa Thực Chiến - Chuyên Đào Tạo Thực Hành Cấp Tốc Cho Người Đi Làm',
    excerpt: 'Cập nhật mới nhất năm 2026: Trung tâm Đồ Họa Thực Chiến, chuyên đào tạo thiết kế và vi tính cho Cá Nhân, Doanh Nghiệp tại Tp.HCM, Hà Nội, Bình Dương, Biên Hòa. Dạy kỹ năng cho người đi làm, xử lý dữ liệu và thiết kế chuyên nghiệp.',
    cat: 'Khóa Học Tin Học Văn Phòng',
    catSlug: 'tin-hoc-van-phong',
    date: '12/08/2026',
    author: 'Admin Đồ Họa Thực Chiến',
    views: 18450,
    commentsCount: 38,
    img: 'https://blogdaytinhoc.com/images/2024/8/1722958738_trung-tam-tin-hoc-sao-viet_big.jpg',
    tags: ['Tin học văn phòng', 'Đồ Họa Thực Chiến', 'Word Excel cấp tốc', 'Khóa học thực chiến'],
    featured: true,
    toc: [
      { id: 'gioi-thieu-trung-tam', title: '1. Giới thiệu Trung Tâm Đồ Họa Thực Chiến', level: 2 },
      { id: 'doi-tuong-phu-hop', title: '2. Đối tượng phù hợp tham gia khóa học', level: 2 },
      { id: 'noi-dung-chuong-trinh', title: '3. Nội dung đào tạo thực chiến', level: 2 },
      { id: 'phuong-phap-dao-tao', title: '4. Phương pháp cầm tay chỉ việc - Học là làm được', level: 2 },
      { id: 'chinh-sach-hoc-phi', title: '5. Học phí và lịch khai giảng các cơ sở', level: 2 }
    ],
    content: `
      <p class="lead"><strong>Trung Tâm Đồ Họa Thực Chiến</strong> là một trong những hệ thống đào tạo thiết kế, vi tính văn phòng, kỹ năng số và ứng dụng công nghệ hàng đầu tại Việt Nam với 13 cơ sở tại TP.HCM, Bình Dương, Đồng Nai, Vũng Tàu và Hà Nội.</p>
      
      <h2 id="gioi-thieu-trung-tam">1. Giới thiệu Trung Tâm Đồ Họa Thực Chiến</h2>
      <p>Với hơn 10 năm kinh nghiệm trong lĩnh vực đào tạo thực hành cho người đi làm, học sinh sinh viên và đào tạo theo hợp đồng doanh nghiệp, Đồ Họa Thực Chiến tự hào đã đồng hành cùng hơn 50.000 học viên nâng tầm kỹ năng nghiệp vụ.</p>
      
      <div class="callout-box info">
        <h4>Cam kết chất lượng tại Đồ Họa Thực Chiến:</h4>
        <ul>
          <li><strong>Cầm tay chỉ việc 1 kèm 1:</strong> Giáo viên hướng dẫn tận tình, học đến đâu thực hành ngay đến đó.</li>
          <li><strong>Thời gian học linh hoạt:</strong> Rảnh giờ nào học giờ đó (Sáng - Chiều - Tối) từ Thứ 2 đến Chủ Nhật.</li>
          <li><strong>Cam kết đầu ra:</strong> Học lại hoàn toàn MIỄN PHÍ nếu chưa thành thạo.</li>
          <li><strong>Cấp chứng chỉ hoàn thành khóa học:</strong> Có giá trị sử dụng khi xin việc tại các doanh nghiệp.</li>
        </ul>
      </div>

      <h2 id="doi-tuong-phu-hop">2. Đối tượng phù hợp tham gia khóa học</h2>
      <p>Chương trình được thiết kế may đo riêng biệt cho từng nhóm đối tượng:</p>
      <ul>
        <li><strong>Người đi làm mất gốc vi tính:</strong> Muốn học nhanh để đáp ứng yêu cầu công việc, không bị tụt hậu trước đồng nghiệp.</li>
        <li><strong>Nhân viên văn phòng, kế toán, nhân sự:</strong> Cần nâng cao trình độ Excel chuyên sâu, tự động hóa báo cáo và phân tích số liệu.</li>
        <li><strong>Sinh viên chuẩn bị tốt nghiệp:</strong> Cần chứng chỉ MOS, IC3 hoặc kỹ năng soạn thảo luận văn, tiểu luận đúng quy chuẩn.</li>
        <li><strong>Chủ doanh nghiệp, quản lý:</strong> Muốn làm chủ công cụ quản trị dữ liệu và ứng dụng trí tuệ nhân tạo (AI) vào quản lý.</li>
      </ul>

      <h2 id="noi-dung-chuong-trinh">3. Nội dung đào tạo tin học thực chiến</h2>
      <p>Chương trình đào tạo toàn diện 4 học phần cốt lõi:</p>
      <div class="table-responsive">
        <table class="table-styled">
          <thead>
            <tr>
              <th>Học phần</th>
              <th>Thời lượng</th>
              <th>Mục tiêu đầu ra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Microsoft Word Thực Hành</strong></td>
              <td>5 buổi</td>
              <td>Soạn thảo văn bản hành chính theo Nghị định 30, căn lề chuẩn, tạo mục lục tự động, trộn thư Mail Merge gửi hàng loạt.</td>
            </tr>
            <tr>
              <td><strong>Microsoft Excel Ứng Dụng</strong></td>
              <td>8 buổi</td>
              <td>Thành thạo hàm logic (IF, AND, OR), hàm dò tìm (VLOOKUP, XLOOKUP, INDEX+MATCH), PivotTable phân tích và trực quan hóa dữ liệu.</td>
            </tr>
            <tr>
              <td><strong>PowerPoint Thuyết Trình</strong></td>
              <td>3 buổi</td>
              <td>Thiết kế slide hiện đại, bố cục chuẩn Visual Storytelling, hiệu ứng chuyển động chuyên nghiệp.</td>
            </tr>
            <tr>
              <td><strong>Ứng Dụng AI Vào Công Việc</strong></td>
              <td>2 buổi</td>
              <td>Tận dụng ChatGPT, Google Gemini để viết email, phân tích bảng tính, tạo công thức Excel tự động.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="phuong-phap-dao-tao">4. Phương pháp cầm tay chỉ việc - Học là làm được</h2>
      <p>Tại Đồ Họa Thực Chiến, 100% thời lượng là thực hành trên máy tính cấu hình cao. Giáo viên ngồi cạnh, giải đáp mọi vướng mắc ngay tức thì. Bài tập thực hành được trích xuất từ các nghiệp vụ thực tế của các tập đoàn, công ty lớn.</p>

      <h2 id="chinh-sach-hoc-phi">5. Học phí và lịch khai giảng các cơ sở</h2>
      <p>Các lớp học được khai giảng liên tục hàng tuần tại 13 chi nhánh. Học viên có thể đăng ký học thử 1 buổi hoàn toàn miễn phí trước khi quyết định theo học.</p>
    `
  },
  {
    id: 'post-2',
    slug: 'tao-muc-luc-hinh-anh-trong-word-2010-2013-2016-22',
    title: 'Tạo Mục Lục Hình Ảnh Trong Word 2010 – 2013 - 2016 Đơn Giản, Chuẩn Xác Nhất',
    excerpt: 'Hướng dẫn chi tiết từng bước cách tạo mục lục hình ảnh, bảng biểu tự động trong Microsoft Word bằng tính năng Insert Caption và Insert Table of Figures cực nhanh và chuyên nghiệp.',
    cat: 'Học Word',
    catSlug: 'tin-hoc-word',
    date: '18/09/2026',
    author: 'Thầy Bạch Hiến',
    views: 24890,
    commentsCount: 19,
    img: 'https://blogdaytinhoc.com/images/2022/10/1665063080_tao-muc-luc-hinh-anh-trong-word_big.jpg',
    tags: ['Mẹo Word', 'Mục lục hình ảnh', 'Word 2016', 'Word 2019', 'Thủ thuật tin học'],
    featured: true,
    toc: [
      { id: 'tai-sao-can-tao-muc-luc', title: '1. Tại sao cần tạo mục lục hình ảnh trong văn bản?', level: 2 },
      { id: 'buoc-1-danh-chu-thich', title: '2. Bước 1: Đánh chú thích cho hình ảnh (Insert Caption)', level: 2 },
      { id: 'buoc-2-chen-muc-luc', title: '3. Bước 2: Chèn mục lục hình ảnh (Insert Table of Figures)', level: 2 },
      { id: 'buoc-3-cap-nhat-muc-luc', title: '4. Bước 3: Cập nhật mục lục khi thêm sửa ảnh (Update Table)', level: 2 },
      { id: 'meo-nho-khi-lam', title: '5. Các lỗi thường gặp và cách khắc phục', level: 2 }
    ],
    content: `
      <p class="lead">Khi soạn thảo báo cáo, luận văn tốt nghiệp hoặc tài liệu nghiên cứu khoa học dày hàng chục đến hàng trăm trang, việc <strong>tạo danh mục hình ảnh và bảng biểu tự động</strong> là yêu cầu bắt buộc để tạo sự chuyên nghiệp.</p>

      <h2 id="tai-sao-can-tao-muc-luc">1. Tại sao cần tạo mục lục hình ảnh trong văn bản?</h2>
      <p>Việc đánh số thủ công từng hình ảnh (như <em>Hình 1.1, Hình 1.2...</em>) rất dễ xảy ra sai sót khi bạn thêm mới, xóa bớt hay hoán đổi vị trí các hình. Sử dụng tính năng Caption tự động của Word mang lại các lợi ích vượt trội:</p>
      <ul>
        <li>Tự động đánh số thứ tự tuần tự không bị trùng lặp.</li>
        <li>Chỉ cần một click là tạo xong trang mục lục hình ảnh kèm số trang chính xác.</li>
        <li>Dễ dàng nhảy tới hình ảnh bằng tổ hợp phím <code>Ctrl + Click</code>.</li>
      </ul>

      <h2 id="buoc-1-danh-chu-thich">2. Bước 1: Đánh chú thích cho hình ảnh (Insert Caption)</h2>
      <p>Để Word nhận diện được hình ảnh nào cần đưa vào danh mục, bạn thực hiện như sau:</p>
      <ol>
        <li>Click chuột phải vào bức ảnh cần tạo chú thích.</li>
        <li>Chọn <strong>Insert Caption...</strong> (hoặc vào tab <strong>References</strong> &gt; chọn <strong>Insert Caption</strong>).</li>
        <li>Tại hộp thoại Caption, nếu chưa có nhãn "Hình", bạn bấm vào <strong>New Label...</strong> và gõ chữ <strong>Hình</strong> rồi nhấn OK.</li>
        <li>Tại ô Caption, thêm dấu gạch nối và tên mô tả của bức ảnh (Ví dụ: <em>Hình 1: Giao diện Trung Tâm Đồ Họa Thực Chiến</em>).</li>
        <li>Tại mục <strong>Position</strong>, bạn chọn <em>Below selected item</em> (Dưới hình ảnh) hoặc <em>Above selected item</em> (Trên hình ảnh).</li>
        <li>Nhấn <strong>OK</strong> để hoàn tất. Làm tương tự cho tất cả các hình ảnh còn lại trong bài viết.</li>
      </ol>

      <div class="callout-box tip">
        <h4>Mẹo chuyên nghiệp:</h4>
        <p>Nếu bạn muốn số thứ tự hình gắn liền với số chương (ví dụ: Hình 1.1, Hình 2.1...), trong cửa sổ Caption hãy chọn nút <strong>Numbering...</strong>, tích chọn <strong>Include chapter number</strong> và chọn Heading tương ứng!</p>
      </div>

      <h2 id="buoc-2-chen-muc-luc">3. Bước 2: Chèn mục lục hình ảnh (Insert Table of Figures)</h2>
      <p>Sau khi đã đánh Caption cho tất cả các hình, tiến hành xuất mục lục ra vị trí mong muốn:</p>
      <ol>
        <li>Đặt con trỏ chuột tại vị trí bạn muốn đặt mục lục hình ảnh (thường sau trang Mục lục nội dung).</li>
        <li>Chuyển qua tab <strong>References</strong> trên thanh Ribbon.</li>
        <li>Tìm nhóm lệnh <em>Captions</em> và click vào <strong>Insert Table of Figures</strong>.</li>
        <li>Tại mục <strong>Caption label</strong>, chọn đúng nhãn bạn đã đặt (chọn <em>Hình</em>).</li>
        <li>Tại mục <em>Tab leader</em>, chọn kiểu dấu chấm hiển thị tới số trang.</li>
        <li>Bấm <strong>OK</strong>. Toàn bộ danh mục hình ảnh kèm số trang sẽ hiện ra ngay lập tức!</li>
      </ol>

      <h2 id="buoc-3-cap-nhat-muc-luc">4. Bước 3: Cập nhật mục lục khi thêm sửa ảnh (Update Table)</h2>
      <p>Trong quá trình làm việc, nếu bạn chèn thêm hình ảnh mới hoặc chỉnh sửa nội dung chú thích, đừng làm lại từ đầu! Hãy làm theo cách sau:</p>
      <ul>
        <li>Click chuột phải vào vùng mục lục hình ảnh.</li>
        <li>Chọn <strong>Update Field</strong> (hoặc nhấn phím tắt <strong>F9</strong>).</li>
        <li>Chọn <strong>Update page numbers only</strong> (chỉ cập nhật số trang) hoặc <strong>Update entire table</strong> (cập nhật toàn bộ nội dung và số trang).</li>
      </ul>

      <h2 id="meo-nho-khi-lam">5. Các lỗi thường gặp và cách khắc phục</h2>
      <p><strong>Lỗi hình ảnh không nhận Caption:</strong> Do hình ảnh đang ở chế độ In Line with Text hoặc Wrap Text dạng Behind/In Front of Text. Bạn hãy click chuột phải vào ảnh &gt; Wrap Text &gt; chọn <em>Top and Bottom</em> hoặc <em>Square</em> trước khi chèn Caption.</p>
    `
  },
  {
    id: 'post-3',
    slug: 'tao-nut-bam-trong-excel-de-chay-cac-lenh-lap-trinh-tu-dong-25',
    title: 'Tạo Nút Bấm Trong Excel Để Chạy Các Lệnh Lập Trình Tự Động (Macro & VBA)',
    excerpt: 'Hướng dẫn cách gán Macro VBA vào Button hoặc Shape trong Excel để thực hiện hàng loạt thao tác tự động: in ấn, xuất báo cáo PDF, xóa dữ liệu chỉ bằng một lần click chuột.',
    cat: 'Học Excel',
    catSlug: 'tin-hoc-excel',
    date: '10/09/2026',
    author: 'Thầy Bạch Hiến',
    views: 31200,
    commentsCount: 42,
    img: 'https://blogdaytinhoc.com/images/2022/10/1665063080_tao-nut-bam-trong-excel_big.jpg',
    tags: ['VBA Excel', 'Macro tự động', 'Học Excel', 'Phím tắt Excel'],
    featured: true,
    toc: [
      { id: 'loi-ich-cua-nut-bam-macro', title: '1. Lợi ích khi tạo nút bấm Macro trong Excel', level: 2 },
      { id: 'bat-the-developer', title: '2. Cách kích hoạt thẻ Developer trong Excel', level: 2 },
      { id: 'tao-nut-bam-button', title: '3. Cách 1: Tạo nút bấm bằng Form Controls', level: 2 },
      { id: 'tao-nut-bam-shape', title: '4. Cách 2: Tạo nút bấm đẹp mắt bằng Shapes', level: 2 },
      { id: 'doan-ma-vba-mau', title: '5. Các đoạn mã VBA mẫu hữu ích dùng ngay', level: 2 }
    ],
    content: `
      <p class="lead">Trong công việc xử lý dữ liệu hàng ngày với Excel, có những công việc lặp đi lặp lại như: lọc dữ liệu, xóa nội dung cũ, lưu file và in ấn hàng loạt. Tạo một nút bấm <strong>(Button)</strong> để chạy Macro sẽ giúp bạn tự động hóa công việc chỉ với 1 cú click chuột.</p>

      <h2 id="loi-ich-cua-nut-bam-macro">1. Lợi ích khi tạo nút bấm Macro trong Excel</h2>
      <ul>
        <li>Tiết kiệm từ 80% đến 90% thời gian thực hiện thao tác thủ công.</li>
        <li>Hạn chế tối đa sai sót của con người khi copy-paste hay xóa nhầm dữ liệu.</li>
        <li>Tạo giao diện bảng tính chuyên nghiệp như một phần mềm mini cho nhân viên sử dụng.</li>
      </ul>

      <h2 id="bat-the-developer">2. Cách kích hoạt thẻ Developer trong Excel</h2>
      <p>Mặc định tab Developer bị ẩn trong Excel. Để bật lên:</p>
      <ol>
        <li>Mở Excel, vào <strong>File &gt; Options</strong>.</li>
        <li>Chọn mục <strong>Customize Ribbon</strong> ở thanh bên trái.</li>
        <li>Ở cột bên phải <em>Main Tabs</em>, tìm và tích chọn vào ô <strong>Developer</strong>.</li>
        <li>Nhấn <strong>OK</strong>. Thẻ Developer sẽ xuất hiện ngay trên thanh công cụ.</li>
      </ol>

      <h2 id="tao-nut-bam-button">3. Cách 1: Tạo nút bấm bằng Form Controls</h2>
      <p>Đây là phương thức tiêu chuẩn mặc định:</p>
      <ol>
        <li>Vào tab <strong>Developer &gt; Insert</strong> trong nhóm <em>Controls</em>.</li>
        <li>Dưới mục <strong>Form Controls</strong>, click chọn biểu tượng hình chữ nhật <strong>Button (Form Control)</strong>.</li>
        <li>Kéo chuột vẽ một hình chữ nhật trên bảng tính nơi bạn muốn đặt nút.</li>
        <li>Cửa sổ <em>Assign Macro</em> tự động hiện ra. Chọn tên Macro bạn muốn gán rồi nhấn <strong>OK</strong>.</li>
        <li>Click chuột phải vào nút bấm &gt; chọn <strong>Edit Text</strong> để đổi tên hiển thị (Ví dụ: "LÀM MỚI DỮ LIỆU").</li>
      </ol>

      <h2 id="tao-nut-bam-shape">4. Cách 2: Tạo nút bấm đẹp mắt bằng Shapes</h2>
      <p>Nút Form Controls thường có hình dáng cổ điển đơn giản. Nếu bạn muốn nút bấm có màu sắc bắt mắt, hiệu ứng bo tròn góc hay đổ bóng 3D:</p>
      <ol>
        <li>Vào tab <strong>Insert &gt; Shapes</strong> &gt; chọn hình dạng mong muốn (như <em>Rounded Rectangle</em>).</li>
        <li>Vẽ hình lên trang tính, đổi màu nền tại <strong>Shape Format</strong>.</li>
        <li>Gõ chữ lên nút và căn chỉnh giữa đẹp mắt.</li>
        <li>Click chuột phải vào Shape &gt; chọn <strong>Assign Macro...</strong>.</li>
        <li>Chọn Macro cần chạy và nhấn <strong>OK</strong>.</li>
      </ol>

      <h2 id="doan-ma-vba-mau">5. Các đoạn mã VBA mẫu hữu ích dùng ngay</h2>
      <p>Đoạn mã VBA tự động xóa dữ liệu ô nhập liệu để nhập phiếu mới:</p>
      <pre><code>Sub XoaDuLieuNhap()
    ' Xóa dữ liệu vùng nhập từ B4 đến D20
    Range("B4:D20").ClearContents
    MsgBox "Đã xóa trắng dữ liệu thành công!", vbInformation, "Đồ Họa Thực Chiến"
End Sub</code></pre>
    `
  },
  {
    id: 'post-4',
    slug: 'giao-trinh-tu-hoc-tin-hoc-van-phong-trung-tam-tin-hoc-sao-viet-bien-hoa-151',
    title: 'Giáo Trình Tự Học Chuẩn Nhất - Trung Tâm Đồ Họa Thực Chiến',
    excerpt: 'Tổng hợp trọn bộ giáo trình tự học từ cơ bản đến nâng cao bao gồm Word, Excel, PowerPoint, Thiết Kế Đồ Họa có bài tập thực hành và file mẫu đính kèm hoàn toàn miễn phí.',
    cat: 'Giáo Trình',
    catSlug: 'giao-trinh',
    date: '05/09/2026',
    author: 'Admin Đồ Họa Thực Chiến',
    views: 45200,
    commentsCount: 67,
    img: 'https://blogdaytinhoc.com/images/2022/10/1665063080_giao-trinh-tin-hoc-sao-viet_big.jpg',
    tags: ['Giáo trình Word', 'Giáo trình Excel', 'Tài liệu miễn phí', 'Đồ Họa Thực Chiến'],
    featured: true,
    toc: [
      { id: 'gioi-thieu-bo-giao-trinh', title: '1. Giới thiệu bộ giáo trình tự học', level: 2 },
      { id: 'noi-dung-phan-word', title: '2. Giáo trình tự học Microsoft Word', level: 2 },
      { id: 'noi-dung-phan-excel', title: '3. Giáo trình tự học Microsoft Excel', level: 2 },
      { id: 'noi-dung-phan-powerpoint', title: '4. Giáo trình tự học PowerPoint', level: 2 },
      { id: 'link-tai-tai-lieu', title: '5. Link tải trọn bộ giáo trình kèm bài tập mẫu', level: 2 }
    ],
    content: `
      <p class="lead">Nhằm hỗ trợ cộng đồng người học trên cả nước, Trung Tâm Đồ Họa Thực Chiến phát hành <strong>Bộ Giáo Trình Tự Học Thực Hành 2026</strong> được biên soạn bởi đội ngũ giảng viên giàu kinh nghiệm.</p>

      <h2 id="gioi-thieu-bo-giao-trinh">1. Giới thiệu bộ giáo trình tự học</h2>
      <p>Bộ giáo trình được thiết kế theo lộ trình thực hành trực quan: <strong>Lý thuyết ngắn gọn - Bài tập tình huống - Lời giải chi tiết</strong>. Phù hợp cho cả người mới bắt đầu từ con số 0 lẫn người đi làm muốn củng cố lại kiến thức bài bản.</p>

      <h2 id="noi-dung-phan-word">2. Giáo trình tự học Microsoft Word</h2>
      <ul>
        <li>Chương 1: Kỹ thuật căn chỉnh lề, phông chữ, định dạng đoạn văn chuẩn thể thức văn bản nhà nước.</li>
        <li>Chương 2: Thao tác nâng cao với Bảng (Table), công thức tính trong bảng.</li>
        <li>Chương 3: Quản lý văn bản dài: Tạo Header & Footer khác nhau giữa các trang, phân ngắt Section.</li>
        <li>Chương 4: Trộn thư Mail Merge hàng loạt từ file danh sách Excel.</li>
      </ul>

      <h2 id="noi-dung-phan-excel">3. Giáo trình tự học Microsoft Excel</h2>
      <ul>
        <li>Chương 1: Hiểu đúng về định dạng dữ liệu (General, Number, Date, Text) và các lỗi thường gặp (#N/A, #VALUE!, #REF!).</li>
        <li>Chương 2: Hệ thống 30 hàm phổ biến nhất: SUM, AVERAGE, COUNT, COUNTA, COUNTIF, SUMIF, VLOOKUP, INDEX, MATCH.</li>
        <li>Chương 3: Quản lý cơ sở dữ liệu: Lọc tự động (AutoFilter), Lọc nâng cao (Advanced Filter), Định dạng có điều kiện (Conditional Formatting).</li>
        <li>Chương 4: Tổng hợp dữ liệu đa chiều với Pivot Table và vẽ biểu đồ động.</li>
      </ul>

      <h2 id="noi-dung-phan-powerpoint">4. Giáo trình tự học PowerPoint</h2>
      <ul>
        <li>Tư duy bố cục slide theo nguyên tắc 60-30-10 và độ tương phản màu sắc.</li>
        <li>Sử dụng Slide Master để tạo mẫu thiết kế đồng bộ cho toàn bộ bài thuyết trình.</li>
        <li>Ứng dụng hiệu ứng Morph và Trigger để tạo tương tác cuốn hút người xem.</li>
      </ul>

      <h2 id="link-tai-tai-lieu">5. Link tải trọn bộ giáo trình kèm bài tập mẫu</h2>
      <div class="callout-box download">
        <h4>Tải về tài liệu miễn phí:</h4>
        <p>Bao gồm file PDF giáo trình 300 trang và thư mục 50 bài tập thực hành kèm đáp án.</p>
        <a href="#dang-ky-nhan-tai-lieu" class="btn-sv-download">📥 Tải Trọn Bộ Giáo Trình (Google Drive)</a>
      </div>
    `
  },
  {
    id: 'post-5',
    slug: 'khoa-hoc-autocad-tai-tp-hcm-329',
    title: 'Khóa Học AutoCad Tại Tp.HCM - Vẽ Cad 2D, 3D Cho Kiến Trúc, Nội Thất, Cơ Khí',
    excerpt: 'Đào tạo phần mềm AutoCAD từ cơ bản đến chuyên sâu cho sinh viên và kỹ sư xây dựng, kiến trúc, cơ khí. Cam kết thành thạo đọc hiểu và vẽ bản vẽ kỹ thuật hoàn chỉnh.',
    cat: 'Khóa học Kiến Trúc - Cơ Khí',
    catSlug: 'autocad',
    date: '28/08/2026',
    author: 'Thầy Đỗ Văn Thao',
    views: 19800,
    commentsCount: 23,
    img: 'https://blogdaytinhoc.com/images/2022/11/1668471712_Khoa-hoc-AutoCad-Tai-Tp-HCM_big.jpg',
    tags: ['Học AutoCAD', 'Vẽ kỹ thuật', 'AutoCAD 2D', 'Bản vẽ xây dựng'],
    featured: false,
    toc: [
      { id: 'tong-quan-khoa-hoc', title: '1. Tổng quan khóa học AutoCAD', level: 2 },
      { id: 'chuong-trinh-hoc-cad', title: '2. Chương trình học AutoCAD 2D & 3D', level: 2 },
      { id: 'san-pham-hoc-vien', title: '3. Sản phẩm học viên sau khóa học', level: 2 }
    ],
    content: `
      <p class="lead">AutoCAD là phần mềm thiết kế đồ họa 2D và 3D tiêu chuẩn công nghiệp không thể thiếu đối với bất kỳ kỹ sư, kiến trúc sư hoặc người làm trong ngành xây dựng, cơ khí, nội thất nào.</p>
      <h2 id="tong-quan-khoa-hoc">1. Tổng quan khóa học AutoCAD</h2>
      <p>Khóa học tại Trung tâm Đồ Họa Thực Chiến được thiết kế theo phương pháp thực hành chuyên sâu theo từng ngành nghề cụ thể: Kiến trúc - Xây dựng hoặc Cơ khí chế tạo máy.</p>
      <h2 id="chuong-trinh-hoc-cad">2. Chương trình học AutoCAD 2D & 3D</h2>
      <ul>
        <li>Làm chủ hệ thống phím tắt và lệnh vẽ cơ bản: Line, Circle, Arc, Rectang, Offset, Trim, Extend...</li>
        <li>Thiết lập chuẩn bản vẽ: Tỷ lệ bản vẽ, quản lý Layer, DimStyle, Textstyle theo TCVN.</li>
        <li>Tạo khối Block thuộc tính và thư viện bản vẽ thông minh.</li>
        <li>Dựng hình 3D Solid cơ bản và xuất bản vẽ hình chiếu kỹ thuật.</li>
      </ul>
      <h2 id="san-pham-hoc-vien">3. Sản phẩm học viên sau khóa học</h2>
      <p>Học viên hoàn thành ít nhất 2 bộ hồ sơ bản vẽ thực tế (hồ sơ thiết kế nhà phố hoặc bản vẽ chi tiết máy gia công) trước khi tốt nghiệp.</p>
    `
  },
  {
    id: 'post-6',
    slug: 'khoa-hoc-photoshop-cap-toc-tai-tp-hcm-330',
    title: 'Khóa Học Photoshop Cấp Tốc Tại Tp.HCM - Thiết Kế, Chỉnh Sửa Ảnh Chuyên Nghiệp',
    excerpt: 'Học Photoshop thực chiến cho người mới bắt đầu. Thiết kế banner bán hàng, poster truyền thông, xử lý ảnh chân dung, ảnh sản phẩm TMĐT nhanh chóng.',
    cat: 'Khóa Học Đồ Họa',
    catSlug: 'tu-hoc-photoshop',
    date: '25/08/2026',
    author: 'Thầy Trần Hoàng Nam',
    views: 16700,
    commentsCount: 15,
    img: 'https://blogdaytinhoc.com/images/2022/11/1668471712_Khoa-hoc-Photoshop_big.jpg',
    tags: ['Học Photoshop', 'Thiết kế đồ họa', 'Chỉnh sửa ảnh', 'Banner TMĐT'],
    featured: false,
    toc: [
      { id: 'muc-tieu-khoa-hoc-pts', title: '1. Mục tiêu khóa học Photoshop cấp tốc', level: 2 },
      { id: 'kien-thuc-cot-loi', title: '2. Kiến thức cốt lõi được đào tạo', level: 2 },
      { id: 'co-hoi-nghe-nghiep', title: '3. Ứng dụng thực tế cho công việc', level: 2 }
    ],
    content: `
      <p class="lead">Bạn cần thiết kế hình ảnh cho bài đăng Facebook, ảnh bìa TikTok, banner khuyến mãi trên Shopee hoặc chỉnh sửa ảnh chân dung đẹp tự nhiên? Khóa học Photoshop cấp tốc tại Đồ Họa Thực Chiến chính là giải pháp tối ưu dành cho bạn.</p>
      <h2 id="muc-tieu-khoa-hoc-pts">1. Mục tiêu khóa học Photoshop cấp tốc</h2>
      <p>Giúp người học dù chưa từng biết về đồ họa cũng có thể tự tin sử dụng thành thạo các công cụ cắt ghép, chỉnh màu, phối ánh sáng và thiết kế các ấn phẩm quảng cáo chuẩn kích thước hiển thị.</p>
      <h2 id="kien-thuc-cot-loi">2. Kiến thức cốt lõi được đào tạo</h2>
      <ul>
        <li>Làm chủ không gian làm việc, Layer, Mask và các chế độ hòa trộn (Blending Mode).</li>
        <li>Tách nền vật thể phức tạp như tóc mai, vật thể trong suốt bằng Pen Tool, Select and Mask.</li>
        <li>Kỹ thuật chỉnh sửa da tự nhiên bằng Frequency Separation và Camera Raw.</li>
        <li>Thiết kế bộ banner quảng cáo đa nền tảng kích thước chuẩn.</li>
      </ul>
      <h2 id="co-hoi-nghe-nghiep">3. Ứng dụng thực tế cho công việc</h2>
      <p>Sau khóa học, học viên có thể tự tin nhận thiết kế freelance hoặc ứng tuyển vị trí nhân viên thiết kế đồ họa, chuyên viên Marketing Online.</p>
    `
  },
  {
    id: 'post-7',
    slug: 'khoa-hoc-tin-hoc-van-phong-ung-dung-ai-thuc-chien-quan-7',
    title: 'Khóa Học Tin Học Văn Phòng & Ứng Dụng AI Thực Chiến Tại Phường Tân Hưng (Quận 7)',
    excerpt: 'Đột phá hiệu suất công việc với sự kết hợp giữa kỹ năng văn phòng và công cụ AI thế hệ mới nhất tại cơ sở Quận 7 của Đồ Họa Thực Chiến.',
    cat: 'Tin Học',
    catSlug: 'tin-hoc-van-phong',
    date: '20/08/2026',
    author: 'Thầy Bạch Hiến',
    views: 14200,
    commentsCount: 18,
    img: 'https://blogdaytinhoc.com/images/2024/8/1722958738_trung-tam-tin-hoc-sao-viet_big.jpg',
    tags: ['AI văn phòng', 'Tin học Quận 7', 'Word Excel AI', 'Khóa học thực chiến'],
    featured: false,
    toc: [
      { id: 'ai-thay-doi-cong-viec', title: '1. AI đang thay đổi kỹ năng tin học như thế nào?', level: 2 },
      { id: 'noi-dung-lop-hoc-q7', title: '2. Nội dung đào tạo tại cơ sở Quận 7', level: 2 }
    ],
    content: `
      <p class="lead">Cơ sở Đồ Họa Thực Chiến tại Căn hộ Florita, KĐT Him Lam, P. Tân Hưng, Quận 7 là địa chỉ học tập quen thuộc của hàng nghìn học viên tại khu vực Nam Sài Gòn.</p>
      <h2 id="ai-thay-doi-cong-viec">1. AI đang thay đổi kỹ năng tin học như thế nào?</h2>
      <p>Nếu trước đây bạn mất hàng giờ để gõ công thức Excel phức tạp hay viết một báo cáo dài, giờ đây với sự trợ giúp của AI Agents và Prompt Engineering, bạn có thể hoàn thành trong vài phút với độ chính xác cao.</p>
      <h2 id="noi-dung-lop-hoc-q7">2. Nội dung đào tạo tại cơ sở Quận 7</h2>
      <p>Khóa học tích hợp đào tạo thực hành Word, Excel, PowerPoint chuyên sâu kết hợp sử dụng ChatGPT Plus, Gemini Pro để tối ưu hóa quy trình làm việc văn phòng.</p>
    `
  },
  {
    id: 'post-8',
    slug: 'khoa-hoc-ke-toan-tai-phuong-tan-hung-quan-7-tp-hcm-332',
    title: 'Khóa Học Kế Toán Tại Phường Tân Hưng (Quận 7), TP.HCM - Cầm Tay Chỉ Việc Lên Báo Cáo Tài Chính',
    excerpt: 'Khóa học thực hành kế toán tổng hợp trên hóa đơn chứng từ sống của doanh nghiệp thương mại, dịch vụ, sản xuất. Giúp học viên tự tin làm kế toán độc lập.',
    cat: 'Kế toán',
    catSlug: 'ke-toan',
    date: '15/08/2026',
    author: 'Cô Thiều Hồng',
    views: 12900,
    commentsCount: 11,
    img: 'https://blogdaytinhoc.com/images/khoa-hoc/ke-toan-thuc-hanh.jpg',
    tags: ['Kế toán Quận 7', 'Kế toán thực hành', 'Báo cáo tài chính', 'MISA'],
    featured: false,
    toc: [
      { id: 'vi-sao-chon-lop-ke-toan', title: '1. Vì sao nên học kế toán thực hành tại Đồ Họa Thực Chiến?', level: 2 },
      { id: 'lo-trinh-dao-tao-ke-toan', title: '2. Lộ trình đào tạo kế toán tổng hợp', level: 2 }
    ],
    content: `
      <p class="lead">Học kế toán chỉ lý thuyết trên ghế nhà trường thường khiến sinh viên bỡ ngỡ khi bước vào doanh nghiệp. Khóa học kế toán thực hành tại Đồ Họa Thực Chiến mang đến trải nghiệm làm việc như một kế toán viên thực thụ.</p>
      <h2 id="vi-sao-chon-lop-ke-toan">1. Vì sao nên học kế toán thực hành tại Đồ Họa Thực Chiến?</h2>
      <p>Học viên được trực tiếp xử lý bộ hóa đơn, chứng từ thực tế của doanh nghiệp dưới sự kèm cặp sát sao của các Kế toán trưởng có hơn 10 năm kinh nghiệm.</p>
      <h2 id="lo-trinh-dao-tao-ke-toan">2. Lộ trình đào tạo kế toán tổng hợp</h2>
      <ul>
        <li>Thiết lập hồ sơ doanh nghiệp ban đầu và mở sổ kế toán.</li>
        <li>Hạch toán các nghiệp vụ kinh tế phát sinh: Tiền lương, BHXH, tài sản cố định, chi phí phân bổ.</li>
        <li>Kê khai thuế điện tử qua mạng (HTKK) và nộp tờ khai.</li>
        <li>Lập Báo cáo tài chính, Báo cáo lưu chuyển tiền tệ và Quyết toán thuế cuối năm.</li>
      </ul>
    `
  }
];

export const SCHEDULES_DATA: ScheduleItem[] = [
  {
    id: 'sch-1',
    courseName: 'Tin Học Văn Phòng Cấp Tốc',
    category: 'Tin học văn phòng',
    openingDate: 'Thứ 2 hàng tuần (28/09/2026)',
    schedule: 'Sáng: 8h30-11h00 | Tối: 18h00-20h30 (2-4-6)',
    duration: '1.5 tháng (18 buổi)',
    location: 'Cả 13 chi nhánh & Online',
    tuition: '1.500.000đ',
    discountTuition: '1.200.000đ',
    status: 'Đang tuyển sinh'
  },
  {
    id: 'sch-2',
    courseName: 'Excel Chuyên Sâu & Phân Tích Dữ Liệu',
    category: 'Tin học văn phòng',
    openingDate: 'Thứ 3 hàng tuần (29/09/2026)',
    schedule: 'Tối: 18h30-21h00 (3-5-7)',
    duration: '1 tháng (12 buổi)',
    location: 'Bình Thạnh, Quận 7, Thủ Đức, Biên Hòa',
    tuition: '2.000.000đ',
    discountTuition: '1.600.000đ',
    status: 'Sắp khai giảng'
  },
  {
    id: 'sch-3',
    courseName: 'Vẽ Kỹ Thuật AutoCAD 2D & 3D',
    category: 'Vẽ kỹ thuật',
    openingDate: 'Thứ 7 & Chủ Nhật (03/10/2026)',
    schedule: 'Cuối tuần: 8h30-11h30 & 14h00-17h00',
    duration: '1.5 tháng (16 buổi)',
    location: 'Bình Thạnh, Tân Phú, Bình Dương, Long Thành',
    tuition: '2.200.000đ',
    discountTuition: '1.800.000đ',
    status: 'Đang tuyển sinh'
  },
  {
    id: 'sch-4',
    courseName: 'Khóa Học Kế Toán Thực Hành Doanh Nghiệp',
    category: 'Kế toán',
    openingDate: 'Thứ 2 hàng tuần (28/09/2026)',
    schedule: 'Tối: 18h30-20h30 (2-4-6)',
    duration: '2 tháng (20 buổi)',
    location: 'Tất cả các cơ sở',
    tuition: '3.000.000đ',
    discountTuition: '2.500.000đ',
    status: 'Đang tuyển sinh'
  },
  {
    id: 'sch-5',
    courseName: 'Luyện Thi Chứng Chỉ Quốc Tế MOS',
    category: 'Tin học Quốc tế',
    openingDate: 'Linh hoạt mọi ngày',
    schedule: 'Sáng / Chiều / Tối (Kèm riêng từng học viên)',
    duration: '12 buổi (Hoàn thành sớm thi sớm)',
    location: 'Tất cả chi nhánh',
    tuition: '1.800.000đ',
    discountTuition: '1.500.000đ',
    status: 'Lớp cấp tốc'
  },
  {
    id: 'sch-6',
    courseName: 'Ứng Dụng AI & Tự Động Hóa Văn Phòng',
    category: 'Khóa Học AI',
    openingDate: 'Thứ 5 (01/10/2026)',
    schedule: 'Tối: 19h00-21h00 (3-5-7)',
    duration: '1 tháng (10 buổi)',
    location: 'Online qua Zoom + Offline tại Bình Thạnh & Quận 7',
    tuition: '2.200.000đ',
    discountTuition: '1.800.000đ',
    status: 'Đang tuyển sinh'
  }
];

export const POPULAR_TAGS = [
  'Học Excel',
  'Học Word',
  'AutoCAD',
  'Kế toán thuế',
  'Luyện thi MOS',
  'Photoshop',
  'SketchUp',
  'Tin học văn phòng',
  'Khóa học AI',
  'Bảng tính',
  'Unikey',
  'Phím tắt'
];

// Load any custom runtime articles and categories from localStorage
if (typeof window !== 'undefined') {
  try {
    const savedArticles = localStorage.getItem('dhhc_custom_articles');
    if (savedArticles) {
      const parsed: Article[] = JSON.parse(savedArticles);
      if (Array.isArray(parsed)) {
        parsed.slice().reverse().forEach((art) => {
          if (!ARTICLES_DATA.some((a) => a.id === art.id || a.slug === art.slug)) {
            ARTICLES_DATA.unshift(art);
          }
        });
      }
    }

    const savedCats = localStorage.getItem('dhhc_custom_categories');
    if (savedCats) {
      const parsed = JSON.parse(savedCats);
      if (Array.isArray(parsed)) {
        parsed.forEach((c) => {
          if (!COURSE_TABS.some((t) => t.id === c.slug || t.name === c.name)) {
            COURSE_TABS.push({ id: c.slug, name: c.name });
          }
        });
      }
    }
  } catch (e) {
    console.error('Error hydrating custom content:', e);
  }
}

export function registerArticleRuntime(article: Article): void {
  const existingIdx = ARTICLES_DATA.findIndex((a) => a.id === article.id || a.slug === article.slug);
  if (existingIdx >= 0) {
    ARTICLES_DATA[existingIdx] = article;
  } else {
    ARTICLES_DATA.unshift(article);
  }
}

export function registerCategoryRuntime(category: { id: string; name: string; slug: string }): void {
  if (!COURSE_TABS.some((t) => t.id === category.slug || t.name === category.name)) {
    COURSE_TABS.push({ id: category.slug, name: category.name });
  }
}

