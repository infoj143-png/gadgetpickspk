import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ArrowUpRight,
  Check,
  X,
  ChevronRight,
  ShoppingBag,
  Share2,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Copy,
  Flame,
  Layers,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ImageLazy from '../components/ImageLazy';
import ProductCard from '../components/ProductCard';
import { DetailPageSkeleton } from '../components/Skeleton';
import { injectJSONLD, removeJSONLD, getProductSchema, getBreadcrumbSchema } from '../utils/schemas';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Find the specific item matching route id parameter
    const item = productsData.find((p) => p.id === id);
    if (item) {
      setProduct(item);
    } else {
      setProduct(null);
    }
    // Simulate slight transition loader
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Inject Schemas dynamically on mount/update
  useEffect(() => {
    if (product) {
      // 1. Inject product schema
      const productSchema = getProductSchema(product);
      injectJSONLD('product-schema', productSchema);

      // 2. Inject breadcrumbs schema
      const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Products Catalog', url: '/products' },
        { name: product.category, url: `/products?category=${encodeURIComponent(product.category)}` },
        { name: product.name, url: `/products/${product.id}` }
      ]);
      injectJSONLD('breadcrumb-schema', breadcrumbSchema);
    }

    return () => {
      removeJSONLD('product-schema');
      removeJSONLD('breadcrumb-schema');
    };
  }, [product]);

  // Set page meta details using SEO custom hook
  useSEO({
    title: product ? `${product.name} Review & Purchase Links` : 'Loading Product...',
    description: product ? product.shortDescription : 'Product specification and genuine Daraz checkout options.',
    canonical: `/products/${id}`
  });

  // Calculate related products (same category, different id)
  const relatedProducts = React.useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const handleShare = () => {
    const absoluteProductUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out the review of ${product.name} on GadgetPicksPK!`,
        url: absoluteProductUrl
      });
    } else {
      navigator.clipboard.writeText(absoluteProductUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Currency Formatter
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
      <div className="py-12 bg-slate-50">
        <DetailPageSkeleton />
      </div>
    );
  }

  // 404 handler inside page if product doesn't exist
  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">Review Item Not Found</h2>
        <p className="text-slate-500 text-sm">
          The requested product ID does not exist in our catalog or might have been removed. Let's redirect you back to active catalog.
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

  return (
    <div className="bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Section */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-orange-500">Products Catalog</Link>
          <ChevronRight size={12} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-orange-500">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-orange-500 line-clamp-1 max-w-[200px]">{product.name}</span>
        </nav>

        {/* Outer White Card Layout */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-md p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">

          {/* Left Column: Lazy loaded product preview image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
              <ImageLazy
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Floating Badges */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black tracking-widest px-3 py-1.5 rounded-xl uppercase shadow">
                  -{product.discount}% OFF
                </div>
              )}
            </div>

            {/* Seller Certification Seal & Prices notice */}
            <div className="bg-orange-50 border border-orange-200/60 rounded-xl p-4 space-y-3">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-orange-900">Genuine Daraz Outbound Link</h4>
                  <p className="text-[11px] text-orange-800 leading-relaxed">
                    We verify sellers, reviews, and track markdown prices. Clicking "View on Daraz" takes you directly to official store listings.
                  </p>
                </div>
              </div>
              <div className="border-t border-orange-200/40 pt-2.5 flex gap-2 items-start text-[11px] text-orange-950 font-semibold bg-orange-100/30 p-2 rounded-lg">
                <AlertTriangle className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                <p className="leading-relaxed">
                  <strong>Notice:</strong> Prices and availability are subject to change on Daraz PK at any time. Always double-check live price tags on checkout pages.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions, Price and specifications */}
          <div className="flex flex-col justify-between space-y-6">

            <div className="space-y-4">

              {/* Category, Rating row */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-extrabold text-orange-500 tracking-widest uppercase bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                  {product.category}
                </span>

                {/* Rating score details */}
                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 text-amber-700 text-xs font-extrabold">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating} ({product.reviewsCount} reviews on Daraz)</span>
                </div>
              </div>

              {/* Title name */}
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Price Details */}
              <div className="flex items-baseline gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Discounted Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                    {formatCurrency(product.currentPrice)}
                  </span>
                </div>
                {product.oldPrice && (
                  <div className="space-y-0.5 self-end">
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(product.oldPrice)}
                    </span>
                    <span className="text-xs font-extrabold text-orange-500 block">
                      Save {formatCurrency(product.oldPrice - product.currentPrice)} ({product.discount}%)
                    </span>
                  </div>
                )}
              </div>

              {/* Long Description */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Expert Curated Review</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

            </div>

            {/* Bottom Actions CTA buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={product.darazUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:translate-y-[-1px]"
                >
                  <ShoppingBag size={18} />
                  View on Daraz PK
                  <ArrowUpRight size={16} />
                </a>

                {/* Share Page Link */}
                <button
                  onClick={handleShare}
                  className="px-4 py-3.5 bg-slate-50 hover:bg-orange-50 border border-slate-200/60 hover:border-orange-100 rounded-xl text-slate-600 hover:text-orange-500 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 size={16} />
                  {copied ? 'Copied Link!' : 'Share Review'}
                </button>
              </div>

              {copied && (
                <p className="text-[10px] text-emerald-600 font-bold text-center">
                  Product review link copied to your clipboard successfully!
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Specifications Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Tech Specifications */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-4">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info size={20} className="text-orange-500" />
              Technical Specifications
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], index) => (
                    <tr
                      key={key}
                      className={`border-b border-slate-100/80 ${
                        index % 2 === 0 ? 'bg-slate-50/50' : 'bg-transparent'
                      }`}
                    >
                      <td className="py-3 px-4 font-extrabold text-slate-500 w-1/3">{key}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pros & Cons Columns (Expert breakdown) */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-6">
            <h3 className="font-black text-slate-900 text-lg pb-2 border-b border-slate-100">
              Quick Highlights
            </h3>

            {/* Pros list */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
                <ThumbsUp size={14} /> Pros / Advantages
              </h4>
              <ul className="space-y-2">
                {product.pros.map((p, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-semibold text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] flex-shrink-0">
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons list */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-red-500 flex items-center gap-1.5">
                <ThumbsDown size={14} /> Cons / Limitations
              </h4>
              <ul className="space-y-2">
                {product.cons.map((c, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-semibold text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] flex-shrink-0">
                      &times;
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Related Products Display section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Layers size={20} className="text-orange-500" />
                More {product.category} Recommendations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
