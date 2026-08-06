import React from 'react';
import { Eye, Info, HelpCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Cookies() {
  useSEO({
    title: 'Cookie Policy | GadgetPicksPK',
    description: 'Learn how GadgetPicksPK uses cookies to improve loading speed, store filters, and support affiliate tracking.',
    canonical: '/cookie-policy'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Info size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Cookie Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">Last Updated: August 05, 2026</p>
        </div>

        {/* Content Details */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Eye size={18} className="text-orange-500" />
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small alphanumeric text files placed on your computer or smartphone when you visit a website. They enable web layouts to retain configuration data, remember active catalog filtering keywords, and support tracking parameters.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Info size={18} className="text-orange-500" />
              2. How We Utilize Cookies
            </h2>
            <p>
              We deploy cookies for three essential purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Preference Memory:</strong> Storing temporary parameters such as filter categories, budget caps, or dynamic sort selections as you browse different lists.
              </li>
              <li>
                <strong>Performance Auditing:</strong> Keeping track of load times and site responsiveness through anonymous tracking packages.
              </li>
              <li>
                <strong>Affiliate Link Attribution:</strong> When you click on "Buy on Daraz" recommendation buttons, Daraz PK sets an affiliate cookie to track your potential checkout and credit this blog with a small referral fee.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-orange-500" />
              3. Managing Cookie Settings
            </h2>
            <p>
              You are free to disable, clear, or manage cookie settings within your web browser settings (such as Chrome, Safari, or Firefox). Please note that turning off all cookie functions might cause minor visual glitches when loading catalog states or filtering lists on our blog.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
