import React, { useEffect } from 'react';

/**
 * Analytics and Verification manager component.
 * Dynamically injects tracking codes from Vercel / Environment Variables.
 */
export default function Analytics() {
  useEffect(() => {
    // 1. Google Search Console (GSC) Verification Meta Tag
    const gscId = import.meta.env.VITE_GSC_ID;
    if (gscId) {
      let metaEl = document.querySelector('meta[name="google-site-verification"]');
      if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.name = "google-site-verification";
        document.head.appendChild(metaEl);
      }
      metaEl.content = gscId;
    }

    // 2. Google Analytics 4 (GA4) Tracking Script
    const gaId = import.meta.env.VITE_GA4_ID;
    if (gaId) {
      // Check if already injected
      if (!document.getElementById('ga4-script-src')) {
        const scriptSrc = document.createElement('script');
        scriptSrc.id = 'ga4-script-src';
        scriptSrc.async = true;
        scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(scriptSrc);

        const scriptInit = document.createElement('script');
        scriptInit.id = 'ga4-script-init';
        scriptInit.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(scriptInit);
      }
    }

    // 3. Microsoft Clarity Analytics
    const clarityId = import.meta.env.VITE_CLARITY_ID;
    if (clarityId) {
      if (!document.getElementById('clarity-script')) {
        const scriptClarity = document.createElement('script');
        scriptClarity.id = 'clarity-script';
        scriptClarity.text = `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${clarityId}");
        `;
        document.head.appendChild(scriptClarity);
      }
    }

    // 4. Meta Pixel (Facebook Pixel) Tracking
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (pixelId) {
      if (!document.getElementById('meta-pixel-script')) {
        const scriptPixel = document.createElement('script');
        scriptPixel.id = 'meta-pixel-script';
        scriptPixel.text = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(scriptPixel);
      }
    }

  }, []);

  return null; // Renderless setup
}
