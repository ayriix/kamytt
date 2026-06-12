import { FullStreamingIcons } from "./full-streaming-icons";
import { ReleaseCover } from "./release-cover";
import type { Release } from "@/data/releases";

type ReleaseCardProps = {
  release: Release;
  highlightedCard: string | null;
  setHighlightedCard: (id: string | null) => void;
};

export const ReleaseCard = ({
  release,
  highlightedCard,
  setHighlightedCard,
}: ReleaseCardProps) => {
  return (
    <div
      key={release.id}
      id={release.id}
      onClick={() => {
        window.history.replaceState(null, "", `#${release.id}`);

        setHighlightedCard(release.id);

        setTimeout(() => {
          setHighlightedCard(null);
        }, 800);
      }}
      className={`
                    relative

                    flex flex-row sm:flex-col
                    items-start
                    gap-5 sm:gap-0

                    p-4 sm:p-5
                    -m-4 sm:-m-5

                    rounded-3xl

                    transition-all duration-350 ease-out
                    ${
                      highlightedCard === release.id
                        ? "bg-white/8 scale-[1.02]"
                        : "bg-transparent scale-100"
                    }
                  `}
    >
      <ReleaseCover release={release} />
      <div
        className="
                      flex-1 min-w-0
                      h-32
                      sm:h-auto
                      flex flex-col
                    "
      >
        <h3
          className="
                      text-xl
                      sm:text-lg
                      tracking-[0.15em]
                      font-light
                      mb-1
                      sm:mb-2
                      transition-colors
                      duration-300
                      cursor-pointer
                      hover:text-white/50
                      break-words
                    "
        >
          {release.title}
        </h3>

        <p className="text-sm text-white/50 mt-auto mb-3 sm:mb-6">
          {release.date}
        </p>

        <div className="text-white/50 mt-auto h-7">
          {!release.upcoming && <FullStreamingIcons release={release} />}
        </div>
      </div>
    </div>
  );
};
