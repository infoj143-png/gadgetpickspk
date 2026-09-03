import React from 'react';
import { FileText, Scale, RefreshCw, HelpCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Terms() {
  useSEO({
    title: 'Terms & Conditions | GadgetPicksPK',
    description: 'Understand the terms of service, conditions of use, and guidelines for visiting GadgetPicksPK.',
    canonical: '/terms'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Scale size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Terms & Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">Last Updated: August 05, 2026</p>
        </div>

        {/* Content Details */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <FileText size={18} className="text-orange-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using <strong>GadgetPicksPK</strong>, you express your absolute agreement and compliance with these Terms & Conditions. If you do not agree to all elements of this agreement, you must immediately cease browsing or using any section of our web layout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-500" />
              2. Catalog Pricing & Affiliate Link Disclaimers
            </h2>
            <p>
              GadgetPicksPK operates as an affiliate referral engine. We pull catalog pricing, discounts, and image specs for products recommended to help shoppers find great deals on Daraz PK. However:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Price Variance:</strong> Product prices are subject to dynamic changes by third-party Daraz vendors. We are not responsible for any variance between prices displayed on our catalog versus live checkout prices on Daraz.
              </li>
              <li>
                <strong>No Purchases:</strong> We do not conduct monetary transactions or process payments on our site. All purchases are handled securely on Daraz's official platform.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-500" />
              3. Intellectual Property Rights
            </h2>
            <p>
              All original text, curation systems, CSS configurations, code blocks, and custom branding assets of GadgetPicksPK are the intellectual property of this web team. Third-party brand logos (e.g., Anker, Sony, Logitech, Xiaomi, Daraz) remain the registered trademarks of their respective corporate owners.
            </p>
          </section>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-xs text-slate-500 dark:text-slate-400">
            For further queries regarding terms of service or copyright permissions, please reach out to us using our standard contact channels.
          </div>

        </div>

      </div>
    </div>
  );
}
