import fs from "fs";
import path from "path";

const appDir = path.join(process.cwd(), "src/app");

const isPage = (file) =>
  file === "page.tsx" ||
  file === "page.js" ||
  file === "page.jsx" ||
  file === "page.ts";

const walkDir = (dir, basePath = "") => {
  let routes = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(basePath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      routes = routes.concat(walkDir(fullPath, relPath));
    } else if (isPage(file)) {
      const route = relPath.replace(/\/page\.(js|jsx|ts|tsx)$/, "");

      // exclude dynamic routes like [slug]
      if (!route.includes("[")) {
        routes.push(route === "/index" ? "/" : route);
      }
    }
  }

  return routes;
};

export const getStaticAppRoutes = () => {
  return walkDir(appDir);
};
