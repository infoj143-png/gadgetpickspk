import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  X,
  Star,
  ArrowUpDown,
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';

export default function CategoryListing() {
  useSEO({
    title: 'Products Recommendations Catalog',
    description: 'Browse, search and filter the top rated, premium earbuds, headphones, computer and mobile accessories in Pakistan.',
    canonical: '/products'
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(20000); // Max range default
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating-desc');
  const [selectedTag, setSelectedTag] = useState('All');

  // URL Sync
  useEffect(() => {
    const q = searchParams.get('search') || '';
    const cat = searchParams.get('category') || 'All';
    const tag = searchParams.get('tag') || 'All';

    setSearchQuery(q);
    setSelectedCategory(cat);
    setSelectedTag(tag);

    // Simulate small smooth loader transition
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Categories list
  const categories = ['All', 'Earbuds', 'Headphones', 'Mobile Accessories', 'Computer Accessories'];
  const tags = ['All', 'Featured', 'Trending', 'Deals'];

  // Handle URL updating
  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchParams({});
    setPriceRange(20000);
    setMinRating(0);
    setSortBy('rating-desc');
  };

  // Filtered and Sorted Products memo block
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.shortDescription.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 3. Tags
    if (selectedTag && selectedTag !== 'All') {
      if (selectedTag.toLowerCase() === 'featured') {
        result = result.filter(p => p.isFeatured);
      } else if (selectedTag.toLowerCase() === 'trending') {
        result = result.filter(p => p.isTrending);
      } else if (selectedTag.toLowerCase() === 'deals') {
        result = result.filter(p => p.isTopDeal || p.discount > 30);
      }
    }

    // 4. Price range (Cap current price)
    result = result.filter(p => p.currentPrice <= priceRange);

    // 5. Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 6. Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.currentPrice - b.currentPrice;
      }
      if (sortBy === 'price-desc') {
        return b.currentPrice - a.currentPrice;
      }
      if (sortBy === 'discount-desc') {
        return b.discount - a.discount;
      }
      // Default / High rated first
      return b.rating - a.rating;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedTag, priceRange, minRating, sortBy]);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <ChevronRight size={12} />
        <span className="text-orange-500">Products Recommendations</span>
      </nav>

      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Recommendations Catalog
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Showing {filteredProducts.length} Premium verified genuine items in Pakistan.
        </p>
      </div>

      {/* Page Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Side Filters Bar (Desktop side panel, mobile full width top-stacked) */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm self-start">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
              <SlidersHorizontal size={18} className="text-orange-500" />
              Filter Tools
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 hover:underline"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          {/* Search Sub-Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Keyword Search</label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search specs or brands..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateFilters('search', e.target.value);
                }}
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-lg text-xs outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); updateFilters('search', ''); }}
                  className="absolute right-2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Category</label>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilters('category', cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors flex justify-between items-center ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory.toLowerCase() === cat.toLowerCase() && <ChevronRight size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Tag / Badges</label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tg) => (
                <button
                  key={tg}
                  onClick={() => updateFilters('tag', tg)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedTag.toLowerCase() === tg.toLowerCase()
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {tg}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Max Budget</label>
              <span className="text-xs font-bold text-orange-500">{formatCurrency(priceRange)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>{formatCurrency(1000)}</span>
              <span>{formatCurrency(20000)}</span>
            </div>
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Min Rating Stars</label>
            <div className="flex gap-1.5">
              {[0, 4.5, 4.7, 4.8].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border flex items-center justify-center gap-1 transition-colors ${
                    minRating === rating
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white border-slate-200 hover:bg-amber-50 hover:text-amber-600 text-slate-600'
                  }`}
                >
                  <Star size={10} fill={rating > 0 ? "currentColor" : "none"} />
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Sort Ordering</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-lg text-xs font-bold p-2.5 outline-none transition-colors"
            >
              <option value="rating-desc">Rating: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount-desc">Discounts: Large to Small</option>
            </select>
          </div>
        </aside>

        {/* Right Side Products Grid listing */}
        <section className="lg:col-span-3 space-y-6">

          {/* Active filters status bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/60 text-xs text-slate-500 font-semibold">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400">Active Tags:</span>
              <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md font-bold uppercase text-[10px]">
                Category: {selectedCategory}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold uppercase text-[10px]">
                Tag: {selectedTag}
              </span>
              {minRating > 0 && (
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold uppercase text-[10px] flex items-center gap-0.5">
                  <Star size={10} fill="currentColor" /> {minRating}+ Stars
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown size={14} className="text-slate-400" />
              <span>Sorted by dynamic score</span>
            </div>
          </div>

          {/* Product Items Loop */}
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty Fallback State */
            <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                <FolderOpen size={30} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg">No Recommendations Found</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We couldn't find any products matching your specific filters. Try loosening your budget slider or picking a wider category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
