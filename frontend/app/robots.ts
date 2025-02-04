import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/api/",
      },
    ],
    sitemap: "https://secoma-record.com/sitemap.xml",
  };
}
