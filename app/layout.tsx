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
