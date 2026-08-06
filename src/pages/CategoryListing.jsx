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
  FolderOpen,
  Tag,
  Percent,
  Check
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';

export default function CategoryListing() {
  useSEO({
    title: 'Products Recommendations Catalog',
    description: 'Browse, search, sort and filter the top rated, premium earbuds, headphones, computer and mobile accessories in Pakistan with our Smart Search engine.',
    canonical: '/products'
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(20000); // Max range default
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
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

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Categories list
  const categories = ['All', 'Earbuds', 'Headphones', 'Mobile Accessories', 'Computer Accessories'];
  const tags = ['All', 'Featured', 'Trending', 'Deals'];

  // Dynamically extract all unique brands from products database
  const availableBrands = useMemo(() => {
    const brands = productsData.map((p) => p.brand).filter(Boolean);
    return Array.from(new Set(brands)).sort();
  }, []);

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

  // Toggle brand selections
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchParams({});
    setPriceRange(20000);
    setMinRating(0);
    setSelectedBrands([]);
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
             p.category.toLowerCase().includes(q) ||
             p.brand.toLowerCase().includes(q) ||
             (p.model && p.model.toLowerCase().includes(q))
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

    // 4. Dynamic Brand checkboxes
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // 5. Price range (Cap current price)
    result = result.filter(p => p.currentPrice <= priceRange);

    // 6. Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 7. Advanced Sorting
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
      if (sortBy === 'newest') {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      if (sortBy === 'popularity') {
        // Sort by review density / volume
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedTag, selectedBrands, priceRange, minRating, sortBy]);

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
        <span className="text-orange-500">Products Catalog</span>
      </nav>

      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Recommendations Smart Search
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Filter through {filteredProducts.length} premium, verified gear items in Pakistan.
        </p>
      </div>

      {/* Page Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Side Filters Bar */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm self-start">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-base">
              <SlidersHorizontal size={18} className="text-orange-500" />
              Filter Tools
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 hover:underline cursor-pointer"
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
                className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-xs outline-none transition-all placeholder:text-slate-400 font-semibold"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); updateFilters('search', ''); }}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors flex justify-between items-center cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory.toLowerCase() === cat.toLowerCase() && <ChevronRight size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Brand Checklist Sub-Filter */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block pb-1 border-b border-slate-100">
              Filter By Brand
            </label>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 pt-1">
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className="flex items-center gap-2 w-full text-left cursor-pointer group text-xs font-bold text-slate-700 hover:text-orange-500 transition-colors"
                >
                  <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                    selectedBrands.includes(brand)
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'border-slate-300 bg-slate-50 group-hover:border-orange-300'
                  }`}>
                    {selectedBrands.includes(brand) && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span>{brand}</span>
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                    selectedTag.toLowerCase() === tg.toLowerCase()
                      ? 'bg-slate-950 border-slate-950 text-white shadow-md'
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
                  className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    minRating === rating
                      ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
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
              className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl text-xs font-extrabold p-2.5 outline-none transition-colors"
            >
              <option value="rating-desc">Highest Rating First</option>
              <option value="popularity">Popularity (Most Reviewed)</option>
              <option value="price-asc">Price: Lowest to Highest</option>
              <option value="price-desc">Price: Highest to Lowest</option>
              <option value="discount-desc">Biggest Discount First</option>
              <option value="newest">Sort by Newest</option>
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
              {selectedBrands.length > 0 && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold uppercase text-[10px]">
                  Brands ({selectedBrands.length})
                </span>
              )}
              {minRating > 0 && (
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold uppercase text-[10px] flex items-center gap-0.5">
                  <Star size={10} fill="currentColor" /> {minRating}+ Stars
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600">
              <ArrowUpDown size={14} className="text-orange-500" />
              <span>Smart Match Matrix</span>
            </div>
          </div>

          {/* Product Items Loop */}
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
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
              <p className="text-slate-500 text-xs leading-relaxed">
                We couldn't find any products matching your specific filters. Try loosening your budget slider or picking a wider category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
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
