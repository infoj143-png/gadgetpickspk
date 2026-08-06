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

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GadgetPicksPK",
    "url": "https://gadgetpickspk.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gadgetpickspk.vercel.app/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
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
  const reviews = product.faqs ? product.faqs.map((faq, index) => ({
    "@type": "Review",
    "reviewAspect": faq.q,
    "reviewBody": faq.a,
    "author": {
      "@type": "Person",
      "name": "GadgetPicksPK Editorial Board"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": product.rating,
      "bestRating": "5"
    }
  })) : [
    {
      "@type": "Review",
      "reviewBody": product.shortDescription,
      "author": {
        "@type": "Person",
        "name": "GadgetPicksPK Editorial"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.rating,
        "bestRating": "5"
      }
    }
  ];

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
    },
    "review": reviews
  };
}

export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
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
