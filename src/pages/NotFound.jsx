import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowUpRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function NotFound() {
  const navigate = useNavigate();

  useSEO({
    title: '404 - Page Not Found | GadgetPicksPK',
    description: 'The requested page could not be found. Navigate back to active home and lifestyle accessories recommendations.',
    canonical: '/404'
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">

      {/* Visual Indicator */}
      <div className="relative inline-block">
        <div className="w-24 h-24 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto border border-orange-100/60 dark:border-orange-900/30 shadow-inner">
          <AlertCircle size={44} />
        </div>
        <span className="absolute -bottom-1 -right-1 bg-slate-900 dark:bg-slate-950 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
          CODE 404
        </span>
      </div>

      {/* Info Area */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          The link you followed might be broken, or the product recommendation review has been archived by our editorial team.
        </p>
      </div>

      {/* Structured Category redirects */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-3 max-w-md mx-auto transition-colors">
        <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Explore Active Categories</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <Link
            to="/category/kitchen-dining"
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all border border-slate-100 dark:border-slate-800"
          >
            Kitchen & Dining
          </Link>
          <Link
            to="/category/home-living"
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all border border-slate-100 dark:border-slate-800"
          >
            Home & Living
          </Link>
          <Link
            to="/category/bags-travel"
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all border border-slate-100 dark:border-slate-800"
          >
            Bags & Travel
          </Link>
          <Link
            to="/category/pet-supplies"
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl transition-all border border-slate-100 dark:border-slate-800"
          >
            Pet Supplies
          </Link>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft size={16} /> Go Back
        </button>

        <Link
          to="/"
          className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5"
        >
          Go to Homepage
          <ArrowUpRight size={16} />
        </Link>
      </div>

    </div>
  );
}
