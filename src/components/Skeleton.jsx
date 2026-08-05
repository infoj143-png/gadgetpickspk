import React from 'react';

/**
 * Reusable loading skeleton loaders.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-4 space-y-4 animate-pulse">
      {/* Image box skeleton */}
      <div className="w-full h-48 bg-slate-200 rounded-xl" />
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded-md w-3/4" />
        <div className="h-4 bg-slate-200 rounded-md w-1/2" />
      </div>
      {/* Pricing row skeleton */}
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-slate-200 rounded-md w-1/3" />
        <div className="h-4 bg-slate-200 rounded-md w-1/4" />
      </div>
      {/* Description skeleton */}
      <div className="space-y-1.5 pt-1">
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
      </div>
      {/* Button footer skeleton */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        <div className="h-10 bg-slate-200 rounded-xl col-span-4" />
        <div className="h-10 bg-slate-200 rounded-xl col-span-1" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="h-[400px] bg-slate-200 rounded-2xl" />
      <div className="space-y-6">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-8 bg-slate-200 rounded w-3/4" />
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="h-px bg-slate-100" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="h-12 bg-slate-200 rounded-xl w-1/2" />
      </div>
    </div>
  );
}
