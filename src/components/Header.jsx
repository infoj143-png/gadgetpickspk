import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight, HelpCircle, ShieldCheck, Mail, Percent, Flame, Layers, Scale } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

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
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleCategorySelect = (category) => {
    setIsCategoryDropdownOpen(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    'Earbuds',
    'Headphones',
    'Mobile Accessories',
    'Computer Accessories'
  ];

  const comparisons = [
    { label: 'Lenovo vs JBL Earbuds', path: '/compare/lenovo-vs-jbl-earbuds' },
    { label: 'JBL vs Soundcore', path: '/compare/jbl-vs-soundcore' },
    { label: 'Best Earbuds Under 5k', path: '/compare/best-earbuds-under-5000' },
    { label: 'Best Headphones Under 10k', path: '/compare/best-headphones-under-10000' }
  ];

  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState(false);
  const compareDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideCompare(event) {
      if (compareDropdownRef.current && !compareDropdownRef.current.contains(event.target)) {
        setIsCompareDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutsideCompare);
    return () => document.removeEventListener('mousedown', handleClickOutsideCompare);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-md border-orange-200/50'
        : 'bg-white shadow-sm border-orange-100'
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
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-orange-500 transition-colors">
                GadgetPicks<span className="text-orange-500">PK</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
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
                className="flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg font-semibold text-sm transition-colors border border-orange-100"
              >
                <Layers size={16} />
                Categories
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-medium text-sm transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
              <input
                type="text"
                placeholder="Search verified gadgets (e.g. Anker, Sony, power bank)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg text-sm outline-none transition-all placeholder:text-slate-400"
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

          {/* Right Navigation Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/products"
              className={`font-semibold text-sm transition-colors ${
                location.pathname === '/products' ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
              }`}
            >
              All Products
            </Link>

            {/* Comparisons Dropdown */}
            <div className="relative" ref={compareDropdownRef}>
              <button
                onClick={() => setIsCompareDropdownOpen(!isCompareDropdownOpen)}
                className="text-slate-600 hover:text-orange-500 font-semibold text-sm flex items-center gap-1 transition-colors outline-none cursor-pointer"
              >
                <Scale size={15} className="text-orange-500" />
                Comparisons
              </button>
              {isCompareDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  {comparisons.map((comp) => (
                    <Link
                      key={comp.path}
                      to={comp.path}
                      onClick={() => setIsCompareDropdownOpen(false)}
                      className="block px-4 py-2.5 hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-medium text-xs transition-colors"
                    >
                      {comp.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products?tag=featured"
              className="text-slate-600 hover:text-orange-500 font-semibold text-sm flex items-center gap-1"
            >
              <Flame size={15} className="text-orange-500 animate-pulse" />
              Featured
            </Link>
            <Link
              to="/disclosure"
              className={`font-semibold text-sm transition-colors ${
                location.pathname === '/disclosure' ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
              }`}
            >
              Disclosure
            </Link>
          </div>

          {/* Mobile Actions: Menu & Search togglers */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
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
              placeholder="Search verified gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg text-sm outline-none transition-all"
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
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-inner py-4 px-6 space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Comparisons</h4>
                <div className="grid grid-cols-2 gap-2">
                  {comparisons.map((comp) => (
                    <Link
                      key={comp.path}
                      to={comp.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-left px-3 py-2 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-semibold text-xs rounded-lg transition-colors block"
                    >
                      {comp.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="text-left px-3 py-2 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-semibold text-xs rounded-lg transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          <div className="flex flex-col gap-3">
            <Link
              to="/products"
              className="font-bold text-sm text-slate-700 hover:text-orange-500 transition-colors py-1 block"
            >
              All Products
            </Link>
            <Link
              to="/products?tag=featured"
              className="font-bold text-sm text-slate-700 hover:text-orange-500 transition-colors py-1 flex items-center gap-2"
            >
              <Flame size={16} className="text-orange-500" />
              Featured Picks
            </Link>
            <Link
              to="/contact"
              className="font-bold text-sm text-slate-700 hover:text-orange-500 transition-colors py-1 block"
            >
              Contact Us
            </Link>
            <Link
              to="/disclosure"
              className="font-bold text-sm text-slate-700 hover:text-orange-500 transition-colors py-1 block"
            >
              Affiliate Disclosure
            </Link>
            <Link
              to="/privacy-policy"
              className="font-bold text-sm text-slate-700 hover:text-orange-500 transition-colors py-1 block"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
