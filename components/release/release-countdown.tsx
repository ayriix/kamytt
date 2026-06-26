"use client";

import { useEffect, useState } from "react";

export const ReleaseCountdown = ({ date }: { date: string }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const dateString = date.length === 10 ? `${date}T07:00:00` : date;

      const releaseDate = new Date(dateString);
      const diff = releaseDate.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("00D 00H 00M");
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      const d = days.toString().padStart(2);
      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");

      setTimeLeft(`${d}D ${h}H ${m}M`);
    };

    update();
    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span className="text-[8px] sm:text-[18px] leading-6 sm:leading-12 tracking-[0.18em] sm:tracking-[0.25em] text-white/80 whitespace-nowrap min-w-max">
      {timeLeft}
    </span>
  );
};
