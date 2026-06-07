"use client";

import { useEffect, useState } from "react";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReleaseSection } from "@/components/sections/releases-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden cursor-crosshair">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <HeroSection setHighlightedCard={setHighlightedCard} />
          <ReleaseSection
            highlightedCard={highlightedCard}
            setHighlightedCard={setHighlightedCard}
          />
          <ContactSection />
        </>
      )}
    </div>
  );
}
