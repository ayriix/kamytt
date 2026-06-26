"use client";

import { ReleaseCard } from "../release/release-card";
import { releases } from "@/data/releases";
import { useEffect } from "react";
import { usePreviewPlayer } from "@/hooks/usePreviewPlayer";

type ReleaseSectionProps = {
  highlightedCard: string | null;
  setHighlightedCard: (id: string | null) => void;
};

export const ReleaseSection = ({
  highlightedCard,
  setHighlightedCard,
}: ReleaseSectionProps) => {
  const { playingId, playPreview } = usePreviewPlayer();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timeout = setTimeout(() => {
      const element = document.getElementById(hash);
      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setHighlightedCard(hash);

      setTimeout(() => {
        setHighlightedCard(null);
      }, 800);
    }, 100);

    return () => clearTimeout(timeout);
  }, [setHighlightedCard]);

  return (
    <section
      id="releases"
      className="relative isolate px-6 sm:px-12 lg:px-24 py-10"
    >
      {/* top fade */}
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-[#080808] to-transparent pointer-events-none z-20" />

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#080808] to-transparent pointer-events-none z-20" />

      <div className="relative z-10">
        <h2 className="text-xs tracking-[0.3em] text-white/50 mb-16 uppercase text-center">
          Releases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {[...releases].reverse().map((release, index) => (
            <ReleaseCard
              key={release.id}
              release={release}
              index={index}
              highlightedCard={highlightedCard}
              setHighlightedCard={setHighlightedCard}
              playingId={playingId}
              playPreview={playPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
