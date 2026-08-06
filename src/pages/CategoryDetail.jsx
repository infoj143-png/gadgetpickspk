import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  BookOpen,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Star,
  ThumbsUp,
  ShoppingBag
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import ProductCard from '../components/ProductCard';
import { injectJSONLD, removeJSONLD, getCategorySchema, getBreadcrumbSchema, getFAQSchema } from '../utils/schemas';

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  // Find category metadata from slug
  const categoryMeta = useMemo(() => {
    return categoriesData.find((cat) => cat.slug === categorySlug);
  }, [categorySlug]);

  // Set SEO headers dynamically
  useSEO({
    title: categoryMeta ? `${categoryMeta.title}` : 'Category Recommendations Catalog',
    description: categoryMeta ? categoryMeta.metaDescription : 'Explore top rated and expert recommended products.',
    canonical: categoryMeta ? `/category/${categorySlug}` : '/products'
  });

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    if (!categoryMeta) return [];
    return productsData.filter(p => p.category.toLowerCase() === categoryMeta.name.toLowerCase());
  }, [categoryMeta]);

  // Query Featured Products
  const featuredProducts = useMemo(() => {
    const list = categoryProducts.filter(p => p.isFeatured || p.isEditorChoice || p.isTrending);
    return list.length > 0 ? list : categoryProducts.slice(0, 1);
  }, [categoryProducts]);

  // Query Best Selling Products
  const bestSellingProducts = useMemo(() => {
    const list = categoryProducts.filter(p => p.isBestSeller || p.isTopDeal || p.rating >= 4.7);
    return list.length > 0 ? list : categoryProducts;
  }, [categoryProducts]);

  // Get Related Categories
  const relatedCategories = useMemo(() => {
    return categoriesData.filter((cat) => cat.slug !== categorySlug);
  }, [categorySlug]);

  // Toggle FAQ accordion
  const handleToggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Inject Schemas
  useEffect(() => {
    if (categoryMeta && categoryProducts.length > 0) {
      const categorySchema = getCategorySchema(categoryMeta.name, categoryProducts);
      injectJSONLD('category-schema', categorySchema);

      const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Products Catalog', url: '/products' },
        { name: categoryMeta.name, url: `/category/${categorySlug}` }
      ]);
      injectJSONLD('category-breadcrumb-schema', breadcrumbSchema);

      if (categoryMeta.faqs && categoryMeta.faqs.length > 0) {
        const faqSchema = getFAQSchema(categoryMeta.faqs);
        injectJSONLD('category-faq-schema', faqSchema);
      }
    }

    return () => {
      removeJSONLD('category-schema');
      removeJSONLD('category-breadcrumb-schema');
      removeJSONLD('category-faq-schema');
    };
  }, [categoryMeta, categorySlug, categoryProducts]);

  // Empty or invalid category fallback
  if (!categoryMeta) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4 dark:text-white">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Category Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          We couldn't find the lifestyle category you are looking for. Let's direct you to our smart products catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft size={16} /> Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">

        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-orange-500 transition-colors">Products Catalog</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500 font-extrabold">{categoryMeta.name}</span>
        </nav>

        {/* Hero Banner Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 aspect-[21/9] min-h-[260px] sm:min-h-[320px] md:min-h-[380px] flex items-center border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
            <img
              src={categoryMeta.heroImage}
              alt={categoryMeta.name}
              className="w-full h-full object-cover object-center opacity-50"
            />
          </div>

          <div className="relative z-20 max-w-2xl pl-6 sm:pl-12 pr-6 text-white space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-sm uppercase tracking-wider">
              <Sparkles size={11} className="text-orange-400 animate-pulse" />
              Verified Curation
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              {categoryMeta.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-lg line-clamp-2">
              Browse top rated, authentic accessories in Pakistan with comprehensive reviews, spec breakdowns, and direct affiliate links.
            </p>
          </div>
        </div>

        {/* Description Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors duration-300">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block">
              Editorial Overview
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
              {categoryMeta.description}
            </p>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="text-orange-500 animate-pulse" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Featured {categoryMeta.name} Recommendations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Best Selling Products Section */}
        {bestSellingProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Award className="text-orange-500" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Best Selling {categoryMeta.name} Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Buying Guide Checklist Section */}
        {categoryMeta.buyingGuide && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors duration-300 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="text-orange-500" size={22} />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {categoryMeta.buyingGuide.title}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-semibold">
              {categoryMeta.buyingGuide.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {categoryMeta.buyingGuide.factors.map((factor, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center font-black text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                    {factor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {factor.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions Section */}
        {categoryMeta.faqs && categoryMeta.faqs.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <HelpCircle className="text-orange-500" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4 max-w-4xl">
              {categoryMeta.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleToggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between text-slate-850 dark:text-white font-extrabold hover:text-orange-500 dark:hover:text-orange-400 text-sm sm:text-base outline-none transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp size={18} className="text-orange-500 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4 bg-slate-50/30 dark:bg-slate-950/20">
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories Navigation Section */}
        {relatedCategories.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors duration-300 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Layers size={18} className="text-orange-500" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Explore Other Categories
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {relatedCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-slate-750 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl text-xs font-extrabold transition-all"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
