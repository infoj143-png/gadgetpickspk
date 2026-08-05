import React from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import ComparisonTable from '../components/ComparisonTable';
import useSEO from '../hooks/useSEO';
import { ChevronRight, Scale, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Compare() {
  const { type } = useParams();

  // Determine which products to compare based on the slug/type parameter
  let matchedProducts = [];
  let title = "Product Comparison";
  let description = "Compare premium tech products side-by-side to make the best purchasing choice.";
  let badge = "Expert Comparison";

  if (type === 'lenovo-vs-jbl-earbuds') {
    // Compare Lenovo LP40 vs JBL Wave 100
    matchedProducts = productsData.filter((p) => p.id === 'eb-04' || p.id === 'eb-05');
    title = "Lenovo ThinkPlus LP40 vs JBL Wave 100 Earbuds";
    description = "A deep head-to-head matchup between the budget dynamic Lenovo and premium sound signature JBL Wave 100.";
    badge = "Brand Battle";
  } else if (type === 'jbl-vs-soundcore') {
    // Compare JBL Tune 510BT vs Soundcore Life Q20 / R50i vs Wave 100
    matchedProducts = productsData.filter((p) => p.id === 'hp-04' || p.id === 'hp-05');
    title = "JBL Tune 510BT vs Anker Soundcore Life Q20";
    description = "Comparing two legendary wireless headsets: JBL’s Pure Bass powerhouse versus Soundcore’s Hybrid ANC master.";
    badge = "Headphone Battle";
  } else if (type === 'best-earbuds-under-5000') {
    // Compare Earbuds under 5000: Anker R50i (4650), QCY T13 (3850), Lenovo LP40 (3200), JBL Wave 100 (4900)
    matchedProducts = productsData.filter((p) => p.category === 'Earbuds' && p.currentPrice <= 5000);
    title = "Best True Wireless Earbuds Under Rs. 5,000";
    description = "Comprehensive lineup of top-performing budget wireless earbuds available in Pakistan under 5,000 PKR.";
    badge = "Budget Picks";
  } else if (type === 'best-headphones-under-10000') {
    // Compare Headphones under 10000: Baseus H1i (8850), Sennheiser HD 206 (6999), JBL Tune 510BT (9499)
    matchedProducts = productsData.filter((p) => p.category === 'Headphones' && p.currentPrice <= 10000);
    title = "Best Over-Ear & On-Ear Headphones Under Rs. 10,000";
    description = "Premium acoustic performance headsets under 10,000 PKR curated for students, gamers, and audiophiles.";
    badge = "Best Value";
  }

  useSEO({
    title: `${title} - GadgetPicksPK Comparison`,
    description: description,
    canonical: `/compare/${type}`
  });

  if (matchedProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">Comparison Page Not Found</h2>
        <p className="text-slate-500 text-sm">
          The requested comparison criteria does not match any items in our current database index. Let's get you back.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-8 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Section */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">Comparisons</span>
          <ChevronRight size={12} />
          <span className="text-orange-500">{title}</span>
        </nav>

        {/* Headings */}
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            <Scale className="text-orange-500" size={28} />
            {title}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
            {description} All compared prices are scanned automatically. Read through detailed specifications and expert highlights to make a verified purchase.
          </p>
        </div>

        {/* Dynamic Table Card */}
        <div className="mb-12">
          <ComparisonTable
            products={matchedProducts}
            title={title}
            description={description}
            badge={badge}
          />
        </div>

        {/* Trust disclaimer */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 flex gap-3 items-start max-w-3xl">
          <ShieldCheck className="text-orange-500 flex-shrink-0 mt-0.5" size={22} />
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900">How We Run Comparisons</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              GadgetPicksPK compiles technical benchmarks directly from verified product datasheets, manual reviews, and real customer feedback on Daraz PK. Our goal is to provide a neutral comparison to aid your decision. We do not accept sponsored placements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
