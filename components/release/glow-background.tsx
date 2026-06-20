"use client";

import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";

type GlowBackgroundProps = {
  releaseId: string;
  src: string;
};

export const GlowBackground = ({ releaseId, src }: GlowBackgroundProps) => {
  const [glow, setGlow] = useState(() => {
    if (typeof window === "undefined") {
      return "#ffffff";
    }

    return localStorage.getItem(`glow-${releaseId}`) ?? "#ffffff";
  });

  useEffect(() => {
    const key = `glow-${releaseId}`;

    if (localStorage.getItem(key)) {
      return;
    }

    let cancelled = false;

    Vibrant.from(src)
      .getPalette()
      .then((palette) => {
        if (cancelled) return;

        const color =
          palette.DarkVibrant?.hex || palette.Vibrant?.hex || "#ffffff";

        localStorage.setItem(key, color);
        setGlow(color);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [releaseId, src]);

  return (
    <div
      className="
        absolute inset-[-5%]
        scale-110
        rounded-full
        blur-[120px]
        opacity-25
        pointer-events-none
        transition-colors duration-700
      "
      style={{
        backgroundColor: glow,
      }}
    />
  );
};
