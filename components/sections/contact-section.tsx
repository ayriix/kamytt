"use client";

import { useState } from "react";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    const email = "kamytt@ya.ru";

    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <section
      id="contact"
      className="relative isolate min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 py-10"
    >
      <div className="relative z-10 w-full flex-1 flex flex-col">
        <h2 className="text-xs tracking-[0.3em] text-white/50 uppercase text-center mb-16">
          Contacts
        </h2>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-40">
            {/* Telegram */}
            <a
              href="https://t.me/bxxxnker"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center text-white/40 hover:text-white active:text-white transition-all duration-500 hover:scale-110 active:scale-110"
              aria-label="Telegram"
            >
              <span className="absolute -top-6 lg:-top-8 text-xs tracking-[0.25em] uppercase text-white/80 opacity-0 translate-y-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0">
                Telegram
              </span>

              <svg
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="group relative flex flex-col items-center text-white/40 hover:text-white active:text-white transition-all duration-500 hover:scale-110 active:scale-110 bg-transparent border-none p-0 cursor-pointer outline-none"
              aria-label="Copy Email"
            >
              <span
                className={`absolute -top-6 lg:-top-8 text-xs tracking-[0.25em] uppercase pointer-events-none transition-all duration-300 ${
                  copied
                    ? "text-white opacity-100 translate-y-0 font-medium"
                    : "text-white/80 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-active:opacity-100 group-active:translate-y-0"
                }`}
              >
                {copied ? "Copied" : "Email"}
              </span>

              <svg
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-4 7.75h8c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25H8c-.69 0-1.25-.56-1.25-1.25V9c0-.69.56-1.25 1.25-1.25zm7.1 1.6-3.1 2.33-3.1-2.33c-.27-.2-.65-.15-.85.12-.2.27-.15.65.12.85l3.46 2.6c.22.17.53.17.75 0l3.46-2.6c.27-.2.32-.58.12-.85-.2-.27-.58-.32-.85-.12z" />
              </svg>
            </button>
          </div>
        </div>

        <footer className="flex justify-center pt-16">
          <span className="text-xs text-white/30">
            kamytt © {new Date().getFullYear()}
          </span>
        </footer>
      </div>

      {/* top fade */}
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-[#080808] to-transparent pointer-events-none z-20" />
    </section>
  );
};
