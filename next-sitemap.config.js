import { getStaticAppRoutes } from "./scripts/getStaticRoutes.js";

const siteUrl = "https://chaka-chak.in";

const getBlogSlugs = async () => {
  const res = await fetch("https://api.chaka-chak.in/blogs/get-slugs");
  if (!res.ok) return [];
  return res.json();
};

const getProductSlugs = async () => {
  const res = await fetch("https://api.chaka-chak.in/common/products-get-ids");
  if (!res.ok) return [];
  return res.json();
};

const config = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,

  additionalPaths: async () => {
    const blogSlugs = await getBlogSlugs();
    const productIds = await getProductSlugs();

    const blogPaths = blogSlugs.map((item) => ({
      loc: `/blogs/${item.slug}`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    const productPaths = productIds.map((item) => ({
      loc: `/product/${item.id}`,
      changefreq: "daily",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    const staticRoutes = getStaticAppRoutes().map((route) => ({
      loc: route,
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    }));

    return [...staticRoutes, ...blogPaths, ...productPaths];
  },
};

export default config;
