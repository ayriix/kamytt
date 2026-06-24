"use client";

import { useEffect, useState } from "react";

export const ReleaseCountdown = ({ date }: { date: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const releaseDate = new Date(`${date}T00:00:00`);
      const diff = releaseDate.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("0D 00H 00M");
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      setTimeLeft(
        `${days.toString().padStart(2)}D
         ${hours.toString().padStart(2, "0")}H
         ${minutes.toString().padStart(2, "0")}M`,
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span
      className="
        text-[8px]
        sm:text-[12px]
        leading-6
        tracking-[0.18em]
        sm:tracking-[0.25em]
        text-white/80
        whitespace-nowrap
    "
    >
      {timeLeft}
    </span>
  );
};
