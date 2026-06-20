"use client";

import { useRef, useState } from "react";

export const usePreviewPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [playingId, setPlayingId] = useState<string | null>(null);

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;

    const interval = setInterval(() => {
      if (audio.paused) {
        clearInterval(interval);
        return;
      }

      if (audio.volume < 0.88) {
        audio.volume = Math.min(audio.volume + 0.015, 0.9);
      } else {
        audio.volume = 0.9;
        clearInterval(interval);
      }
    }, 120);
  };

  const fadeOut = (audio: HTMLAudioElement, onFinish: () => void) => {
    const interval = setInterval(() => {
      if (audio.paused) {
        clearInterval(interval);
        return;
      }

      if (audio.volume > 0.03) {
        audio.volume = Math.max(audio.volume - 0.03, 0);
      } else {
        audio.volume = 0;

        clearInterval(interval);

        audio.pause();

        onFinish();
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
      audioRef.current = null;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setPlayingId(null);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
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

        const fadeOutDuration = 1200;

        timeoutRef.current = setTimeout(
          () => {
            fadeOut(audio, () => {
              audio.currentTime = start;
              audio.volume = 1;

              setPlayingId(null);

              if (audioRef.current === audio) {
                audioRef.current = null;
              }
            });
          },
          Math.max(duration * 1000 - fadeOutDuration, 0),
        );
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
