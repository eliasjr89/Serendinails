import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://serendinails.com"; // Change to actual domain when deployed

  // Static routes
  const routes = [
    "",
    "/servicios",
    "/cursos",
    "/blog",
    "/galeria",
    "/contacto",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // In the future, you can fetch dynamic routes here (e.g. blog posts)
  // const posts = await getBlogPosts();
  // const postRoutes = posts.map(...)

  return [...routes];
}
