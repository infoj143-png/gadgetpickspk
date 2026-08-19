import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowLeft } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function ThankYou() {
  useSEO({
    title: 'Thank You | Message Received',
    description: 'Thank you for reaching out to us. We have received your message and will get back to you shortly.',
    canonical: '/thank-you',
    noindex: true
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-md p-8 sm:p-12 space-y-6 transition-colors">

        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-900/50">
          <CheckCircle2 size={48} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Thank You for Your Message!
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto leading-relaxed font-medium">
            Shukriya! Your message has been successfully transmitted via FormSubmit. Our team will review your inquiry and get back to you as soon as possible.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-sm rounded-xl transition-colors"
          >
            <ArrowLeft size={18} />
            Contact Form
          </Link>
        </div>

      </div>
    </div>
  );
}
