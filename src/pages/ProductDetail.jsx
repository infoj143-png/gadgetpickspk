import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ArrowUpRight,
  ChevronRight,
  ShoppingBag,
  Share2,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Info,
  Clock,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ImageLazy from '../components/ImageLazy';
import ProductCard from '../components/ProductCard';
import { DetailPageSkeleton } from '../components/Skeleton';
import { injectJSONLD, removeJSONLD, getProductSchema, getBreadcrumbSchema } from '../utils/schemas';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  // Local state for product-specific FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    const item = productsData.find((p) => p.id === id);
    if (item) {
      setProduct(item);
      // Set first image as default active gallery image
      if (item.images && item.images.length > 0) {
        setActiveImage(item.images[0]);
      } else {
        setActiveImage(item.image);
      }

      // Add to recently viewed list inside localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const updated = [item.id, ...stored.filter(x => x !== item.id)].slice(0, 4);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      } catch (e) {
        console.error("Local storage lookup failed", e);
      }
    } else {
      setProduct(null);
    }
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Inject dynamic schemas on page load
  useEffect(() => {
    if (product) {
      const productSchema = getProductSchema(product);
      injectJSONLD('product-schema', productSchema);

      const categorySlug = product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
      const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Recommendations', url: '/products' },
        { name: product.category, url: `/category/${categorySlug}` },
        { name: product.name, url: `/products/${product.id}` }
      ]);
      injectJSONLD('breadcrumb-schema', breadcrumbSchema);
    }

    return () => {
      removeJSONLD('product-schema');
      removeJSONLD('breadcrumb-schema');
    };
  }, [product]);

  useSEO({
    title: product ? `${product.brand} ${product.model} Review & Specifications` : 'Loading...',
    description: product ? `${product.name} specs, key features, pros, cons, expert recommendation, and buying options in Pakistan.` : 'Product details.',
    canonical: `/products/${id}`
  });

  // Dynamic Related Products: same category, different ID
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Dynamic Similar Alternatives: different brand or slightly different price tier, same category
  const similarAlternatives = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id && p.brand !== product.brand)
      .slice(0, 4);
  }, [product]);

  // Dynamic Related Categories
  const relatedCategories = useMemo(() => {
    const allCats = ['Kitchen & Dining', 'Home & Living', 'Bags & Travel', 'Bedding & Bath', 'Laundry & Cleaning', 'Fashion', 'Pet Supplies'];
    return product ? allCats.filter(c => c !== product.category) : [];
  }, [product]);

  // Popular Articles / Guides linked naturally
  const popularGuides = [
    { label: 'Best Kitchen & Dining Gadgets', slug: 'best-kitchen-and-dining-gadgets' },
    { label: 'Best Home & Living Accessories', slug: 'best-home-and-living-accessories' },
    { label: 'Best Bags & Travel Essentials', slug: 'best-bags-and-travel-essentials' },
    { label: 'Best Bedding & Bath Comforts', slug: 'best-bedding-and-bath-comforts' }
  ];

  const handleShare = () => {
    const absoluteProductUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Product Details',
        text: `Read the premium review of ${product?.name} on GadgetPicksPK!`,
        url: absoluteProductUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(absoluteProductUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  if (loading) {
    return (
      <div className="py-12 bg-slate-50 dark:bg-slate-950">
        <DetailPageSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 dark:text-white">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Recommendation Item Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          The requested product ID does not exist in our catalog index. Let's redirect you back to active catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  // Fallbacks for properties
  const brandName = product.brand || 'Premium';
  const modelName = product.model || 'Product';
  const productName = product.name || 'High-Quality Product';
  const categoryName = product.category || 'Lifestyle';
  const productRating = product.rating !== undefined ? product.rating : null;
  const productReviewsCount = product.reviewsCount !== undefined ? product.reviewsCount : null;
  const productSoldCount = product.soldCount || null;
  const currentPrice = product.currentPrice || 0;
  const oldPrice = product.oldPrice || null;
  const discount = product.discount || 0;
  const availability = product.availability || 'In Stock';
  const lastUpdated = product.lastUpdated || 'Recently';
  const longDescription = product.longDescription || '';
  const darazUrl = product.darazUrl || 'https://www.daraz.pk';
  const specifications = product.specifications || {};
  const features = product.features || [];
  const pros = product.pros || [];
  const cons = product.cons || [];
  const whoShouldBuy = product.whoShouldBuy || '';
  const buyingRecommendation = product.buyingRecommendation || '';
  const faqs = product.faqs || [];

  // Get gallery images array, fallback to single image if array is empty
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image || ''];
  const descriptiveAlt = `${brandName} ${modelName} - ${productName}`;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-8 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Section */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-orange-500">Products Catalog</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500 line-clamp-1 max-w-[250px]">{productName}</span>
        </nav>

        {/* Outer Grid Panel: Product Info */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-md p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 transition-colors">

          {/* Left Column: Interactive Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <ImageLazy
                src={activeImage || product.image}
                alt={descriptiveAlt}
                className="w-full h-full object-cover"
                width="600"
                height="600"
                loading="eager"
                fetchPriority="high"
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 py-1.5 rounded-xl uppercase shadow">
                  -{discount}% OFF
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-1 rounded-lg">
                {availability}
              </div>
            </div>

            {/* Gallery Thumbnails List */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === imgUrl ? 'border-orange-500 ring-2 ring-orange-200' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                    aria-label={`Show gallery image ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${productName} gallery thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      width="80"
                      height="80"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Certification Seal */}
            <div className="bg-orange-50 dark:bg-slate-950 border border-orange-200/60 dark:border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="text-orange-500 dark:text-orange-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-orange-900 dark:text-orange-400">Genuine Affiliate Outbound Link</h4>
                  <p className="text-[11px] text-orange-850 dark:text-slate-300 leading-relaxed font-semibold">
                    We verify sellers, ratings, and track markdown prices. Clicking "View on Daraz" takes you directly to the top rated merchant store.
                  </p>
                </div>
              </div>
              <div className="border-t border-orange-200/40 dark:border-slate-800 pt-2.5 flex gap-2 items-start text-[10px] text-orange-950 dark:text-orange-300 font-semibold bg-orange-100/30 dark:bg-orange-950/20 p-2.5 rounded-xl">
                <AlertTriangle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="leading-relaxed">
                  <strong>Disclaimer:</strong> Prices and stock levels change automatically on Daraz. PK. Always double-check dynamic live pricing prior to finalizing checkout orders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specifications, Description */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">

              {/* Badges Bar */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-[10px] font-extrabold text-orange-500 dark:text-orange-400 tracking-widest uppercase bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded-lg border border-orange-100 dark:border-orange-900/50">
                  {categoryName}
                </span>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Rating Info */}
                  {productRating !== null ? (
                    <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/25 px-2.5 py-1 rounded-lg border border-amber-100 dark:border-amber-900/45 text-amber-700 dark:text-amber-400 text-xs font-extrabold">
                      <Star size={14} fill="currentColor" />
                      <span>
                        {productRating}
                        {productReviewsCount !== null && ` (${productReviewsCount} reviews on Daraz)`}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Unrated</span>
                  )}

                  {/* Sold count badge */}
                  {productSoldCount && (
                    <span className="text-slate-500 dark:text-slate-450 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700">
                      {productSoldCount} sold
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Brand Model labels */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-400 block uppercase tracking-wider">
                  {brandName} &bull; {modelName}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                  {productName}
                </h1>
              </div>

              {/* Last Updated badge */}
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-bold bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 w-max">
                <Clock size={13} />
                <span>Last Updated: {lastUpdated}</span>
              </div>

              {/* Pricing section */}
              <div className="flex items-baseline gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100/80 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Discounted Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                    {formatCurrency(currentPrice)}
                  </span>
                </div>
                {oldPrice && (
                  <div className="space-y-0.5 self-end">
                    <span className="text-xs text-slate-400 line-through font-semibold block">
                      {formatCurrency(oldPrice)}
                    </span>
                    <span className="text-xs font-extrabold text-orange-500 block">
                      Save {formatCurrency(oldPrice - currentPrice)} ({discount}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-[10px] uppercase tracking-widest text-slate-400">Expert Curated Review</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                  {longDescription}
                </p>
              </div>

            </div>

            {/* Outbound affiliate direct actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={darazUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-1px] cursor-pointer"
                  aria-label={`Buy ${productName} on Daraz`}
                >
                  <ShoppingBag size={20} />
                  View on Daraz PK
                  <ArrowUpRight size={18} />
                </a>

                {/* Share Page Link */}
                <button
                  onClick={handleShare}
                  className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 hover:border-orange-100 dark:hover:border-orange-950 rounded-xl text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  aria-label={`Share the review of ${productName}`}
                >
                  <Share2 size={16} />
                  {copied ? 'Copied Link!' : 'Share Review'}
                </button>
              </div>

              {copied && (
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold text-center">
                  Product review link copied to your clipboard successfully!
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Specifications Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Tech Specifications & Key Features list */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs list */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors">
              <h3 className="font-black text-slate-900 dark:text-white text-lg flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Info size={20} className="text-orange-500" />
                Technical Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    {Object.entries(specifications).map(([key, val], index) => (
                      <tr
                        key={key}
                        className={`border-b border-slate-100/80 dark:border-slate-800/80 ${
                          index % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-950/20' : 'bg-transparent'
                        }`}
                      >
                        <td className="py-3 px-4 font-extrabold text-slate-500 dark:text-slate-400 w-1/3">{key}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Features array rendering */}
            {features.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors">
                <h3 className="font-black text-slate-900 dark:text-white text-lg flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <Sparkles size={20} className="text-orange-500" />
                  Key Features & Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl flex gap-3 items-start">
                      <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pros & Cons Columns (Expert breakdown) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
              <h3 className="font-black text-slate-900 dark:text-white text-lg pb-2 border-b border-slate-100 dark:border-slate-800">
                Quick Highlights
              </h3>

              {/* Pros list */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 font-bold">
                  <ThumbsUp size={14} /> Pros / Advantages
                </h4>
                <ul className="space-y-2">
                  {pros.map((p, idx) => (
                    <li key={idx} className="flex gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] flex-shrink-0 font-bold animate-pulse">
                        ✓
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons list */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-1.5 font-bold">
                  <ThumbsDown size={14} /> Cons / Limitations
                </h4>
                <ul className="space-y-2">
                  {cons.map((c, idx) => (
                    <li key={idx} className="flex gap-2 text-xs font-semibold text-slate-750 dark:text-slate-300 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                        &times;
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Who should buy it & Buying recommendation callouts */}
            <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 dark:border-slate-900 transition-colors">
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
                  Who Should Buy?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {whoShouldBuy || 'Tech consumers looking for top quality features.'}
                </p>
              </div>

              <div className="border-t border-slate-800 dark:border-slate-900 pt-4 space-y-2">
                <h4 className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">
                  Buying Recommendation
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {buyingRecommendation || 'An excellent purchase option in this tier.'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Product-specific FAQs accordion */}
        {faqs.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 mb-12 space-y-6 transition-colors">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <HelpCircle size={22} className="text-orange-500" />
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Product FAQs</h3>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-orange-50/20 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm flex items-center justify-between outline-none transition-all"
                  >
                    <span>{faq.q}</span>
                    <span className="text-orange-500 font-black">
                      {openFaq === idx ? '–' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Categories and Popular Articles SEO Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Related Categories */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 space-y-4 transition-colors">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Layers size={18} className="text-orange-500" />
              Related Categories
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {relatedCategories.map((cat, idx) => {
                const categorySlug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <Link
                    key={idx}
                    to={`/category/${categorySlug}`}
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 rounded-xl text-xs font-bold transition-all"
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 space-y-4 transition-colors">
            <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <FileText size={18} className="text-orange-500" />
              Popular Articles & Guides
            </h3>
            <div className="flex flex-col gap-2">
              {popularGuides.map((guide, idx) => (
                <Link
                  key={idx}
                  to={`/guides/${guide.slug}`}
                  className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1 hover:underline transition-colors"
                >
                  <ChevronRight size={14} className="text-orange-500" />
                  {guide.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Recommendations */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 mb-12">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={20} className="text-orange-500" />
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Similar Alternatives Recommendations */}
        {similarAlternatives.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={20} className="text-orange-500" />
                Similar Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarAlternatives.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sticky Mobile CTA Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 shadow-xl flex items-center justify-between gap-4 animate-slideUp transition-colors">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate uppercase tracking-widest">{brandName}</span>
          <span className="text-sm font-black text-slate-900 dark:text-white leading-tight truncate">{formatCurrency(currentPrice)}</span>
        </div>
        <a
          href={darazUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow max-w-[200px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
          aria-label={`Buy ${productName} on Daraz`}
        >
          View on Daraz
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
