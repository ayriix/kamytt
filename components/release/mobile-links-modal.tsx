"use client";

import { motion, useMotionValue, PanInfo } from "framer-motion";
import { useEffect, useTransition } from "react";
import { createPortal } from "react-dom";

type MobileLinksModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  links: {
    url: string;
    label?: string;
  }[];
};

export const MobileLinksModal = ({
  open,
  onClose,
  title,
  links,
}: MobileLinksModalProps) => {
  const y = useMotionValue(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      document.body.style.overflow = open ? "hidden" : "";
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.velocity.y > 0 && info.offset.y > 100) {
      onClose();
    } else {
      y.set(0);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return createPortal(
    <div
      className="fixed inset-0 z-999999 bg-black/70 flex items-end"
      onClick={onClose}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragDirectionLock
        style={{ y }}
        dragElastic={0.35}
        onDrag={(_, info) => {
          if (info.offset.y < 0) y.set(0);
        }}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={handleModalClick}
        className="
          relative
          w-full
          rounded-t-[2.5rem]
          border-t border-white/10
          bg-[#0a0a0a]
          px-6 pt-5 pb-8
          shadow-[0_-20px_80px_rgba(0,0,0,0.7)]
          touch-none 
        "
      >
        <div className="w-16 h-1.5 rounded-full bg-white/15 mx-auto mb-7 pointer-events-none" />

        <h3 className="text-center text-[12px] tracking-[0.55em] uppercase text-white/45 mb-8">
          {title}
        </h3>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto overscroll-contain touch-pan-y">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center
                w-full
                py-5
                rounded-2xl
                border border-white/8
                bg-white/2
                text-[11px]
                tracking-[0.38em]
                uppercase
                text-white/65
                active:bg-white/10
                active:scale-[0.99]
                transition-all duration-200
              "
            >
              {link.label ||
                (index === 0 ? "Original" : `Version ${index + 1}`)}
            </a>
          ))}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};
