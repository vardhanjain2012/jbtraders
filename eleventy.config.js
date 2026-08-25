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
