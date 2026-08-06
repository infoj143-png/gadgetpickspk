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
  let description = "Compare premium home and lifestyle products side-by-side to make the best purchasing choice.";
  let badge = "Expert Comparison";

  if (type === 'slique-blender-vs-hot-pot') {
    // Compare Slique Portable Blender vs Crown Electric Hot Pot
    matchedProducts = productsData.filter((p) => p.id === 'kd-01' || p.id === 'kd-02');
    title = "Slique Portable Blender vs Crown Electric Hot Pot";
    description = "Comparing the cordless portable Slique USB blender with the desktop Crown Multi-Functional electric hot pot steamer.";
    badge = "Kitchen Battle";
  } else if (type === 'vacuum-cleaner-vs-steam-iron') {
    // Compare Xiaomi Deerma Vacuum vs Sokany Steam Iron
    matchedProducts = productsData.filter((p) => p.id === 'lc-01' || p.id === 'lc-02');
    title = "Xiaomi Deerma Vacuum vs Sokany Handheld Steam Iron";
    description = "A deep comparison between Deerma’s cordless cyclonic stick vacuum and Sokany’s rapid-heating garment steamer.";
    badge = "Cleaning Battle";
  } else if (type === 'best-home-gadgets-under-5000') {
    // Compare Home & Living under 5000: PureAire Humidifier (2999), Lumina Sunset Lamp (1850)
    matchedProducts = productsData.filter((p) => p.category === 'Home & Living' && p.currentPrice <= 5000);
    title = "Best Home & Living Gadgets Under Rs. 5,000";
    description = "Sleek and aesthetic premium home decorations, sunset lamps, and humidifiers under 5,000 PKR.";
    badge = "Budget Home";
  } else if (type === 'best-kitchen-tools-under-5000') {
    // Compare Kitchen under 5000: Slique Blender (3450), Crown Hot Pot (4899)
    matchedProducts = productsData.filter((p) => p.category === 'Kitchen & Dining' && p.currentPrice <= 5000);
    title = "Best Kitchen & Dining Tools Under Rs. 5,000";
    description = "Highly practical, versatile kitchen utilities, mini cookers, and portable blenders under 5,000 PKR.";
    badge = "Budget Kitchen";
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
          <p className="text-sm text-slate-500 leading-relaxed max-w-3xl font-semibold">
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
