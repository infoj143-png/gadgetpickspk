import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldAlert, FileText, CheckCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'All Recommendations', href: '/products' },
    { label: 'Blender vs Hot Pot', href: '/compare/slique-blender-vs-hot-pot' },
    { label: 'Vacuum vs Steam Iron', href: '/compare/vacuum-cleaner-vs-steam-iron' },
    { label: 'Home Gadgets Under 5k', href: '/compare/best-home-gadgets-under-5000' },
    { label: 'Kitchen Tools Under 5k', href: '/compare/best-kitchen-tools-under-5000' }
  ];

  const supportLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Affiliate Disclosure', href: '/disclosure' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Pricing Disclaimer', href: '/disclaimer' }
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t-4 border-orange-500 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black text-lg">
                GP
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                GadgetPicks<span className="text-orange-500">PK</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Pakistan's premier premium lifestyle, kitchen, & home accessories curating catalog. We source, inspect, and link only highly rated, genuine products from Daraz for household enthusiasts.
            </p>
            <div className="flex items-center gap-2 text-xs bg-slate-800 dark:bg-slate-900 p-3 rounded-lg text-slate-400 border border-slate-700 dark:border-slate-800 font-semibold">
              <ShieldAlert size={20} className="text-orange-500 flex-shrink-0" />
              <span>We may earn an affiliate commission when you buy through our links. No extra charge to you.</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 pb-1 border-b border-slate-800 dark:border-slate-800 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight size={14} className="text-slate-600 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Policy / Support */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 pb-1 border-b border-slate-800 dark:border-slate-800 inline-block">
              Trust & Support
            </h4>
            <ul className="space-y-3 text-sm font-semibold">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <FileText size={14} className="text-slate-600 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact/Location Info */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 pb-1 border-b border-slate-800 dark:border-slate-800 inline-block">
              Reach Out
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-semibold">
              <li className="flex gap-2">
                <MapPin size={18} className="text-orange-500 flex-shrink-0" />
                <span>Karachi, Pakistan</span>
              </li>
              <li className="flex gap-2">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:support@gadgetpickspk.com" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  support@gadgetpickspk.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs bg-slate-800/50 dark:bg-slate-900/50 p-2.5 rounded border border-slate-800 dark:border-slate-800">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>Responsive within 24 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
          <div>
            &copy; {currentYear} <span className="text-slate-400">GadgetPicksPK</span>. All Rights Reserved. Made for Pakistan with ❤️.
          </div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link to="/disclosure" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Affiliate Disclosure</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
