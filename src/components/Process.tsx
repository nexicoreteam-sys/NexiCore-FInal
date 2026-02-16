"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ─── STEPS DATA ─── */
const steps = [
  {
    number: "01",
    title: "Descoperire",
    description: "Analizăm afacerea ta, industria și obiectivele. Înțelegem ce te face diferit și cum să comunicăm asta digital.",
    accent: "#02defc",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategie & Design",
    description: "Creăm arhitectura, designul și strategia de conținut. Fiecare element este gândit pentru conversie și credibilitate.",
    accent: "#7ffe00",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Dezvoltare",
    description: "Construim cu tehnologii moderne — rapid, securizat și optimizat. Cod curat, performanță maximă.",
    accent: "#f47319",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Lansare & Optimizare",
    description: "Lansăm, monitorizăm și optimizăm continuu. SEO, viteză și integrări — totul funcționează impecabil.",
    accent: "#fc0197",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Suport Post-Lansare",
    description: "Rămânem alături de tine după lansare. Mentenanță, actualizări și suport continuu pentru succesul tău digital.",
    accent: "#fdf301",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

/* ─── SECTION DIVIDER ─── */
function SectionDivider() {
  return (
    <div className="section-line section-line-dots">
      <span className="dot-left" />
      <span className="dot-right" />
    </div>
  );
}

/* ─── STEP CARD BACKGROUND ─── */
const r2 = (n: number) => Math.round(n * 100) / 100;

function StepBg({ accent, index }: { accent: string; index: number }) {
  /* Each card gets multi-element flowing lines like the WhyNexicore speed-line style */
  const directions = [
    /* Descoperire — radial scan lines expanding outward */
    () => (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 220" preserveAspectRatio="none">
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx="150" cy="110" r={20 + i * 25} fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="8 12">
            <animate attributeName="r" values={`${20 + i * 25};${50 + i * 25};${20 + i * 25}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-40" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[...Array(5)].map((_, i) => {
          const angle = (i * 72) * (Math.PI / 180);
          return (
            <circle key={`p-${i}`} r="2" fill={accent}>
              <animate attributeName="cx" values={`150;${r2(150 + 130 * Math.cos(angle))};150`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="cy" values={`110;${r2(110 + 100 * Math.sin(angle))};110`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          );
        })}
      </svg>
    ),
    /* Strategie — diagonal crossing grid lines */
    () => (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 220" preserveAspectRatio="none">
        {[...Array(7)].map((_, i) => (
          <line key={`a-${i}`} x1={-20 + i * 50} y1="-10" x2={-70 + i * 50} y2="230" stroke={accent} strokeWidth="0.5" strokeDasharray="6 10">
            <animate attributeName="stroke-dashoffset" values="0;-32" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
          </line>
        ))}
        {[...Array(7)].map((_, i) => (
          <line key={`b-${i}`} x1={320 - i * 50} y1="-10" x2={370 - i * 50} y2="230" stroke={accent} strokeWidth="0.4" strokeDasharray="4 12">
            <animate attributeName="stroke-dashoffset" values="0;32" dur={`${3 + i * 0.15}s`} repeatCount="indefinite" />
          </line>
        ))}
        {[...Array(4)].map((_, i) => (
          <circle key={`n-${i}`} r="2" fill={accent}>
            <animate attributeName="cx" values={`${40 + i * 70};${70 + i * 70};${40 + i * 70}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            <animate attributeName="cy" values="0;220;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            <animate attributeName="opacity" values="0;0.8;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
          </circle>
        ))}
      </svg>
    ),
    /* Dezvoltare — horizontal code-stream lines */
    () => (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 220" preserveAspectRatio="none">
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="-30" y1={20 + i * 25} x2="330" y2={20 + i * 25} stroke={accent} strokeWidth={i % 2 === 0 ? "0.8" : "0.4"} strokeDasharray={i % 2 === 0 ? "30 50" : "15 35"}>
            <animate attributeName="stroke-dashoffset" values="0;-80" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </line>
        ))}
        {[...Array(6)].map((_, i) => (
          <g key={`cp-${i}`}>
            <circle r={1.5 + (i % 2)} fill={accent}>
              <animate attributeName="cx" values="-10;310" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="cy" values={`${25 + i * 32};${20 + i * 32}`} dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
            <line stroke={accent} strokeWidth="0.6">
              <animate attributeName="x1" values="-40;280" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="x2" values="-10;310" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="y1" values={`${25 + i * 32};${20 + i * 32}`} dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="y2" values={`${25 + i * 32};${20 + i * 32}`} dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="opacity" values="0;0.5;0.5;0" dur={`${1 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </line>
          </g>
        ))}
      </svg>
    ),
    /* Lansare — upward rocket trails */
    () => (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 220" preserveAspectRatio="none">
        {[...Array(7)].map((_, i) => (
          <g key={`r-${i}`}>
            <circle r={1.5 + (i % 3) * 0.5} fill={accent}>
              <animate attributeName="cx" values={`${25 + i * 40};${30 + i * 40}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="cy" values="230;-10" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
            </circle>
            <line stroke={accent} strokeWidth="0.5">
              <animate attributeName="x1" values={`${25 + i * 40};${30 + i * 40}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="x2" values={`${25 + i * 40};${30 + i * 40}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="y1" values="240;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="y2" values="230;-10" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="opacity" values="0;0.4;0.4;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
            </line>
          </g>
        ))}
        {[...Array(5)].map((_, i) => (
          <path key={`arr-${i}`} d={`M${40 + i * 55},230 l-3,-7 l3,-2 l3,2 z`} fill={accent}>
            <animate attributeName="transform" values="translate(0,0);translate(0,-240)" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
          </path>
        ))}
      </svg>
    ),
    /* Suport — orbiting shield pulses */
    () => (
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700" viewBox="0 0 300 220" preserveAspectRatio="none">
        {[...Array(4)].map((_, i) => (
          <circle key={`pulse-${i}`} cx="150" cy="110" fill="none" stroke={accent} strokeWidth="0.5">
            <animate attributeName="r" values="5;140" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 1}s`} />
            <animate attributeName="opacity" values="0.6;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 1}s`} />
          </circle>
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`hl-${i}`} x1="-30" y1={25 + i * 35} x2="330" y2={25 + i * 35} stroke={accent} strokeWidth="0.3" strokeDasharray="3 15 6 10">
            <animate attributeName="stroke-dashoffset" values="0;-34" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const r = 50 + (i % 3) * 20;
          return (
            <circle key={`orb-${i}`} r={1.5 + (i % 2)} fill={accent}>
              <animate attributeName="cx" values={`${r2(150 + r * Math.cos(angle))};${r2(150 + r * Math.cos(angle + Math.PI))};${r2(150 + r * Math.cos(angle))}`} dur={`${5 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="cy" values={`${r2(110 + r * Math.sin(angle) * 0.7)};${r2(110 + r * Math.sin(angle + Math.PI) * 0.7)};${r2(110 + r * Math.sin(angle) * 0.7)}`} dur={`${5 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          );
        })}
      </svg>
    ),
  ];

  return directions[index]();
}

/* ─── ANIMATED ARROW CONNECTOR ─── */
function ArrowConnector({ from, to, direction }: { from: string; to: string; direction: "horizontal" | "vertical" }) {
  if (direction === "horizontal") {
    return (
      <div className="hidden lg:flex items-center justify-center w-8 shrink-0 self-center">
        <svg viewBox="0 0 32 60" fill="none" className="w-full h-[60px]">
          <defs>
            <linearGradient id={`arrow-grad-${from}-${to}`} x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          {/* Main line */}
          <line x1="0" y1="30" x2="24" y2="30" stroke={`url(#arrow-grad-${from}-${to})`} strokeWidth="1.5" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Arrow head */}
          <path d="M20 24 L28 30 L20 36" fill="none" stroke={to} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
          </path>
          {/* Traveling dot */}
          <circle r="2" fill={to}>
            <animate attributeName="cx" values="0;26" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30;30" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }

  /* Vertical arrow for mobile */
  return (
    <div className="lg:hidden flex justify-center w-full py-2">
      <svg viewBox="0 0 60 32" fill="none" className="w-[60px] h-8">
        <defs>
          <linearGradient id={`arrow-grad-v-${from}-${to}`} x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <line x1="30" y1="0" x2="30" y2="24" stroke={`url(#arrow-grad-v-${from}-${to})`} strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
        </line>
        <path d="M24 20 L30 28 L36 20" fill="none" stroke={to} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle r="2" fill={to}>
          <animate attributeName="cx" values="30;30" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="0;26" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ─── STEP CARD ─── */
function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className="relative group flex-1 min-w-0"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
        style={{ background: `radial-gradient(ellipse at center, ${step.accent}08 0%, transparent 70%)` }}
      />

      <div className="relative bg-[#060606] border border-[#1a1a1a] rounded-[20px] p-6 lg:p-7 h-full overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:translate-y-[-4px] group-hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Card background animation */}
        <StepBg accent={step.accent} index={index} />

        {/* Step number with glowing ring */}
        <div className="relative mb-5 flex items-center gap-3">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold border transition-all duration-500"
              style={{
                borderColor: `${step.accent}30`,
                color: step.accent,
                background: `${step.accent}08`,
              }}
            >
              {step.number}
            </div>
            {/* Animated ring */}
            <svg className="absolute inset-0 w-12 h-12" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="none" stroke={step.accent} strokeWidth="1" strokeDasharray="12 8" opacity="0.3">
                <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur={`${8 + index}s`} repeatCount="indefinite" />
              </circle>
            </svg>
            {/* Pulse ring on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `0 0 0 0 ${step.accent}40`,
                animation: "proc-ring-pulse 2s ease-out infinite",
              }}
            />
          </div>

          {/* Icon */}
          <div
            className="transition-all duration-500 opacity-40 group-hover:opacity-80"
            style={{ color: step.accent }}
          >
            {step.icon}
          </div>
        </div>

        {/* Accent line */}
        <div
          className="w-8 h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-14"
          style={{
            background: `linear-gradient(90deg, ${step.accent}, transparent)`,
            boxShadow: `0 0 8px ${step.accent}30`,
          }}
        />

        <h3 className="relative text-[15px] font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
          {step.title}
        </h3>
        <p className="relative text-white/35 text-[13px] leading-[1.75] font-light group-hover:text-white/45 transition-colors duration-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Process() {
  return (
    <section id="proces" className="relative overflow-hidden">
      <SectionDivider />

      <div className="py-28 md:py-36 relative">
        {/* Background tech grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="proc-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="80" y2="0" stroke="white" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="0" y2="80" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#proc-grid)" />
            </svg>
          </div>
        </div>

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(2,222,252,0.025)_0%,transparent_60%)] pointer-events-none orb-animate" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(ellipse,rgba(252,1,151,0.02)_0%,transparent_60%)] pointer-events-none orb-animate" style={{ animationDelay: "-5s" }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-5">
              <span className="label-tag">Proces</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5"
            >
              De la Idee la{" "}
              <span className="gradient-text">Rezultat</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[540px] mx-auto leading-relaxed font-light"
            >
              Un proces structurat și transparent care transformă viziunea ta
              într-o prezență digitală de impact — și rămânem alături de tine.
            </motion.p>
          </motion.div>

          {/* ── PROGRESS LINE (desktop) ── */}
          <div className="hidden lg:block relative mb-8 max-w-full mx-auto">
            <div className="h-px bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #02defc, #7ffe00, #f47319, #fc0197, #fdf301)",
                  backgroundSize: "200% 100%",
                  animation: "proc-gradient-flow 4s linear infinite",
                }}
              />
            </div>
            {/* Dot markers on the progress line */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-[9%]">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: step.accent,
                    boxShadow: `0 0 8px ${step.accent}60`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── STEPS LAYOUT ── */}
          {/* Desktop: horizontal row with arrow connectors */}
          <div className="hidden lg:flex items-stretch gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="contents">
                <StepCard step={step} index={i} />
                {i < steps.length - 1 && (
                  <ArrowConnector
                    from={step.accent}
                    to={steps[i + 1].accent}
                    direction="horizontal"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical stack with arrow connectors */}
          <div className="lg:hidden flex flex-col">
            {steps.map((step, i) => (
              <div key={step.number}>
                <StepCard step={step} index={i} />
                {i < steps.length - 1 && (
                  <ArrowConnector
                    from={step.accent}
                    to={steps[i + 1].accent}
                    direction="vertical"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes proc-gradient-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes proc-ring-pulse {
          0% { box-shadow: 0 0 0 0 currentColor; opacity: 0.6; }
          70% { box-shadow: 0 0 0 12px transparent; opacity: 0; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
