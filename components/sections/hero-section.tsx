"use client";

import { releases } from "@/data/releases";
import { StreamingIcons } from "../release/streaming-icons";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type HeroSectionProps = {
  setHighlightedCard: (id: string | null) => void;
};

const GLYPHS = "01!@#$%k&*?_~/m\\<>[]{}t";

const GLITCH_COLORS = ["#D6D3D1", "#A8A29E", "#737373", "#F5F5F5", "#525252"];

export const HeroSection = ({ setHighlightedCard }: HeroSectionProps) => {
  const fullText = "kamytt";
  const [displayText, setDisplayText] = useState(fullText);
  const [glitchStyle, setGlitchStyle] = useState<React.CSSProperties>({});

  const frameRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 180;

    const scramble = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < fullText.length; i++) {
        const revealThreshold = Math.floor(
          (i / fullText.length) * (totalFrames * 0.2),
        );

        if (frame >= revealThreshold + 10) {
          output += fullText[i];
          complete++;
        } else {
          const randomChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          output += randomChar;
        }
      }

      setDisplayText(output);

      if (Math.random() > 0.3) {
        const dirX = Math.random() > 0.5 ? 1 : -1;
        const dirY = Math.random() > 0.5 ? 1 : -1;

        const dist1 = Math.floor(Math.random() * 4) + 2;
        const dist2 = Math.floor(Math.random() * 3) + 1;

        const color1 =
          GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
        const color2 =
          GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];

        setGlitchStyle({
          textShadow: `${dirX * dist1}px ${dirY * dist1}px 0 ${color1}, ${-dirX * dist2}px ${-dirY * dist2}px 0 ${color2}`,
          transform: `translate(${dirX * 0.25}px, ${dirY * 0.25}px) skewX(${dirX * 1.5}deg)`,
        });
      } else {
        setGlitchStyle({});
      }

      if (complete < fullText.length) {
        frame++;
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setGlitchStyle({});
        timeoutRef.current = setTimeout(() => {
          frame = 0;
          scramble();
        }, 2300);
      }
    };

    scramble();

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fullText]);

  const scrollToRelease = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    window.history.replaceState(null, "", `#${id}`);
    element.scrollIntoView({ behavior: "smooth" });
    setHighlightedCard(id);

    setTimeout(() => {
      setHighlightedCard(null);
    }, 800);
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/bg.png"
          alt="cover"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_20%] sm:object-[55%_20%] lg:object-[50%_20%] scale-100 sm:scale-100"
        />

        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="absolute inset-0 vhs-scanlines z-2" />
        <div className="vhs-band z-3" />
        <div className="absolute inset-0 vhs-vignette z-4" />
        <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-black/40 to-transparent z-5 pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col">
        <header className="flex justify-center pt-10 sm:pt-12">
          <nav className="flex items-center gap-10 sm:gap-16">
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
              Contacts
            </button>
          </nav>
        </header>

        {/* Main Hero Content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 py-12 lg:py-0 gap-16 lg:gap-0">
          {/* Left */}
          <div className="lg:flex-1 flex flex-col justify-center items-center lg:items-start w-full">
            <div className="w-full max-w-lg">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-[0.35em] mb-8 text-center lg:text-left whitespace-nowrap">
                <span className="vhs-pixel-text" style={glitchStyle}>
                  {displayText}
                </span>
                <span className="text-white animate-pulse">_</span>
              </h1>
            </div>

            <p className="text-xs tracking-[0.35em] text-white/50 mb-10 lg:mb-12 uppercase text-center lg:text-left">
              Electronic Music Artist
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("releases")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden px-8 py-3 border border-white/50 text-[16px] tracking-[0.35em] hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-end gap-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="visualizer-mini bg-black"
                    style={{
                      height: "18px",
                      width: "2px",
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-4">
                Listen Now
              </span>
            </button>
          </div>

          {/* Right */}
          <div className="w-full lg:w-80 xl:w-92 flex flex-col justify-center items-center lg:items-start">
            <h2 className="text-xs tracking-[0.3em] text-white/50 mb-2 lg:mb-8 uppercase pl-2">
              Latest Releases
            </h2>

            <div className="space-y-3 lg:space-y-6 w-full max-w-sm">
              {releases
                .filter((release) => !release.upcoming)
                .slice(-3)
                .reverse()
                .map((release) => (
                  <div
                    key={release.id}
                    onClick={() => scrollToRelease(release.id)}
                    className="group relative w-full text-left p-4 pl-2 rounded-lg cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-white/8 via-white/4 to-transparent scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 pointer-events-none" />

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
                          → AVAILABLE ON
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
      </div>
    </section>
  );
};
