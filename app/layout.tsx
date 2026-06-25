import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist-Light.woff2",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kamytt.vercel.app"),

  title: "kamytt.",
  description: "Electronic music artist",
  verification: {
    google: "zFUaQSLyUbGuwr5HhkWSAfhgV-9mlZPOny2642C3qRA",
  },
  keywords: [
    "kamytt",
    "hardtekk",
    "hardtekk remix",
    "electronic music",
    "hard dance",
    "phonk",
    "tekk",
    "music producer",
    "remixes",
    "funk",
    "brazilian phonk",
    "brazilian funk",
    "baile funk",
    "jumpstyle",
    "hardstyle",
  ],

  openGraph: {
    title: "kamytt.",
    description: "Electronic music artist",
    url: "https://kamytt.vercel.app",
    siteName: "kamytt",

    images: [
      {
        url: "https://kamytt.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "kamytt",
      },
    ],

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kamytt.",
    description: "Electronic music artist",
    images: ["https://kamytt.vercel.app/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="bg-[#080808]">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
