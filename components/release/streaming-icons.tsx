import React from "react";
import { BandLinkIcon } from "../icons/bandlink-icon";

type StreamingIconsProps = {
  releaseId?: string;
  showMore?: boolean;
  onMoreClick?: (id: string) => void;
};

const SOUNDCLOUD_SVG = (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689h1v-5.811z" />
  </svg>
);
export const StreamingIcons = React.memo(
  ({ releaseId, showMore = false, onMoreClick }: StreamingIconsProps) => {
    const handleMoreClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (releaseId) {
        onMoreClick?.(releaseId);
      }
    };

    return (
      <div className="flex items-center gap-3">
        {/* 3. Семантика: заменяем заблокированные <a> с href="#" на валидные <span>, так как это просто декоративные иконки */}
        <span className="text-white/40" aria-label="BandLink">
          <BandLinkIcon />
        </span>

        <span className="text-white/40" aria-label="SoundCloud">
          {SOUNDCLOUD_SVG}
        </span>

        {showMore && releaseId && (
          <button
            onClick={handleMoreClick}
            className="hover:text-white transition-colors cursor-pointer text-[14px] tracking-[0.15em] uppercase text-white/60 outline-none"
            aria-label="More platforms"
          >
            MORE
          </button>
        )}
      </div>
    );
  },
);

StreamingIcons.displayName = "StreamingIcons";
