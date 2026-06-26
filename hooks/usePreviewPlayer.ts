"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export const usePreviewPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playingId, setPlayingId] = useState<string | null>(null);

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (audio.paused) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      if (audio.volume < 0.88) {
        audio.volume = Math.min(audio.volume + 0.015, 0.9);
      } else {
        audio.volume = 0.9;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 120);
  };

  const fadeOut = (audio: HTMLAudioElement, onFinish: () => void) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = setInterval(() => {
      if (audio.paused) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      if (audio.volume > 0.03) {
        audio.volume = Math.max(audio.volume - 0.03, 0);
      } else {
        audio.volume = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        audio.pause();
        onFinish();
      }
    }, 120);
  };

  const playPreview = useCallback(
    (id: string, file: string, start: number, duration: number) => {
      if (audioRef.current && playingId === id) {
        clearTimers();
        audioRef.current.pause();
        audioRef.current = null;
        setPlayingId(null);
        return;
      }

      if (audioRef.current) {
        clearTimers();
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(file);
      audio.preload = "auto";
      audio.volume = 0;
      audioRef.current = audio;
      setPlayingId(id);

      const startPlayback = async () => {
        if (audioRef.current !== audio) return;

        try {
          audio.currentTime = start;
          await audio.play();

          fadeIn(audio);

          const fadeOutDuration = 1200;
          timeoutRef.current = setTimeout(
            () => {
              if (audioRef.current !== audio) return;

              fadeOut(audio, () => {
                setPlayingId((current) => (current === id ? null : current));
                if (audioRef.current === audio) {
                  audioRef.current = null;
                }
              });
            },
            Math.max(duration * 1000 - fadeOutDuration, 0),
          );
        } catch {
          setPlayingId((current) => (current === id ? null : current));
          if (audioRef.current === audio) {
            audioRef.current = null;
          }
        }
      };

      if (audio.readyState >= 2) {
        startPlayback();
      } else {
        audio.addEventListener("canplay", startPlayback, { once: true });
      }

      audio.addEventListener("ended", () => {
        clearTimers();
        setPlayingId((current) => (current === id ? null : current));
        if (audioRef.current === audio) {
          audioRef.current = null;
        }
      });
    },
    [playingId],
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return {
    playingId,
    playPreview,
  };
};
