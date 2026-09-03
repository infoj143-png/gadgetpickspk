import React from 'react';
import { Percent, ShieldAlert, Heart, ExternalLink, HelpCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function AffiliateDisclosure() {
  useSEO({
    title: 'Affiliate Disclosure | GadgetPicksPK',
    description: 'Learn how GadgetPicksPK supports itself through transparent affiliate commissions from Daraz PK recommendation links.',
    canonical: '/disclosure'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Header Title */}
        <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Percent size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Affiliate Disclosure</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">Transparent Trust Policy</p>
        </div>

        {/* Content body */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          <div className="bg-orange-50 dark:bg-slate-950 border border-orange-100/80 dark:border-slate-800 p-5 rounded-2xl flex gap-3.5 items-start">
            <ShieldAlert className="text-orange-500 flex-shrink-0 mt-0.5" size={24} />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-orange-900 dark:text-orange-400">Summary of how we run</h4>
              <p className="text-xs text-orange-800 dark:text-slate-300 leading-relaxed">
                When you click on one of our product catalog outbound buttons pointing to Daraz PK and finalize a purchase, we may receive a small marketing attribution commission at no extra financial expense to you.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Heart size={18} className="text-orange-500" />
              1. Supporting Independent Research
            </h2>
            <p>
              GadgetPicksPK is an independent recommendation catalog. Finding premium quality, verified gadgets on online marketplace systems is time-consuming. We dedicate extensive resources to vetting merchant reviews, filtering specifications, and presenting a simplified premium portal. The affiliate commissions we earn fund our ongoing operations, domain upkeep, and technical maintenance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <ExternalLink size={18} className="text-orange-500" />
              2. No Extra Charge to the Customer
            </h2>
            <p>
              The prices displayed on our listing pages are synchronized with active Daraz promotional pricing. Using our outbound redirect links will never result in inflated pricing, higher delivery charges, or extra service fees. In fact, we strive to pinpoint active markdown coupon campaigns that help you buy for less.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-500" />
              3. Objective Content Vetting
            </h2>
            <p>
              Our recommendation choices are based purely on review scoring and customer feedback metrics. We do not accept sponsorship payments, pre-arranged reviews, or marketing bribes to artificially boost product ratings. If an electronic accessory receives consistently poor marketplace feedback, we remove it from our database immediately.
            </p>
          </section>

          <p className="text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
            We highly appreciate your trust and support. Happy gadget hunting in Pakistan!
          </p>

        </div>

      </div>
    </div>
  );
}
