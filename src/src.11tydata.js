const SITE = "https://jbtindore.in";

export default {
  eleventyComputed: {
    // URL preservation: this site is indexed by Google at `.html` URLs.
    // Eleventy's default would emit `cement.html` as `cement/index.html`; this
    // forces the flat `.html` output instead. `/index` already stems to
    // `index.html`, so the site root needs no special case.
    permalink: (data) => {
      if (data.permalink === false) return false;
      if (data.permalink) return data.permalink;
      return data.page.filePathStem.replace(/^\//, "") + ".html";
    },

    // Canonical always mirrors the output path, so it cannot drift. A page sets
    // `canonical: false` to suppress it entirely (404 does).
    canonical: (data) => {
      if (data.canonical === false) return false;
      if (data.canonical) return data.canonical;
      const stem = data.page.filePathStem.replace(/^\//, "");
      return stem === "index" ? SITE + "/" : `${SITE}/${stem}.html`;
    }
  }
};
