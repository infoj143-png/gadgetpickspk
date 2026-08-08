import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight, HelpCircle, ShieldCheck, Mail, Percent, Flame, Layers, Scale, Sparkles, Star, BookOpen, Sun, Moon } from 'lucide-react';
import productsData from '../data/products.json';
import { useTheme } from '../utils/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Monitor scroll for premium blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and suggestion box on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location]);

  // Handle instant search suggestions as user types
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = productsData
        .filter(
          p => p.name.toLowerCase().includes(query) ||
               p.brand.toLowerCase().includes(query) ||
               p.category.toLowerCase().includes(query)
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleCategorySelect = (category) => {
    setIsCategoryDropdownOpen(false);
    const slug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    navigate(`/category/${slug}`);
  };

  // Seven Main Categories
  const categories = [
    'Kitchen & Dining',
    'Home & Living',
    'Bags & Travel',
    'Bedding & Bath',
    'Laundry & Cleaning',
    'Fashion',
    'Pet Supplies'
  ];

  const comparisons = [
    { label: 'Slique Blender vs Hot Pot', path: '/compare/slique-blender-vs-hot-pot' },
    { label: 'Vacuum Cleaner vs Steam Iron', path: '/compare/vacuum-cleaner-vs-steam-iron' },
    { label: 'Best Home Gadgets Under 5k', path: '/compare/best-home-gadgets-under-5000' },
    { label: 'Best Kitchen Tools Under 5k', path: '/compare/best-kitchen-tools-under-5000' }
  ];

  const buyingGuides = [
    { label: 'Best Kitchen & Dining Gadgets', path: '/guides/best-kitchen-and-dining-gadgets' },
    { label: 'Best Home & Living Accessories', path: '/guides/best-home-and-living-accessories' },
    { label: 'Best Bags & Travel Essentials', path: '/guides/best-bags-and-travel-essentials' },
    { label: 'Best Bedding & Bath Comforts', path: '/guides/best-bedding-and-bath-comforts' }
  ];

  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState(false);
  const [isGuidesDropdownOpen, setIsGuidesDropdownOpen] = useState(false);
  const compareDropdownRef = useRef(null);
  const guidesDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideDropdowns(event) {
      if (compareDropdownRef.current && !compareDropdownRef.current.contains(event.target)) {
        setIsCompareDropdownOpen(false);
      }
      if (guidesDropdownRef.current && !guidesDropdownRef.current.contains(event.target)) {
        setIsGuidesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideDropdowns);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdowns);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
      isScrolled
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-orange-200/50 dark:border-slate-800'
        : 'bg-white dark:bg-slate-900 shadow-sm border-orange-100 dark:border-slate-800'
    }`}>
      {/* Top Banner Bar */}
      <div className="bg-orange-600 text-white text-xs py-1.5 px-4 font-medium transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Percent size={14} /> 100% Genuine Recommended Products
            </span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck size={14} /> Verified Daraz Affiliates
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/disclosure" className="hover:underline flex items-center gap-1">
              Affiliate Disclosure
            </Link>
            <span className="text-orange-300">|</span>
            <Link to="/contact" className="hover:underline flex items-center gap-1">
              <Mail size={12} /> Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              GP
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                GadgetPicks<span className="text-orange-500">PK</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase">
                Premium Recommendations
              </span>
            </div>
          </Link>

          {/* Desktop Category Menu & Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl gap-3">
            {/* Category Trigger Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-600 dark:text-orange-400 rounded-lg font-semibold text-sm transition-colors border border-orange-100 dark:border-slate-700"
              >
                <Layers size={16} />
                Categories
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 max-h-80 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium text-sm transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Box */}
            <div className="flex-1 relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search verified home & lifestyle products (e.g. Xiaomi, Slique, Catit)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  className="w-full pl-4 pr-12 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950 rounded-lg text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </form>

              {/* Instant Search Suggestions Box */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-150 dark:border-slate-700 py-2 z-55 divide-y divide-slate-100 dark:divide-slate-700">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 dark:hover:bg-slate-700/50 transition-all text-slate-800 dark:text-slate-200"
                    >
                      <img
                        src={p.image}
                        alt={`${p.brand} ${p.model} - ${p.name} suggestion thumbnail`}
                        className="w-10 h-10 object-cover rounded-lg border border-slate-100 dark:border-slate-700"
                        width="40"
                        height="40"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{p.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-orange-500 dark:text-orange-400 font-black tracking-wider uppercase bg-orange-50 dark:bg-orange-950/50 px-1.5 py-0.5 rounded">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                            {p.brand}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          Rs. {p.currentPrice.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/products"
              className={`font-semibold text-sm transition-colors ${
                location.pathname === '/products' ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              All Products
            </Link>

            {/* Comparisons Dropdown */}
            <div className="relative" ref={compareDropdownRef}>
              <button
                onClick={() => setIsCompareDropdownOpen(!isCompareDropdownOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold text-sm flex items-center gap-1 transition-colors outline-none cursor-pointer"
              >
                <Scale size={15} className="text-orange-500" />
                Comparisons
              </button>
              {isCompareDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                  {comparisons.map((comp) => (
                    <Link
                      key={comp.path}
                      to={comp.path}
                      onClick={() => setIsCompareDropdownOpen(false)}
                      className="block px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium text-xs transition-colors"
                    >
                      {comp.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Buying Guides Dropdown */}
            <div className="relative" ref={guidesDropdownRef}>
              <button
                onClick={() => setIsGuidesDropdownOpen(!isGuidesDropdownOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold text-sm flex items-center gap-1 transition-colors outline-none cursor-pointer"
              >
                <BookOpen size={15} className="text-orange-500" />
                Buying Guides
              </button>
              {isGuidesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                  {buyingGuides.map((guide) => (
                    <Link
                      key={guide.path}
                      to={guide.path}
                      onClick={() => setIsGuidesDropdownOpen(false)}
                      className="block px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-medium text-xs transition-colors"
                    >
                      {guide.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products?tag=Featured"
              className="text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-semibold text-sm flex items-center gap-1"
            >
              <Flame size={15} className="text-orange-500 animate-pulse" />
              Featured
            </Link>
            <Link
              to="/disclosure"
              className={`font-semibold text-sm transition-colors ${
                location.pathname === '/disclosure' ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              Disclosure
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Actions: Menu & Search & Theme togglers */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible only on smaller devices below LG) */}
        <div className="mt-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search verified lifestyle products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950 rounded-lg text-sm outline-none transition-all dark:text-white font-medium"
            />
            <button
              type="submit"
              className="absolute right-1 p-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner py-4 px-6 space-y-4 animate-fadeIn">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Comparisons</h4>
            <div className="grid grid-cols-2 gap-2">
              {comparisons.map((comp) => (
                <Link
                  key={comp.path}
                  to={comp.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-xs rounded-lg transition-colors block"
                >
                  {comp.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Buying Guides</h4>
            <div className="grid grid-cols-2 gap-2">
              {buyingGuides.map((guide) => (
                <Link
                  key={guide.path}
                  to={guide.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-xs rounded-lg transition-colors block"
                >
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="text-left px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-xs rounded-lg transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

          <div className="flex flex-col gap-3">
            <Link
              to="/products"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-1 block"
            >
              All Products
            </Link>
            <Link
              to="/products?tag=Featured"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-1 flex items-center gap-2"
            >
              <Flame size={16} className="text-orange-500 animate-pulse" />
              Featured Picks
            </Link>
            <Link
              to="/contact"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-1 block"
            >
              Contact Us
            </Link>
            <Link
              to="/disclosure"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-1 block"
            >
              Affiliate Disclosure
            </Link>
            <Link
              to="/privacy-policy"
              className="font-bold text-sm text-slate-700 dark:text-slate-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors py-1 block"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
