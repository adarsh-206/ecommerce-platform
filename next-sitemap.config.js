const getSlugs = async () => {
  const res = await fetch("https://api.chaka-chak.in/blogs/get-slugs");
  if (!res.ok) {
    console.error("Failed to fetch slugs. Status:", res.status);
    return [];
  }
  const data = await res.json();
  console.log("Fetched blog slugs for sitemap:", data);
  return data;
};

export default {
  siteUrl: "https://chaka-chak.in",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async () => {
    const slugs = await getSlugs();
    return slugs.map((item) => ({
      loc: `/blogs/${item.slug}`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
