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
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/4 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/4 blur-3xl pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex-1 flex items-center justify-center">
              <svg
                className="w-8 sm:w-24 h-8 sm:h-24 text-white/40 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 10.25V6.25a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 px-3 sm:px-8 py-0 sm:py-1 mb-0 sm:mb-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-md whitespace-nowrap min-w-max">
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
            className="object-cover transition-transform duration-350 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.25)] pointer-events-none" />
        </>
      )}
    </Link>
  );
};
