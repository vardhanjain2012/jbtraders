import fs from "node:fs";

const categories = JSON.parse(fs.readFileSync("src/_data/categories.json", "utf8"));

export default function (eleventyConfig) {
  // Renders a schema.org BreadcrumbList from front-matter `breadcrumbs`.
  eleventyConfig.addFilter("breadcrumbLd", (items) =>
    JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url
        }))
      },
      null,
      2
    )
  );

  // Product pages are generated from _data/products.json, so their breadcrumbs
  // are derived rather than written out in front matter.
  eleventyConfig.addFilter("productBreadcrumbs", (product) => {
    if (!product) return null;
    return [
      { name: "Home", url: "https://jbtindore.in/" },
      {
        name: categories[product.category].label,
        url: `https://jbtindore.in/${product.category}.html`
      },
      { name: product.name, url: `https://jbtindore.in/products/${product.slug}.html` }
    ];
  });

  eleventyConfig.addFilter("bySlug", (products, slug) =>
    products.find((p) => p.slug === slug)
  );

  // A related-product entry may carry its own name/subtitle/image, which wins over
  // the looked-up product. Used where a card's label has historically differed
  // from the page it links to.
  eleventyConfig.addFilter("merge", (base, overrides) => ({ ...base, ...overrides }));

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon-192.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");

  return {
    // `js` excluded so stray browser scripts are never treated as templates.
    templateFormats: ["html", "njk", "md"],
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
