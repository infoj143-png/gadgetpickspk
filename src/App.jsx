import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout structure
import Layout from './components/Layout';
import Analytics from './components/Analytics';

// Loading fallback spinner
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
}

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const CategoryListing = lazy(() => import('./pages/CategoryListing'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const AffiliateDisclosure = lazy(() => import('./pages/AffiliateDisclosure'));
const About = lazy(() => import('./pages/About'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to top on navigation helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<CategoryListing />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclosure" element={<AffiliateDisclosure />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<Cookies />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Wildcard 404 Routing fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
