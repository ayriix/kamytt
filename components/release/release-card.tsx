import React from "react";
import { FullStreamingIcons } from "./full-streaming-icons";
import { ReleaseCover } from "./release-cover";
import type { Release } from "@/data/releases";

type ReleaseCardProps = {
  release: Release;
  highlightedCard: string | null;
  setHighlightedCard: (id: string | null) => void;

  playingId: string | null;
  playPreview: (
    id: string,
    file: string,
    start: number,
    duration: number,
  ) => void;
};

export const ReleaseCard = React.memo(
  ({
    release,
    highlightedCard,
    setHighlightedCard,
    playingId,
    playPreview,
  }: ReleaseCardProps) => {
    const preview = release.preview;
    const isHighlighted = highlightedCard === release.id;
    const isPlaying = playingId === release.id;

    const handleCardClick = () => {
      window.history.replaceState(null, "", `#${release.id}`);
      setHighlightedCard(release.id);
      setTimeout(() => {
        setHighlightedCard(null);
      }, 800);
    };

    const handlePreviewClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (preview) {
        playPreview(release.id, preview.file, preview.start, preview.duration);
      }
    };

    return (
      <div
        id={release.id}
        onClick={handleCardClick}
        className={`
        relative
        flex flex-row sm:flex-col
        items-start
        gap-5 sm:gap-0
        p-4 sm:p-5
        -m-4 sm:-m-5
        rounded-3xl
        transition-all duration-350 ease-out
        ${isHighlighted ? "bg-white/8 scale-[1.02]" : "bg-transparent scale-100"}
      `}
      >
        <ReleaseCover release={release} />

        <div className="flex-1 min-w-0 h-32 sm:h-auto flex flex-col">
          <h3 className="text-xl sm:text-lg tracking-[0.15em] font-light mb-0 sm:mb-2 transition-colors duration-300 cursor-pointer hover:text-white/50 wrap-break-word">
            {release.title}
          </h3>

          <div
            className={`
            mt-auto mb-4 sm:mb-6
            ${preview ? "gap-1" : "gap-0"}
            flex flex-col sm:flex-row
            items-start sm:items-center
            ${preview ? "min-h-10" : "min-h-8"}
          `}
          >
            <p className="text-sm text-white/50">{release.date}</p>

            {preview ? (
              <button
                onClick={handlePreviewClick}
                className="ml-0 sm:ml-4 text-[12px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors outline-none focus:outline-none"
              >
                {isPlaying ? "❚❚ Preview" : "▶ Preview"}
              </button>
            ) : (
              <div className="h-4" />
            )}
          </div>

          <div className="text-white/50 h-7">
            {!release.upcoming && <FullStreamingIcons release={release} />}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.release.id === nextProps.release.id &&
      prevProps.playingId === nextProps.playingId &&
      (prevProps.highlightedCard === prevProps.release.id) ===
        (nextProps.highlightedCard === nextProps.release.id)
    );
  },
);

ReleaseCard.displayName = "ReleaseCard";
