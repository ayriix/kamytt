"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { releases } from "../data/releases";
import { SiSoundcloud, SiYoutube } from "react-icons/si";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "framer-motion";

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
  title,
}: {
  links: {
    url: string;
    label?: string;
  }[];
  icon: React.ReactNode;
  title: string;
}) => {
  const [open, setOpen] = useState(false);

  const extraCount = links.length - 1;
  const y = useMotionValue(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (links.length === 1) {
    return (
      <a
        href={links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
      >
        {icon}
      </a>
    );
  }

  return (
    <>
      {/* desktop hover */}
      <div
        className="
    relative
    hidden sm:flex
    group
    items-center

    min-w-10.5

    hover:z-200
  "
      >
        <a
          href={links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-50 hover:text-white transition-colors"
        >
          {icon}
        </a>

        <span
          className="
            ml-1.5
            text-[10px]
            text-white/40
            group-hover:text-white/70
            transition-colors
          "
        >
          +{extraCount}
        </span>

        <div
          className="
    absolute left-0 top-1/2 -translate-y-1/2

    flex items-center gap-2

    -ml-2
    pl-12 pr-2 py-2

    rounded-full

    bg-black
    backdrop-blur-3xl

    opacity-0
    pointer-events-none
    translate-x-2

    transition-all duration-250

    group-hover:opacity-100
    group-hover:pointer-events-auto
    group-hover:translate-x-0

    z-40
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
        relative z-50

        flex items-center gap-1.5

        hover:text-white
        transition-colors
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
      </div>

      {/* mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="
          sm:hidden
          flex items-center
          hover:text-white
          transition-colors
        "
      >
        {icon}

        <span className="ml-1.5 text-[10px] text-white/40">+{extraCount}</span>
      </button>

      {/* fullscreen modal */}
      {open &&
        createPortal(
          <div
            className="
        fixed inset-0
        z-999999

        bg-black/70

        flex items-end
      "
            onClick={() => setOpen(false)}
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragDirectionLock
              style={{ y }}
              dragElastic={0.35}
              onDrag={(_, info) => {
                if (info.offset.y < 0) {
                  y.set(0);
                }
              }}
              onDragEnd={(_, info) => {
                if (info.velocity.y > 0 && info.offset.y > 100) {
                  setOpen(false);
                } else {
                  y.set(0);
                }
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
          relative

          w-full

          rounded-t-[2.5rem]

          border-t border-white/10
          bg-[#0a0a0a]

          px-6 pt-5 pb-8

          shadow-[0_-20px_80px_rgba(0,0,0,0.7)]

          touch-pan-y
        "
            >
              {/* swipe handle */}
              <div
                className="
            w-16 h-1.5

            rounded-full

            bg-white/15

            mx-auto
            mb-7
          "
              />

              {/* title */}
              <h3
                className="
            text-center

            text-[12px]
            tracking-[0.55em]
            uppercase

            text-white/45

            mb-8
          "
              >
                {title}
              </h3>

              {/* links */}
              <div className="space-y-3">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                flex items-center justify-center

                w-full
                py-5

                rounded-2xl

                border border-white/8
                bg-white/2

                text-[11px]
                tracking-[0.38em]
                uppercase

                text-white/65

                hover:bg-white/8
                hover:text-white

                transition-all duration-300
              "
                  >
                    {link.label ||
                      (index === 0 ? "Original" : `Version ${index + 1}`)}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>,
          document.body,
        )}
    </>
  );
};

const FullStreamingIcons = ({
  release,
}: {
  release: (typeof releases)[number];
}) => (
  <div
    className="
    flex flex-wrap items-center gap-x-4 gap-y-2
    "
  >
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
        title="SoundCloud"
        links={release.links.soundcloud}
        icon={<SiSoundcloud className="w-7 h-7" />}
      />
    )}

    {/* YouTube */}
    {release.links.youtube && (
      <ExpandableLinks
        title="YouTube"
        links={release.links.youtube}
        icon={<SiYoutube className="w-7 h-7" />}
      />
    )}
  </div>
);

// Skeleton Loading Component
const SkeletonLoader = () => (
  <div className="relative z-10 min-h-screen bg-transparent flex flex-col text-white overflow-hidden">
    {/* Navigation */}
    <header className="flex justify-center pt-10 sm:pt-12">
      <nav className="flex items-center gap-10 sm:gap-16">
        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
      </nav>
    </header>

    {/* Main Hero Content */}
    <main
      className="
        flex-1
        flex flex-col lg:flex-row
        items-center
        justify-center
        px-6 sm:px-12 lg:px-24
        py-12 lg:py-0
        gap-12 lg:gap-0
      "
    >
      {/* Left */}
      <div
        className="
          lg:flex-1
          flex flex-col
          justify-center
          items-center lg:items-start
          w-full
        "
      >
        <div className="w-full max-w-lg flex justify-center lg:justify-start">
          <div
            className="
              h-12 sm:h-14 lg:h-16
              w-60 sm:w-96 lg:w-104
              bg-white/10
              rounded
              animate-pulse
              mb-8
            "
          />
        </div>

        <div
          className="
            h-3
            w-64 sm:w-64
            bg-white/10
            rounded
            animate-pulse
            mb-10 lg:mb-12
          "
        />

        <div
          className="
            h-12
            w-44
            border border-white/10
            rounded
            animate-pulse
          "
        />
      </div>

      {/* Right */}
      <div
        className="
          w-full
          lg:w-80 xl:w-92
          flex flex-col
          justify-center
          items-center lg:items-start
        "
      >
        <div
          className="
    h-3
    w-40
    bg-white/10
    rounded
    animate-pulse
    mb-2 lg:mb-8

    mx-auto lg:mx-0
    lg:self-start
  "
        />

        <div className="space-y-3 lg:space-y-6 w-full max-w-sm mx-auto lg:mx-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                w-full
                p-4 pl-2
                rounded-lg
              "
            >
              <div className="space-y-3">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />

                  <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />

                  <div className="flex items-center gap-3">
                    {[1, 2].map((j) => (
                      <div
                        key={j}
                        className="
                          h-5 w-5
                          rounded-full
                          bg-white/10
                          animate-pulse
                        "
                      />
                    ))}

                    <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>

    {/* Arrow */}
    <div className="hidden lg:flex justify-center pb-12">
      <div
        className="
          w-12 h-12
          rounded-full
          border border-white/10
          animate-pulse
        "
      />
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
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden cursor-crosshair">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* HERO SECTION */}
          <section
            id="hero"
            className="relative isolate min-h-screen flex flex-col overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/jumpstyle2.jpg"
                alt="cover"
                fill
                priority
                sizes="100vw"
                className="
                object-cover
                object-[60%_20%]
                sm:object-[55%_20%]
                lg:object-[50%_20%]
                scale-100 sm:scale-105
              "
              />

              <div className="absolute inset-0 bg-black/30 z-1" />
              <div className="absolute inset-0 vhs-scanlines z-2" />
              <div className="vhs-band z-3" />
              <div className="absolute inset-0 vhs-vignette z-4" />

              {/* bottom cinematic fade */}
              <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-black/50 to-transparent z-5 pointer-events-none" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Navigation */}
              <header className="flex justify-center pt-10 sm:pt-12">
                <nav className="flex items-center gap-10 sm:gap-16">
                  <button
                    onClick={() =>
                      document
                        .getElementById("releases")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
                    text-xs tracking-[0.3em]
                    text-white/80 hover:text-white
                    transition-colors uppercase
                    cursor-pointer bg-transparent border-none
                  "
                  >
                    Releases
                  </button>

                  <button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
                    text-xs tracking-[0.3em]
                    text-white/80 hover:text-white
                    transition-colors uppercase
                    cursor-pointer bg-transparent border-none
                  "
                  >
                    Contact
                  </button>
                </nav>
              </header>

              {/* Main Hero Content */}
              <main
                className="
                flex-1
                flex flex-col lg:flex-row
                items-center
                justify-center
                px-6 sm:px-12 lg:px-24
                py-12 lg:py-0
                gap-12 lg:gap-0
              "
              >
                {/* Left */}
                <div
                  className="
                  lg:flex-1
                  flex flex-col
                  justify-center
                  items-center lg:items-start
                  w-full
                "
                >
                  <div className="w-full max-w-lg">
                    <h1
                      className="
                      text-4xl sm:text-5xl lg:text-7xl
                      tracking-[0.35em]
                      mb-8
                      text-center lg:text-left
                      whitespace-nowrap
                    "
                    >
                      {displayText}
                      <span className="animate-pulse">_</span>
                    </h1>
                  </div>

                  <p
                    className="
                    text-xs
                    tracking-[0.35em]
                    text-white/50
                    mb-10 lg:mb-12
                    uppercase
                    text-center lg:text-left
                  "
                  >
                    Electronic Music Artist
                  </p>

                  <button
                    onClick={() =>
                      document
                        .getElementById("releases")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
                    w-fit
                    px-8 py-3
                    border border-white/50
                    text-[14px]
                    tracking-[0.35em]
                    hover:bg-white
                    hover:text-black
                    transition-all duration-300
                    uppercase
                    cursor-pointer
                  "
                  >
                    Listen Now
                  </button>
                </div>

                {/* Right */}
                <div
                  className="
                  w-full
                  lg:w-80 xl:w-92
                  flex flex-col
                  justify-center
                  items-center lg:items-start
                "
                >
                  <h2
                    className="
                    text-xs
                    tracking-[0.3em]
                    text-white/50
                    mb-2 lg:mb-8
                    uppercase pl-2
                  "
                  >
                    Latest Releases
                  </h2>

                  <div className="space-y-3 lg:space-y-6 w-full max-w-sm">
                    {releases
                      .slice(-3)
                      .reverse()
                      .map((release) => (
                        <div
                          key={release.title}
                          onClick={() => scrollToRelease(release.id)}
                          className="
                          group relative
                          w-full text-left
                          p-4 pl-2 rounded-lg
                          cursor-pointer overflow-hidden
                        "
                        >
                          {/* hover fill */}
                          <div
                            className="
                            absolute inset-0 rounded-lg
                            bg-linear-to-r
                            from-white/8
                            via-white/4
                            to-transparent
                            scale-x-0
                            origin-left
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:scale-x-100
                            pointer-events-none
                          "
                          />

                          <div className="relative z-10">
                            <div className="flex items-baseline justify-between mb-2">
                              <h3
                                className="
                                text-sm
                                tracking-[0.2em]
                                font-light
                                group-hover:text-white
                                transition-colors
                              "
                              >
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

              {/* Arrow */}
              <div className="hidden lg:flex justify-center pb-10">
                <button
                  onClick={() =>
                    document
                      .getElementById("releases")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="
                  flex items-center justify-center
                  w-12 h-12
                  rounded-full
                  border border-white/40
                  hover:border-white/80
                  text-white/60 hover:text-white
                  transition-all
                  cursor-pointer
                  animate-bounce
                "
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
            </div>
          </section>

          {/* RELEASES SECTION */}
          <section
            id="releases"
            className="
            relative isolate
            px-6 sm:px-12 lg:px-24
            py-10
          "
          >
            {/* top fade */}
            <div
              className="
              absolute top-0 left-0
              w-full h-40
              bg-linear-to-b
              from-[#080808]
              to-transparent
              pointer-events-none
              z-20
            "
            />

            {/* bottom fade */}
            <div
              className="
              absolute bottom-0 left-0
              w-full h-40
              bg-linear-to-t
              from-[#080808]
              to-transparent
              pointer-events-none
              z-20
            "
            />

            <div className="relative z-10">
              <h2
                className="
                text-xs
                tracking-[0.3em]
                text-white/50
                mb-16
                uppercase
                text-center
              "
              >
                Releases
              </h2>

              <div
                className="
grid grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6 sm:gap-8 lg:gap-12
              "
              >
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
                    <Link
                      href={`/releases/${release.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="
                      relative
                      w-32
                      sm:w-full
                      shrink-0
                      aspect-square
                      rounded-2xl
                      sm:rounded-lg
                      overflow-hidden
                      mb-0 sm:mb-6
                      group
                      block"
                    >
                      <Image
                        src={release.cover}
                        alt={release.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="
                        object-cover
                        transition-transform
                        duration-350
                        group-hover:scale-102
                      "
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.25)]" />
                    </Link>
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
                    "
                      >
                        {release.title}
                      </h3>

                      <p className="text-sm text-white/50 mt-auto mb-3 sm:mb-6">
                        {release.date}
                      </p>

                      <div className="text-white/50 mt-auto">
                        <FullStreamingIcons release={release} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section
            id="contact"
            className="
            relative isolate
            min-h-screen
            flex flex-col
            items-center
            justify-between
            px-6 sm:px-12
            py-10
          "
          >
            <div className="relative z-10 w-full flex-1 flex flex-col">
              <h2
                className="
                text-xs
                tracking-[0.3em]
                text-white/50
                uppercase
                text-center
                mb-16
              "
              >
                Contacts
              </h2>

              <div className="flex-1 flex items-center justify-center">
                <div
                  className="
                  flex flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  gap-12 sm:gap-16 md:gap-40
                "
                >
                  {/* Telegram */}
                  <a
                    href="https://t.me/bxxxnker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
    group relative
    flex flex-col items-center
    text-white/40
    hover:text-white
    active:text-white
    transition-all
    duration-500
    hover:scale-110
    active:scale-110
  "
                    aria-label="Telegram"
                  >
                    {/* label */}
                    <span
                      className="
      absolute -top-6 lg:-top-8
      text-xs tracking-[0.25em]
      uppercase
      text-white/80
      opacity-0
      translate-y-2
      transition-all duration-300
      pointer-events-none
      group-hover:opacity-100
      group-hover:translate-y-0
      group-active:opacity-100
      group-active:translate-y-0
    "
                    >
                      Telegram
                    </span>

                    <svg
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:kamytt@ya.ru"
                    className="
    group relative
    flex flex-col items-center
    text-white/40
    hover:text-white
    active:text-white
    transition-all
    duration-500
    hover:scale-110
    active:scale-110
  "
                    aria-label="Email"
                  >
                    {/* label */}
                    <span
                      className="
      absolute -top-6 lg:-top-8
      text-xs tracking-[0.25em]
      uppercase
      text-white/80
      opacity-0
      translate-y-2
      transition-all duration-300
      pointer-events-none
      group-hover:opacity-100
      group-hover:translate-y-0
      group-active:opacity-100
      group-active:translate-y-0
    "
                    >
                      Email
                    </span>

                    <svg
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-4 7.75h8c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H8c-.69 0-1.25-.56-1.25-1.25V9c0-.69.56-1.25 1.25-1.25zm7.1 1.6-3.1 2.33-3.1-2.33c-.27-.2-.65-.15-.85.12-.2.27-.15.65.12.85l3.46 2.6c.22.17.53.17.75 0l3.46-2.6c.27-.2.32-.58.12-.85-.2-.27-.58-.32-.85-.12z" />
                    </svg>
                  </a>
                </div>
              </div>

              <footer className="flex justify-center pt-16">
                <span className="text-xs text-white/30">
                  kamytt © {new Date().getFullYear()}
                </span>
              </footer>
            </div>
            {/* top fade */}
            <div
              className="
              absolute top-0 left-0
              w-full h-40
              bg-linear-to-b
              from-[#080808]
              to-transparent
              pointer-events-none
              z-20
            "
            />
          </section>
        </>
      )}
    </div>
  );
}
