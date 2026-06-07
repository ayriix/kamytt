import { useState } from "react";
import { MobileLinksModal } from "./mobile-links-modal";

export const ExpandableLinks = ({
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
      <MobileLinksModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        links={links}
      />
    </>
  );
};
