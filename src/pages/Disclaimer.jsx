import React from 'react';
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Disclaimer() {
  useSEO({
    title: 'Affiliate & Pricing Disclaimer | GadgetPicksPK',
    description: 'Learn about our affiliate partnership with Daraz PK, our review standards, and our pricing disclaimer policies.',
    canonical: '/disclaimer'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-10 space-y-8">

        {/* Title area */}
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Affiliate & Pricing Disclaimer</h1>
          <p className="text-slate-500 text-xs font-bold">Important Notice to Our Valued Visitors</p>
        </div>

        {/* Content Details */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">

          <div className="p-5 bg-orange-50 border border-orange-200/60 rounded-2xl text-orange-800 space-y-1.5">
            <h3 className="font-extrabold text-base flex items-center gap-2">
              <AlertCircle size={18} className="text-orange-600" />
              Critical Price Notice
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              <strong>Prices and stock levels may change on Daraz at any time.</strong> The catalog pricing listed on GadgetPicksPK is verified periodically, but we cannot guarantee that a seller will not modify their product's retail cost, shipping fees, or active coupon codes. Always confirm the final price on the official Daraz PK checkout page before completing any purchase.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-500" />
              1. Affiliate Compensation Disclosure
            </h2>
            <p>
              GadgetPicksPK participates in the official **Daraz Affiliate Network Program**. We recommend premium consumer electronics (including earbuds, headphones, and computer or mobile accessories) and redirect users to complete checkouts on Daraz PK. If you click on our custom product affiliate links and finish a qualified order, we receive a small commission from Daraz at **no additional cost to you**.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <RefreshCw size={18} className="text-orange-500" />
              2. Accuracy of Curated Information
            </h2>
            <p>
              While we put immense work into verifying our listings, testing specs, and auditing consumer reviews, we make no representations or warranties of any kind (express or implied) about the completeness, accuracy, or suitability of the product specifications, pros, cons, or seller statuses. Any reliance you place on our recommendations is strictly at your own discretion.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
