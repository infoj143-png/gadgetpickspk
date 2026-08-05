import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, ShoppingBag, ArrowUpRight, Scale, ThumbsUp, ThumbsDown } from 'lucide-react';

/**
 * Reusable component to render direct dynamic product comparisons.
 */
export default function ComparisonTable({ products, title, description, badge }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Find all unique keys across all product specifications to dynamically compile comparing keys
  const specKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specifications || {})))
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-md p-6 sm:p-8 space-y-8">
      {/* Table Header / Subtitle info */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        {badge && (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded border border-orange-100">
            <Scale size={12} className="text-orange-500" />
            {badge}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h2>
        {description && <p className="text-slate-500 text-xs sm:text-sm">{description}</p>}
      </div>

      {/* Grid comparing cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-orange-200 transition-all bg-slate-50/30"
          >
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-orange-500 bg-orange-50 px-2 py-0.5 rounded">
                  {p.brand}
                </span>
                <Link to={`/products/${p.id}`} className="block">
                  <h3 className="font-extrabold text-sm text-slate-800 hover:text-orange-500 line-clamp-2 min-h-[40px]">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span>{p.rating} ({p.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Discounted price</span>
                <span className="font-black text-slate-900 text-lg">{formatCurrency(p.currentPrice)}</span>
                {p.oldPrice && (
                  <span className="text-xs text-slate-400 line-through block font-semibold">
                    {formatCurrency(p.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <a
                href={p.darazUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
              >
                <ShoppingBag size={13} /> Buy on Daraz <ArrowUpRight size={12} />
              </a>
              <Link
                to={`/products/${p.id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-slate-200 hover:border-orange-100 hover:text-orange-500 text-slate-600 font-extrabold text-xs rounded-xl bg-white transition-colors"
              >
                Read Review Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Specifications Detailed side-by-side table */}
      <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-5 py-4">
          <h3 className="font-black text-sm flex items-center gap-2">
            <Scale size={16} className="text-orange-500" /> Technical Specification Side-by-Side Comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-black text-slate-600 w-1/4">Specification Field</th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 font-black text-slate-800 w-1/4">
                    {p.brand} {p.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specKeys.map((key, index) => (
                <tr
                  key={key}
                  className={`border-b border-slate-100 ${
                    index % 2 === 0 ? 'bg-slate-50/20' : 'bg-transparent'
                  }`}
                >
                  <td className="p-4 font-bold text-slate-500">{key}</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-slate-700">
                      {p.specifications?.[key] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Highlights Comparison: Pros & Cons in side by side columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
          <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
            <ThumbsUp size={15} className="text-emerald-500" />
            Comparison Highlights / Pros
          </h4>
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block">
                  {p.brand} {p.model} Pros:
                </span>
                <ul className="space-y-1 pl-1">
                  {p.pros?.slice(0, 3).map((pro, idx) => (
                    <li key={idx} className="text-xs text-slate-600 font-semibold flex items-start gap-1.5">
                      <span className="text-emerald-500 text-[10px] mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
          <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200/60 pb-2">
            <ThumbsDown size={15} className="text-red-500" />
            Comparison Highlights / Cons
          </h4>
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block">
                  {p.brand} {p.model} Cons:
                </span>
                <ul className="space-y-1 pl-1">
                  {p.cons?.slice(0, 2).map((con, idx) => (
                    <li key={idx} className="text-xs text-slate-600 font-semibold flex items-start gap-1.5">
                      <span className="text-red-500 text-[10px] mt-0.5">×</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert recommendation panel */}
      <div className="bg-orange-50 border border-orange-200/60 rounded-2xl p-5 sm:p-6 space-y-3">
        <h4 className="font-extrabold text-sm text-orange-950 flex items-center gap-1.5 uppercase tracking-wider">
          <ShieldCheck size={16} className="text-orange-600" />
          Buying recommendation Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {products.map((p) => (
            <div key={p.id} className="space-y-1">
              <span className="text-xs font-black text-orange-900 block uppercase">
                {p.brand} {p.model} Verdict:
              </span>
              <p className="text-xs text-orange-850 leading-relaxed font-semibold">
                {p.buyingRecommendation || 'An excellent buy in its respective category.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
