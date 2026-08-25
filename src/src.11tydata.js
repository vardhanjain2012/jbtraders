// URL preservation: this site is indexed by Google at `.html` URLs.
// Eleventy's default would emit `cement.html` as `cement/index.html`; this
// forces the flat `.html` output instead. `/index` already stems to
// `index.html`, so the site root needs no special case.
export default {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink === false) return false;
      if (data.permalink) return data.permalink;
      return data.page.filePathStem.replace(/^\//, "") + ".html";
    }
  }
};
