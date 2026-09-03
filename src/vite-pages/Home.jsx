import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Home as HomeIcon,
  Luggage,
  Bed,
  Sparkles,
  Shirt,
  Heart,
  Search,
  ChevronRight,
  ChevronLeft,
  Flame,
  Star,
  Percent,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Tag,
  Eye,
  Mail,
  Zap,
  HelpCircle,
  ThumbsUp,
  Award
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { injectJSONLD, removeJSONLD, getOrganizationSchema, getWebsiteSchema, getFAQSchema } from '../utils/schemas';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  // SEO Setup for 14 August Independence Day Campaign
  useSEO({
    title: 'GadgetPicksPK – 14 August Azadi Deals & Trending Products in Pakistan',
    description: 'Celebrate Pakistan Independence Day with GadgetPicksPK! Discover premium 14 August Azadi Deals, top trending products, and exclusive Daraz affiliate shopping recommendations.',
    canonical: '/',
    ogImage: 'https://gadgetpickspk.vercel.app/pakistan-14-august-azadi-deals-gadgetpickspk.webp'
  });

  // Inject Schemas
  useEffect(() => {
    const orgSchema = getOrganizationSchema();
    const webSchema = getWebsiteSchema();
    injectJSONLD('org-schema', orgSchema);
    injectJSONLD('web-schema', webSchema);

    const faqSchema = getFAQSchema(homeFaqs);
    injectJSONLD('home-faq-schema', faqSchema);

    return () => {
      removeJSONLD('org-schema');
      removeJSONLD('web-schema');
      removeJSONLD('home-faq-schema');
    };
  }, []);

  // Load recently viewed
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const hydrated = list.map(id => productsData.find(p => p.id === id)).filter(Boolean);
    setRecentlyViewed(hydrated);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Seven Main Categories
  const sevenCategories = [
    {
      name: 'Kitchen & Dining',
      icon: <UtensilsCrossed className="text-orange-500" size={24} />,
      desc: 'Smart blenders, electric steamers, premium non-stick pots & tools.',
      count: '15+ Products',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400&auto=format&fit=crop',
      link: '/category/kitchen-dining'
    },
    {
      name: 'Home & Living',
      icon: <HomeIcon className="text-orange-500" size={24} />,
      desc: 'Ultrasonic humidifiers, mood-setting lamps & home comfort items.',
      count: '20+ Products',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400&auto=format&fit=crop',
      link: '/category/home-living'
    },
    {
      name: 'Bags & Travel',
      icon: <Luggage className="text-orange-500" size={24} />,
      desc: 'TSA-safe backpacks, tech pouches, and travel organizers.',
      count: '12+ Products',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop',
      link: '/category/bags-travel'
    },
    {
      name: 'Bedding & Bath',
      icon: <Bed className="text-orange-500" size={24} />,
      desc: 'Orthopedic memory foam pillows, satin sheets & soft towels.',
      count: '18+ Products',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=400&auto=format&fit=crop',
      link: '/category/bedding-bath'
    },
    {
      name: 'Laundry & Cleaning',
      icon: <Sparkles className="text-orange-500" size={24} />,
      desc: 'Handheld cordless stick vacuums, steamers & scrubbers.',
      count: '10+ Products',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400&auto=format&fit=crop',
      link: '/category/laundry-cleaning'
    },
    {
      name: 'Fashion',
      icon: <Shirt className="text-orange-500" size={24} />,
      desc: 'Minimalist genuine leather wallets, sunglasses & unisex bags.',
      count: '24+ Products',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=400&auto=format&fit=crop',
      link: '/category/fashion'
    },
    {
      name: 'Pet Supplies',
      icon: <Heart className="text-orange-500" size={24} />,
      desc: 'Automatic cat water fountains, grooming brushes & healthy pet gear.',
      count: '14+ Products',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop',
      link: '/category/pet-supplies'
    }
  ];

  // Featured 14 August products
  const featuredProductA = productsData.find(p => p.id === 'fs-12');
  const featuredProductB = productsData.find(p => p.id === 'fs-11');

  // Dynamic Product Queries
  // 1. 🔥 Trending Products
  const product1 = productsData.find(p => p.id === "fs-12");
  const product2 = productsData.find(p => p.id === "fs-11");

  const otherTrending = productsData.filter(
    p => p.isTrending && p.id !== "fs-12" && p.id !== "fs-11"
  );

  const trendingProductsList = [];
  if (product1) trendingProductsList.push(product1);
  if (product2) trendingProductsList.push(product2);
  trendingProductsList.push(...otherTrending);

  const trendingProducts = trendingProductsList.slice(0, 4);

  // 2. 🏆 Best Selling Products
  const bestSellers = productsData.filter(p => p.isBestSeller).slice(0, 4);

  // 3. ⭐ Top Rated Products
  const topRated = [...productsData].sort((a, b) => b.rating - a.rating).slice(0, 4);

  // 4. 💰 Featured Deals (Biggest discount)
  const featuredDeals = [...productsData].sort((a, b) => b.discount - a.discount).slice(0, 4);

  // 5. 🎯 Today's Picks
  const todaysPicks = productsData.slice(0, 4);

  // 6. 💸 Budget Picks (Price <= 5000)
  const budgetPicks = productsData.filter(p => p.currentPrice <= 5000).slice(0, 4);

  // 7. 🆕 Recently Added
  const recentlyAdded = productsData.filter(p => p.isNewArrival).slice(0, 4);

  const homeFaqs = [
    {
      q: "Does GadgetPicksPK sell products directly?",
      a: "No, GadgetPicksPK is a premium curational and review-based recommendation engine. We hand-pick top lifestyle, travel, and home products available on Daraz PK, review their specs, pros, and cons, and provide you with authentic affiliate links to purchase them directly from verified sellers."
    },
    {
      q: "Are the prices listed here 100% accurate?",
      a: "While we do our best to run daily updates on pricing, Daraz PK sellers may change their prices, stock levels, or active coupons at any time. We recommend checking the direct Daraz listing to confirm the current live price."
    },
    {
      q: "How do you select your products?",
      a: "We choose products based on five key pillars: average buyer ratings (usually 4.5+ stars), high reviews count, seller reliability indexes, robust structural quality (such as genuine leather or BPA-free polymers), and excellent value-for-money propositions."
    },
    {
      q: "Are there any hidden costs when clicking your affiliate links?",
      a: "Absolutely not. Clicking our links costs you nothing extra. We receive a tiny commission from Daraz for directing verified buyers, which supports our testing and continuous updates."
    },
    {
      q: "What categories does GadgetPicksPK focus on?",
      a: "In line with our high-quality lifestyle focus, we recommend products strictly under seven main categories: Kitchen & Dining, Home & Living, Bags & Travel, Bedding & Bath, Laundry & Cleaning, Fashion, and Pet Supplies."
    }
  ];

  return (
    <div className="space-y-16 pb-16">

      {/* 14 August Independence Day / Azadi Deals Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-950 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Hero Left: Strategic Copywriting */}
            <div className="lg:col-span-7 text-left text-white space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/35 backdrop-blur-xs">
                <Sparkles size={12} className="text-emerald-400 animate-pulse" />
                14 August Independence Day Celebration
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                Azadi Deals <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Specials for Pakistan</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-350 leading-relaxed font-semibold">
                Celebrate Pakistan's Independence Day with premium handpicked products. Discover verified ratings, expert reviews, and exclusive Daraz Azadi discount pricing on top trending lifestyle gear.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#trending-deals"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-1px]"
                >
                  Explore Azadi Deals
                  <ChevronRight size={16} />
                </a>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl border border-slate-700 hover:border-slate-650 transition-all hover:translate-y-[-1px]"
                >
                  View All Products
                </Link>
              </div>
            </div>

            {/* Hero Right: Premium Responsive Promotional Image Element */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[1024/1536] max-h-[500px] lg:max-h-[580px] overflow-hidden rounded-2xl shadow-2xl border border-slate-800 bg-slate-900 group">
                <img
                  src="/pakistan-14-august-azadi-deals-gadgetpickspk.webp"
                  alt="Pakistan 14 August Azadi Deals at GadgetPicksPK"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  width="1024"
                  height="1536"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Search Bar Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-150 dark:border-slate-800 p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center transition-colors">
          <div className="text-center md:text-left flex-shrink-0">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">Quick Search</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Find products, brands, or models instantly</p>
          </div>
          <form onSubmit={handleSearchSubmit} className="w-full flex-1 relative flex items-center">
            <input
              type="text"
              placeholder="Search e.g., Xiaomi Deerma, Catit, Slique, wallet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-950 rounded-xl text-sm font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Affiliate Disclosure Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-orange-500 flex-shrink-0" size={18} />
            <p>
              <strong>Affiliate Disclosure:</strong> GadgetPicksPK is supported by readers. When you buy through our outbound affiliate links, we may earn a small referral commission at absolutely no extra cost to you.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-100/60 dark:bg-orange-950/25 border border-orange-200 dark:border-orange-950 px-3 py-1 rounded-full text-orange-800 dark:text-orange-400 text-[10px] font-bold whitespace-nowrap">
            Updated Daily
          </div>
        </div>
      </div>

      {/* 🔥 TOP TRENDING PRODUCTS SECTION (Prominent, right below Hero and Search/Disclosure) */}
      <section id="trending-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-500 border border-rose-500/25 uppercase tracking-widest">
            <Flame size={12} className="text-rose-500 animate-pulse" />
            Azadi Top Picks
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            🔥 Top Trending Products
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Our most popular handpicked fashion and lifestyle essentials featured first for Pakistan.
          </p>
        </div>

        {/* Feature the TWO main products FIRST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProductA && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-500/30 hover:border-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden group">
              <div className="w-full md:w-2/5 aspect-square bg-slate-50 dark:bg-slate-950 relative">
                <img
                  src={featuredProductA.image}
                  alt="Men's Premium Summer Tracksuit – T-Shirt & Trouser Set"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="300"
                  height="300"
                  loading="eager"
                />
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm">
                  🔥 Top Deal
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-orange-500 tracking-wider uppercase">
                    {featuredProductA.category}
                  </span>
                  <Link to={`/products/${featuredProductA.id}`}>
                    <h3 className="font-black text-slate-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                      Men's Premium Summer Tracksuit – T-Shirt & Trouser Set
                    </h3>
                  </Link>
                  <p className="text-slate-500 dark:text-slate-450 text-xs leading-relaxed font-semibold line-clamp-3">
                    {featuredProductA.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    Rs. 827
                  </span>
                  <Link
                    to={`/products/${featuredProductA.id}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 group-hover:underline"
                  >
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {featuredProductB && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-500/30 hover:border-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden group">
              <div className="w-full md:w-2/5 aspect-square bg-slate-50 dark:bg-slate-950 relative">
                <img
                  src={featuredProductB.image}
                  alt="Pack of 3 Cargo Pocket Trousers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="300"
                  height="300"
                  loading="eager"
                />
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded-lg uppercase shadow-sm">
                  🔥 Best Seller
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-orange-500 tracking-wider uppercase">
                    {featuredProductB.category}
                  </span>
                  <Link to={`/products/${featuredProductB.id}`}>
                    <h3 className="font-black text-slate-900 dark:text-white text-lg group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                      Pack of 3 Cargo Pocket Trousers
                    </h3>
                  </Link>
                  <p className="text-slate-500 dark:text-slate-450 text-xs leading-relaxed font-semibold line-clamp-3">
                    {featuredProductB.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    Rs. 2,799
                  </span>
                  <Link
                    to={`/products/${featuredProductB.id}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 group-hover:underline"
                  >
                    View Details
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Trending products grid below them */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.filter(p => p.id !== 'fs-12' && p.id !== 'fs-11').map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seven Main Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-xs font-extrabold text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
            Main Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            Explore Seven Main Categories
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Carefully curated product catalogs supporting the new core lifestyle identity of GadgetPicksPK.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sevenCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(cat.link)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-500/30 transition-all cursor-pointer group text-center relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
              <div className="p-5 flex-1 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={`Discover the best ${cat.name} products and premium lifestyle accessories in Pakistan - GadgetPicksPK`}
                    className="w-full h-full object-cover object-center"
                    width="80"
                    height="80"
                    loading="lazy"
                  />
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center mb-3">
                  {cat.icon}
                </div>
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium px-2 line-clamp-2">
                  {cat.desc}
                </p>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2 py-0.5 rounded-full mt-3">
                  {cat.count}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 p-3.5 flex items-center justify-center gap-1 text-xs font-bold text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                Browse Products
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products Section */}
      {bestSellers.length > 0 && (
        <section className="bg-slate-100/50 dark:bg-slate-900/30 py-12 border-y border-slate-200/50 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                  <Award size={12} className="text-orange-500" /> Top Sales volume
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Best Selling Products
                </h2>
              </div>
              <Link
                to="/products"
                className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                See All Catalog
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Products Section */}
      {topRated.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                <Star size={12} fill="currentColor" className="text-orange-500" /> Rated 4.5+ Stars
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Top Rated Products
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Browse Top Rated
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Deals Section */}
      {featuredDeals.length > 0 && (
        <section className="bg-slate-100/50 dark:bg-slate-900/30 py-12 border-y border-slate-200/50 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                  <Percent size={12} className="text-orange-500" /> Special Markdowns
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Featured Deals
                </h2>
              </div>
              <Link
                to="/products?tag=Deals"
                className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                View Hot Deals
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Today's Picks Section */}
      {todaysPicks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                <Zap size={12} className="text-orange-500 animate-pulse" /> Handpicked Daily
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Today's Picks
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Explore Today
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {todaysPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Budget Picks Section */}
      {budgetPicks.length > 0 && (
        <section className="bg-slate-100/50 dark:bg-slate-900/30 py-12 border-y border-slate-200/50 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                  <Tag size={12} className="text-orange-500" /> Maximum Value
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Budget Picks (Under Rs. 5,000)
                </h2>
              </div>
              <Link
                to="/products"
                className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                View Value Picks
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {budgetPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Added Section */}
      {recentlyAdded.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded border border-orange-100 dark:border-orange-900/50">
                <Clock size={12} className="text-orange-500" /> Brand New Additions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Recently Added
              </h2>
            </div>
            <Link
              to="/products?tag=Featured"
              className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Browse Latest
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyAdded.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products Section */}
      {recentlyViewed.length > 0 && (
        <section className="bg-orange-50/40 dark:bg-orange-950/20 py-12 border-y border-orange-100/60 dark:border-orange-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-white">
              <Eye className="text-orange-500" size={20} />
              <h2 className="text-xl sm:text-2xl font-black">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Trust GadgetPicksPK Section */}
      <section className="bg-slate-900 dark:bg-slate-950 text-white py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest">
              Our Core Principles
            </span>
            <h2 className="text-3xl font-black mt-2">
              Why Trust GadgetPicksPK?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              We stand apart by offering highly researched, consumer-first reviews rather than hard-selling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-800 dark:border-slate-900 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Genuine Daraz Sellers</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                We crawl and verify products from official flagship stores (Mall) or top-rated marketplace vendors on Daraz to keep you safe from counterfeit units.
              </p>
            </div>

            <div className="bg-slate-800/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-800 dark:border-slate-900 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <HeartHandshake size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Verified Discount Codes</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                We periodically scan prices, pointing you to genuine markdown deals, lightning promos, and bundle coupons that save you money.
              </p>
            </div>

            <div className="bg-slate-800/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-800 dark:border-slate-900 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <Truck size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Fast Standard Shipping</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                All listed accessories are physical inventory items stocked in Pakistan, giving you quick, reliable standard Daraz shipping directly to your city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-xs font-extrabold text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Learn more about how our product curation and recommendation systems operate.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-slate-800 dark:text-white font-extrabold hover:text-orange-500 dark:hover:text-orange-400 text-sm sm:text-base outline-none transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={18} className="text-orange-500 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400 flex-shrink-0 ml-4" />
                )}
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 bg-slate-50/50 dark:bg-slate-950/50 font-semibold">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-slate-900 dark:to-slate-800 border border-orange-200/60 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full -ml-12 -mb-12" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-orange-600 dark:text-orange-400 bg-orange-100/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50">
              Never Miss A Deal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Get Curated Deals in Your Inbox
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Sign up for our newsletter to receive weekly alerts for massive coupon drops, markdown deals, and hot reviews in Pakistan.
            </p>

            <AnimatePresence mode="wait">
              {!newsletterSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address (e.g. asim@gmail.com)"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-500/10 transition-colors cursor-pointer"
                  >
                    Subscribe Now
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl max-w-sm mx-auto text-emerald-800 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="text-emerald-500" size={18} />
                  Thank you! You have successfully subscribed to GadgetPicksPK.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}
