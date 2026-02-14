"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top border line with dots */}
      <div className="section-line section-line-dots">
        <span className="dot-left" />
        <span className="dot-right" />
      </div>

      <div className="py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + copyright */}
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#02defc] to-[#7ffe00] flex items-center justify-center">
                <span className="text-black font-bold text-xs">N</span>
              </div>
              <span className="text-[13px] text-white/25 font-light">
                &copy; {new Date().getFullYear()} Nexicore. Toate drepturile rezervate.
              </span>
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-8">
              {[
                { href: "#servicii", label: "Servicii" },
                { href: "#proces", label: "Proces" },
                { href: "#de-ce-nexicore", label: "De Ce Nexicore" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-white/25 hover:text-white/60 transition-colors duration-300 uppercase tracking-wider font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
