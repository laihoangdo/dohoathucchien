import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  badge?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText,
  badge,
  ...props
}) => {
  const [error, setError] = useState(false);

  // Check if image is stored in custom local cache
  const localOverride = typeof window !== 'undefined' && src 
    ? localStorage.getItem(`img_cache_${src}`) || null 
    : null;

  const effectiveSrc = localOverride || src;

  if (error || !effectiveSrc) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {badge && (
          <span className="relative z-10 px-2.5 py-0.5 mb-2 text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full">
            {badge}
          </span>
        )}

        <div className="relative z-10 text-white font-semibold text-sm max-w-[85%] truncate drop-shadow">
          {alt || fallbackText || 'Đồ Họa Thực Chiến'}
        </div>

        <span className="relative z-10 text-[11px] text-blue-200/70 mt-1 font-mono">
          dohoathucchien.com
        </span>
      </div>
    );
  }

  return (
    <img
      src={effectiveSrc}
      alt={alt || 'Đồ Họa Thực Chiến'}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
