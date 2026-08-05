/**
 * Utility functions to generate SEO structured data (JSON-LD)
 */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GadgetPicksPK",
    "url": "https://gadgetpickspk.vercel.app",
    "logo": "https://gadgetpickspk.vercel.app/favicon.svg",
    "sameAs": [
      "https://github.com",
      "https://twitter.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@gadgetpickspk.com",
      "areaServed": "PK"
    }
  };
}

export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `https://gadgetpickspk.vercel.app${item.url}` : undefined
    }))
  };
}

export function getProductSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.shortDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.specifications?.Brand || "Generic"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://gadgetpickspk.vercel.app/products/${product.id}`,
      "priceCurrency": "PKR",
      "price": product.currentPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewsCount || 10
    }
  };
}

/**
 * Appends or replaces the structured JSON-LD schema inside the document head.
 * @param {string} id - HTML ID attribute to uniquely identify script tag
 * @param {Object} schemaData - The JSON schema object
 */
export function injectJSONLD(id, schemaData) {
  let scriptEl = document.getElementById(id);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = id;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.text = JSON.stringify(schemaData);
}

/**
 * Clears the structured JSON-LD schema with given ID.
 * @param {string} id
 */
export function removeJSONLD(id) {
  const scriptEl = document.getElementById(id);
  if (scriptEl) {
    scriptEl.remove();
  }
}
