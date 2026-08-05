import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, Lock, FileText, Globe } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | GadgetPicksPK',
    description: 'Our privacy practices and policies for visitors of GadgetPicksPK. Learn how we handle information.',
    canonical: '/privacy-policy'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-10 space-y-8">

        {/* Title area */}
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Privacy Policy</h1>
          <p className="text-slate-500 text-xs font-bold">Last Updated: August 05, 2026</p>
        </div>

        {/* Content Details */}
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Eye size={18} className="text-orange-500" />
              1. Introduction & Overview
            </h2>
            <p>
              Welcome to <strong>GadgetPicksPK</strong>. We respect your privacy and are committed to protecting any personal data you may share with us. This Privacy Policy details how we handle information when you browse our product catalog, interact with affiliate recommendation items, subscribe to our email newsletter, or fill out our contact feedback form.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Lock size={18} className="text-orange-500" />
              2. Information We Collect
            </h2>
            <p>
              We collect information in two main ways to offer a streamlined user experience:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Voluntary Information:</strong> This includes email addresses provided voluntarily when subscribing to our newsletter updates, or names and messages input during contact form submissions.
              </li>
              <li>
                <strong>Automated Tracking:</strong> Like most premium sites, we collect anonymous standard analytics data (device identifiers, browser software, location country, and user flow) to help optimize site load times and category designs.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-orange-500" />
              3. Cookies and Tracking Pixels
            </h2>
            <p>
              We use cookie structures to store dynamic browser settings. Our affiliate network link partners (such as the Daraz Affiliate Network) may install external tracking cookies on your device if you click "Buy on Daraz" buttons, tracking eventual purchases to attribute sales commissions correctly. These cookies are subject to partners' own respective privacy policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Globe size={18} className="text-orange-500" />
              4. External Third-Party Links
            </h2>
            <p>
              GadgetPicksPK contains outward hyperlinks pointing directly to Daraz PK listings. We are not responsible for the content, design layouts, tracking policies, or security frameworks of external web catalogs. We encourage users to verify policies before providing personal checkout data on third-party domains.
            </p>
          </section>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-500">
            For any urgent questions or policy compliance requests, please reach out to us using our verified channels on the <Link to="/contact" className="text-orange-500 font-extrabold hover:underline">Contact Us page</Link>.
          </div>

        </div>

      </div>
    </div>
  );
}
