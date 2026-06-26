import Link from "next/link";
import Image from "next/image";
import type { Release } from "@/data/releases";
import { ReleaseCountdown } from "./release-countdown";

type ReleaseCoverProps = {
  release: Release;
  index: number;
};

export const ReleaseCover = ({ release, index }: ReleaseCoverProps) => {
  const releaseDate = new Date(`${release.date}T07:00:00`);
  const isUpcoming = releaseDate > new Date();

  return (
    <Link
      href={isUpcoming ? "#" : `/releases/${release.id}`}
      onClick={(e) => {
        if (isUpcoming) {
          e.preventDefault();
          return;
        }
        e.stopPropagation();
      }}
      prefetch={isUpcoming ? false : undefined}
      className={`relative block w-32 sm:w-full shrink-0 aspect-square rounded-2xl sm:rounded-lg overflow-hidden mb-0 sm:mb-6 group ${
        isUpcoming ? "pointer-events-none opacity-90" : ""
      }`}
    >
      {isUpcoming ? (
        <div className="absolute inset-0 bg-white/4 overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)] before:pointer-events-none after:absolute after:inset-0 after:backdrop-blur-3xl">
          {/* blurred shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center flex flex-col items-center gap-2">
              <span
                className="text-2xl sm:text-5xl md:text-6xl opacity-70"
                role="img"
                aria-label="Locked"
              >
                🔒
              </span>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-3 -translate-x-1/2 px-3 sm:px-6 py-0 sm:py-1 mb-0 sm:mb-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-md whitespace-nowrap min-w-max">
            <ReleaseCountdown date={release.date} />
          </div>
        </div>
      ) : (
        <>
          <Image
            src={release.cover}
            alt={`${release.title} cover`}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 220px, 280px"
            className="object-cover transition-transform duration-350 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.25)] pointer-events-none" />
        </>
      )}
    </Link>
  );
};
