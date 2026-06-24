import { MetadataRoute } from "next";
import { releases } from "@/data/releases";

export default function sitemap(): MetadataRoute.Sitemap {
  const releasePages = releases
    .filter((release) => !release.upcoming)
    .map((release) => ({
      url: `https://kamytt.vercel.app/releases/${release.id}`,
      lastModified: new Date(release.date),
    }));

  return [
    {
      url: "https://kamytt.vercel.app",
      lastModified: new Date(),
    },

    ...releasePages,
  ];
}
