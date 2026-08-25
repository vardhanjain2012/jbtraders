import fs from "node:fs";
import path from "node:path";

// products.json describes every item shown on the site. Only those with
// `hasPage` get a detail page generated for them; the rest appear as cards on
// their category page and nowhere else.
const file = path.join(import.meta.dirname, "products.json");

export default JSON.parse(fs.readFileSync(file, "utf8")).filter((item) => item.hasPage);
