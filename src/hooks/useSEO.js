import { useEffect } from 'react';

/**
 * Custom hook to dynamically manage meta description, keywords, title and open graph properties for SEO.
 * @param {Object} seoOptions - The SEO metadata to be set on the page.
 * @param {string} seoOptions.title - Page title.
 * @param {string} seoOptions.description - Page meta description.
 * @param {string} [seoOptions.canonical] - Optional canonical URL path.
 * @param {string} [seoOptions.ogImage] - Optional image URL for social previews.
 * @param {string} [seoOptions.ogType] - Optional Open Graph type (default: 'website').
 * @param {boolean} [seoOptions.noindex] - Optional robots noindex flag (default: false).
 */
export function useSEO({ title, description, canonical, ogImage, ogType = 'website', noindex = false }) {
  useEffect(() => {
    // 1. Set Page Title
    const formattedTitle = title.includes('GadgetPicksPK')
      ? title
      : `${title} | GadgetPicksPK`;
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (attributeName, attributeValue, contentValue) => {
      if (!contentValue) return;
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentValue);
    };

    // 2. Set Meta Description
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:description', description);

    // 3. Set Open Graph Title
    updateMetaTag('property', 'og:title', formattedTitle);
    updateMetaTag('name', 'twitter:title', formattedTitle);

    // 4. Set Open Graph Image
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // 5. Set Open Graph Type
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('name', 'twitter:card', 'summary_large_image');

    // 6. Set Canonical Link Tag
    let absoluteCanonicalUrl = canonical
      ? `https://gadgetpickspk.vercel.app${canonical.startsWith('/') ? canonical : `/${canonical}`}`
      : 'https://gadgetpickspk.vercel.app';

    // Normalize canonical URLs: strip trailing slashes (except for the root domain itself)
    if (absoluteCanonicalUrl.endsWith('/') && absoluteCanonicalUrl !== 'https://gadgetpickspk.vercel.app/') {
      absoluteCanonicalUrl = absoluteCanonicalUrl.slice(0, -1);
    }

    let linkTag = document.querySelector('link[rel="canonical"]');
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'canonical');
      document.head.appendChild(linkTag);
    }
    linkTag.setAttribute('href', absoluteCanonicalUrl);

    // 7. Manage Robots Tag for Noindex/Index (to avoid state leakage during SPA transitions)
    if (noindex) {
      updateMetaTag('name', 'robots', 'noindex, follow');
    } else {
      updateMetaTag('name', 'robots', 'index, follow');
    }

    // Optional Cleanup (Optional, but let's keep metadata on page transitions)
  }, [title, description, canonical, ogImage, ogType, noindex]);
}
export default useSEO;
