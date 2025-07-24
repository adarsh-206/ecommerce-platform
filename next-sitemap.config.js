const getBlogSlugs = async () => {
  const res = await fetch("https://api.chaka-chak.in/blogs/get-slugs");
  if (!res.ok) {
    console.error("Failed to fetch blog slugs. Status:", res.status);
    return [];
  }
  const data = await res.json();
  return data;
};

const getProductSlugs = async () => {
  const res = await fetch("https://api.chaka-chak.in/products-get-ids");
  if (!res.ok) {
    console.error("Failed to fetch product IDs. Status:", res.status);
    return [];
  }
  const data = await res.json();
  return data;
};

module.exports = {
  siteUrl: "https://chaka-chak.in",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async (config) => {
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

    return [...blogPaths, ...productPaths];
  },
};
