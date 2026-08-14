import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_JSON_PATH = path.join(__dirname, 'src/data/products.json');
const DIST_INDEX_HTML_PATH = path.join(__dirname, 'dist/index.html');
const DIST_DIR_PATH = path.join(__dirname, 'dist');

// Formats currency nicely (PKR format)
const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

// Main execution block
async function prerender() {
  console.log('🏁 Starting Build-Time Pre-rendering script...');

  if (!fs.existsSync(PRODUCTS_JSON_PATH)) {
    console.error(`❌ Products JSON source not found at: ${PRODUCTS_JSON_PATH}`);
    process.exit(1);
  }

  if (!fs.existsSync(DIST_INDEX_HTML_PATH)) {
    console.error(`❌ Dist template index shell not found at: ${DIST_INDEX_HTML_PATH}. Did you run "vite build" first?`);
    process.exit(1);
  }

  // Load products data
  const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8'));
  const templateHtml = fs.readFileSync(DIST_INDEX_HTML_PATH, 'utf-8');

  console.log(`📦 Loaded ${products.length} products to pre-render.`);

  for (const product of products) {
    const productId = product.id;
    const productName = product.name || 'High-Quality Lifestyle Product';
    const brandName = product.brand || 'Premium';
    const modelName = product.model || 'Product';
    const shortDesc = product.shortDescription || '';
    const longDesc = product.longDescription || '';
    const categoryName = product.category || 'Lifestyle';
    const currentPrice = product.currentPrice || 0;
    const oldPrice = product.oldPrice || null;
    const discount = product.discount || 0;
    const availability = product.availability || 'In Stock';
    const lastUpdated = product.lastUpdated || 'Recently';
    const darazUrl = product.darazUrl || 'https://www.daraz.pk';
    const specifications = product.specifications || {};
    const features = product.features || [];
    const pros = product.pros || [];
    const cons = product.cons || [];
    const whoShouldBuy = product.whoShouldBuy || '';
    const buyingRecommendation = product.buyingRecommendation || '';
    const mainImageUrl = product.image || '';

    // Create paths for this product route: /products/[id]/index.html
    const productRouteDir = path.join(DIST_DIR_PATH, 'products', productId);
    if (!fs.existsSync(productRouteDir)) {
      fs.mkdirSync(productRouteDir, { recursive: true });
    }

    // Dynamic Title & Description matching useSEO hook rules
    const pageTitle = `${productName} Review & Specifications | GadgetPicksPK`;
    const pageDesc = `Full spec reviews of ${productName} on GadgetPicksPK. Check out pros, cons, expert ratings, and best Daraz Pakistan affiliate buying options.`;
    const absoluteProductUrl = `https://gadgetpickspk.vercel.app/products/${productId}`;

    // Clean any existing dynamic tags from the compiled template (to avoid duplicates)
    let dynamicHtml = templateHtml;

    // 1. Replace or Inject Page Title
    const titleRegex = /<title>[^<]*<\/title>/i;
    if (titleRegex.test(dynamicHtml)) {
      dynamicHtml = dynamicHtml.replace(titleRegex, `<title>${pageTitle}</title>`);
    } else {
      dynamicHtml = dynamicHtml.replace('</head>', `  <title>${pageTitle}</title>\n</head>`);
    }

    // 2. Clear out any original placeholder meta descriptions, OG, canonical, robots tag elements
    dynamicHtml = dynamicHtml
      .replace(/<meta name="title"[^>]*>/gi, '')
      .replace(/<meta name="description"[^>]*>/gi, '')
      .replace(/<meta property="og:type"[^>]*>/gi, '')
      .replace(/<meta property="og:url"[^>]*>/gi, '')
      .replace(/<meta property="og:title"[^>]*>/gi, '')
      .replace(/<meta property="og:description"[^>]*>/gi, '')
      .replace(/<meta name="twitter:card"[^>]*>/gi, '')
      .replace(/<meta name="twitter:url"[^>]*>/gi, '')
      .replace(/<meta name="twitter:title"[^>]*>/gi, '')
      .replace(/<meta name="twitter:description"[^>]*>/gi, '')
      .replace(/<link rel="canonical"[^>]*>/gi, '')
      .replace(/<meta name="robots"[^>]*>/gi, '');

    // 3. Construct exact compliant metadata tags
    const metaTags = `
    <meta name="title" content="${pageTitle}" />
    <meta name="description" content="${pageDesc}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${absoluteProductUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${absoluteProductUrl}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:image" content="${mainImageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${absoluteProductUrl}" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDesc}" />
    <meta name="twitter:image" content="${mainImageUrl}" />
    `;

    dynamicHtml = dynamicHtml.replace('</head>', `${metaTags}\n</head>`);

    // 4. Construct Structured Data JSON-LD schemas
    const categorySlug = categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gadgetpickspk.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Recommendations", "item": "https://gadgetpickspk.vercel.app/products" },
        { "@type": "ListItem", "position": 3, "name": categoryName, "item": `https://gadgetpickspk.vercel.app/category/${categorySlug}` },
        { "@type": "ListItem", "position": 4, "name": productName, "item": absoluteProductUrl }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productName,
      "image": [mainImageUrl],
      "description": shortDesc,
      "sku": productId,
      "brand": {
        "@type": "Brand",
        "name": brandName
      },
      "offers": {
        "@type": "Offer",
        "url": absoluteProductUrl,
        "priceCurrency": "PKR",
        "price": currentPrice,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating || 4.5,
        "reviewCount": product.reviewsCount || 10
      },
      "review": [
        {
          "@type": "Review",
          "reviewBody": shortDesc,
          "author": {
            "@type": "Person",
            "name": "GadgetPicksPK Editorial"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": product.rating || 4.5,
            "bestRating": "5"
          }
        }
      ]
    };

    const schemasHtml = `
    <script type="application/ld+json" id="product-schema">${JSON.stringify(productSchema)}</script>
    <script type="application/ld+json" id="breadcrumb-schema">${JSON.stringify(breadcrumbSchema)}</script>
    `;

    dynamicHtml = dynamicHtml.replace('</head>', `${schemasHtml}\n</head>`);

    // 5. Construct highly semantic, crawlable content inside `<div id="root">`
    // This allows immediate text parsing by crawlers before JS bundle mounts.
    const specificationsRows = Object.entries(specifications)
      .map(([key, val]) => `<tr><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">${key}</th><td style="padding: 8px; border-bottom: 1px solid #ddd;">${val}</td></tr>`)
      .join('');

    const keyFeaturesList = features
      .map((feat) => `<li style="margin-bottom: 8px;">${feat}</li>`)
      .join('');

    const prosList = pros
      .map((pro) => `<li style="color: green; margin-bottom: 6px;">✓ ${pro}</li>`)
      .join('');

    const consList = cons
      .map((con) => `<li style="color: red; margin-bottom: 6px;">&times; ${con}</li>`)
      .join('');

    const staticRootHtml = `
    <div id="root" style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
      <nav style="font-size: 12px; margin-bottom: 20px; font-weight: bold; color: #666;">
        <a href="/">Home</a> &gt; <a href="/products">Products Catalog</a> &gt; <span style="color: #f97316;">${productName}</span>
      </nav>

      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 10px; font-weight: bold; color: #f97316; text-transform: uppercase; letter-spacing: 1px; background: #fff7ed; padding: 4px 8px; border-radius: 4px;">
          ${categoryName}
        </span>
        <h1 style="font-size: 28px; font-weight: 900; margin-top: 10px; margin-bottom: 5px; color: #111;">
          ${productName}
        </h1>
        <p style="font-size: 12px; color: #888; text-transform: uppercase;">
          Brand: ${brandName} &bull; Model: ${modelName} &bull; Last Updated: ${lastUpdated}
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; text-align: center;">
        <div style="flex: 1; border: 1px solid #eee; border-radius: 12px; overflow: hidden; max-width: 400px; margin: 0 auto;">
          <img src="${mainImageUrl}" alt="${brandName} ${modelName} - ${productName}" style="width: 100%; height: auto; object-fit: cover;" />
        </div>
        <div style="flex: 1; padding: 15px; background: #fafafa; border-radius: 12px; border: 1px solid #eee;">
          <span style="font-size: 10px; color: #999; text-transform: uppercase; font-weight: bold;">Discounted Price</span>
          <h2 style="font-size: 32px; font-weight: 900; color: #f97316; margin: 5px 0;">
            ${formatCurrency(currentPrice)}
          </h2>
          ${oldPrice ? `<p style="font-size: 12px; color: #999; text-decoration: line-through;">Original Price: ${formatCurrency(oldPrice)} (${discount}% OFF)</p>` : ''}
          <p style="font-size: 12px; font-weight: bold; color: #059669; background: #ecfdf5; padding: 6px; border-radius: 6px; display: inline-block; margin-top: 5px;">
            ✓ ${availability} &bull; Verified Seller
          </p>
          <div style="margin-top: 15px;">
            <a href="${darazUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #f97316; color: #fff; text-decoration: none; padding: 12px 24px; font-weight: 900; border-radius: 8px; box-shadow: 0 4px 6px rgba(249, 115, 22, 0.15);">
              Buy on Daraz PK
            </a>
          </div>
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

      <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; font-weight: 800; border-bottom: 2px solid #f97316; padding-bottom: 5px; margin-bottom: 15px;">
          Expert Curated Review
        </h2>
        <p style="font-size: 15px; color: #555; leading-relaxed;">
          ${longDesc}
        </p>
      </section>

      <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; font-weight: 800; border-bottom: 2px solid #f97316; padding-bottom: 5px; margin-bottom: 15px;">
          Technical Specifications
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>
            ${specificationsRows}
          </tbody>
        </table>
      </section>

      ${keyFeaturesList ? `
      <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; font-weight: 800; border-bottom: 2px solid #f97316; padding-bottom: 5px; margin-bottom: 15px;">
          Key Features & Highlights
        </h2>
        <ul style="padding-left: 20px; font-size: 14px; color: #555;">
          ${keyFeaturesList}
        </ul>
      </section>
      ` : ''}

      <div style="display: flex; flex-direction: column; md-flex-direction: row; gap: 20px; margin-bottom: 30px;">
        <div style="flex: 1; padding: 15px; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
          <h3 style="font-size: 16px; font-weight: bold; color: #166534; margin-top: 0; margin-bottom: 10px;">Pros / Advantages</h3>
          <ul style="padding-left: 20px; font-size: 13px; list-style: none;">
            ${prosList}
          </ul>
        </div>
        <div style="flex: 1; padding: 15px; background: #fef2f2; border-radius: 12px; border: 1px solid #fca5a5;">
          <h3 style="font-size: 16px; font-weight: bold; color: #991b1b; margin-top: 0; margin-bottom: 10px;">Cons / Limitations</h3>
          <ul style="padding-left: 20px; font-size: 13px; list-style: none;">
            ${consList}
          </ul>
        </div>
      </div>

      <div style="padding: 15px; background: #1e293b; color: #fff; border-radius: 12px; margin-bottom: 30px; font-size: 13px;">
        <p style="margin-top: 0; margin-bottom: 10px;"><strong>Who Should Buy:</strong> ${whoShouldBuy}</p>
        <p style="margin-bottom: 0;"><strong>Buying Recommendation:</strong> ${buyingRecommendation}</p>
      </div>

      <div style="text-align: center; font-size: 11px; color: #888; padding-top: 20px; border-top: 1px solid #eee;">
        <p>This page is pre-rendered for search engine crawlers. Human visitors will receive interactive React hydration automatically.</p>
        <p>&copy; GadgetPicksPK. Supported by readers.</p>
      </div>
    </div>
    `;

    // Inject static root in the final compiled index copy using robust regex
    const rootRegex = /<div\s+id="root"[^>]*>\s*<\/div>/i;
    if (rootRegex.test(dynamicHtml)) {
      dynamicHtml = dynamicHtml.replace(rootRegex, staticRootHtml);
    } else {
      console.warn(`⚠️ Warning: Could not find <div id="root"> mount target in index.html template for product: ${productId}`);
    }

    // Save final compiled page file safely to products directory
    const outputHtmlPath = path.join(productRouteDir, 'index.html');
    fs.writeFileSync(outputHtmlPath, dynamicHtml, 'utf-8');
    console.log(`✅ Pre-rendered route: /products/${productId} -> ${outputHtmlPath}`);
  }

  console.log('🎉 Build-Time Pre-rendering completed successfully!');
}

prerender();
