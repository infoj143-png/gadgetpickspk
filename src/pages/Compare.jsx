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
    title = "Slique Portable Blender vs Crown Electric Hot Pot Comparison in Pakistan";
    description = `Looking for the best versatile kitchen appliances? Read our head-to-head comparison between the cordless, rechargeable <a href="/products/kd-01" class="text-orange-500 hover:underline font-extrabold">Slique Portable Smoothie Blender</a> and the multi-functional desktop <a href="/products/kd-02" class="text-orange-500 hover:underline font-extrabold">Crown Electric Hot Pot & Steamer</a>. Discover which one fits your hostel or small kitchen by consulting our complete <a href="/category/kitchen-dining" class="text-orange-500 hover:underline font-extrabold">Kitchen & Dining catalog</a> or reading the expert <a href="/guides/best-kitchen-and-dining-gadgets" class="text-orange-500 hover:underline font-extrabold">Best Kitchen & Dining Gadgets Buying Guide</a>.`;
    badge = "Kitchen Battle";
  } else if (type === 'vacuum-cleaner-vs-steam-iron') {
    // Compare Xiaomi Deerma Vacuum vs Sokany Steam Iron
    matchedProducts = productsData.filter((p) => p.id === 'lc-01' || p.id === 'lc-02');
    title = "Xiaomi Deerma Vacuum vs Sokany Handheld Steam Iron — Pakistan Home Maintenance Battle";
    description = `Trying to decide between a smart vacuum and a rapid garment steamer? We present a side-by-side comparison between the lightweight, modular <a href="/products/lc-01" class="text-orange-500 hover:underline font-extrabold">Xiaomi Deerma Cordless Stick Vacuum</a> and the rapid-heating <a href="/products/lc-02" class="text-orange-500 hover:underline font-extrabold">Sokany Portable Garment Steamer</a>. Check out further high-efficiency cleaning solutions in <a href="/category/laundry-cleaning" class="text-orange-500 hover:underline font-extrabold">our Laundry & Cleaning catalog</a>.`;
    badge = "Cleaning Battle";
  } else if (type === 'best-home-gadgets-under-5000') {
    // Compare Home & Living under 5000: PureAire Humidifier (2999), Lumina Sunset Lamp (1850)
    matchedProducts = productsData.filter((p) => p.category === 'Home & Living' && p.currentPrice <= 5000);
    title = "Best Home & Living Gadgets Under Rs. 5,000 in Pakistan — Budget Decor Guide";
    description = `Wanting to elevate your bedroom or living room aesthetic on a strict budget? Compare top-performing, affordable devices under Rs. 5,000, including the relaxing <a href="/products/hl-01" class="text-orange-500 hover:underline font-extrabold">PureAire Ultrasonic Cool Mist Humidifier</a> and the photographic <a href="/products/hl-02" class="text-orange-500 hover:underline font-extrabold">Lumina Sunset Projector LED Lamp</a>. Check our comprehensive <a href="/guides/best-home-and-living-accessories" class="text-orange-500 hover:underline font-extrabold">Best Home & Living Accessories Buying Guide</a> or browse more options in <a href="/category/home-living" class="text-orange-500 hover:underline font-extrabold">our Home & Living catalog</a>.`;
    badge = "Budget Home";
  } else if (type === 'best-kitchen-tools-under-5000') {
    // Compare Kitchen under 5000: Slique Blender (3450), Crown Hot Pot (4899)
    matchedProducts = productsData.filter((p) => p.category === 'Kitchen & Dining' && p.currentPrice <= 5000);
    title = "Best Kitchen & Dining Tools Under Rs. 5,000 in Pakistan — Budget Culinary Guide";
    description = `Searching for high-value smart kitchen appliances that won't break the bank? Compare our top recommendations under Rs. 5,000, featuring the rechargeable, ice-crushing <a href="/products/kd-01" class="text-orange-500 hover:underline font-extrabold">Slique Portable Smoothie Blender</a> and the double-walled <a href="/products/kd-02" class="text-orange-500 hover:underline font-extrabold">Crown Electric Hot Pot Steamer</a>. Check our dedicated <a href="/guides/best-kitchen-and-dining-gadgets" class="text-orange-500 hover:underline font-extrabold">Best Kitchen & Dining Gadgets Buying Guide</a> or browse other budget gadgets in <a href="/category/kitchen-dining" class="text-orange-500 hover:underline font-extrabold">our Kitchen & Dining catalog</a>.`;
    badge = "Budget Kitchen";
  }

  // Create a plain text description for the meta tags to avoid raw HTML rendering in SEO descriptions
  const plainMetaDescription = description.replace(/<[^>]*>/g, '');

  useSEO({
    title: `${title} - GadgetPicksPK Comparison`,
    description: plainMetaDescription,
    canonical: `/compare/${type}`,
    noindex: matchedProducts.length === 0
  });

  if (matchedProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 dark:text-white">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Comparison Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
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
    <div className="bg-slate-50 dark:bg-slate-950 py-8 min-h-[60vh] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Section */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">Comparisons</span>
          <ChevronRight size={12} />
          <span className="text-orange-500">{title}</span>
        </nav>

        {/* Headings */}
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="text-orange-500" size={28} />
            {title}
          </h1>
          <p
            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl font-semibold"
            dangerouslySetInnerHTML={{ __html: description + " All compared prices are scanned automatically. Read through detailed specifications and expert highlights to make a verified purchase." }}
          />
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 flex gap-3 items-start max-w-3xl transition-colors">
          <ShieldCheck className="text-orange-500 flex-shrink-0 mt-0.5" size={22} />
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">How We Run Comparisons</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              GadgetPicksPK compiles technical benchmarks directly from verified product datasheets, manual reviews, and real customer feedback on Daraz PK. Our goal is to provide a neutral comparison to aid your decision. We do not accept sponsored placements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
