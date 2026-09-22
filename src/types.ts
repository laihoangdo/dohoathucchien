export interface Course {
  id: string;
  tab: string; // 'tab1' | 'tab2' ...
  categoryName: string;
  title: string;
  desc?: string;
  img: string;
  href: string;
  price?: string;
  duration?: string;
  studentsCount?: number;
  featured?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string;
  exp: string;
  photo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string;
  rating: number;
}

export interface LocationInfo {
  num: string;
  title: string;
  address: string;
  phone: string;
  city: 'TP.HCM' | 'Bình Dương' | 'Đồng Nai' | 'Hà Nội' | 'Vũng Tàu';
  hotline?: string;
  contact?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cat: string;
  catSlug: string;
  category?: string;
  categoryName?: string;
  date: string;
  author: string;
  authorAvatar?: string;
  views: number;
  commentsCount: number;
  img: string;
  image?: string;
  tags: string[];
  toc: TocItem[];
  featured?: boolean;
}

export interface ScheduleItem {
  id: string;
  courseName: string;
  category: string;
  openingDate: string;
  schedule: string;
  duration: string;
  location: string;
  tuition: string;
  discountTuition: string;
  status: 'Sắp khai giảng' | 'Đang tuyển sinh' | 'Lớp cấp tốc';
}

export interface CommentItem {
  id: string;
  articleId: string;
  authorName: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
}
