import React, { useState, useEffect } from 'react';

/**
 * Reusable ImageLazy component for high-performance lazy loading with fallback skeletons.
 */
export default function ImageLazy({ src, alt, className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    if (!src) {
      setError(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {/* Skeleton screen loader visible until loaded */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400 text-xs font-semibold">
          No Image Available
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'
          }`}
        />
      )}
    </div>
  );
}
