import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors duration-300">
      <Header />
      <main className="flex-grow animate-fadeIn">
        {children}
      </main>

      {/* Scroll to Top floating Button */}
      {showScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-110 flex items-center justify-center border border-orange-400/20"
          title="Scroll to Top"
          aria-label="Scroll back to the top of the page"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}
