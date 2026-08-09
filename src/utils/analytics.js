/**
 * Reusable analytics utility for outbound affiliate CTA clicks and social sharing tracking.
 * Safely interacts with GA4 (gtag), Meta Pixel (fbq), and Microsoft Clarity.
 *
 * @param {string} action - Action name (e.g., 'click_cta', 'share_product')
 * @param {Object} properties - Metadata about the event (e.g., productId, productName, targetUrl)
 */
export function trackCTA(action, properties = {}) {
  try {
    // 1. Google Analytics 4 (GA4) Custom Tracking
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: 'Affiliate Conversion',
        event_label: properties.productName || properties.productId || 'Unknown Product',
        ...properties
      });
    }

    // 2. Meta Pixel (Facebook Pixel) Custom Event Tracking
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', action, {
        content_name: properties.productName,
        content_ids: [properties.productId],
        content_category: properties.category,
        value: properties.price,
        currency: 'PKR',
        ...properties
      });
    }

    // 3. Microsoft Clarity Event Tracking
    if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
      window.clarity('event', action);
    }

    // Debugging output in non-production environments
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Tracked action: "${action}"`, properties);
    }
  } catch (error) {
    console.warn('Analytics tracking failed safely:', error);
  }
}
