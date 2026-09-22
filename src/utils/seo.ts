import { Article } from '../types';
import { SITE_INFO } from '../data/siteData';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  url?: string;
  article?: Article;
  keywords?: string[];
  canonicalUrl?: string;
}

/**
 * Utility to upsert meta tags in <head>
 */
export function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Utility to set or update canonical link
 */
export function setCanonical(url: string): void {
  if (typeof document === 'undefined') return;
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

/**
 * Utility to inject or update Schema.org JSON-LD structured data
 */
export function setStructuredData(schemaData: object): void {
  if (typeof document === 'undefined') return;
  const scriptId = 'schema-org-jsonld';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(schemaData);
}

/**
 * Main SEO updater function called on route transitions or view mounts
 */
export function updateSEO(seo: SEOProps): void {
  if (typeof document === 'undefined') return;

  const defaultImage = 'https://blogdaytinhoc.com/images/2024/8/1722958738_trung-tam-tin-hoc-sao-viet_big.jpg';
  const finalImage = seo.image || defaultImage;
  const finalType = seo.type || 'website';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://blogdaytinhoc.com';
  const currentHref = typeof window !== 'undefined' ? window.location.href : 'https://blogdaytinhoc.com';
  const finalUrl = seo.url || currentHref;
  const canonicalUrl = seo.canonicalUrl || finalUrl;

  // 1. Update <title>
  document.title = seo.title;

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', seo.description);
  if (seo.keywords && seo.keywords.length > 0) {
    setMetaTag('name', 'keywords', seo.keywords.join(', '));
  } else {
    setMetaTag('name', 'keywords', 'đồ họa thực chiến, dạy tin học văn phòng, khóa học autocad, học kèm 1 1, trung tâm tin học hcm');
  }
  setMetaTag('name', 'author', seo.article?.author || SITE_INFO.brandName);
  setMetaTag('name', 'robots', 'index, follow');

  // 3. OpenGraph Social Share Card Tags
  setMetaTag('property', 'og:site_name', SITE_INFO.brandName);
  setMetaTag('property', 'og:title', seo.title);
  setMetaTag('property', 'og:description', seo.description);
  setMetaTag('property', 'og:type', finalType);
  setMetaTag('property', 'og:url', finalUrl);
  setMetaTag('property', 'og:image', finalImage);
  setMetaTag('property', 'og:locale', 'vi_VN');

  // If article, enrich with article specifics
  if (finalType === 'article' && seo.article) {
    setMetaTag('property', 'article:published_time', seo.article.date);
    setMetaTag('property', 'article:author', seo.article.author);
    setMetaTag('property', 'article:section', seo.article.cat);
    if (seo.article.tags && seo.article.tags.length > 0) {
      setMetaTag('property', 'article:tag', seo.article.tags.join(', '));
    }
  }

  // 4. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.title);
  setMetaTag('name', 'twitter:description', seo.description);
  setMetaTag('name', 'twitter:image', finalImage);

  // 5. Canonical Link
  setCanonical(canonicalUrl);

  // 6. Schema.org JSON-LD Structured Data
  if (finalType === 'article' && seo.article) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': seo.article.title,
      'description': seo.article.excerpt,
      'image': [finalImage],
      'datePublished': seo.article.date,
      'dateModified': seo.article.date,
      'author': {
        '@type': 'Person',
        'name': seo.article.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_INFO.brandName,
        'logo': {
          '@type': 'ImageObject',
          'url': defaultImage
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': finalUrl
      },
      'articleSection': seo.article.cat,
      'keywords': seo.article.tags.join(', ')
    };
    setStructuredData(articleSchema);
  } else {
    // Educational Organization & LocalBusiness Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': SITE_INFO.brandName,
      'alternateName': 'Đồ Họa Thực Chiến',
      'url': currentOrigin,
      'logo': defaultImage,
      'description': SITE_INFO.intro,
      'telephone': SITE_INFO.hotline1,
      'email': SITE_INFO.email,
      'sameAs': [
        SITE_INFO.facebookUrl,
        SITE_INFO.youtubeUrl,
        SITE_INFO.zaloUrl
      ],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '193 Nguyễn Xí, Phường 26',
        'addressLocality': 'Bình Thạnh',
        'addressRegion': 'TP. Hồ Chí Minh',
        'addressCountry': 'VN'
      }
    };
    setStructuredData(orgSchema);
  }
}
