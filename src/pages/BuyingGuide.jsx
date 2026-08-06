import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles, AlertTriangle, ArrowLeft, ArrowUpRight, HelpCircle, Layers, ThumbsUp } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function BuyingGuide() {
  const { categorySlug } = useParams();

  // Map category slugs to full category titles and guide content
  const guides = {
    'best-kitchen-and-dining-gadgets': {
      title: 'Best Kitchen & Dining Gadgets (Buying Guide)',
      category: 'Kitchen & Dining',
      intro: 'Equipping your kitchen with smart, space-saving gadgets can elevate your cooking game. From cordless portable USB blenders to versatile multi-functional desktop electric hot pots, this guide details the best products selected for their durability, convenience, and superior buyer reviews.',
      keyFactors: [
        { name: 'Power and Efficiency', desc: 'Ensure motor ratings (e.g., 150W for blenders) are strong enough to process ingredients quickly.' },
        { name: 'Material and Food Safety', desc: 'Always prioritize BPA-free food-grade polymers (like PCTG) and Teflon-free non-stick coatings.' },
        { name: 'Multi-functionality', desc: 'Look for appliances that serve dual purposes, such as hot pots that also let you steam simultaneously.' },
        { name: 'Ease of Cleaning', desc: 'Pots with non-stick liners and blenders with one-touch auto-cleaning make kitchen maintenance seamless.' }
      ],
      faqs: [
        { q: 'Can portable blenders crush ice cubes?', a: 'Yes! High-speed 6-blade blenders like the Slique Portable Blender crush smaller ice cubes easily when mixed with liquids.' },
        { q: 'Is it safe to wash electric hot pots under a running tap?', a: 'Always wash the non-stick interior lining carefully and prevent water from directly splashing into the integrated electrical power port.' }
      ]
    },
    'best-home-and-living-accessories': {
      title: 'Best Home & Living Accessories (Buying Guide)',
      category: 'Home & Living',
      intro: 'Creating a cozy, aesthetically pleasing atmosphere inside your home plays a crucial role in relaxation. This guide highlights the absolute finest ultrasonic humidifiers and atmospheric projector lamps curated for modern Pakistani bedrooms and living rooms.',
      keyFactors: [
        { name: 'Ultrasonic Atomization', desc: 'Silent ultrasonic technology (<28 dB) ensures high mist dispersion without disturbing your sleep or work.' },
        { name: 'Lens Clarity', desc: 'For projection lamps, thick optical crystal lenses generate much deeper and high-definition colored light halos.' },
        { name: 'Safety Protections', desc: 'Humidifiers must contain a waterless auto shut-off function to prevent dry boiling and electrical risks.' },
        { name: 'Aesthetic Versatility', desc: 'Look for lamps with 180-degree adjustable angles to project beautiful glows across walls and ceilings.' }
      ],
      faqs: [
        { q: 'What are the benefits of using an ultrasonic cool mist humidifier?', a: 'They introduce healthy moisture to dry indoor air, providing relief for dry sinuses, chapped lips, and seasonal allergies.' },
        { q: 'Can I add any essential oils to the diffuser?', a: 'Yes! You can add 2-3 drops of natural essential oils (lavender, eucalyptus) to the water reservoir for relaxing aromatherapy.' }
      ]
    },
    'best-bags-and-travel-essentials': {
      title: 'Best Bags & Travel Essentials (Buying Guide)',
      category: 'Bags & Travel',
      intro: 'Protect your costly tech gear and travel hassle-free with anti-theft smart backpacks and heavy-duty EVA hardshell organizer pouches. Select the perfect storage accessories built to withstand demanding business trips and rugged vacations.',
      keyFactors: [
        { name: 'Anti-Theft Features', desc: 'Look for TSA-approved combination locks and hidden back pockets to secure laptops and credit cards.' },
        { name: 'Hardshell Protection', desc: 'Shock-resistant EVA hardshell pouches protect delicate external SSDs, chargers, and power banks from high drops.' },
        { name: 'Fabric and Water Resistance', desc: 'Premium Oxford and waterproof jacquard fabrics protect expensive electronics from rain showers.' },
        { name: 'Ergonomic Weight Support', desc: 'Honeycomb breathable shoulder pads distribute luggage loads evenly, reducing posture fatigue.' }
      ],
      faqs: [
        { q: 'Can a 15.6 inch laptop fit into these backpacks?', a: 'Yes, the Mark Ryden MR-9008 backpack features a heavily padded slot specifically designed to fit laptops up to 15.6 inches.' },
        { q: 'Are hardshell tech pouches better than soft sleeves?', a: 'Absolutely. Hardshell EVA materials absorb heavy impact and prevent items from crushing when squished inside luggage.' }
      ]
    },
    'best-bedding-and-bath-comforts': {
      title: 'Best Bedding & Bath Comforts (Buying Guide)',
      category: 'Bedding & Bath',
      intro: 'Achieve deep, restorative sleep by choosing orthopedic memory foam cervical supports and friction-free satin pillowcases. We compare and review top bedding enhancements to maximize your sleeping posture and overall wellness.',
      keyFactors: [
        { name: 'Slow-Rebound Memory Foam', desc: 'Cervical contour pillows conform to the natural curvature of your neck, releasing muscle tension.' },
        { name: 'Hypoallergenic Properties', desc: 'Ensure covers are breathable, dust-mite resistant, and machine washable for maximum cleanliness.' },
        { name: 'Silk or Satin Textures', desc: 'Satin pillowcases create a friction-free surface that prevents morning hair frizz, breakage, and wrinkles.' },
        { name: 'Dual-Height Design', desc: 'Different heights cater dynamically to both side sleepers and back sleepers.' }
      ],
      faqs: [
        { q: 'Why is memory foam better than cotton/feather pillows?', a: 'Memory foam provides uniform cervical orthopedic support and retains its therapeutic shape without flattening out over time.' },
        { q: 'Do satin pillowcases prevent hair breakage?', a: 'Yes! Silk and satin reduce friction by up to 45%, preventing curly hair frizz, knots, and breakage.' }
      ]
    }
  };

  const guide = guides[categorySlug];

  useSEO({
    title: guide ? guide.title : 'Premium Buying Guides',
    description: guide ? guide.intro : 'Expert product curation and dynamic comparisons.',
    canonical: `/guides/${categorySlug}`
  });

  // Filter products matching this guide's category
  const relatedProducts = useMemo(() => {
    if (!guide) return [];
    return productsData.filter(p => p.category === guide.category).slice(0, 4);
  }, [guide]);

  if (!guide) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 dark:text-white">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Buying Guide Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
          The requested buying guide slug does not exist in our system. Let's redirect you back home.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500">Buying Guides</span>
          <ChevronRight size={12} />
          <span className="text-slate-700 dark:text-slate-300 font-extrabold truncate">{guide.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-md p-6 sm:p-10 space-y-4 transition-colors">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border border-orange-200/40 dark:border-orange-950/50">
            <Sparkles size={12} />
            Editorial Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {guide.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-semibold">
            {guide.intro}
          </p>
        </div>

        {/* Key Decision Factors */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ThumbsUp className="text-orange-500 dark:text-orange-400" size={20} />
            Key Factors to Consider Before Buying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.keyFactors.map((factor, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  {factor.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={22} className="text-orange-500" />
                Expert Recommended {guide.category} Picks
              </h2>
              <Link
                to={`/products?category=${encodeURIComponent(guide.category)}`}
                className="text-xs sm:text-sm font-bold text-orange-500 hover:underline flex items-center gap-1"
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Frequently Asked Questions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <HelpCircle className="text-orange-500 dark:text-orange-400" size={20} />
            Buying Guide FAQs
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Q: {faq.q}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
