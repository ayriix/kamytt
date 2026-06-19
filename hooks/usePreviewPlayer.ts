"use client";

import { useRef, useState } from "react";

export const usePreviewPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const fadeIn = (audio: HTMLAudioElement) => {
    const interval = setInterval(() => {
      if (audio.paused) {
        clearInterval(interval);
        return;
      }

      if (audio.volume < 0.85) {
        audio.volume = Math.min(audio.volume + 0.015, 0.9);
      } else {
        audio.volume = 0.9;
        clearInterval(interval);
      }
    }, 120);
  };

  const playPreview = (
    id: string,
    file: string,
    start: number,
    duration: number,
  ) => {
    if (audioRef.current && playingId === id && !audioRef.current.paused) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(file);
    audio.preload = "auto";
    audio.volume = 0;

    audioRef.current = audio;
    setPlayingId(id);

    const startPlayback = async () => {
      try {
        audio.currentTime = start;

        await audio.play();

        fadeIn(audio);
      } catch {
        setPlayingId(null);

        if (audioRef.current === audio) {
          audioRef.current = null;
        }
      }
    };

    if (audio.readyState >= 2) {
      startPlayback();
    } else {
      audio.addEventListener("canplay", startPlayback, {
        once: true,
      });
    }

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= start + duration) {
        audio.pause();
        audio.currentTime = start;
        setPlayingId(null);

        if (audioRef.current === audio) {
          audioRef.current = null;
        }
      }
    });

    audio.addEventListener("ended", () => {
      setPlayingId(null);

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    });
  };

  return {
    playingId,
    playPreview,
  };
};
