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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-light-32x32.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#080808]">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
