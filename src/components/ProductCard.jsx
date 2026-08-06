import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Share2, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import ImageLazy from './ImageLazy';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Fallbacks for product properties
  const productId = product?.id || 'unknown';
  const brandName = product?.brand || 'Premium';
  const modelName = product?.model || 'Product';
  const productName = product?.name || 'High-Quality Lifestyle Product';
  const categoryName = product?.category || 'Lifestyle';
  const productImage = product?.image || '';
  const productRating = product?.rating !== undefined ? product.rating : null;
  const productReviewsCount = product?.reviewsCount !== undefined ? product.reviewsCount : null;
  const productSoldCount = product?.soldCount || null;
  const currentPrice = product?.currentPrice || 0;
  const oldPrice = product?.oldPrice || null;
  const discount = product?.discount || 0;
  const shortDescription = product?.shortDescription || 'Authentic top-rated home and lifestyle accessory recommended by experts.';
  const darazUrl = product?.darazUrl || 'https://www.daraz.pk';
  const badges = product?.badges || [];
  const isFeatured = product?.isFeatured || false;

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const absoluteProductUrl = `${window.location.origin}/products/${productId}`;

    // Attempt standard Navigator API
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: `Check out the ${productName} on GadgetPicksPK!`,
        url: absoluteProductUrl,
      }).catch(() => {
        // Fallback if browser cancelled
        setShowShareModal(true);
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    const absoluteProductUrl = `${window.location.origin}/products/${productId}`;
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

  // Generate highly descriptive alt text for images to satisfy SEO requirements
  const descriptiveAlt = `${brandName} ${modelName} - ${productName}`;

  return (
    <article
      onClick={() => navigate(`/products/${productId}`)}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden relative"
      aria-label={`View detailed review and specifications for ${productName}`}
    >
      {/* Upper Interactive Area */}
      <div>

        {/* Product Image Box */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950">
          <ImageLazy
            src={productImage}
            alt={descriptiveAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Dynamic Badges List from JSON database */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm">
                -{discount}% OFF
              </span>
            )}
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm flex items-center gap-1 ${getBadgeStyle(badge)}`}
              >
                {badge}
              </span>
            ))}
            {badges.length === 0 && isFeatured && (
              <span className="bg-slate-900 dark:bg-slate-950 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm flex items-center gap-1">
                <Sparkles size={10} className="text-orange-400" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content body padding */}
        <div className="p-4 space-y-2.5">

          {/* Category Tag & Rating Stars / Sold count row */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="text-[10px] font-extrabold text-orange-500 dark:text-orange-400 tracking-widest uppercase bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
              {categoryName}
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* Rating block with fallback */}
              {productRating !== null ? (
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400">
                  <Star size={11} fill="currentColor" />
                  <span className="text-[11px] font-bold leading-none">
                    {productRating}
                    {productReviewsCount !== null && (
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 ml-0.5">
                        ({productReviewsCount})
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Unrated</span>
              )}

              {/* Sold count badge with fallback */}
              {productSoldCount ? (
                <span className="text-slate-500 dark:text-slate-450 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {productSoldCount} sold
                </span>
              ) : null}
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-2 min-h-[40px] leading-snug">
            {productName}
          </h3>

          {/* Short description */}
          <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed min-h-[32px]">
            {shortDescription}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(currentPrice)}
            </span>
            {oldPrice && (
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 line-through">
                {formatCurrency(oldPrice)}
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
            href={darazUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 text-white text-xs font-extrabold rounded-xl shadow-md shadow-orange-500/10 transition-colors"
            aria-label={`Buy ${productName} on Daraz`}
          >
            Buy on Daraz
            <ArrowUpRight size={14} />
          </a>

          {/* Share Trigger Icon */}
          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 hover:border-orange-100 dark:hover:border-orange-950 rounded-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all flex-shrink-0"
            title="Share Product"
            aria-label={`Share ${productName} details`}
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
                value={`${window.location.origin}/products/${productId}`}
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
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
