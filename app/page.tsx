"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { releases } from "../data/releases";
import { SiSoundcloud, SiYoutube } from "react-icons/si";

type StreamingIconsProps = {
  releaseId?: string;
  showMore?: boolean;
  onMoreClick?: (id: string) => void;
};

const StreamingIcons = ({
  releaseId,
  showMore = false,
  onMoreClick,
}: StreamingIconsProps) => (
  <div className="flex items-center gap-3">
    {/* BandLink */}
    <a
      href="#"
      className="hover:text-white transition-colors"
      aria-label="BandLink"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0H64V40C64 53.2548 53.2548 64 40 64H0V24C0 10.7452 10.7452 0 24 0Z"
          fill="currentColor"
        />

        <path
          d="M32 14L36.7023 24.1459L47.8042 25.5279L39.6066 33.0541L41.7557 43.9721L32 38.5L22.2443 43.9721L24.3934 33.0541L16.1958 25.5279L27.2977 24.1459L32 14Z"
          fill="#080808"
        />
      </svg>
    </a>
    {/* SoundCloud */}
    <a
      href="#"
      className="hover:text-white transition-colors"
      aria-label="SoundCloud"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689h1v-5.811z" />
      </svg>
    </a>
    {showMore && releaseId && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMoreClick?.(releaseId);
        }}
        className="
      hover:text-white transition-colors cursor-pointer
      text-[12px] tracking-[0.15em] uppercase
      text-white/40
    "
        aria-label="More platforms"
      >
        MORE
      </button>
    )}
  </div>
);

// Full streaming icons for release cards
const ExpandableLinks = ({
  links,
  icon,
}: {
  links: {
    url: string;
    label?: string;
  }[];
  icon: React.ReactNode;
}) => {
  const extraCount = links.length - 1;

  return (
    <div className="relative group flex items-center hover:z-50">
      {/* MAIN LINK */}
      <a
        href={links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-20 hover:text-white transition-colors"
      >
        {icon}
      </a>

      {/* +1 / +2 */}
      {extraCount > 0 && (
        <span className="ml-1.5 text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
          +{extraCount}
        </span>
      )}

      {/* EXTRA LINKS */}
      {extraCount > 0 && (
        <div
          className="
        absolute left-0 top-1/2 -translate-y-1/2
        flex items-center gap-2
        -ml-2
        pl-12 pr-2 py-2
        rounded-full
        bg-black backdrop-blur-3xl
        opacity-0 pointer-events-none
        translate-x-2
        transition-all duration-250
        group-hover:opacity-100
        group-hover:pointer-events-auto
        group-hover:translate-x-0
        z-0
      "
        >
          <div className="w-px h-6 bg-white/10 shrink-0 mr-1" />

          {links.slice(1).map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
            flex items-center gap-1.5
            hover:text-white transition-colors
          "
            >
              {icon}

              <span
                className="
              text-[8px]
              leading-none
              whitespace-nowrap
              px-1.5 py-0.5
              rounded-full
              bg-white/8
              text-white/45
              tracking-wide
            "
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const FullStreamingIcons = ({
  release,
}: {
  release: (typeof releases)[number];
}) => (
  <div className="flex items-center gap-4">
    {/* BandLink */}
    <a
      href={release.links.bandlink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/50 hover:text-white transition-colors"
      aria-label="BandLink"
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0H64V40C64 53.2548 53.2548 64 40 64H0V24C0 10.7452 10.7452 0 24 0Z"
          fill="currentColor"
        />

        <path
          d="M32 14L36.7023 24.1459L47.8042 25.5279L39.6066 33.0541L41.7557 43.9721L32 38.5L22.2443 43.9721L24.3934 33.0541L16.1958 25.5279L27.2977 24.1459L32 14Z"
          fill="#080808"
        />
      </svg>
    </a>

    {/* SoundCloud */}
    {release.links.soundcloud && (
      <ExpandableLinks
        links={release.links.soundcloud}
        icon={<SiSoundcloud className="w-7 h-7" />}
      />
    )}

    {/* YouTube */}
    {release.links.youtube && (
      <ExpandableLinks
        links={release.links.youtube}
        icon={<SiYoutube className="w-7 h-7" />}
      />
    )}
  </div>
);

// Skeleton Loading Component
const SkeletonLoader = () => (
  <div className="relative z-10 min-h-screen bg-transparent text-white">
    {/* Header Skeleton */}
    <header className="flex justify-center pt-12">
      <nav className="flex items-center gap-16">
        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
      </nav>
    </header>

    {/* Main Content Skeleton - Responsive */}
    <main className="flex flex-col lg:flex-row h-[calc(100vh-125px)]">
      <div className="flex-1 flex flex-col justify-center items-center lg:items-start py-8 px-12 lg:px-24">
        <div className="h-12 md:h-16 w-80 md:w-96 bg-white/10 rounded mt-4 animate-pulse" />
        <div className="h-3 w-64 bg-white/10 rounded mt-8 animate-pulse" />
        <div className="h-12 w-48 bg-white/10 rounded mt-12 animate-pulse" />
      </div>

      <div className="w-full lg:w-80 xl:w-96 flex flex-col justify-center items-center lg:items-start px-12 lg:px-0 lg:pr-34 py-12 lg:pt-3 lg:py-0">
        <div className="h-4 w-42 bg-white/10 rounded mb-12 animate-pulse" />
        <div className="space-y-16 w-full md:max-w-88 max-w-96">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-36 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-22 bg-white/10 rounded animate-pulse" />
                <div className="flex gap-2">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-5 w-5 bg-white/10 rounded-full animate-pulse"
                    />
                  ))}
                  <div className="h-5 w-12 bg-white/10 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>

    {/* Arrow Skeleton */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
      <div className="h-12 w-12 bg-white/10 rounded-full animate-pulse" />
    </div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);

  const fullText = "kamytt";

  useEffect(() => {
    // Simulate loading time for skeleton
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (isLoading) return;

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 150); // Moderate typing speed
      } else {
        // Hold for 1.5-2 seconds before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1700);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80); // Slightly faster deletion
      } else {
        // Small pause before restarting
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isLoading]);

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  const scrollToRelease = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.history.replaceState(null, "", `#${id}`);
      element.scrollIntoView({ behavior: "smooth" });
      // Trigger highlight animation
      setHighlightedCard(id);
      setTimeout(() => setHighlightedCard(null), 800);
    }
  };

  // Streaming platform icons component with enhanced shadow on more icon

  return (
    <div className="relative h-screen bg-[#080808] text-white overflow-x-hidden cursor-crosshair">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/jumpstyle2.jpg"
          alt="cover"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%] scale-105"
        />

        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="absolute inset-0 vhs-scanlines z-2" />
        <div className="vhs-band z-3" />
        <div className="absolute inset-0 vhs-vignette z-4" />

        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent z-5 pointer-events-none" />
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Minimal Centered Navigation */}
          <header className="relative z-10 flex justify-center pt-12">
            <nav className="flex items-center gap-16">
              <button
                onClick={() =>
                  document
                    .getElementById("releases")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-xs tracking-[0.3em] text-white/80 hover:text-white transition-colors uppercase cursor-pointer bg-transparent border-none"
              >
                Releases
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-xs tracking-[0.3em] text-white/80 hover:text-white transition-colors uppercase cursor-pointer bg-transparent border-none"
              >
                Contact
              </button>
            </nav>
          </header>

          {/* Main Content - Hero Section - Responsive layout */}
          <main className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
            {/* Left Section - Hero */}
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start px-12 lg:px-24 py-12 lg:py-0">
              {/* Fixed width container to prevent layout shift from typing animation */}
              <div className="w-full max-w-lg">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-[0.45em] mb-6 text-center lg:text-left whitespace-nowrap">
                  {displayText}
                  <span className="animate-pulse">_</span>
                </h1>
              </div>
              <p className="text-xs tracking-[0.35em] text-white/50 mb-12 uppercase text-center lg:text-left">
                Electronic Music Artist
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("releases")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-fit px-8 py-3 border border-white/50 text-[14px] tracking-[0.35em] hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer"
              >
                Listen Now
              </button>
            </div>

            {/* Right Section - Latest Releases Preview */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col justify-center items-center lg:items-start px-12 lg:px-0 lg:pr-24 py-12 lg:py-0">
              <h2 className="text-xs tracking-[0.3em] text-white/50 mb-8 uppercase">
                Latest Releases
              </h2>

              <div className="space-y-6 w-full max-w-sm">
                {releases
                  .slice(-3)
                  .reverse()
                  .map((release) => (
                    <div
                      key={release.title}
                      onClick={() => scrollToRelease(release.id)}
                      className="group relative w-full text-left p-4 -mx-4 rounded-lg cursor-pointer overflow-hidden"
                    >
                      {/* ФОН С ЗАПОЛНЕНИЕМ СЛЕВА НАПРАВО */}
                      <div className="absolute inset-0 rounded-lg bg-linear-to-r from-white/8 via-white/4 to-transparent scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 pointer-events-none" />

                      {/* КОНТЕНТ */}
                      <div className="relative z-10">
                        <div className="flex items-baseline justify-between mb-2">
                          <h3 className="text-sm tracking-[0.2em] font-light group-hover:text-white transition-colors">
                            {release.title}
                          </h3>
                          <span className="text-xs text-white/40">
                            — {release.date.slice(0, 4)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-white/50">
                          <span className="text-xs tracking-wider">
                            → LISTEN ON
                          </span>

                          <StreamingIcons
                            releaseId={release.id}
                            showMore={true}
                            onMoreClick={scrollToRelease}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </main>

          {/* Down Arrow - Static at bottom center of hero section */}
          <div className="relative z-10 flex justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("releases")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/40 hover:border-white/80 text-white/60 hover:text-white transition-all cursor-pointer animate-bounce"
              aria-label="Scroll to releases"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
              </svg>
            </button>
          </div>

          {/* Releases Section - Responsive 3-column grid */}
          <section
            id="releases"
            className="relative z-10 px-12 lg:px-24 pt-12 pb-12"
          >
            <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-black to-transparent pointer-events-none" />
            <h2 className="text-xs tracking-[0.3em] text-white/50 mb-12 uppercase text-center">
              Releases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[...releases].reverse().map((release) => (
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
                  className={`flex flex-col p-4 -m-4 rounded-xl transition-all duration-350 ease-out ${
                    highlightedCard === release.id
                      ? "bg-white/8 scale-[1.02]"
                      : "bg-transparent scale-100"
                  }`}
                >
                  {/* Cover Image Placeholder with soft gradient */}
                  <div className="aspect-square cursor-pointer w-full rounded-lg mb-6 overflow-hidden relative group">
                    <Image
                      src={release.cover}
                      alt={release.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-350 group-hover:scale-102"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    {/* subtle vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.25)]" />
                  </div>
                  {/* Release Info */}
                  <h3 className="text-lg tracking-[0.15em] font-light mb-2 transition-colors duration-300 cursor-pointer hover:text-white/50">
                    {release.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-6">{release.date}</p>
                  {/* Streaming Icons */}
                  <div className="text-white/50">
                    <FullStreamingIcons release={release} />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#080808] to-transparent pointer-events-none" />
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="relative z-10 bg-[#080808] min-h-screen flex flex-col items-center justify-center px-12"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-[#080808] to-transparent pointer-events-none z-20" />
            <h2 className="absolute top-16 text-xs tracking-[0.3em] text-white/50 uppercase">
              Contacts
            </h2>
            <div className="flex items-center justify-center gap-24 md:gap-40">
              <a
                href="https://t.me/bxxxnker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-all duration-500 hover:scale-110"
                aria-label="Telegram"
              >
                <svg
                  className="w-48 h-48 md:w-64 md:h-64"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              <a
                href="mailto:kamytt@ya.ru"
                className="text-white/40 hover:text-white transition-all duration-500 hover:scale-110"
                aria-label="Email"
              >
                <svg
                  className="w-48 h-48 md:w-64 md:h-64"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-4 7.75h8c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H8c-.69 0-1.25-.56-1.25-1.25V9c0-.69.56-1.25 1.25-1.25zm7.1 1.6-3.1 2.33-3.1-2.33c-.27-.2-.65-.15-.85.12-.2.27-.15.65.12.85l3.46 2.6c.22.17.53.17.75 0l3.46-2.6c.27-.2.32-.58.12-.85-.2-.27-.58-.32-.85-.12z" />
                </svg>
              </a>
            </div>
            <footer className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span className="text-xs text-white/30">
                kamytt © {new Date().getFullYear()}
              </span>
            </footer>
          </section>
        </>
      )}
    </div>
  );
}
