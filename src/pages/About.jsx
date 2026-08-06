import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About Us | GadgetPicksPK',
    description: 'Learn about the vision, team, and verification process behind GadgetPicksPK—the ultimate Pakistani tech recommendation hub.',
    canonical: '/about'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Heart size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">About GadgetPicksPK</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">Unbiased, Curated, and Verified Tech Recommendations</p>
        </div>

        {/* Content Details */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles size={18} className="text-orange-500" />
              Who We Are
            </h2>
            <p>
              Founded in 2026, <strong>GadgetPicksPK</strong> is Pakistan's premier consumer-first technology curation hub. Our objective is to guide tech enthusiasts and everyday shoppers through the massive digital marketplace of Daraz PK. Instead of selling products directly, we scour hundreds of product listings, read countless reviews, analyze brand specifications, and recommend only the absolute best earbuds, headphones, and computing or mobile accessories.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Award size={18} className="text-orange-500" />
              Our Strict Curation Pillars
            </h2>
            <p>
              We do not believe in mass listing low-quality items. Every item displayed in our recommendation catalog must pass our strict five-step quality verification check:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Seller Assessment:</strong> We only link to authorized brand flagships (Daraz Mall) or marketplace sellers with a positive response rating above 90%.
              </li>
              <li>
                <strong>Buyer Feedback Audit:</strong> We analyze customer photographs and reviews to filter out items with inflated specifications.
              </li>
              <li>
                <strong>Price vs Value Index:</strong> We calculate if the current market price matches the build quality, ensuring you never overpay.
              </li>
              <li>
                <strong>Local Availability:</strong> All recommended products are shipped directly from within Pakistan, keeping delivery times fast.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-500" />
              Affiliate Integrity & Transparency
            </h2>
            <p>
              We are an independent review platform. As a participant in the Daraz Affiliate Program, we earn small commissions on qualified purchases completed through our custom links. This partnership never affects the price you pay, and it ensures we maintain absolute objectivity when writing pros, cons, and performance limitations for each gadget.
            </p>
          </section>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Have any product review feedback?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">We love hearing back from our Pakistani tech community!</p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              Get In Touch
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
