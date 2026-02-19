"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#servicii", label: "Servicii" },
  { href: "#proces", label: "Proces" },
  { href: "#de-ce-nexicore", label: "De Ce Nexicore" },
  { href: "#asistent-ai", label: "Asistent AI" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-[24px] shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="lg-n1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#02defc" />
                  <stop offset="100%" stopColor="#7ffe00" />
                </linearGradient>
                <filter id="nav-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Outer diamond — slow spin */}
              <g style={{ transformOrigin: "22px 22px", animation: "logo-spin 30s linear infinite" }}>
                <path
                  d="M22 2 L42 22 L22 42 L2 22 Z"
                  stroke="url(#lg-n1)"
                  strokeWidth="1.3"
                  strokeLinejoin="miter"
                  fill="none"
                  opacity="0.8"
                />
                {/* Vertex nodes */}
                <circle cx="22" cy="2" r="1.2" fill="#02defc" opacity="0.6" />
                <circle cx="42" cy="22" r="1.2" fill="#02defc" opacity="0.5" />
                <circle cx="22" cy="42" r="1.2" fill="#7ffe00" opacity="0.6" />
                <circle cx="2" cy="22" r="1.2" fill="#7ffe00" opacity="0.5" />
              </g>
              {/* Inner diamond — counter spin */}
              <g style={{ transformOrigin: "22px 22px", animation: "logo-spin-reverse 24s linear infinite" }}>
                <path
                  d="M22 10 L34 22 L22 34 L10 22 Z"
                  stroke="url(#lg-n1)"
                  strokeWidth="0.7"
                  strokeLinejoin="miter"
                  fill="url(#lg-n1)"
                  fillOpacity="0.06"
                />
              </g>
              {/* Core diamond — subtle glow */}
              <path
                d="M22 16 L28 22 L22 28 L16 22 Z"
                stroke="url(#lg-n1)"
                strokeWidth="0.8"
                fill="url(#lg-n1)"
                fillOpacity="0.12"
                filter="url(#nav-glow)"
              >
                <animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" repeatCount="indefinite" />
              </path>
              {/* Center pulse */}
              <circle cx="22" cy="22" r="1.8" fill="url(#lg-n1)">
                <animate attributeName="r" values="1.4;2.2;1.4" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Nexicore
          </span>
        </a>

        {/* Desktop nav — centered links */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[13px] text-white/40 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.03] group"
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-[#02defc] to-[#7ffe00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* WhatsApp button — right side */}
        <div className="hidden md:flex items-center">
          <a href="https://wa.me/40745292353" target="_blank" rel="noopener noreferrer" className="neon-btn !py-2.5 !px-6 !text-[13px] !gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors"
          aria-label="Meniu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden bg-black/95 backdrop-blur-[30px] border-b border-white/[0.04] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-3 px-3 text-white/40 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all text-[15px]"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <a
                  href="https://wa.me/40745292353"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="neon-btn w-full !text-[14px] !gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        @keyframes logo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes logo-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </motion.nav>
  );
}
