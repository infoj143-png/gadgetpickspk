import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const searchIntentInsights = {
  'kitchen-dining': {
    title: 'Buying Guide & Search Insights: Best Kitchen Gadgets in Pakistan',
    whatToLookFor: 'Prioritize raw material certifications like BPA-free food-grade plastics (PCTG) for portable blenders and Teflon-free premium non-stick inner liners for electric hot pots to ensure optimal health safety.',
    suitableFor: 'Perfect for university hostel students, daily gym enthusiasts, busy office professionals, and couples living in studio apartments requiring space-saving culinary tools.',
    buyingConsiderations: 'Choose multi-functional models with dual-heat adjustments (220W/600W) to prevent electrical burnouts, and Type-C rechargeable setups with high-capacity 2000mAh batteries to easily bypass load shedding interruptions.',
    relatedDiscovery: 'Compare the <a href="/compare/slique-blender-vs-hot-pot" class="text-orange-500 hover:underline font-extrabold">Slique Portable Blender vs Crown Electric Hot Pot</a> side-by-side or explore our comprehensive <a href="/guides/best-kitchen-and-dining-gadgets" class="text-orange-500 hover:underline font-extrabold">Best Kitchen & Dining Gadgets Buying Guide</a>.'
  },
  'home-living': {
    title: 'Buying Guide & Search Insights: Top Home & Living Accessories in Pakistan',
    whatToLookFor: 'Look for whisper-quiet ultrasonic operation frequencies (<28 dB), waterless auto-shutoff sensors, and heavy anodized metal joints on ambient projection lamps to protect your investment.',
    suitableFor: 'Ideal for content creators seeking natural studio photography backdrops, families looking to introduce healthy humidity to air-conditioned rooms, and minimalism enthusiasts.',
    buyingConsiderations: 'Insist on high-index thick optical crystal lenses for projector lights to ensure clear, high-definition warm halos, and check adhesive weight capacities (up to 10kg) for drill-free bathroom storage.',
    relatedDiscovery: 'Compare budget decorations with the <a href="/compare/best-home-gadgets-under-5000" class="text-orange-500 hover:underline font-extrabold">Best Home & Living Gadgets Under Rs. 5,000</a> or browse our expert-written <a href="/guides/best-home-and-living-accessories" class="text-orange-500 hover:underline font-extrabold">Best Home & Living Accessories Buying Guide</a>.'
  },
  'bags-travel': {
    title: 'Buying Guide & Search Insights: Premium Bags & Travel Gear in Pakistan',
    whatToLookFor: 'Look for scratch-proof and high-density waterproof Oxford fabrics, TSA-approved 3-digit combination locks, and impact-resistant EVA hardshell organizer cores.',
    suitableFor: 'Extremely suitable for daily tech-carrying IT professionals, university commuters, motorcycle riders, and frequent flyers seeking carrying security.',
    buyingConsiderations: 'Always check laptop compartment padding specifications (supporting up to 15.6 inches), and look for breathable honeycomb shoulder pads to distribute posture load evenly.',
    relatedDiscovery: 'Consult the detailed <a href="/guides/best-bags-and-travel-essentials" class="text-orange-500 hover:underline font-extrabold">Best Bags & Travel Essentials Buying Guide</a> or inspect the premium <a href="/products/bt-01" class="text-orange-500 hover:underline font-extrabold">Mark Ryden Anti-Theft Waterproof Laptop Backpack review</a>.'
  },
  'bedding-bath': {
    title: 'Buying Guide & Search Insights: Best Bedding & Bath Comforts in Pakistan',
    whatToLookFor: 'Search for 100% premium slow-rebound contouring orthopedic memory foam and smooth, friction-free mulberry satin fabrics.',
    suitableFor: 'Designed specifically for side and back sleepers suffering from chronic morning neck stiffness, and individuals seeking to prevent hair frizz, split ends, and facial sleep creases.',
    buyingConsiderations: 'Prioritize hypoallergenic, dust-mite-resistant seals for sensitive skin, and verify zippered removable outer fabric covers for simple machine-washable upkeep.',
    relatedDiscovery: 'Examine our <a href="/guides/best-bedding-and-bath-comforts" class="text-orange-500 hover:underline font-extrabold">Best Bedding & Bath Comforts Buying Guide</a> or read the expert-tested <a href="/products/bb-01" class="text-orange-500 hover:underline font-extrabold">RestEasy Ergonomic Orthopedic Pillow review</a>.'
  },
  'laundry-cleaning': {
    title: 'Buying Guide & Search Insights: Best Laundry & Smart Cleaning Tools in Pakistan',
    whatToLookFor: 'Focus on 8000Pa+ cyclonic motor suction ratings, multi-stage HEPA filtration columns, and high-wattage (1500W+) rapid heating steamer elements.',
    suitableFor: 'Pet parents looking to eliminate dander hair from furniture, and busy professionals seeking a quick, ironing-board-free way to de-wrinkle delicate fabrics are highly suited to these tools.',
    buyingConsiderations: 'Choose lightweight modular vacuum frames (<1.8kg) to reduce physical wrist strain, and select stainless steel spin baskets with dual-chamber mopping buckets.',
    relatedDiscovery: 'Read the detailed <a href="/compare/vacuum-cleaner-vs-steam-iron" class="text-orange-500 hover:underline font-extrabold">Xiaomi Deerma Vacuum vs Sokany Handheld Steam Iron comparison</a> or browse our budget-friendly <a href="/products" class="text-orange-500 hover:underline font-extrabold">Products Recommendations Catalog</a>.'
  },
  'fashion': {
    title: 'Buying Guide & Search Insights: Premium Online Fashion & Trends in Pakistan',
    whatToLookFor: 'Prioritize 100% organic combed cotton, cambric lawn fabric weights (minimum 180 GSM), and hand-crafted top-grain genuine calf leather.',
    suitableFor: 'Ideal for trend-aware buyers seeking western-eastern fusion casual wear, and gentlemen investing in highly durable heritage leather footwear.',
    buyingConsiderations: 'Always double-check precise brand size charts in inches (do not rely on generic M/L labels), and verify slip-resistant dual-layer recycled tyre rubber outsoles.',
    relatedDiscovery: 'Explore our budget collection of <a href="/compare/best-kitchen-tools-under-5000" class="text-orange-500 hover:underline font-extrabold">Best Kitchen & Dining Tools Under Rs. 5,000</a> or view the <a href="/products/fs-10" class="text-orange-500 hover:underline font-extrabold">Walkeaze Hand-Stitched Leather Peshawari Chappal details</a>.'
  },
  'pet-supplies': {
    title: 'Buying Guide & Search Insights: Best Pet Supplies & Smart Grooming in Pakistan',
    whatToLookFor: 'Choose non-toxic, BPA-free raw polymers, multi-stage carbon softening filter cartridges, and safety-edged stainless steel deshedding brushes.',
    suitableFor: 'Highly recommended for cat and dog parents experiencing static water rejection, and households struggling to manage pet undercoat shedding on carpets and rugs.',
    buyingConsiderations: 'Insist on whisper-quiet low-voltage pump motors (<30 dB) to avoid scaring nervous pets, and check for quick-release hair ejector buttons on grooming brushes.',
    relatedDiscovery: 'Filter high-value items in the <a href="/products?category=Pet%20Supplies" class="text-orange-500 hover:underline font-extrabold">Pet Supplies Products Recommendations Catalog</a> or inspect the veterinary-approved <a href="/products/ps-01" class="text-orange-500 hover:underline font-extrabold">Catit Flower Automatic Pet Water Fountain review</a>.'
  }
};

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeConcern, setActiveConcern] = useState('');

  useEffect(() => {
    if (categorySlug === 'bedding-bath') {
      setActiveConcern('neck-stiffness');
    } else if (categorySlug === 'laundry-cleaning') {
      setActiveConcern('pet-hair');
    } else if (categorySlug === 'fashion') {
      setActiveConcern('size-material');
    } else if (categorySlug === 'pet-supplies') {
      setActiveConcern('pet-hydration');
    } else if (categorySlug === 'kitchen-dining') {
      setActiveConcern('portable-blending');
    } else if (categorySlug === 'home-living') {
      setActiveConcern('home-moisture');
    } else if (categorySlug === 'bags-travel') {
      setActiveConcern('commuter-security');
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

  // Kitchen & Dining Subcategory Shelves config
  const kitchenDiningSubCategories = useMemo(() => [
    {
      name: 'Portable Blenders',
      slug: 'portable-blenders',
      desc: 'Rechargeable, cordless high-speed blenders perfect for quick single-serve smoothies, protein shakes, and juices.',
      icon: <Sparkles size={16} />
    },
    {
      name: 'Electric Hot Pots',
      slug: 'electric-hot-pots',
      desc: 'Multi-functional desktop electric cooking pots with premium non-stick inner surface and steaming racks.',
      icon: <Layers size={16} />
    },
    {
      name: 'Air Fryers & Ovens',
      slug: 'air-fryers-ovens',
      desc: 'High-efficiency convection air fryers and compact electric ovens for healthy, oil-free baking and frying.',
      icon: <Award size={16} />
    },
    {
      name: 'Smart Kettles',
      slug: 'smart-kettles',
      desc: 'Rapid-boil electric glass and stainless steel kettles featuring automatic dry-boil safety cutoffs.',
      icon: <HelpCircle size={16} />
    },
    {
      name: 'Kitchen Organizers',
      slug: 'kitchen-organizers',
      desc: 'Minimalist spice racks, stackable airtight storage containers, and dynamic cabinet drawer dividers.',
      icon: <LayoutGrid size={16} />
    }
  ], []);

  // Kitchen & Dining Solver concerns list
  const kitchenDiningSolverConcerns = useMemo(() => [
    {
      id: 'portable-blending',
      title: 'Active Lifestyle Nutrition on the Go',
      problem: 'Busy gym routines, office schedules, or load shedding outages making it hard to prepare fresh smoothies, protein shakes, and baby food daily.',
      solutionName: 'Cordless USB-Rechargeable Blenders',
      solutionDesc: 'Opt for a high-rotation, rechargeable cordless portable blender with 3D stainless steel blades (like Slique). It crushes small ice cubes and fruit blocks effortlessly on a single charge. Powered by long-lasting 2000mAh lithium batteries, it eliminates power cords and enables fresh blending anywhere in Pakistan.',
      keySpecs: ['6-blade stainless steel 3D setup', '2000mAh long-lasting battery (Type-C USB)', 'BPA-free food-grade PCTG blending jar'],
      iconName: 'Sparkles'
    },
    {
      id: 'hostel-cooking',
      title: 'Compact cooking in hostels & offices',
      problem: 'Hostel students and studio renters facing restricted kitchen access or gas shortages, leading to unhealthy reliance on expensive takeout meals.',
      solutionName: 'Multi-Functional Desktop Electric Hot Pots',
      solutionDesc: 'Invest in a versatile 1.5L multi-functional electric hot pot (like Crown) with dual heat adjustments (220W/600W). Built with Teflon-free non-stick liners, it is highly suited for boiling ramen, cooking oatmeal, sautéing onions, shallow-frying eggs, or steaming dumplings in compact spaces.',
      keySpecs: ['Dual heat adjustments (220W - 600W)', 'Teflon-free non-stick inner lining', 'Over-heating & dry-boil safety protection'],
      iconName: 'Award'
    },
    {
      id: 'water-purity',
      title: 'Unsafe Drinking Water Concerns',
      problem: 'Worries about tap water quality, heavy metal impurities, and bacterial content in daily drinking water for families and infants.',
      solutionName: 'Multi-Stage Active Carbon Purifiers',
      solutionDesc: 'Integrate countertop drinking water purifiers with advanced multi-stage filtering columns. Look for certified active carbon and ion-exchange resin filters that remove heavy scales, chlorine, and biological particles safely.',
      keySpecs: ['Multi-stage active carbon filtration', 'Food-grade BPA-free raw polymers', 'Easy replacement cartridge indicators'],
      iconName: 'CheckCircle'
    },
    {
      id: 'food-spoilage',
      title: 'Rapid Food Spoilage & Counter Clutter',
      problem: 'High kitchen humidity causing quick spoilage of pulses, stale spices, and cluttered cabinet countertops.',
      solutionName: 'Airtight Vacuum Storage Container Sets',
      solutionDesc: 'Store dry staples and spices inside premium, stackable airtight containers. Containers outfitted with robust silicone gaskets lock out ambient humidity and prevent weevil infestations, maintaining fresh kitchen inventory.',
      keySpecs: ['Silicone airtight locking gaskets', 'Highly durable, glass-like transparent acrylic', 'Stackable space-saving design shapes'],
      iconName: 'LayoutGrid'
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

  // Home & Living Solver concerns list
  const homeLivingSolverConcerns = useMemo(() => [
    {
      id: 'home-moisture',
      title: 'Dry Indoor Air & Allergy Irritation',
      problem: 'Dry, static-filled indoor environments from air conditioning and heating causing dry skin, sinus irritation, and poor sleep.',
      solutionName: 'Ultrasonic Cool Mist Humidification & Aromatherapy',
      solutionDesc: 'Introduce balanced moisture with a whisper-quiet ultrasonic humidifier (like PureAire). Paired with dynamic 7-color LED lights, it fills the room with clean, comforting cool mist and aromatherapy options to soothe sinuses and enhance sleep quality.',
      keySpecs: ['Whisper-quiet decibel levels (<28 dB)', 'Intelligent waterless auto shut-off sensor', 'Generous water reservoir (500ml+)'],
      iconName: 'Sparkles'
    },
    {
      id: 'bedroom-lighting',
      title: 'Dull Room Ambience & Poor Video Lighting',
      problem: 'Flat, cold overhead lights making bedroom aesthetics feel uninviting and ruining warm photography or social stream backdrops.',
      solutionName: 'High-Definition Crystal Lens Sunset Projector LED',
      solutionDesc: 'Project a warm, natural golden halo using a premium optical crystal lens sunset lamp (like Lumina). Built with heavy-duty anodized aluminum joints, it rotates 180 degrees to easily shape beautiful warm gradients and cinematic mood lighting.',
      keySpecs: ['Thick high-index optical crystal lens', 'Heavy-duty aluminum & solid iron base', 'Low power high-efficiency 10W LED bulb'],
      iconName: 'Smile'
    },
    {
      id: 'desk-clutter',
      title: 'Messy Desktop Cables & Scattered Stationery',
      problem: 'Messy workspaces with scattered pens, remote controls, cosmetics, and tangled charging cables causing stress and low productivity.',
      solutionName: 'Scandinavian ABS & Natural Bamboo Organizer',
      solutionDesc: 'De-clutter your desk elegantly with a modular storage box (like BANGE). Outfitted with deep, adjustable natural bamboo dividers and integrated side cable slots, it sweeps away surface clutter while protecting tables from scratches.',
      keySpecs: ['Durable ABS body & sustainable bamboo dividers', 'Modular customizable slot configuration', 'Non-slip scratch-resistant bottom padding'],
      iconName: 'LayoutGrid'
    },
    {
      id: 'closet-organization',
      title: 'Collapsing Closet Shelves & Messy Wardrobes',
      problem: 'Piles of seasonal clothes, blankets, and towels collapsing on wardrobe shelves, attracting dust and creating clutter.',
      solutionName: 'Collapsible Steel Frame Cationic Canvas Boxes',
      solutionDesc: 'Organize closets with rigid, stackable fabric bins (like SilkNest). Featuring a solid internal steel support frame and reinforced dual faux-leather handles, they easily stack on shelves and collapse flat under 2cm when not in use.',
      keySpecs: ['Thick cationic fabric & breathable interior', 'Internal metal support wire frame', 'Reinforced vegan faux-leather handles'],
      iconName: 'CheckCircle'
    }
  ], []);

  // Bags & Travel Solver concerns list
  const bagsTravelSolverConcerns = useMemo(() => [
    {
      id: 'commuter-security',
      title: 'TSA Security Concerns & Pickpocket Protection',
      problem: 'Daily commutes to IT offices or university leaving expensive laptops, tablets, and personal credentials vulnerable to pickpockets or rain.',
      solutionName: 'TSA-Approved Anti-Theft Waterproof Backpacks',
      solutionDesc: 'Secure your high-end electronics with smart travel backpacks featuring integrated TSA combination locks and hidden pockets (like Mark Ryden). Built with high-density waterproof Oxford fabric and breathable honeycomb shoulder straps, they offer ultimate anti-theft security and postural support.',
      keySpecs: ['TSA-approved 3-digit combination security locks', 'Scratch-proof, water-resistant high-density fabric', 'Built-in external USB/USB-C pass-through charging ports'],
      iconName: 'Lock'
    },
    {
      id: 'tech-organization',
      title: 'Tangled Charger Cables & Scratched External SSDs',
      problem: 'Delicate external solid-state drives, chargers, memory cards, and USB cords getting tangled and damaged inside deep bag pockets.',
      solutionName: 'Impact-Resistant EVA Hardshell Tech Pouches',
      solutionDesc: 'Protect your expensive travel tech with heavy-duty shock-absorbing EVA hardshell cases (like BANGE). Outfitted with multi-layer elastic loops, secure mesh partitions, and original YKK dual zippers, they keep accessories organized and safe.',
      keySpecs: ['Heavy-duty shockproof EVA core with waterproof fabric', 'Original, smooth-gliding YKK dual zipper closure', 'Multiple elastic loops and structured mesh pockets'],
      iconName: 'LayoutGrid'
    },
    {
      id: 'luggage-mobility',
      title: 'Bulky, Heavy Luggage & Fragile Spinner Wheels',
      problem: 'Airport check-in and city transits disrupted by fragile suitcase wheels, heavy denting plastic shells, and poor internal organization.',
      solutionName: 'German Polycarbonate TSA Spinner Carry-Ons',
      solutionDesc: 'Upgrade to highly robust carry-on suitcases (like 90Fun). Engineered with 3-layer Covestro polycarbonate hardshells, silent 360-degree TPE double spinner wheels, and an adjustable aluminum alloy telescoping handle, they glide effortlessly while resisting heavy dents.',
      keySpecs: ['German Covestro 3-layer indestructible PC shell', 'Whisper-quiet 360° TPE spinner dual wheels', 'Adjustable aluminum telescoping trolley bar'],
      iconName: 'Award'
    },
    {
      id: 'sling-mobility',
      title: 'Heavy Pockets & Vulnerable Commutes',
      problem: 'Lugging bulky keys, phones, and wallets in jeans pockets during motorcycle rides or public transit commutes, creating discomfort and theft risks.',
      solutionName: 'Ergonomic Anti-Theft Sling Crossbody Chest Bags',
      solutionDesc: 'Lighten your pockets safely with ergonomic, single-shoulder sling chest bags (like Tigernu). Crafted with scratch-proof water-resistant fabric, hidden anti-theft rear zippers, and a reversible padded strap, they keep your hands completely free and tech secure.',
      keySpecs: ['Scratch-resistant water-resistant high-density fabric', 'Hidden rear anti-theft zipper secure pocket', 'Reversible padded strap with external USB charging'],
      iconName: 'Compass'
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
      case 'Sparkles': return <Sparkles size={18} />;
      case 'Lock': return <Lock size={18} />;
      case 'Compass': return <Compass size={18} />;
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
    canonical: categoryMeta ? `/category/${categorySlug}` : '/products',
    noindex: !categoryMeta
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
      name: "Men’s Clothing / Trousers",
      slug: "mens-clothing-trousers",
      desc: "Premium men's clothing value packs, tactical cargo pocket trousers, and everyday utility wear.",
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

  // Pet Supplies Subcategory Shelves config
  const petSuppliesSubCategories = useMemo(() => [
    {
      name: 'Cat Supplies',
      slug: 'cat-supplies',
      desc: 'Smart hydration systems and essential care items curated specifically to keep your feline companions active and healthy.',
      icon: <Smile size={16} />
    },
    {
      name: 'Pet Grooming',
      slug: 'pet-grooming',
      desc: 'Professional-grade deshedding brushes and undercoat grooming tools to manage shedding and keep coats shiny.',
      icon: <Award size={16} />
    }
  ], []);

  // Pet Supplies Solver concerns list
  const petSuppliesSolverConcerns = useMemo(() => [
    {
      id: 'pet-hydration',
      title: 'Inadequate Pet Hydration',
      problem: 'Cats and dogs refusing to drink static, stale water from traditional bowls, leading to severe dehydration, urinary tract infections, and kidney issues.',
      solutionName: 'Automatic Flowing Water Fountains',
      solutionDesc: 'Switch to a vet-recommended automatic pet drinking water fountain with a triple-action filter (like Catit). Flowing water mimics natural freshwater streams and appeals directly to a pet\'s instincts, enticing them to drink significantly more water and support their kidneys.',
      keySpecs: ['3L large reservoir capacity', 'Triple-action carbon-resin filter', 'Whisper-quiet low-voltage pump'],
      iconName: 'Smile'
    },
    {
      id: 'pet-shedding',
      title: 'Excessive Pet Hair & Shedding',
      problem: 'Dealing with constant loose pet hair, undercoat dander, and shedding on carpets, sofas, and clothes, causing allergy flare-ups.',
      solutionName: 'Professional Undercoat Deshedding Brushes',
      solutionDesc: 'Use a professional-grade undercoat deshedding brush (like the Furminator) once or twice weekly. It gently penetrates the topcoat to remove up to 90% of loose undercoat hair before it falls on your furniture, with a quick-release ejector button to clear hair instantly.',
      keySpecs: ['High-grade stainless steel edges', 'FURejector quick-release button', 'Ergonomic non-slip rubber grip'],
      iconName: 'Award'
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
              alt={`Best premium ${categoryMeta.name} products and verified lifestyle accessories in Pakistan - GadgetPicksPK`}
              className="w-full h-full object-cover object-center opacity-50"
              width="1200"
              height="514"
              loading="eager"
              fetchPriority="high"
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

        {/* Search-Intent Insights Section */}
        {searchIntentInsights[categorySlug] && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-colors duration-300 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Search-Intent Insights
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                {searchIntentInsights[categorySlug].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What to look for */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  What to Look For
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {searchIntentInsights[categorySlug].whatToLookFor}
                </p>
              </div>

              {/* Who the products are suitable for */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  Who Are These Products Suitable For?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {searchIntentInsights[categorySlug].suitableFor}
                </p>
              </div>

              {/* Important buying considerations */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  Important Buying Considerations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  {searchIntentInsights[categorySlug].buyingConsiderations}
                </p>
              </div>

              {/* Related product/category discovery */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  Related Product & Category Discovery
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed"
                   onClick={(e) => {
                     const target = e.target.closest('a');
                     if (target && target.getAttribute('href')?.startsWith('/')) {
                       e.preventDefault();
                       navigate(target.getAttribute('href'));
                     }
                   }}
                   dangerouslySetInnerHTML={{ __html: searchIntentInsights[categorySlug].relatedDiscovery }}>
                </p>
              </div>
            </div>
          </section>
        )}

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

        {/* Final Affiliate CTA Block (Only for kitchen-dining category) */}
        {categorySlug === 'kitchen-dining' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Build Your Smart, Safe Kitchen Space?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Streamline your cooking routines, support healthy on-the-go habits, and save precious kitchen space. Get the absolute best verified deals on rechargeable USB blenders and non-stick multi-functional electric hot pots on Daraz PK.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Kitchen%20%26%20Dining"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Kitchen & Dining Catalog <ArrowUpRight size={16} />
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

        {/* Final Affiliate CTA Block (Only for home-living category) */}
        {categorySlug === 'home-living' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Elevate Your Home & Living Ambience?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Add beautiful, relaxing mist to dry air, project cinematic warm halos in your bedroom, and clear table clutter. Secure the best verified deals on ultrasonic humidifiers, sunset projection lamps, and minimalist organizers on Daraz PK.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Home%20%26%20Living"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Home & Living Catalog <ArrowUpRight size={16} />
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

        {/* Home & Living Interactive Advisor Section */}
        {categorySlug === 'home-living' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Home & Living Ambience & Organization Solver
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with dry indoor air, dull lighting, cluttered desks, or messy wardrobes? Select your lifestyle issue below to instantly unlock our expert-recommended product solutions and key check parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {homeLivingSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-705 dark:text-slate-300 hover:border-orange-500'
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
                  const selected = homeLivingSolverConcerns.find(c => c.id === activeConcern) || homeLivingSolverConcerns[0];
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

        {/* Final Affiliate CTA Block (Only for bags-travel category) */}
        {categorySlug === 'bags-travel' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Upgrade to Secure, Premium Travel Gear?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Protect your high-end laptop, organize messy cords, and glide smoothly through airport transits with durable, TSA-approved carrying solutions. Secure the absolute best deals on smart anti-theft backpacks, hardshell organizers, and spinner suitcases on Daraz PK.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Bags%20%26%20Travel"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Bags & Travel Catalog <ArrowUpRight size={16} />
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

        {/* Bags & Travel Interactive Advisor Section */}
        {categorySlug === 'bags-travel' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Bags & Travel Commute Security & Organization Solver
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with laptop safety, tangled electronic cords, bulky pockets, or heavy suitcases? Select your core travel issue below to instantly discover our expert-recommended carry solutions and parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {bagsTravelSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-705 dark:text-slate-300 hover:border-orange-500'
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
                  const selected = bagsTravelSolverConcerns.find(c => c.id === activeConcern) || bagsTravelSolverConcerns[0];
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

        {/* Kitchen & Dining Specialist Subcategories */}
        {categorySlug === 'kitchen-dining' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Kitchen & Dining Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore rechargeable blenders, multi-functional electric hot pots, and high-efficiency smart kitchen appliances.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {kitchenDiningSubCategories.map((sub) => (
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
              {kitchenDiningSubCategories.map((sub) => {
                const subProducts = categoryProducts.filter(
                  (p) => p.subCategory?.toLowerCase() === sub.name.toLowerCase()
                );

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
                        {subProducts.length > 0 ? `${subProducts.length} ${subProducts.length === 1 ? 'Product' : 'Products'} Verified` : 'No products currently listed'}
                      </span>
                    </div>

                    {subProducts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-semibold">
                          Our team is currently evaluating and inspecting premium {sub.name} products on Daraz PK. Releasing soon!
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Pet Supplies Specialist Subcategories */}
        {categorySlug === 'pet-supplies' && (
          <section className="space-y-12 pt-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Specialist Shelves
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Pet Supplies Specialized Collections
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Explore specialized, high-quality, and safe grooming, feeding, and wellness supplies curated for your pets.
              </p>

              {/* Scrollable Subcategory Jump Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {petSuppliesSubCategories.map((sub) => (
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
              {petSuppliesSubCategories.map((sub) => {
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

        {/* Kitchen & Dining Interactive Advisor Section */}
        {categorySlug === 'kitchen-dining' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Kitchen & Dining Efficiency & Nutrition Solver
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with on-the-go blending, hostel cooking space constraints, tap water purity, or food freshness? Select your daily kitchen issue below to instantly unlock our expert-recommended product solutions and key criteria.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {kitchenDiningSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-705 dark:text-slate-300 hover:border-orange-500'
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
                  const selected = kitchenDiningSolverConcerns.find(c => c.id === activeConcern) || kitchenDiningSolverConcerns[0];
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

        {/* Pet Supplies Wellness & Hydration Solver Section (Only for pet-supplies category) */}
        {categorySlug === 'pet-supplies' && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-sm transition-all duration-300 space-y-8">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Advisor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Pet-Care Wellness & Hydration Advisor
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                Struggling with nervous pets who won't drink enough water, or excessive hair shedding on your furniture? Select your core pet care challenge below to instantly unlock our expert-recommended solution and key specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Concerns Selector */}
              <div className="lg:col-span-5 space-y-3">
                {petSuppliesSolverConcerns.map((concern) => {
                  const isActive = activeConcern === concern.id;
                  return (
                    <button
                      key={concern.id}
                      onClick={() => setActiveConcern(concern.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        isActive
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/10'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-850 text-slate-750 dark:text-slate-300 hover:border-orange-500'
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
                  const selected = petSuppliesSolverConcerns.find(c => c.id === activeConcern) || petSuppliesSolverConcerns[0];
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

        {/* Final Affiliate CTA Block (Only for pet-supplies category) */}
        {categorySlug === 'pet-supplies' && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 sm:p-12 shadow-lg border border-orange-400/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-16 -mb-16" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20 backdrop-blur-xs">
                <ShoppingBag size={10} /> Verified Affiliate Selection
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none">
                Ready to Give Your Beloved Pets the Care They Deserve?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
                Enhance your pet's health and wellness today. Invest in a vet-recommended automatic flower water fountain to boost hydration, and a professional undercoat deshedding brush to eliminate loose hair and dander. Grab the best verified deals on Daraz PK using our direct affiliate links.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/products?category=Pet%20Supplies"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-orange-50 text-orange-600 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Browse Pet Supplies Catalog <ArrowUpRight size={16} />
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
