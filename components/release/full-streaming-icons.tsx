import { ExpandableLinks } from "./expandable-links";
import { BandLinkIcon } from "@/components/icons/bandlink-icon";
import { SiSoundcloud, SiYoutube } from "react-icons/si";
import { releases } from "@/data/releases";

export const FullStreamingIcons = ({
  release,
}: {
  release: (typeof releases)[number];
}) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    <a
      href={release.links.bandlink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/50 hover:text-white transition-colors"
      aria-label="BandLink"
    >
      <BandLinkIcon className="w-6 h-6" />
    </a>
    {release.links.soundcloud && release.links.soundcloud.length > 0 && (
      <ExpandableLinks
        title="SoundCloud"
        links={release.links.soundcloud}
        icon={<SiSoundcloud className="w-7 h-7" />}
      />
    )}

    {release.links.youtube && release.links.youtube.length > 0 && (
      <ExpandableLinks
        title="YouTube"
        links={release.links.youtube}
        icon={<SiYoutube className="w-7 h-7" />}
      />
    )}
  </div>
);
