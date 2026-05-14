import { notFound } from "next/navigation";
import { releases } from "@/data/releases";
import Image from "next/image";
import { Vibrant } from "node-vibrant/node";
import Link from "next/link";
import path from "path";

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const release = releases.find((r) => r.id === slug);

  if (!release) {
    notFound();
  }

  const imagePath = path.join(
    process.cwd(),
    "public",
    release.cover.replace(/^\/+/, ""),
  );

  const palette = await Vibrant.from(imagePath).getPalette();
  const glow = palette.DarkVibrant?.hex || palette.Vibrant?.hex || "#ffffff";

  const fragments = [
    "-top-8 -left-10 w-18 h-18 -rotate-12 opacity-35",
    "top-10 -right-8 w-14 h-14 rotate-12 opacity-30",
    "bottom-6 -left-14 w-12 h-12 rotate-6 opacity-20",
    "-bottom-10 right-8 w-22 h-22 -rotate-6 opacity-15",
    "top-1/2 -left-20 w-10 h-10 rotate-12 opacity-10",
  ];

  return (
    <main className="relative min-h-screen bg-[#080808] text-white overflow-hidden cursor-crosshair">
      {/* background noise glow */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]
        pointer-events-none
      "
      />

      <div
        className="
    relative z-10
    min-h-screen
    flex flex-col justify-center
    max-w-7xl
    mx-auto
    px-6 sm:px-10 lg:px-16
    py-20 lg:py-24
  "
      >
        <Link
          href="/"
          className="
    absolute
    top-10 left-10
    lg:top-12 lg:left-20
    z-20

    inline-flex
    items-center
    gap-3

    text-sm
    tracking-[0.22em]

    uppercase
    text-white/35
    hover:text-white

    transition-colors
  "
        >
          <span className="text-lg">←</span>
          <span>Back to Releases</span>
        </Link>
        {/* TOP */}
        <div
          className="
    pt-14 sm:pt-10
    grid
    xl:grid-cols-[minmax(0,1fr)_420px]
    gap-16 md:gap-16 xl:gap-24
    items-center
    mb-10 xl:mb-6
  "
        >
          {/* title block */}
          <div
            className="
    min-w-0
    max-w-175 xl:max-w-190
    mx-auto xl:mx-0
    text-center xl:text-left
  "
          >
            <h1
              className="
    mt-2
    text-6xl
    sm:text-7xl
    lg:text-[88px]
    leading-[0.9]
    tracking-[0.08em] lg:tracking-[0.12em]
    max-w-none xl:max-w-[9ch]
  "
            >
              {release.title}
            </h1>

            <div
              className="
    mt-10
    flex items-center justify-center xl:justify-start
    gap-6
  "
            >
              <div className="h-px w-24 bg-white/15" />

              <span
                className="
                text-sm
                tracking-[0.3em]
                uppercase
                text-white/40
              "
              >
                {release.date}
              </span>
            </div>
            <a
              href="#streaming-links"
              className="
    inline-flex
    items-center
    justify-center
    mt-10
    px-16 py-3
    border border-white/50

    uppercase
    text-[14px]
    tracking-[0.35em]
    hover:bg-white
    hover:text-black

    transition-all duration-300
  "
            >
              Listen
            </a>
          </div>

          {/* cover */}
          <div className="group relative mx-auto xl:mx-0">
            {/* floating fragments */}
            <div className="absolute inset-0 pointer-events-none">
              {fragments.map((fragment, i) => (
                <div
                  key={i}
                  className={`
        absolute
        ${fragment}

        overflow-hidden
        rounded-xl
        border border-white/10
        blur-[0.4px]
        transition-all duration-700
        group-hover:scale-105
      `}
                >
                  <Image
                    src={release.cover}
                    alt=""
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
            {/* glow */}
            <div
              className="
    absolute inset-[-5%]
    scale-110
    rounded-full
    blur-[120px]
    opacity-25
    pointer-events-none
  "
              style={{
                backgroundColor: glow,
              }}
            />

            <div
              className="
    relative
    w-60
    sm:w-68
    md:w-85
    lg:w-105
    aspect-square
    overflow-hidden
    rounded-4xl
    border border-white/10
    -rotate-4
    hover:rotate-0
    transition-transform duration-500
  "
            >
              <Image
                src={release.cover}
                alt={release.title}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]" />
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="max-w-4xl mt-24 lg:mt-32" id="streaming-links">
          <div className="space-y-5">
            {/* BANDLINK */}
            <a
              href={release.links.bandlink}
              target="_blank"
              rel="noopener noreferrer"
              className="
              group
              flex items-center justify-between
              border-b border-white/10
              py-6
              hover:border-white/30
              transition-colors
            "
            >
              <div>
                <div
                  className="
                  text-xl
                  tracking-[0.18em]
                "
                >
                  BANDLINK
                </div>

                <div className="text-sm text-white/35 mt-2">
                  All streaming platforms
                </div>
              </div>

              <div
                className="
                text-3xl
                text-white/30
                group-hover:text-white
                group-hover:translate-x-2
                transition-all
              "
              >
                ↗
              </div>
            </a>

            {/* SOUNDCLOUD */}
            {release.links.soundcloud?.map((link, index) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                group
                flex items-center justify-between
                border-b border-white/10
                py-6
                hover:border-white/30
                transition-colors
              "
              >
                <div
                  className="
    text-xl
    tracking-[0.18em]
  "
                >
                  SOUNDCLOUD
                  {link.label && (
                    <span className="text-white/35"> — {link.label}</span>
                  )}
                </div>

                <div
                  className="
                  text-3xl
                  text-white/30
                  group-hover:text-white
                  group-hover:translate-x-2
                  transition-all
                "
                >
                  ↗
                </div>
              </a>
            ))}

            {/* YOUTUBE */}
            {release.links.youtube?.map((link, index) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                group
                flex items-center justify-between
                border-b border-white/10
                py-6
                hover:border-white/30
                transition-colors
              "
              >
                <div
                  className="
    text-xl
    tracking-[0.18em]
  "
                >
                  YOUTUBE
                  {link.label && (
                    <span className="text-white/35"> — {link.label}</span>
                  )}
                </div>

                <div
                  className="
                  text-3xl
                  text-white/30
                  group-hover:text-white
                  group-hover:translate-x-2
                  transition-all
                "
                >
                  ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
