import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Share2, ArrowUpRight, Copy, Check, Sparkles, Tag, Flame, ShieldAlert, Award } from 'lucide-react';
import ImageLazy from './ImageLazy';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const absoluteProductUrl = `${window.location.origin}/products/${product.id}`;

    // Attempt standard Navigator API
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out the ${product.name} on GadgetPicksPK!`,
        url: absoluteProductUrl,
      }).catch((err) => {
        // Fallback if browser cancelled
        setShowShareModal(true);
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const absoluteProductUrl = `${window.location.origin}/products/${product.id}`;
    navigator.clipboard.writeText(absoluteProductUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareModal(false);
    }, 2000);
  };

  // Format currency with commas (PKR format)
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Generate dynamic badges style configuration
  const getBadgeStyle = (badge) => {
    const lowerBadge = badge.toLowerCase();
    if (lowerBadge.includes('best seller')) {
      return 'bg-amber-500 text-white';
    }
    if (lowerBadge.includes('trending')) {
      return 'bg-rose-500 text-white';
    }
    if (lowerBadge.includes("editor's choice")) {
      return 'bg-indigo-600 text-white';
    }
    if (lowerBadge.includes('new')) {
      return 'bg-emerald-500 text-white';
    }
    if (lowerBadge.includes('budget pick')) {
      return 'bg-blue-500 text-white';
    }
    if (lowerBadge.includes('premium pick')) {
      return 'bg-violet-600 text-white';
    }
    if (lowerBadge.includes('top rated')) {
      return 'bg-yellow-500 text-slate-900 dark:text-slate-900';
    }
    return 'bg-slate-700 text-white';
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden relative"
    >
      {/* Upper Interactive Area */}
      <div>

        {/* Product Image Box */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950">
          <ImageLazy
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Dynamic Badges List from JSON database */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.discount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm">
                -{product.discount}% OFF
              </span>
            )}
            {product.badges && product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm flex items-center gap-1 ${getBadgeStyle(badge)}`}
              >
                {badge}
              </span>
            ))}
            {!product.badges && product.isFeatured && (
              <span className="bg-slate-900 dark:bg-slate-950 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm flex items-center gap-1">
                <Sparkles size={10} className="text-orange-400" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content body padding */}
        <div className="p-4 space-y-2.5">

          {/* Category Tag & Rating Stars */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-orange-500 dark:text-orange-400 tracking-widest uppercase bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-bold leading-none">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed min-h-[32px]">
            {product.shortDescription}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(product.currentPrice)}
            </span>
            {product.oldPrice && (
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Button footer actions */}
      <div className="p-4 pt-0">
        <div className="flex gap-2 items-center">

          {/* Action button: Direct checkout link */}
          <a
            href={product.darazUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-xs font-extrabold rounded-xl shadow-md shadow-orange-500/10 transition-colors"
          >
            Buy on Daraz
            <ArrowUpRight size={14} />
          </a>

          {/* Share Trigger Icon */}
          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 hover:border-orange-100 dark:hover:border-orange-950 rounded-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all flex-shrink-0"
            title="Share Product"
            aria-label="Share product details"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* Embedded Simple Modal overlay for local manual copying fallback */}
      {showShareModal && (
        <div
          onClick={(e) => { e.stopPropagation(); setShowShareModal(false); }}
          className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs z-[100] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 border border-slate-100 dark:border-slate-800 shadow-2xl relative animate-scaleUp text-slate-900 dark:text-slate-100"
          >
            <h4 className="font-extrabold text-slate-800 dark:text-white text-base mb-2">Share recommendations</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Copy the product recommendation link below to share with your friends and family.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/products/${product.id}`}
                className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium px-3 py-2 outline-none text-slate-600 dark:text-slate-400"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors flex items-center justify-center min-w-[40px]"
                aria-label="Copy to clipboard"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {copied && (
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2 text-center">
                Copied successfully to clipboard!
              </p>
            )}

            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-extrabold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
