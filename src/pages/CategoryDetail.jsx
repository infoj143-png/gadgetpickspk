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
  ShoppingBag,
  Bath,
  Smile,
  Lock,
  LayoutGrid,
  Box,
  Briefcase,
  Compass,
  Folder,
  CreditCard,
  Luggage,
  Backpack,
  Bed,
  Trash2,
  Shirt
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import ProductCard from '../components/ProductCard';
import { injectJSONLD, removeJSONLD, getCategorySchema, getBreadcrumbSchema, getFAQSchema } from '../utils/schemas';

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeConcern, setActiveConcern] = useState('');

  useEffect(() => {
    if (categorySlug === 'bedding-bath') {
      setActiveConcern('neck-stiffness');
    } else if (categorySlug === 'laundry-cleaning') {
      setActiveConcern('pet-hair');
    } else if (categorySlug === 'fashion') {
      setActiveConcern('size-material');
    }
  }, [categorySlug]);

  // Fashion & Fit Advisor concerns list
  const fashionSolverConcerns = useMemo(() => [
    {
      id: 'size-material',
      title: 'Size & Fabric Integrity',
      problem: 'Shopping online for clothes only to receive incorrect sizes, tight sleeves, or cheap synthetic polyesters that trap sweat.',
      solutionName: 'Size-Verification and Premium Cotton/Linen Fabrics',
      solutionDesc: 'Never buy clothing using just S/M/L tags. Measure your chest & waist in inches, compare with the size chart, and select natural organic fabrics. Opt for 100% combed cotton, cambric lawn, or flax linen which provide excellent breathability and comfort in Pakistan\'s warm climate.',
      keySpecs: ['Compare precise chest & length measurements', 'Prioritize 100% Combed Cotton & Flax Linen', 'Verify pre-shrunk fabrics to prevent wash shrinkage'],
      iconName: 'Shirt'
    },
    {
      id: 'budget-styling',
      title: 'Cost-Effective Premium Styling',
      problem: 'Overspending on low-quality fast fashion that loses color, shape, and stitching strength after just 2-3 wash cycles.',
      solutionName: 'Real Leather & High-Density Twill Basics',
      solutionDesc: 'Choose high-quality core pieces that offer strong value-retention and longevity. Items like Outfitters double-stitched cotton cargo pants, Stylo padded memory foam sandals, or hand-crafted Jafferjees leather wallets look elegant and last for years.',
      keySpecs: ['100% original top-grain animal leather', 'Reinforced double-stitched twill seams', 'High-density knit fabric structure (180 GSM+)'],
      iconName: 'CreditCard'
    },
    {
      id: 'casual-use',
      title: 'Everyday Versatile Casual Wear',
      problem: 'Finding outfits that feel incredibly comfortable for lounging at home yet look stylish and polished for unexpected outings.',
      solutionName: 'Matching Co-ord Sets & Combed Cotton Tees',
      solutionDesc: 'Match relaxed-fit graphic tees or matching printed 2-piece Co-ord sets (like Zellbury and Elo). Co-ord sets provide a highly structured, trendy look with zero styling effort, while pure combed cotton keeps you cool and sweat-free.',
      keySpecs: ['Matching 2-piece coordinated design', 'Relaxed, non-constricting regular cuts', 'Elasticated adjustable pant waistbands'],
      iconName: 'Smile'
    },
    {
      id: 'heritage-footwear',
      title: 'Uncomfortable Footwear & Sore Feet',
      problem: 'Sore heels, painful sole blisters, and rapid wear-and-tear from cheap synthetic flip-flops or low-grade formal shoes.',
      solutionName: 'Hand-Stitched Peshawari Chappals & Padded Sandals',
      solutionDesc: 'Switch to hand-crafted genuine leather Peshawari Chappals with durable recycled tyre rubber soles, or Stylo soft-padded memory foam sandals. They provide unmatched heel cushion, adapt to your foot contour, and offer timeless style.',
      keySpecs: ['100% Premium Genuine cow/goat leather', 'Indestructible non-slip recycled tyre sole', 'High-density padded memory foam footbed'],
      iconName: 'Award'
    }
  ], []);

  // Laundry & Cleaning Efficiency Solver concerns list
  const laundryCleaningSolverConcerns = useMemo(() => [
    {
      id: 'pet-hair',
      title: 'Pet Hair & Allergen Dust',
      problem: 'Struggling with loose pet dander, microscopic allergens, and static dust clinging to sofa fabrics and car seats.',
      solutionName: 'Xiaomi Deerma Cordless Handheld Stick Vacuums',
      solutionDesc: 'Choose a lightweight cordless vacuum with 8000Pa+ cyclonic suction and a multi-stage HEPA filter. Avoid heavy, corded vacuums for quick touchups. A modular cordless layout allows you to easily reach crevices, ceiling corners, and car interiors.',
      keySpecs: ['8000Pa Powerful Cyclonic Suction', 'Multi-stage Washable HEPA Filter', 'Lightweight Modular Body (<1.8kg)'],
      iconName: 'Trash2'
    },
    {
      id: 'rapid-dewrinkling',
      title: 'Time-Consuming Wrinkle Removal',
      problem: 'Wasting precious minutes setting up heavy ironing boards and risking burning delicate silks or linens during morning rushes.',
      solutionName: 'Sokany Portable Handheld Garment Steamers',
      solutionDesc: 'Invest in a high-wattage (1500W+) fast-heating portable fabric steamer. It removes tough wrinkles instantly using thick, continuous steam without direct metal-to-fabric contact, making it 100% safe for all delicate clothes.',
      keySpecs: ['1500W High Power Fast Heating', 'Continuous Steam Flow (Up to 20g/min)', 'Detachable Leak-Proof Water Tank'],
      iconName: 'Shirt'
    },
    {
      id: 'high-ceiling-dust',
      title: 'Hard-to-Reach Fan & Ceiling Dust',
      problem: 'Risking injury climbing chairs or ladders to clean dusty ceiling fans and high cobwebs, resulting in dust falling everywhere.',
      solutionName: 'Extendable Microfiber Electrostatic Dusters',
      solutionDesc: 'Use an extendable, flexible microfiber duster head. Microfiber strands generate natural electrostatic charge when swept, trapping dust particles magnetically instead of scattering them into the air.',
      keySpecs: ['Telescopic pole extendable up to 100+ inches', '360-degree bendable high-density head', 'Washable and reusable microfiber sleeve'],
      iconName: 'LayoutGrid'
    },
    {
      id: 'floor-strain',
      title: 'Post-Mopping Back & Joint Strain',
      problem: 'Physical exhaust, hand-wringing dirty water, and severe lower back strain from traditional flat floor mopping.',
      solutionName: '360° Stainless Steel Rotary Spin Mop Systems',
      solutionDesc: 'Switch to a dual-chamber spin mop bucket set. The mechanical foot pedal or hand-press handle spins the mop head at high speeds, centrifugal-drying the microfiber mop safely without requiring any hand-wringing or deep bending.',
      keySpecs: ['360° rotating head with thick microfiber', 'Stainless steel spin basket & sturdy bucket', 'Telescopic adjustable lock handle'],
      iconName: 'Bath'
    }
  ], []);

  // Sleep & Bath Health Solver concerns list
  const sleepBathSolverConcerns = useMemo(() => [
    {
      id: 'neck-stiffness',
      title: 'Morning Neck Stiffness',
      problem: 'Waking up with persistent neck, shoulder, or spinal soreness and stiffness.',
      solutionName: 'Ergonomic Cervical Orthopedic Pillows',
      solutionDesc: 'Opt for 100% slow-rebound memory foam contoured pillows. Standard down or flat cotton pillows allow your neck to collapse. A contoured cervical design aligns your head, neck, and spine perfectly throughout the night.',
      keySpecs: ['100% Slow-Rebound Memory Foam', 'Contour dual-height (7cm & 10cm)', 'Removable zippered breathable cover'],
      iconName: 'Bed'
    },
    {
      id: 'hair-frizz',
      title: 'Hair Frizz & Skin Friction',
      problem: 'Morning bedhead, frizzy tangled curls, split ends, and facial sleep wrinkles.',
      solutionName: 'Mulberry Satin Friction-Free Pillowcases',
      solutionDesc: 'Switch from rough cotton sheets to high-grade cooling satin. Satin reduces face and hair friction by up to 45%, preventing hair breakage, lock moisture depletion, and sleep lines.',
      keySpecs: ['Premium high-grade satin microfiber', 'Envelope closure button-free design', 'Naturally hypoallergenic and cooling'],
      iconName: 'Smile'
    },
    {
      id: 'bathroom-clutter',
      title: 'Cluttered Shower Corners',
      problem: 'Shampoo, conditioner, and body wash bottles cluttered around bathtub rims or floor.',
      solutionName: 'SUS304 Rustproof Corner Adhesive Shelves',
      solutionDesc: 'Use heavy-duty adhesive wall shelves to exploit unused 90-degree corner wall space. No-drill adhesive pads can support up to 10kg without damaging premium tiled walls.',
      keySpecs: ['Premium SUS304 Stainless Steel', 'Drill-free transparent heavy-duty adhesive', 'Open-grid drainage for zero soap scum build'],
      iconName: 'LayoutGrid'
    },
    {
      id: 'brush-hygiene',
      title: 'Messy Toothpaste & Brushes',
      problem: 'Wasted toothpaste squeezed messily, and wet toothbrushes exposed to open bathroom dust.',
      solutionName: 'Automatic Vacuum Squeezers & Holders',
      solutionDesc: 'Install hands-free mechanical toothpaste dispensers paired with covered slots. A smart vacuum pump squeezes out exactly the right amount with zero manual mess or waste.',
      keySpecs: ['Hands-free vacuum pump mechanism', 'Dustproof covered slots for 5 toothbrushes', 'BPA-free modular detachable components'],
      iconName: 'CheckCircle'
    }
  ], []);

  // Helper to render solver icons dynamically
  const renderSolverIcon = (iconName) => {
    switch (iconName) {
      case 'Bed': return <Bed size={18} />;
      case 'Smile': return <Smile size={18} />;
      case 'LayoutGrid': return <LayoutGrid size={18} />;
      case 'CheckCircle': return <CheckCircle size={18} />;
      case 'Trash2': return <Trash2 size={18} />;
      case 'Shirt': return <Shirt size={18} />;
      case 'Bath': return <Bath size={18} />;
      case 'CreditCard': return <CreditCard size={18} />;
      case 'Award': return <Award size={18} />;
      default: return <Bed size={18} />;
    }
  };

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

  // Query Trending Products
  const trendingProducts = useMemo(() => {
    const list = categoryProducts.filter(p => p.isTrending || p.badges?.some(b => b.toLowerCase() === 'trending'));
    return list.length > 0 ? list : categoryProducts;
  }, [categoryProducts]);

  // Query Budget Picks Products
  const budgetProducts = useMemo(() => {
    return categoryProducts.filter(p => p.badges?.some(b => b.toLowerCase().includes('budget pick')) || p.currentPrice <= 5000);
  }, [categoryProducts]);

  // Laundry & Cleaning Subcategory Shelves config
  const laundryCleaningSubCategories = useMemo(() => [
    {
      name: 'Vacuum Cleaners',
      slug: 'vacuum-cleaners',
      desc: 'Lightweight cordless handheld and stick vacuum cleaners featuring cyclonic suction and HEPA filtration.',
      icon: <Layers size={16} />
    },
    {
      name: 'Garment Steamers',
      slug: 'garment-steamers',
      desc: 'High-powered portable handheld fabric steamers and rapid-heating garment irons for effortless de-wrinkling.',
      icon: <Shirt size={16} />
    },
    {
      name: 'Spin Mops',
      slug: 'spin-mops',
      desc: '360-degree rotating stainless steel spin mops and dual-chamber bucket systems for dry and wet floor cleaning.',
      icon: <Trash2 size={16} />
    },
    {
      name: 'Microfiber Dusters',
      slug: 'microfiber-dusters',
      desc: 'Extendable, bendable electrostatic dusters designed to safely sweep high ceilings, fans, and delicate furniture.',
      icon: <LayoutGrid size={16} />
    },
    {
      name: 'Laundry Organizers',
      slug: 'laundry-organizers',
      desc: 'Collapsible, heavy-duty fabric laundry baskets, dirty clothes hampers, and sorting bins.',
      icon: <Box size={16} />
    },
    {
      name: 'Clothes Drying Racks',
      slug: 'clothes-drying-racks',
      desc: 'Space-saving foldable stainless steel clothing racks for indoor and outdoor laundry air drying.',
      icon: <Award size={16} />
    },
    {
      name: 'Cleaning Tools',
      slug: 'cleaning-tools',
      desc: 'Multi-purpose scrub brushes, squeegees, window sweepers, and specialized bathroom floor scrubbers.',
      icon: <CheckCircle size={16} />
    }
  ], []);

  // Home & Living Subcategory Shelves config
  const homeLivingSubCategories = useMemo(() => [
    {
      name: 'Bathroom Shelves',
      slug: 'bathroom-shelves',
      desc: 'Premium rustproof wall-mounted shelves and corner organizers to declutter your shower experience.',
      icon: <Bath size={16} />
    },
    {
      name: 'Toothpaste Dispensers',
      slug: 'toothpaste-dispensers',
      desc: 'Hands-free automatic squeezers and dustproof toothbrush holders designed for family hygiene.',
      icon: <Smile size={16} />
    },
    {
      name: 'Refrigerator Locks',
      slug: 'refrigerator-locks',
      desc: 'Baby-proofing safety solutions to secure cabinets, drawers, and refrigerators with ease.',
      icon: <Lock size={16} />
    },
    {
      name: 'Home Organizers',
      slug: 'home-organizers',
      desc: 'Sleek, minimalist desktop and cable organizers to keep your workspace clear and tidy.',
      icon: <LayoutGrid size={16} />
    },
    {
      name: 'Storage Boxes',
      slug: 'storage-boxes',
      desc: 'Durable collapsible canvas fabric bins with steel supports for structured wardrobe storage.',
      icon: <Box size={16} />
    }
  ], []);

  // Bedding & Bath Subcategory Shelves config
  const beddingBathSubCategories = useMemo(() => [
    {
      name: 'Fitted Bedsheets',
      slug: 'fitted-bedsheets',
      desc: 'Snug-fitting, elastic-bordered bedsheets that stay perfectly secure on your mattress without bunching or slipping.',
      icon: <Bed size={16} />
    },
    {
      name: 'Bedsheet Sets',
      slug: 'bedsheet-sets',
      desc: 'Coordinated matching bedsheet and pillowcase collections designed to bring effortless elegance to your bedroom.',
      icon: <Layers size={16} />
    },
    {
      name: 'Bedding Sets',
      slug: 'bedding-sets',
      desc: 'Complete all-in-one bedroom packages featuring premium sheets, pillow covers, and matching duvets or comforters.',
      icon: <Sparkles size={16} />
    },
    {
      name: 'Mattress Covers',
      slug: 'mattress-covers',
      desc: 'Premium waterproof and dust-mite resistant protectors to prolong the lifespan of your mattress.',
      icon: <Lock size={16} />
    },
    {
      name: 'Pillow Covers',
      slug: 'pillow-covers',
      desc: 'Friction-free, luxurious cooling pillowcases to protect your skin and prevent morning hair frizz.',
      icon: <Smile size={16} />
    },
    {
      name: 'Bathroom Shelves',
      slug: 'bathroom-shelves',
      desc: 'Heavy-duty, rustproof adhesive shelves and corner organizers to neatly declutter your shower items.',
      icon: <LayoutGrid size={16} />
    },
    {
      name: 'Bathroom Organizers',
      slug: 'bathroom-organizers',
      desc: 'Smart space-saving racks, trays, and caddies for organized countertop and under-sink storage.',
      icon: <Box size={16} />
    },
    {
      name: 'Toothpaste Dispensers',
      slug: 'toothpaste-dispensers',
      desc: 'Hands-free automatic vacuum squeezers designed for clean, waste-free family bathroom hygiene.',
      icon: <CheckCircle size={16} />
    },
    {
      name: 'Toothbrush Holders',
      slug: 'toothbrush-holders',
      desc: 'Dustproof, wall-mounted holders that keep your family\'s toothbrushes safe, dry, and sterile.',
      icon: <Bath size={16} />
    },
    {
      name: 'Bathroom Accessories',
      slug: 'bathroom-accessories',
      desc: 'Coordinated bath sets, soap dispensers, and matching utilities that elevate your bathroom aesthetics.',
      icon: <Award size={16} />
    }
  ], []);

  // Bags & Travel Subcategory Shelves config
  const bagsTravelSubCategories = useMemo(() => [
    {
      name: "Women's Handbags",
      slug: "womens-handbags",
      desc: "Premium, elegant top-handle handbag sets and purses matching style with high utility.",
      icon: <ShoppingBag size={16} />
    },
    {
      name: "Tote Bags",
      slug: "tote-bags",
      desc: "Eco-friendly, high-density spacious canvas and structured tote bags perfect for commuting, groceries, and travel.",
      icon: <Briefcase size={16} />
    },
    {
      name: "Crossbody Bags",
      slug: "crossbody-bags",
      desc: "Ergonomic single-shoulder sling crossbody chest bags with hidden anti-theft pockets and USB charging.",
      icon: <Compass size={16} />
    },
    {
      name: "Shoulder Bags",
      slug: "shoulder-bags",
      desc: "Timeless vintage canvas and structured leather multi-pocket shoulder messenger bags.",
      icon: <Folder size={16} />
    },
    {
      name: "Wallets",
      slug: "wallets",
      desc: "Premium hand-crafted genuine leather and multi-slot RFID-blocking bifold wallets.",
      icon: <CreditCard size={16} />
    },
    {
      name: "Travel Bags",
      slug: "travel-bags",
      desc: "Indestructible hardshell TSA spinner carry-on suitcases and heavy-duty duffel travel bags.",
      icon: <Luggage size={16} />
    },
    {
      name: "Backpacks",
      slug: "backpacks",
      desc: "Premium TSA-approved anti-theft laptop backpacks and ultra-light casual daypacks.",
      icon: <Backpack size={16} />
    }
  ], []);

  // Fashion Subcategory Shelves config
  const fashionSubCategories = useMemo(() => [
    {
      name: "Women's Fashion",
      slug: "womens-fashion",
      desc: "Premium matching women's co-ord sets, lawn prints, and trending everyday casual outfits.",
      icon: <Shirt size={16} />
    },
    {
      name: "Men's Fashion",
      slug: "mens-fashion",
      desc: "Classic and modern men's shirts, cargo pants, and comfortable casual wear.",
      icon: <Shirt size={16} />
    },
    {
      name: "Co-ord Sets",
      slug: "co-ord-sets",
      desc: "Coordinated matching top-and-bottom clothing sets for effortless, stylish casual wear.",
      icon: <Layers size={16} />
    },
    {
      name: "Cargo Pants",
      slug: "cargo-pants",
      desc: "Heavy-duty multi-pocket cotton cargo pants built for urban utility and rugged comfort.",
      icon: <SlidersHorizontal size={16} />
    },
    {
      name: "T-Shirts",
      slug: "t-shirts",
      desc: "Breathable 100% cotton crewneck and graphic T-shirts for everyday styling.",
      icon: <Shirt size={16} />
    },
    {
      name: "Casual Wear",
      slug: "casual-wear",
      desc: "Relaxed daily-wear outfits, casual trousers, and lightweight breathable fabrics.",
      icon: <Smile size={16} />
    },
    {
      name: "Sandals",
      slug: "sandals",
      desc: "Ergonomic flat summer sandals and open-toe footwear designed for all-day walking comfort.",
      icon: <Award size={16} />
    },
    {
      name: "Peshawari Chappal",
      slug: "peshawari-chappal",
      desc: "Hand-crafted genuine leather Peshawari Chappals with durable tire soles for heritage elegance.",
      icon: <Sparkles size={16} />
    },
    {
      name: "Fashion Accessories",
      slug: "fashion-accessories",
      desc: "Timeless style additions, genuine leather wallets, and UV-protective polarized sunglasses.",
      icon: <ShoppingBag size={16} />
    }
  ], []);

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
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">

        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" className="hover:text-orange-500 transition-colors">Products Catalog</Link>
          <ChevronRight size={12} />
          <span className="text-orange-500 font-extrabold" aria-current="page">{categoryMeta.name}</span>
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

        {/* Final Affiliate CTA Block (Only for fashion category) */}
        {categorySlug === 'fashion' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Upgrade to Premium, Comfortable Fashion?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Elevate your style with high-quality cambric cotton co-ord sets, premium flax linen shirts, rugged cotton cargo pants, and timeless hand-crafted leather footwear. Secure the absolute best deals on Daraz PK using our verified affiliate recommendations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Fashion"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Fashion Catalog <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-700/30 hover:bg-orange-700/50 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Fashion & Fit Advisor Section (Only for fashion category) */}
        {categorySlug === 'fashion' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Fashion & Fit Recommendation Advisor
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with online clothes sizing, choosing breathable fabrics, styling on a budget, or sore feet? Select your style issue below to instantly unlock the expert-recommended solution and parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {fashionSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-orange-500'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100'
                      }`}>
                        {renderSolverIcon(concern.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                          {concern.title}
                        </h3>
                        <p className={`text-xs mt-0.5 font-semibold line-clamp-1 ${
                          isActive ? 'text-orange-100' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {concern.problem}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Expert Solution Card */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/60 dark:border-slate-850 p-6 sm:p-8 space-y-6">
                {(() => {
                  const selected = fashionSolverConcerns.find(c => c.id === activeConcern) || fashionSolverConcerns[0];
                  return (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2.5 py-1 rounded-full">
                          Expert Recommendation
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-3">
                          {selected.solutionName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1.5 leading-relaxed">
                          <strong className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            The Underlying Problem:
                          </strong>
                          {selected.problem}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Why It Works & How It Helps:
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {selected.solutionDesc}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Critical Specs to Check on Daraz:
                        </strong>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {selected.keySpecs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
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

        {/* Trending Products Section */}
        {trendingProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <TrendingUp className="text-orange-500" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Trending {categoryMeta.name} Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Budget Picks Section */}
        {budgetProducts.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Award className="text-orange-500" size={22} />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Budget Picks ({categoryMeta.name} Under Rs. 5,000)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgetProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Laundry & Cleaning Specialist Subcategories */}
        {categorySlug === 'laundry-cleaning' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Laundry & Cleaning Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore high-efficiency vacuums, portable garment steamers, and ergonomic cleaning tools curated for smart homes.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {laundryCleaningSubCategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`#${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl text-xs font-bold text-slate-750 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-xs"
                  >
                    {sub.icon}
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Subcategory Shelves Grid */}
            <div className="space-y-12">
              {laundryCleaningSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );
                if (subProducts.length === 0) return null;

                return (
                  <div
                    key={sub.slug}
                    id={sub.slug}
                    className="scroll-mt-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-xs transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800/60 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            {sub.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {sub.name} Collection
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl">
                          {sub.desc}
                        </p>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2.5 py-1 rounded-full">
                        {subProducts.length} {subProducts.length === 1 ? 'Product' : 'Products'} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bags & Travel Specialist Subcategories */}
        {categorySlug === 'bags-travel' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Bags & Travel Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore premium, secure, and ergonomic travel organizers, bags, and backpacks curated for commuters.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {bagsTravelSubCategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`#${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl text-xs font-bold text-slate-750 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-xs"
                  >
                    {sub.icon}
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Subcategory Shelves Grid */}
            <div className="space-y-12">
              {bagsTravelSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );
                if (subProducts.length === 0) return null;

                return (
                  <div
                    key={sub.slug}
                    id={sub.slug}
                    className="scroll-mt-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-xs transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800/60 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            {sub.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {sub.name} Collection
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl">
                          {sub.desc}
                        </p>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2.5 py-1 rounded-full">
                        {subProducts.length} {subProducts.length === 1 ? 'Product' : 'Products'} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Fashion Specialist Subcategories */}
        {categorySlug === 'fashion' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Fashion Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore hand-crafted eastern heritage wear, co-ord sets, cargo pants, premium basic tees, and style accessories.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {fashionSubCategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`#${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl text-xs font-bold text-slate-750 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-xs"
                  >
                    {sub.icon}
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Subcategory Shelves Grid */}
            <div className="space-y-12">
              {fashionSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );
                if (subProducts.length === 0) return null;

                return (
                  <div
                    key={sub.slug}
                    id={sub.slug}
                    className="scroll-mt-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-xs transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800/60 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            {sub.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {sub.name} Collection
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl">
                          {sub.desc}
                        </p>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2.5 py-1 rounded-full">
                        {subProducts.length} {subProducts.length === 1 ? 'Product' : 'Products'} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Home & Living Specialist Subcategories */}
        {categorySlug === 'home-living' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Home & Living Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore specialized storage, safety, and organization solutions designed for modern Pakistani homes.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {homeLivingSubCategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`#${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl text-xs font-bold text-slate-750 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-xs"
                  >
                    {sub.icon}
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Subcategory Shelves Grid */}
            <div className="space-y-12">
              {homeLivingSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );
                if (subProducts.length === 0) return null;

                return (
                  <div
                    key={sub.slug}
                    id={sub.slug}
                    className="scroll-mt-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-xs transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800/60 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            {sub.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {sub.name} Collection
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl">
                          {sub.desc}
                        </p>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2.5 py-1 rounded-full">
                        {subProducts.length} {subProducts.length === 1 ? 'Product' : 'Products'} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bedding & Bath Specialist Subcategories */}
        {categorySlug === 'bedding-bath' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Bedding & Bath Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore premium, sleep-enhancing bedding lines and smart, space-saving bathroom accessories.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {beddingBathSubCategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`#${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl text-xs font-bold text-slate-750 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all shadow-xs"
                  >
                    {sub.icon}
                    {sub.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Subcategory Shelves Grid */}
            <div className="space-y-12">
              {beddingBathSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );
                if (subProducts.length === 0) return null;

                return (
                  <div
                    key={sub.slug}
                    id={sub.slug}
                    className="scroll-mt-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-xs transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800/60 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            {sub.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                            {sub.name} Collection
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-2xl">
                          {sub.desc}
                        </p>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-extrabold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 px-2.5 py-1 rounded-full">
                        {subProducts.length} {subProducts.length === 1 ? 'Product' : 'Products'} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Laundry & Cleaning Efficiency Solver Section (Only for laundry-cleaning category) */}
        {categorySlug === 'laundry-cleaning' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Laundry & Cleaning Efficiency Solver
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with pet hair, morning laundry rushes, high cobwebs, or severe mopping back strain? Select your core cleaning issue below to instantly discover the expert-recommended tool parameters and direct solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {laundryCleaningSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-orange-500'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100'
                      }`}>
                        {renderSolverIcon(concern.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                          {concern.title}
                        </h3>
                        <p className={`text-xs mt-0.5 font-semibold line-clamp-1 ${
                          isActive ? 'text-orange-100' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {concern.problem}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Expert Solution Card */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/60 dark:border-slate-850 p-6 sm:p-8 space-y-6">
                {(() => {
                  const selected = laundryCleaningSolverConcerns.find(c => c.id === activeConcern) || laundryCleaningSolverConcerns[0];
                  return (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2.5 py-1 rounded-full">
                          Expert Recommendation
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-3">
                          {selected.solutionName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1.5 leading-relaxed">
                          <strong className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            The Underlying Problem:
                          </strong>
                          {selected.problem}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Why It Works & How It Helps:
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {selected.solutionDesc}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Critical Specs to Check on Daraz:
                        </strong>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {selected.keySpecs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* Sleep & Bath Health Solver Section (Only for bedding-bath category) */}
        {categorySlug === 'bedding-bath' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Sleep & Bath Health Recommendation Solver
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with waking up sore, frizzy hair, or bathroom clutter? Select your core issue below to instantly discover the expert-recommended product type and parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {sleepBathSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-orange-500'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100'
                      }`}>
                        {renderSolverIcon(concern.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                          {concern.title}
                        </h3>
                        <p className={`text-xs mt-0.5 font-semibold line-clamp-1 ${
                          isActive ? 'text-orange-100' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {concern.problem}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Expert Solution Card */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200/60 dark:border-slate-850 p-6 sm:p-8 space-y-6">
                {(() => {
                  const selected = sleepBathSolverConcerns.find(c => c.id === activeConcern) || sleepBathSolverConcerns[0];
                  return (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2.5 py-1 rounded-full">
                          Expert Recommendation
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-3">
                          {selected.solutionName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1.5 leading-relaxed">
                          <strong className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                            The Underlying Problem:
                          </strong>
                          {selected.problem}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Why It Works & How It Helps:
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                          {selected.solutionDesc}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <strong className="text-xs sm:text-sm text-slate-800 dark:text-white font-extrabold block">
                          Critical Specs to Check on Daraz:
                        </strong>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {selected.keySpecs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
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
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                Explore Other Categories
              </h2>
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

        {/* Final Affiliate CTA Block (Only for laundry-cleaning category) */}
        {categorySlug === 'laundry-cleaning' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20 animate-fadeIn">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Upgrade to High-Efficiency Cleaning Gadgets?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Keep your home clean and hygienic with minimal physical effort. Secure the absolute best deals on lightweight Cordless Vacuums, rapid Garment Steamers, and ergonomic Spin Mops on Daraz PK using our verified expert recommendations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Laundry%20%26%20Cleaning"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Laundry & Cleaning Catalog <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-700/30 hover:bg-orange-700/50 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Final Affiliate CTA Block (Only for bedding-bath category) */}
        {categorySlug === 'bedding-bath' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Upgrade Your Bedding & Bath Comforts?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Don't settle for restless sleep or a cluttered space. Get the absolute best prices on certified Fitted Bedsheets, Orthopedic Cervical Pillows, and smart Bathroom accessories directly on Daraz with our hand-picked affiliate recommendations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Bedding%20%26%20Bath"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Bedding & Bath Catalog <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-700/30 hover:bg-orange-700/50 text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
