"use client";

import { useEffect, useState, useTransition } from "react";
import { Vibrant } from "node-vibrant/browser";

type GlowBackgroundProps = {
  releaseId: string;
  src: string;
};

export const GlowBackground = ({ releaseId, src }: GlowBackgroundProps) => {
  const [glow, setGlow] = useState("#444444");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const key = `glow-${releaseId}`;
    const cachedColor = localStorage.getItem(key);

    if (cachedColor) {
      startTransition(() => {
        setGlow(cachedColor);
      });
      return;
    }

    let cancelled = false;

    Vibrant.from(src)
      .getPalette()
      .then((palette) => {
        if (cancelled) return;

        const color =
          palette.DarkVibrant?.hex || palette.Vibrant?.hex || "#444444";

        localStorage.setItem(key, color);
        startTransition(() => {
          setGlow(color);
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [releaseId, src]);

  return (
    <div
      className="absolute inset-[-5%] scale-110 rounded-full blur-[120px] opacity-25 pointer-events-none transition-colors duration-700"
      style={{
        backgroundColor: glow,
      }}
    />
  );
};
