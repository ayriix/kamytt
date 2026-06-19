const glowCache = new Map<string, string>();

export async function getGlow(slug: string, imagePath: string) {
  if (glowCache.has(slug)) {
    return glowCache.get(slug)!;
  }

  const { Vibrant } = await import("node-vibrant/node");

  const palette = await Vibrant.from(imagePath).getPalette();

  const glow = palette.DarkVibrant?.hex || palette.Vibrant?.hex || "#ffffff";

  glowCache.set(slug, glow);

  return glow;
}
