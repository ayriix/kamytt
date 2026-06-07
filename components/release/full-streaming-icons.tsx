import { ExpandableLinks } from "./expandable-links";
import { BandLinkIcon } from "@/components/icons/bandlink-icon";
import { SiSoundcloud, SiYoutube } from "react-icons/si";
import { releases } from "@/data/releases";

export const FullStreamingIcons = ({
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
      <BandLinkIcon className="w-6 h-6" />
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
