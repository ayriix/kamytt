export const BandLinkIcon = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    className={className}
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
);
