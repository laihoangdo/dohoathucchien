import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { HomeView } from './views/HomeView';
import { ArticleView } from './views/ArticleView';
import { CategoryView } from './views/CategoryView';
import { ScheduleView } from './views/ScheduleView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

// Helper to determine the current path from pathname, search (SPA redirect), or hash
function getCurrentPath(): string {
  // 1. Check admin route explicitly in pathname, hash, or search
  if (
    window.location.pathname.includes('/admin') ||
    window.location.hash.includes('/admin') ||
    window.location.search.includes('admin')
  ) {
    return '/admin';
  }

  // 2. Check GitHub Pages 404 redirect param: ?p=/route
  const params = new URLSearchParams(window.location.search);
  const pParam = params.get('p');
  if (pParam) {
    const clean = pParam.startsWith('/') ? pParam : `/${pParam}`;
    try {
      window.history.replaceState(null, '', clean);
    } catch {
      // ignore
    }
    return clean;
  }

  // 3. Backward compatibility: if incoming URL has #/route, cleanly convert to /route
  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash !== '/') {
      const clean = hash.startsWith('/') ? hash : `/${hash}`;
      try {
        window.history.replaceState(null, '', clean);
      } catch {
        // ignore
      }
      return clean;
    }
  }

  // 4. Standard clean pathname
  const path = window.location.pathname;
  return path || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getCurrentPath());
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Synchronize on browser Back / Forward and Hash change
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Clean navigation handler (standard clean URLs without #)
  const handleNavigate = (path: string) => {
    let cleanPath = path;
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    try {
      window.history.pushState(null, '', cleanPath);
    } catch {
      window.location.hash = cleanPath;
    }
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search handler
  const handleSearch = (query: string) => {
    handleNavigate(`/danh-muc/all?q=${encodeURIComponent(query)}`);
  };

  // View routing resolution
  const renderCurrentView = () => {
    // 1. Article view: /bai-viet/:slug
    if (currentPath.startsWith('/bai-viet/')) {
      const slug = currentPath.replace('/bai-viet/', '').split('?')[0];
      return (
        <ArticleView
          slug={slug}
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 2. Category view: /danh-muc/:slug
    if (currentPath.startsWith('/danh-muc/')) {
      const slug = currentPath.replace('/danh-muc/', '').split('?')[0];
      return (
        <CategoryView
          categorySlug={slug}
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 3. Schedule view: /lich-khai-giang
    if (currentPath.startsWith('/lich-khai-giang')) {
      return (
        <ScheduleView
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 4. Courses catalog view: /khoa-hoc
    if (currentPath.startsWith('/khoa-hoc')) {
      return (
        <CategoryView
          categorySlug="all"
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 5. Textbooks / Giáo trình view: /giao-trinh
    if (currentPath.startsWith('/giao-trinh')) {
      return (
        <CategoryView
          categorySlug="giao-trinh"
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 6. About view: /gioi-thieu
    if (currentPath.startsWith('/gioi-thieu')) {
      return (
        <AboutView
          onNavigate={handleNavigate}
          onSearch={handleSearch}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 7. Contact & Branch view: /lien-he
    if (currentPath.startsWith('/lien-he')) {
      return (
        <ContactView
          onNavigate={handleNavigate}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      );
    }

    // 8. Admin View: /admin
    if (currentPath.startsWith('/admin')) {
      return <AdminView onNavigate={handleNavigate} />;
    }

    // Default: Home view
    return (
      <HomeView
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />
    );
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {renderCurrentView()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/* Main View Router Content */}
      <div className="flex-1 w-full transition-opacity duration-300">
        {renderCurrentView()}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Controls & Consultation Modal */}
      <FloatingWidgets
        isModalOpen={isRegisterModalOpen}
        onCloseModal={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
