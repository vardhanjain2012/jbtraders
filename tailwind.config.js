/** @type {import('tailwindcss').Config} */
export default {
  // Scans templates and includes. The tab scripts build class names at runtime
  // (bg-blue-800, text-white, bg-gray-100, text-gray-700, hidden), but those
  // appear as string literals inside src/_includes/tabs*.njk, so the extractor
  // finds them there. `safelist` guards them anyway — see below.
  content: ["./src/**/*.{html,njk,js}"],
  safelist: ["bg-blue-800", "text-white", "bg-gray-100", "text-gray-700", "hidden"],
  theme: { extend: {} },
  plugins: []
};
