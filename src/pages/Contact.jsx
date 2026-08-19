import React from 'react';
import { Mail, MessageSquare, MapPin, Send, Clock } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Us | WaqtNama & GadgetPicksPK',
    description: 'Get in touch with our team. Send us feedback, prayer time inquiries, or partnership proposals using our contact form.',
    canonical: '/contact'
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">Reach Out</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">Get in Touch</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Have questions regarding prayer calculation schedules, tech recommendations, or partnership inquiries? Drop us a line using the contact form.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-5 transition-colors">

            {/* Box 1: Email channel info without mailto link */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Support</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Support available via Contact Form
                </p>
              </div>
            </div>

            {/* Box 2: Location info */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Headquarters</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Karachi, Sindh, Pakistan
                </p>
              </div>
            </div>

            {/* Box 3: Reply SLA */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Standard Response SLA</h4>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Within 24 business hours
                </p>
              </div>
            </div>

          </div>

          {/* Sincere Trust Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 p-5 rounded-2xl text-white space-y-2.5 transition-colors border border-transparent dark:border-slate-800">
            <h4 className="font-extrabold text-sm flex items-center gap-1.5 text-orange-400">
              <MessageSquare size={16} /> Contact Support
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Fill out the contact form with your name, email address, and detailed message. We aim to review and answer every message within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side: FormSubmit.co Contact Form */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-md transition-colors text-slate-900 dark:text-white">
          <form
            action="https://formsubmit.co/your-email-here"
            method="POST"
            className="space-y-5"
          >
            {/* Hidden fields required by FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://gadgetpickspk.vercel.app/thank-you" />

            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-200 rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address (e.g. name@example.com)"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-200 rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Type your message here..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-200 rounded-xl text-xs font-semibold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-md shadow-orange-500/10 transition-colors cursor-pointer"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
