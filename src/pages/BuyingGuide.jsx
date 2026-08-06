import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles, AlertTriangle, ArrowLeft, ArrowUpRight, HelpCircle, Star, ThumbsUp, Layers, Flame, Percent } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function BuyingGuide() {
  const { categorySlug } = useParams();

  // Map category slugs to full category titles and guide content
  const guides = {
    'best-wireless-earbuds-in-pakistan': {
      title: 'Best Wireless Earbuds in Pakistan (Buying Guide)',
      category: 'Earbuds',
      intro: 'Finding premium true wireless earbuds in Pakistan can be overwhelming. From active noise cancellation (ANC) to massive battery capacities and reliable waterproof ratings, this guide highlights top-tier earbuds based on intensive testing, expert comparisons, and authentic user ratings.',
      keyFactors: [
        { name: 'Active Noise Cancellation (ANC)', desc: 'Blocks out distracting engine hums, fan whirrs, and indoor chatter.' },
        { name: 'Driver Size', desc: 'Larger drivers (e.g., 10mm to 12.4mm) deliver deep, punchy sub-bass profiles.' },
        { name: 'Playtime & Fast Charging', desc: 'Look for total backup of 30+ hours with USB-C speed charge support.' },
        { name: 'Sweat Protection', desc: 'At least IPX4 sweatproof water protection for gym workouts and light rain showers.' }
      ],
      faqs: [
        { q: 'What are the best earbuds under Rs. 5,000?', a: 'The Anker Soundcore R50i is the absolute best option under 5k with customizable EQ and powerful 10mm drivers.' },
        { q: 'Is ANC necessary for daily commuters?', a: 'Yes, ANC models like Redmi Buds 5 are highly recommended to isolate background hums in trains and traffic.' }
      ]
    },
    'best-headphones-in-pakistan': {
      title: 'Best Headphones in Pakistan (Buying Guide)',
      category: 'Headphones',
      intro: 'Whether you need a dedicated companion for high-quality studio audio monitoring, comfortable office calls, or heavy mobile gaming, selecting the perfect over-ear or on-ear headphones makes a huge difference in acoustic isolation and fatigue limits.',
      keyFactors: [
        { name: 'Over-Ear vs. On-Ear Comfort', desc: 'Over-ear style wraps around the whole ear, offering the best acoustic seal and all-day comfort.' },
        { name: 'Battery Runtime', desc: 'Look for high battery performance, such as 40 hours to a massive 100 hours (Baseus Bowie H1i).' },
        { name: 'Wired Aux Versatility', desc: 'Analog 3.5mm input cables let you listen to high-resolution tracks even if the battery fully runs out.' },
        { name: 'Audio Enhancement Tech', desc: 'DSEE or Hi-Res certifications bring compressed MP3 tracks back to rich life.' }
      ],
      faqs: [
        { q: 'What headphones have the longest battery backup in Pakistan?', a: 'The Baseus Bowie H1i offers an astounding 100-hour battery life on a single charge with ANC off.' },
        { q: 'Can I use Bluetooth headphones for editing and music creation?', a: 'Wired connections (or models with 3.5mm aux cable backup like Sennheiser HD 206) are preferred to avoid wireless latency.' }
      ]
    },
    'best-mobile-accessories': {
      title: 'Best Mobile Accessories in Pakistan (Buying Guide)',
      category: 'Mobile Accessories',
      intro: 'Protect your valuable smartphones and maximize your daily charging speeds with physical accessories built from premium heat-resistant polycarbonate or armored double nylon braids. Here are the top-rated charging bricks, high-output cables, and massive power reserves.',
      keyFactors: [
        { name: 'Power Delivery (PD) Wattage', desc: 'At least 20W PD is recommended for modern iPhones, and up to 100W for notebooks and ultra-premium tablets.' },
        { name: 'Armored Cable Braids', desc: 'Double nylon-braided cables with aluminum alloy shells withstand over 10,000 flex bends.' },
        { name: 'Smart E-Marker Chips', desc: 'Ensures safe power flows during high power delivery streams (up to 100W).' },
        { name: 'Power Bank Safety Protections', desc: 'Ensure multi-layer security protections like surge control and temperature regulation.' }
      ],
      faqs: [
        { q: 'How fast can a 20W charger power an iPhone?', a: 'The Anker PowerPort III 20W Cube can charge typical iPhone models up to 50% in just 30 minutes.' },
        { q: 'Are standard plastic charging cables reliable?', a: 'No, double nylon-braided accessories are far superior and prevent joint splits.' }
      ]
    },
    'best-computer-accessories': {
      title: 'Best Computer Accessories (Buying Guide)',
      category: 'Computer Accessories',
      intro: 'Upgrade your productivity or desktop battle station with ergonomic contour mice, tenkeyless mechanical keyboards, and 7-in-1 Type-C expansion adapters. Ensure maximum comfort and zero latency during heavy office work or intense gaming.',
      keyFactors: [
        { name: 'Sensor Accuracy (DPI)', desc: 'High-precision tracking sensors (such as Darkfield) track seamlessly even on physical glass surfaces.' },
        { name: 'Mechanical Key Feedback', desc: 'Choose mechanical key switches (Blue/Red) for highly responsive tactile input speeds and durability.' },
        { name: 'Type-C Expansion Ports', desc: 'Look for multi-port docks with 4K HDMI, Power Delivery, SD readers, and high-speed USB hubs.' },
        { name: 'Chassis & Structural Integrity', desc: 'Aircraft-grade aluminum alloys block heat and prevent flexing.' }
      ],
      faqs: [
        { q: 'Why choose an ergonomic productivity mouse?', a: 'Sculpted contours support your forearm muscles and prevent repetitive strain injuries.' },
        { q: 'What is a hot-swappable mechanical keyboard?', a: 'It allows swapping out the key switches without any soldering work.' }
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
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">Buying Guide Not Found</h2>
        <p className="text-slate-500 text-xs sm:text-sm">
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
    <div className="bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500">Buying Guides</span>
          <ChevronRight size={12} />
          <span className="text-slate-700 font-extrabold truncate">{guide.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-md p-6 sm:p-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 border border-orange-200/40">
            <Sparkles size={12} />
            Editorial Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {guide.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
            {guide.intro}
          </p>
        </div>

        {/* Key Decision Factors */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ThumbsUp className="text-orange-500" size={20} />
            Key Factors to Consider Before Buying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.keyFactors.map((factor, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  {factor.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
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
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle className="text-orange-500" size={20} />
            Buying Guide FAQs
          </h2>
          <div className="space-y-4">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-1">
                <h4 className="font-extrabold text-slate-800 text-sm">Q: {faq.q}</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
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
