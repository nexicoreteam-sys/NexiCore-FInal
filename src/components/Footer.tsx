"use client";

import { motion } from "framer-motion";

const navLinks = [
  { href: "#servicii", label: "Servicii" },
  { href: "#proces", label: "Proces" },
  { href: "#de-ce-nexicore", label: "De Ce Nexicore" },
  { href: "#assistant", label: "AI Assistant" },
  { href: "#contact", label: "Contact" },
];

const legalLinks = [
  { href: "/politica-confidentialitate", label: "Politica de Confidențialitate" },
  { href: "/termeni-conditii", label: "Termeni și Condiții" },
  { href: "/politica-cookie", label: "Politica Cookie-uri" },
];

const schedule = [
  { day: "Luni – Vineri", hours: "09:00 – 18:00" },
  { day: "Sâmbătă", hours: "10:00 – 14:00" },
  { day: "Duminică", hours: "Închis" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Footer() {
  return (
    <footer className="relative bg-[#030303]">
      {/* Top border line */}
      <div className="section-line section-line-dots">
        <span className="dot-left" />
        <span className="dot-right" />
      </div>

      {/* ─── MAP SECTION ─── */}
      <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden">
        {/* Dark map embed */}
        <div className="absolute inset-0">
          <iframe
            title="Nexicore - București, România"
            src="https://www.openstreetmap.org/export/embed.html?bbox=25.95%2C44.35%2C26.25%2C44.50&layer=mapnik&marker=44.4268%2C26.1025"
            className="w-full h-full border-0"
            style={{
              filter: "invert(1) hue-rotate(180deg) brightness(0.55) contrast(1.4) saturate(0.3)",
            }}
            loading="lazy"
          />
        </div>

        {/* Gradient overlays for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/50 via-transparent to-[#030303]/50 pointer-events-none" />

        {/* Glowing pin overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -mt-8">
            {/* Pulse rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-[#02defc]/20 animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#02defc]/30 animate-[ping_3s_ease-in-out_0.5s_infinite]" />

            {/* Pin */}
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" className="drop-shadow-[0_0_12px_rgba(2,222,252,0.6)]">
              <path
                d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z"
                fill="#02defc"
              />
              <circle cx="16" cy="16" r="6" fill="#030303" />
              <circle cx="16" cy="16" r="3" fill="#02defc">
                <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Location label */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-lg bg-[#060606]/90 border border-[#1a1a1a] backdrop-blur-sm">
                <span className="text-[11px] font-medium text-[#02defc] tracking-wide uppercase">
                  București, România
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* ─── COL 1: Company Info ─── */}
          <motion.div custom={0} variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 44 44" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="lg-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#02defc" />
                      <stop offset="100%" stopColor="#7ffe00" />
                    </linearGradient>
                  </defs>
                  <g style={{ transformOrigin: "22px 22px", animation: "footer-spin 30s linear infinite" }}>
                    <path d="M22 2 L42 22 L22 42 L2 22 Z" stroke="url(#lg-footer)" strokeWidth="1.3" strokeLinejoin="miter" fill="none" opacity="0.8" />
                  </g>
                  <g style={{ transformOrigin: "22px 22px", animation: "footer-spin-reverse 24s linear infinite" }}>
                    <path d="M22 10 L34 22 L22 34 L10 22 Z" stroke="url(#lg-footer)" strokeWidth="0.7" fill="url(#lg-footer)" fillOpacity="0.06" />
                  </g>
                  <path d="M22 16 L28 22 L22 28 L16 22 Z" stroke="url(#lg-footer)" strokeWidth="0.8" fill="url(#lg-footer)" fillOpacity="0.12">
                    <animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" repeatCount="indefinite" />
                  </path>
                  <circle cx="22" cy="22" r="1.8" fill="url(#lg-footer)">
                    <animate attributeName="r" values="1.4;2.2;1.4" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                Nexicore
              </span>
            </div>

            <p className="text-[13px] leading-relaxed text-white/35 mb-6 max-w-[280px]">
              Agenție digitală premium specializată în soluții web pentru companii B2B din România. Transformăm viziunea ta în experiențe digitale de excepție.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="5" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  ),
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: (
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  ),
                },
                {
                  label: "X",
                  href: "https://x.com",
                  icon: (
                    <path d="M4 4l6.5 8L4 20h2l5.3-6.5L15 20h5l-6.8-8.5L20 4h-2l-5 6.2L9 4H4z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex items-center justify-center w-9 h-9 rounded-xl border border-[#1a1a1a] bg-[#060606] hover:border-[#02defc]/30 hover:bg-[#02defc]/5 transition-all duration-300"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/30 group-hover:text-[#02defc] transition-colors duration-300"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── COL 2: Navigare ─── */}
          <motion.div custom={1} variants={fadeUp}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-5">
              Navigare
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-[13px] text-white/30 hover:text-white/70 transition-colors duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#1a1a1a] group-hover:bg-[#02defc] group-hover:shadow-[0_0_6px_rgba(2,222,252,0.5)] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── COL 3: Contact ─── */}
          <motion.div custom={2} variants={fadeUp}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#02defc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-50">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[13px] text-white/30 leading-relaxed">
                  Strada Exemplu 42<br />
                  Sector 1, București<br />
                  România
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#02defc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:contact@nexicore.ro" className="text-[13px] text-white/30 hover:text-[#02defc] transition-colors duration-300">
                  contact@nexicore.ro
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#02defc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+40700000000" className="text-[13px] text-white/30 hover:text-[#02defc] transition-colors duration-300">
                  +40 700 000 000
                </a>
              </li>
            </ul>
          </motion.div>

          {/* ─── COL 4: Program ─── */}
          <motion.div custom={3} variants={fadeUp}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-5">
              Program de Lucru
            </h4>
            <ul className="space-y-3">
              {schedule.map((item) => (
                <li key={item.day} className="flex items-center justify-between gap-4">
                  <span className="text-[13px] text-white/30">{item.day}</span>
                  <span className={`text-[13px] font-medium ${item.hours === "Închis" ? "text-[#fc0197]/60" : "text-white/45"}`}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>

            {/* Status indicator */}
            <div className="mt-5 flex items-center gap-2.5 px-3 py-2 rounded-lg border border-[#1a1a1a] bg-[#060606]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7ffe00] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7ffe00]" />
              </span>
              <span className="text-[11px] text-white/40 font-medium">
                Disponibili acum
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── DIVIDER ─── */}
        <div className="mt-12 mb-6 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

        {/* ─── BOTTOM BAR ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-white/20 font-light">
            &copy; {new Date().getFullYear()} Nexicore. Toate drepturile rezervate.
          </span>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes footer-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes footer-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </footer>
  );
}
