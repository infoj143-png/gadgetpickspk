import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Search,
  ShieldCheck,
  Truck,
  Headphones,
  TrendingUp,
  Sparkles,
  Percent,
  Smartphone,
  Monitor,
  Star,
  Flame,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle,
  ThumbsUp,
  Clock,
  Heart
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { injectJSONLD, removeJSONLD, getOrganizationSchema } from '../utils/schemas';

export default function Home() {
  // Inject Organization JSON-LD Schema
  useEffect(() => {
    const orgSchema = getOrganizationSchema();
    injectJSONLD('org-schema', orgSchema);
    return () => {
      removeJSONLD('org-schema');
    };
  }, []);
  useSEO({
    title: 'Home | GadgetPicksPK - Premium Gadgets & Accessories Recommendations in Pakistan',
    description: 'Expert hand-picked reviews and links for the finest Earbuds, Headphones, Mobile and Computer Accessories in Pakistan on Daraz.',
    canonical: '/'
  });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  // Home Hero Slider Data
  const slides = [
    {
      title: "Elevate Your Sound Experience",
      subtitle: "Discover high-fidelity Earbuds & Headphones verified by experts.",
      badge: "Sound Collection",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
      cta: "Explore Audio",
      link: "/products?category=Earbuds"
    },
    {
      title: "Maximize Mobile Productivity",
      subtitle: "Top-tier premium chargers, cables, and power banks for absolute convenience.",
      badge: "Power Up",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop",
      cta: "Shop Accessories",
      link: "/products?category=Mobile%20Accessories"
    },
    {
      title: "Streamline Your Workspace",
      subtitle: "High-end mechanical keyboards, mice, and hubs to enhance workflow.",
      badge: "Office Tech",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop",
      cta: "Discover Gear",
      link: "/products?category=Computer%20Accessories"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Filter products for homepage sections based on strict specifications
  const featuredDeals = productsData.filter(p => p.isTopDeal || p.discount > 33).slice(0, 4);
  const trendingProducts = productsData.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = productsData.filter(p => p.rating >= 4.8 && p.reviewsCount > 150).slice(0, 4);

  // Simulating "recently added" based on ID order
  const recentlyAdded = [...productsData].reverse().slice(0, 4);

  // Main 4 category definitions
  const categories = [
    {
      name: 'Earbuds',
      icon: <Sparkles className="text-orange-500" size={24} />,
      desc: 'True Wireless Stereo, ANC & deep bass buds',
      color: 'bg-orange-50 hover:bg-orange-100/85',
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: 'Headphones',
      icon: <Headphones className="text-orange-500" size={24} />,
      desc: 'Over-ear and on-ear comfortable headsets',
      color: 'bg-orange-50 hover:bg-orange-100/80',
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: 'Mobile Accessories',
      icon: <Smartphone className="text-orange-500" size={24} />,
      desc: 'Fast chargers, durable cables & power banks',
      color: 'bg-orange-50 hover:bg-orange-100/80',
      image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?q=80&w=300&auto=format&fit=crop"
    },
    {
      name: 'Computer Accessories',
      icon: <Monitor className="text-orange-500" size={24} />,
      desc: 'Ergonomic mice, mechanical keyboards & USB hubs',
      color: 'bg-orange-50 hover:bg-orange-100/80',
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=300&auto=format&fit=crop"
    }
  ];

  const faqs = [
    {
      q: "Does GadgetPicksPK sell products directly?",
      a: "No, GadgetPicksPK is a premium curational and review-based recommendation engine. We hand-pick top accessories available on Daraz PK, review their specs, pros, and cons, and provide you with authentic affiliate links to purchase them directly from verified sellers."
    },
    {
      q: "Are the prices listed here 100% accurate?",
      a: "While we do our best to run daily updates on pricing, Daraz PK sellers may change their prices, stock levels, or active coupons at any time. We recommend checking the direct Daraz listing to confirm the current live price."
    },
    {
      q: "How do you select your products?",
      a: "We choose products based on five key pillars: average buyer ratings (usually 4.5+ stars), high reviews count, seller reliability indexes, robust structural quality (such as braided cables or aluminum alloys), and excellent value-for-money propositions."
    },
    {
      q: "Are there any hidden costs when clicking your affiliate links?",
      a: "Absolutely not. Clicking our links costs you nothing extra. We receive a tiny commission from Daraz for directing verified buyers, which supports our testing and continuous updates."
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-16 pb-16">

      {/* 1. Hero Banner Section with Custom Slides & Search Bar overlay */}
      <section className="relative overflow-hidden bg-slate-950 h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
        {/* Slides */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-transparent z-10" />
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover object-center opacity-65"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-left text-white space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/25 text-orange-400 border border-orange-500/30 backdrop-blur-sm">
              <Sparkles size={12} />
              {slides[currentSlide].badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium">
              {slides[currentSlide].subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={slides[currentSlide].link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-1px]"
              >
                {slides[currentSlide].cta}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 z-30 p-2 text-white/75 hover:text-white bg-slate-900/40 hover:bg-slate-900/70 border border-white/10 rounded-full transition-colors hidden md:block"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 z-30 p-2 text-white/75 hover:text-white bg-slate-900/40 hover:bg-slate-900/70 border border-white/10 rounded-full transition-colors hidden md:block"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-orange-500' : 'w-2 bg-white/45 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Embedded Search Bar Box */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="text-center md:text-left flex-shrink-0">
            <h3 className="font-extrabold text-slate-800 text-base">Quick Search</h3>
            <p className="text-xs text-slate-500">Find exactly what you want instantly</p>
          </div>
          <form onSubmit={handleSearchSubmit} className="w-full flex-1 relative flex items-center">
            <input
              type="text"
              placeholder="Search by brand name, model, specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl text-sm font-semibold outline-none transition-all placeholder:text-slate-400"
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

      {/* 2. Top Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
            Top Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Browse Our Main Divisions
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Carefully curated product listings to narrow down your next high-tech upgrade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />

              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 mb-4 border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <div className="inline-flex p-2.5 bg-orange-50 text-orange-500 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-orange-500 transition-colors">
                {cat.name}
              </h3>
              <p className="text-slate-500 text-xs mt-1 font-medium px-4 line-clamp-2">
                {cat.desc}
              </p>

              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:underline">
                View Recommendations
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded">
              <Tag size={13} /> Exclusive Bargains
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Deals
            </h2>
          </div>
          <Link
            to="/products?tag=deals"
            className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 transition-colors"
          >
            See All Deals
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Trending Products Section */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded">
                <Flame size={13} className="text-orange-500" /> Hot Right Now
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Trending Products
              </h2>
            </div>
            <Link
              to="/products?tag=trending"
              className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 transition-colors"
            >
              See All Trending
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Selling Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded">
              <ThumbsUp size={13} /> Crowd Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Best Selling Products
            </h2>
          </div>
          <Link
            to="/products?tag=featured"
            className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 transition-colors"
          >
            See Top Best Sellers
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Recently Added Section */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded">
                <Clock size={13} /> Just Arrived
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Recently Added
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-1.5 font-bold text-sm text-orange-500 hover:text-orange-600 transition-colors"
            >
              View Full Catalog
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyAdded.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Trust Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest">
              Our Core Principles
            </span>
            <h2 className="text-3xl font-black mt-2">
              Why Rely On GadgetPicksPK?
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              We stand apart by offering highly researched, consumer-first reviews rather than hard-selling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Genuine Daraz Sellers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We crawl and verify products from official flagship stores (Mall) or top-rated marketplace vendors on Daraz to keep you safe from counterfeit units.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <Percent size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Verified Discount Codes</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We periodically scan prices, pointing you to genuine markdown deals, lightning promos, and bundle coupons that save you money.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center mx-auto mb-2">
                <Truck size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Fast Standard Shipping</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All listed accessories are physical inventory items stocked in Pakistan, giving you quick, reliable standard Daraz shipping directly to your city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Learn more about how our product curation and recommendation systems operate.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-slate-800 font-extrabold hover:text-orange-500 text-sm sm:text-base outline-none transition-colors"
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
                    <p className="px-6 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter CTA Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/60 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full -ml-12 -mb-12" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-orange-600 bg-orange-100/60 border border-orange-200">
              Never Miss A Markdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Tech Updates Directly In Your Inbox
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sign up for our newsletter to receive weekly alerts for massive coupon drops and top rated gadget deals in Pakistan.
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
                    className="flex-grow px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-orange-500/10 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/80 border border-emerald-200 p-4 rounded-xl max-w-sm mx-auto text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="text-emerald-500" size={18} />
                  Thank you! You have successfully subscribed.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
}
