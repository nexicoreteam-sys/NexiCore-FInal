"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { staggerContainer } from "@/lib/animations";

/* ─── DATA ─── */
const differentiators = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Viteză Maximă",
    description: "Website-uri cu timp de încărcare sub 2 secunde. Performanță optimizată pentru fiecare milisecundă.",
    accent: "#02defc",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Securitate Avansată",
    description: "HTTPS, sanitizare input, protecție anti-spam și autentificare securizată. Datele clienților tăi sunt în siguranță.",
    accent: "#7ffe00",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Focus pe B2B România",
    description: "Specializare exclusivă pe piața românească B2B. Înțelegem nevoile consultanților, avocaților și constructorilor.",
    accent: "#f47319",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Tehnologie AI",
    description: "Asistent AI integrat care califică lead-uri automat și oferă suport 24/7 vizitatorilor website-ului tău.",
    accent: "#fc0197",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Orientare spre Rezultate",
    description: "Nu vindem pixeli — livrăm instrumente de vânzare. Fiecare decizie de design servește obiectivele tale de business.",
    accent: "#fdf301",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Disponibilitate Totală",
    description: "Comunicare rapidă și transparentă. Suntem disponibili când ai nevoie — fără așteptări interminabile.",
    accent: "#02defc",
  },
];

const counters = [
  { end: 24, suffix: "/7", label: "Disponibilitate Non-Stop", color: "#02defc" },
  { end: 2, suffix: "s", label: "Timp de Încărcare", color: "#7ffe00" },
  { end: 100, suffix: "%", label: "Securitate Garantată", color: "#f47319" },
];

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ end, suffix, label, color }: { end: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, end, {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      });
      return controls.stop;
    }
  }, [isInView, end, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="text-center group"
    >
      <div className="relative inline-block mb-2">
        {/* Glow behind number */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{ background: color }}
        />
        <span
          ref={ref}
          className="relative text-[clamp(2.8rem,5vw,4rem)] font-bold tracking-tight tabular-nums"
          style={{ color }}
        >
          {display}
          {suffix}
        </span>
      </div>
      <p className="text-[13px] text-white/35 font-medium tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── WORD-BY-WORD TITLE ─── */
function RevealTitle() {
  const words = ["Diferența", "Nexicore"];
  return (
    <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5">
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3 + i * 0.2,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          }}
          className={`inline-block ${i === 1 ? "gradient-text ml-3" : "text-white"}`}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

/* ─── AI TECH BACKGROUND ─── */
function AITechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Neural network nodes + connections */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <defs>
          <linearGradient id="why-conn-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#02defc" stopOpacity="0" />
            <stop offset="50%" stopColor="#02defc" stopOpacity="1" />
            <stop offset="100%" stopColor="#02defc" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="why-conn-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7ffe00" stopOpacity="0" />
            <stop offset="50%" stopColor="#7ffe00" stopOpacity="1" />
            <stop offset="100%" stopColor="#7ffe00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Neural connections — animated dashes */}
        <line x1="5%" y1="15%" x2="25%" y2="35%" stroke="url(#why-conn-1)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 8s linear infinite" }} />
        <line x1="80%" y1="10%" x2="60%" y2="30%" stroke="url(#why-conn-2)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 10s linear infinite reverse" }} />
        <line x1="90%" y1="50%" x2="70%" y2="70%" stroke="url(#why-conn-1)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 12s linear infinite" }} />
        <line x1="10%" y1="65%" x2="30%" y2="85%" stroke="url(#why-conn-2)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 9s linear infinite reverse" }} />
        <line x1="40%" y1="5%" x2="60%" y2="20%" stroke="url(#why-conn-1)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 7s linear infinite" }} />
        <line x1="50%" y1="80%" x2="75%" y2="95%" stroke="url(#why-conn-2)" strokeWidth="0.5" strokeDasharray="6 8" style={{ animation: "why-dash-flow 11s linear infinite" }} />

        {/* Neural nodes */}
        {[
          { cx: "5%", cy: "15%", color: "#02defc", delay: "0s" },
          { cx: "25%", cy: "35%", color: "#02defc", delay: "1s" },
          { cx: "80%", cy: "10%", color: "#7ffe00", delay: "0.5s" },
          { cx: "60%", cy: "30%", color: "#7ffe00", delay: "1.5s" },
          { cx: "90%", cy: "50%", color: "#02defc", delay: "2s" },
          { cx: "70%", cy: "70%", color: "#02defc", delay: "0.8s" },
          { cx: "10%", cy: "65%", color: "#7ffe00", delay: "1.2s" },
          { cx: "30%", cy: "85%", color: "#7ffe00", delay: "2.5s" },
          { cx: "40%", cy: "5%", color: "#fc0197", delay: "0.3s" },
          { cx: "60%", cy: "20%", color: "#fc0197", delay: "1.8s" },
          { cx: "50%", cy: "80%", color: "#f47319", delay: "0.7s" },
          { cx: "75%", cy: "95%", color: "#f47319", delay: "2.2s" },
        ].map((node, i) => (
          <circle key={i} cx={node.cx} cy={node.cy} r="2.5" fill={node.color}>
            <animate attributeName="r" values="1.5;3.5;1.5" dur="4s" repeatCount="indefinite" begin={node.delay} />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" begin={node.delay} />
          </circle>
        ))}
      </svg>

      {/* Floating AI brain icon — top left */}
      <svg
        className="absolute top-[8%] left-[6%] w-20 h-20 opacity-[0.03]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#02defc"
        strokeWidth="0.5"
        style={{ animation: "why-float-1 25s ease-in-out infinite" }}
      >
        <path d="M12 2a8 8 0 0 0-8 8c0 3 1.5 5.5 4 7v3h8v-3c2.5-1.5 4-4 4-7a8 8 0 0 0-8-8z" />
        <path d="M9 22h6" />
        <path d="M10 2v4" /><path d="M14 2v4" />
        <path d="M8 8h8" /><path d="M8 12h8" />
        <circle cx="10" cy="10" r="0.5" fill="#02defc" />
        <circle cx="14" cy="10" r="0.5" fill="#02defc" />
      </svg>

      {/* Floating chip / processor — top right */}
      <svg
        className="absolute top-[20%] right-[8%] w-16 h-16 opacity-[0.03]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7ffe00"
        strokeWidth="0.6"
        style={{ animation: "why-float-2 20s ease-in-out infinite" }}
      >
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <line x1="9" y1="5" x2="9" y2="2" /><line x1="12" y1="5" x2="12" y2="2" /><line x1="15" y1="5" x2="15" y2="2" />
        <line x1="9" y1="22" x2="9" y2="19" /><line x1="12" y1="22" x2="12" y2="19" /><line x1="15" y1="22" x2="15" y2="19" />
        <line x1="5" y1="9" x2="2" y2="9" /><line x1="5" y1="12" x2="2" y2="12" /><line x1="5" y1="15" x2="2" y2="15" />
        <line x1="22" y1="9" x2="19" y2="9" /><line x1="22" y1="12" x2="19" y2="12" /><line x1="22" y1="15" x2="19" y2="15" />
      </svg>

      {/* Floating binary / data stream — left side */}
      <div
        className="absolute top-[40%] left-[3%] text-[10px] font-mono text-[#02defc]/[0.04] leading-[1.8] select-none"
        style={{ animation: "why-float-3 30s ease-in-out infinite" }}
      >
        01001<br />11010<br />00111<br />10100<br />01101
      </div>

      {/* Floating binary — right side */}
      <div
        className="absolute bottom-[25%] right-[4%] text-[10px] font-mono text-[#7ffe00]/[0.04] leading-[1.8] select-none"
        style={{ animation: "why-float-1 28s ease-in-out infinite reverse" }}
      >
        10110<br />01001<br />11100<br />00011<br />10101
      </div>

      {/* Circuit path — bottom left */}
      <svg
        className="absolute bottom-[10%] left-[10%] w-32 h-32 opacity-[0.025]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#fc0197"
        strokeWidth="0.8"
        style={{ animation: "why-float-2 22s ease-in-out infinite reverse" }}
      >
        <path d="M10 50 H30 V20 H60 V50 H80" strokeDasharray="4 4" style={{ animation: "why-dash-flow 6s linear infinite" }} />
        <path d="M10 70 H40 V90 H70 V60 H90" strokeDasharray="4 4" style={{ animation: "why-dash-flow 8s linear infinite reverse" }} />
        <circle cx="30" cy="20" r="3" fill="#fc0197" opacity="0.5" />
        <circle cx="60" cy="50" r="3" fill="#fc0197" opacity="0.5" />
        <circle cx="70" cy="90" r="3" fill="#fc0197" opacity="0.5" />
      </svg>

      {/* Network graph — center top */}
      <svg
        className="absolute top-[5%] left-[40%] w-28 h-28 opacity-[0.02]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#f47319"
        strokeWidth="0.6"
        style={{ animation: "why-float-3 26s ease-in-out infinite" }}
      >
        <circle cx="50" cy="20" r="4" /><circle cx="20" cy="60" r="4" /><circle cx="80" cy="60" r="4" />
        <circle cx="35" cy="85" r="4" /><circle cx="65" cy="85" r="4" />
        <line x1="50" y1="24" x2="20" y2="56" /><line x1="50" y1="24" x2="80" y2="56" />
        <line x1="20" y1="64" x2="35" y2="81" /><line x1="80" y1="64" x2="65" y2="81" />
        <line x1="35" y1="85" x2="65" y2="85" />
      </svg>

      {/* Dot grid with slow drift */}
      <div className="absolute inset-0 opacity-[0.012]" style={{ animation: "why-drift 50s linear infinite" }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="why-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-dots)" />
        </svg>
      </div>

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#02defc]/[0.04] to-transparent"
        style={{ animation: "why-scan 8s ease-in-out infinite" }}
      />
    </div>
  );
}

/* ─── CARD BACKGROUND ANIMATIONS — full-card multi-element style ─── */
function CardBgAnimation({ title, accent }: { title: string; accent: string }) {
  const cls = "absolute inset-0 w-full h-full rounded-[20px] overflow-hidden opacity-[0.06] group-hover:opacity-[0.14] transition-opacity duration-700";

  /* ── Viteză Maximă — speed streaks + racing particles ── */
  if (title === "Viteză Maximă") {
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Horizontal speed lines */}
        {[...Array(8)].map((_, i) => (
          <line key={`l-${i}`} x1="-30" y1={18 + i * 22} x2="330" y2={18 + i * 22} stroke={accent} strokeWidth={i % 2 === 0 ? "1" : "0.5"} strokeDasharray={i % 2 === 0 ? "40 60" : "20 40"}>
            <animate attributeName="stroke-dashoffset" values="0;-100" dur={`${1 + i * 0.15}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Racing particles */}
        {[...Array(6)].map((_, i) => (
          <g key={`p-${i}`}>
            <circle r={1.5 + (i % 3) * 0.5} fill={accent}>
              <animate attributeName="cx" values="-10;310" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="cy" values={`${20 + i * 28};${16 + i * 28}`} dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
            </circle>
            {/* Speed trail behind particle */}
            <line stroke={accent} strokeWidth="0.8" strokeLinecap="round">
              <animate attributeName="x1" values="-40;280" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="x2" values="-10;310" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="y1" values={`${20 + i * 28};${16 + i * 28}`} dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="y2" values={`${20 + i * 28};${16 + i * 28}`} dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur={`${0.7 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`} />
            </line>
          </g>
        ))}
      </svg>
    );
  }

  /* ── Securitate Avansată — shield grid scan + lock particles ── */
  if (title === "Securitate Avansată") {
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Diagonal security grid */}
        {[...Array(10)].map((_, i) => (
          <line key={`d-${i}`} x1={-30 + i * 40} y1="-10" x2={-80 + i * 40} y2="210" stroke={accent} strokeWidth="0.4" strokeDasharray="8 12">
            <animate attributeName="stroke-dashoffset" values="0;-40" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Reverse diagonals */}
        {[...Array(10)].map((_, i) => (
          <line key={`r-${i}`} x1={330 - i * 40} y1="-10" x2={380 - i * 40} y2="210" stroke={accent} strokeWidth="0.3" strokeDasharray="6 14">
            <animate attributeName="stroke-dashoffset" values="0;40" dur={`${4 + i * 0.15}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Scanning horizontal sweep */}
        <line x1="0" y1="100" x2="300" y2="100" stroke={accent} strokeWidth="1.5" opacity="0.5">
          <animate attributeName="y1" values="-5;205;-5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="-5;205;-5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="4s" repeatCount="indefinite" />
        </line>
        {/* Shield-shaped particles rising */}
        {[...Array(5)].map((_, i) => (
          <g key={`s-${i}`}>
            <path d={`M${50 + i * 50},200 l-6,-10 l6,-8 l6,8 z`} fill="none" stroke={accent} strokeWidth="0.8">
              <animate attributeName="transform" values={`translate(0,0);translate(${-10 + i * 5},-220)`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
            </path>
            {/* Lock dot in center of shield */}
            <circle r="1.5" fill={accent}>
              <animate attributeName="cx" values={`${50 + i * 50};${40 + i * 55}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
              <animate attributeName="cy" values="193;-27" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
            </circle>
          </g>
        ))}
      </svg>
    );
  }

  /* ── Focus pe B2B România — connection mesh + data packets flowing between nodes ── */
  if (title === "Focus pe B2B România") {
    const nodes = [
      {x:40,y:30},{x:150,y:20},{x:260,y:35},{x:80,y:100},{x:190,y:90},
      {x:260,y:110},{x:30,y:170},{x:140,y:165},{x:250,y:175},
    ];
    const connections = [
      [0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,8],[6,7],[7,8],[0,4],[1,3],[2,4],[3,7],[5,7],
    ];
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Connection lines with flowing dashes */}
        {connections.map(([a, b], i) => (
          <line key={`c-${i}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={accent} strokeWidth="0.5" strokeDasharray="4 6">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur={`${2 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Node circles with pulse */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r="4" fill={accent} opacity="0.6">
              <animate attributeName="r" values="3;5;3" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </circle>
            {/* Pulse ring */}
            <circle cx={n.x} cy={n.y} r="4" fill="none" stroke={accent} strokeWidth="0.4">
              <animate attributeName="r" values="4;14;4" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="opacity" values="0.5;0;0.5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          </g>
        ))}
        {/* Data packets traveling along connections */}
        {[0,2,5,8,11,14].map((ci) => {
          const [a, b] = connections[ci];
          return (
            <circle key={`dp-${ci}`} r="2" fill={accent}>
              <animate attributeName="cx" values={`${nodes[a].x};${nodes[b].x};${nodes[a].x}`} dur={`${2.5 + ci * 0.2}s`} repeatCount="indefinite" begin={`${ci * 0.3}s`} />
              <animate attributeName="cy" values={`${nodes[a].y};${nodes[b].y};${nodes[a].y}`} dur={`${2.5 + ci * 0.2}s`} repeatCount="indefinite" begin={`${ci * 0.3}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.5 + ci * 0.2}s`} repeatCount="indefinite" begin={`${ci * 0.3}s`} />
            </circle>
          );
        })}
      </svg>
    );
  }

  /* ── Tehnologie AI — neural network layers + synapse sparks ── */
  if (title === "Tehnologie AI") {
    const layers = [
      [30,40,80,120,160],         // input layer x=40
      [60,90,120,150],            // hidden 1 x=120
      [50,100,150],               // hidden 2 x=200
      [80,130],                   // output x=270
    ];
    const layerX = [30, 110, 190, 270];
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Connections between layers */}
        {layers.map((layer, li) => {
          if (li >= layers.length - 1) return null;
          const nextLayer = layers[li + 1];
          return layer.map((y1, ni) =>
            nextLayer.map((y2, nj) => (
              <line key={`w-${li}-${ni}-${nj}`} x1={layerX[li]} y1={y1} x2={layerX[li + 1]} y2={y2} stroke={accent} strokeWidth="0.35" strokeDasharray="3 5">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur={`${2 + (ni + nj) * 0.15}s`} repeatCount="indefinite" />
              </line>
            ))
          );
        })}
        {/* Neurons */}
        {layers.map((layer, li) =>
          layer.map((y, ni) => (
            <g key={`neu-${li}-${ni}`}>
              <circle cx={layerX[li]} cy={y} r="4" fill={accent} opacity="0.5">
                <animate attributeName="r" values="3;5.5;3" dur={`${2 + ni * 0.4}s`} repeatCount="indefinite" begin={`${li * 0.3}s`} />
                <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2 + ni * 0.4}s`} repeatCount="indefinite" begin={`${li * 0.3}s`} />
              </circle>
              <circle cx={layerX[li]} cy={y} r="4" fill="none" stroke={accent} strokeWidth="0.3">
                <animate attributeName="r" values="4;10;4" dur={`${3 + ni * 0.3}s`} repeatCount="indefinite" begin={`${li * 0.2 + ni * 0.1}s`} />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${3 + ni * 0.3}s`} repeatCount="indefinite" begin={`${li * 0.2 + ni * 0.1}s`} />
              </circle>
            </g>
          ))
        )}
        {/* Synapse sparks traveling through network */}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`spark-${i}`} r="2.5" fill={accent}>
            <animate attributeName="cx" values={`${layerX[0]};${layerX[1]};${layerX[2]};${layerX[3]};${layerX[2]};${layerX[1]};${layerX[0]}`} dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 1}s`} />
            <animate attributeName="cy" values={`${layers[0][i % layers[0].length]};${layers[1][i % layers[1].length]};${layers[2][i % layers[2].length]};${layers[3][i % layers[3].length]};${layers[2][(i + 1) % layers[2].length]};${layers[1][(i + 1) % layers[1].length]};${layers[0][(i + 2) % layers[0].length]}`} dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 1}s`} />
            <animate attributeName="opacity" values="0;1;1;0.8;1;1;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 1}s`} />
          </circle>
        ))}
      </svg>
    );
  }

  /* ── Orientare spre Rezultate — multiple rising chart lines + ascending particles ── */
  if (title === "Orientare spre Rezultate") {
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Grid lines horizontal */}
        {[...Array(7)].map((_, i) => (
          <line key={`g-${i}`} x1="0" y1={25 + i * 25} x2="300" y2={25 + i * 25} stroke={accent} strokeWidth="0.25" opacity="0.25" />
        ))}
        {/* Grid lines vertical */}
        {[...Array(10)].map((_, i) => (
          <line key={`gv-${i}`} x1={30 + i * 30} y1="0" x2={30 + i * 30} y2="200" stroke={accent} strokeWidth="0.2" opacity="0.15" />
        ))}
        {/* Chart line 1 — main growth */}
        <polyline points="0,180 30,165 60,155 90,140 120,120 150,115 180,90 210,70 240,55 270,30 300,15" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="400">
          <animate attributeName="stroke-dashoffset" values="400;0;0;400" dur="6s" repeatCount="indefinite" />
        </polyline>
        {/* Chart line 2 — secondary */}
        <polyline points="0,190 40,185 80,170 120,165 160,145 200,130 240,105 280,95 300,80" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.5" strokeDasharray="350">
          <animate attributeName="stroke-dashoffset" values="350;0;0;350" dur="7s" repeatCount="indefinite" begin="0.5s" />
        </polyline>
        {/* Rising data particles */}
        {[...Array(8)].map((_, i) => (
          <g key={`rp-${i}`}>
            <circle r={1.5 + (i % 3) * 0.5} fill={accent}>
              <animate attributeName="cx" values={`${20 + i * 35};${25 + i * 35}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="cy" values="200;-10" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
            {/* Upward trail */}
            <line stroke={accent} strokeWidth="0.6">
              <animate attributeName="x1" values={`${20 + i * 35};${25 + i * 35}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="x2" values={`${20 + i * 35};${25 + i * 35}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="y1" values="210;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="y2" values="200;-10" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
              <animate attributeName="opacity" values="0;0.4;0.4;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </line>
          </g>
        ))}
        {/* Upward arrows scattered */}
        {[...Array(4)].map((_, i) => (
          <path key={`arr-${i}`} d={`M${60 + i * 65},200 l-4,-8 l4,-2 l4,2 z`} fill={accent} opacity="0">
            <animate attributeName="transform" values="translate(0,0);translate(0,-210)" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
            <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
          </path>
        ))}
      </svg>
    );
  }

  /* ── Disponibilitate Totală — concentric pulse rings + orbiting particles + time ticks ── */
  if (title === "Disponibilitate Totală") {
    return (
      <svg className={cls} viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* Concentric expanding rings */}
        {[...Array(5)].map((_, i) => (
          <circle key={`ring-${i}`} cx="150" cy="100" fill="none" stroke={accent} strokeWidth="0.5">
            <animate attributeName="r" values="5;150" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
            <animate attributeName="opacity" values="0.7;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
          </circle>
        ))}
        {/* Horizontal time lines — like a heartbeat monitor */}
        {[...Array(5)].map((_, i) => (
          <line key={`tl-${i}`} x1="-30" y1={30 + i * 35} x2="330" y2={30 + i * 35} stroke={accent} strokeWidth="0.4" strokeDasharray="2 18 8 12">
            <animate attributeName="stroke-dashoffset" values="0;-40" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Orbiting particles around center */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const r = 60 + (i % 3) * 25;
          return (
            <circle key={`orb-${i}`} r={1.5 + (i % 2)} fill={accent}>
              <animate attributeName="cx" values={`${150 + r * Math.cos(angle)};${150 + r * Math.cos(angle + Math.PI)};${150 + r * Math.cos(angle)}`} dur={`${5 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="cy" values={`${100 + r * Math.sin(angle)};${100 + r * Math.sin(angle + Math.PI)};${100 + r * Math.sin(angle)}`} dur={`${5 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          );
        })}
        {/* Center pulsing dot */}
        <circle cx="150" cy="100" r="3" fill={accent}>
          <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Dashed orbit rings */}
        {[60, 85, 110].map((r, i) => (
          <circle key={`dash-${i}`} cx="150" cy="100" r={r} fill="none" stroke={accent} strokeWidth="0.3" strokeDasharray="4 8">
            <animate attributeName="stroke-dashoffset" values={`0;${i % 2 === 0 ? -24 : 24}`} dur={`${6 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    );
  }

  return null;
}

/* ─── CARD COMPONENT ─── */
function DifferentiatorCard({
  item,
  index,
}: {
  item: (typeof differentiators)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className="relative group"
    >
      {/* Animated border glow container */}
      <div className="absolute -inset-px rounded-[21px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from var(--why-border-angle, 0deg), transparent 40%, ${item.accent}60 50%, transparent 60%)`,
            animation: "why-border-spin 3s linear infinite",
          }}
        />
      </div>

      {/* Hover radial glow behind card */}
      <div
        className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
        style={{ background: `radial-gradient(ellipse at center, ${item.accent}08 0%, transparent 70%)` }}
      />

      {/* Card body */}
      <div className="relative bg-[#060606] border border-[#1a1a1a] rounded-[20px] p-7 h-full overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:translate-y-[-6px] group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Per-card background animation */}
        <CardBgAnimation title={item.title} accent={item.accent} />

        {/* Icon with pulse glow */}
        <div className="relative mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_-4px_var(--glow)]"
            style={{
              background: `${item.accent}0D`,
              color: item.accent,
              // @ts-expect-error CSS custom property
              "--glow": `${item.accent}60`,
            }}
          >
            {item.icon}
          </div>
          {/* Pulse ring on hover */}
          <div
            className="absolute inset-0 w-11 h-11 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: `0 0 0 0 ${item.accent}30`,
              animation: "why-icon-pulse 2s ease-out infinite",
            }}
          />
        </div>

        {/* Accent line */}
        <div
          className="w-8 h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-12"
          style={{
            background: `linear-gradient(90deg, ${item.accent}, transparent)`,
            boxShadow: `0 0 8px ${item.accent}30`,
          }}
        />

        <h3 className="text-[15px] font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300 relative">
          {item.title}
        </h3>
        <p className="text-white/35 text-[13px] leading-[1.75] font-light group-hover:text-white/45 transition-colors duration-300 relative">
          {item.description}
        </p>

      </div>
    </motion.div>
  );
}

/* ─── SECTION DIVIDER ─── */
function SectionDivider() {
  return (
    <div className="section-line section-line-dots">
      <span className="dot-left" />
      <span className="dot-right" />
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function WhyNexicore() {
  return (
    <section id="de-ce-nexicore" className="relative overflow-hidden">
      <SectionDivider />

      <div className="py-28 md:py-36 relative">
        <AITechBackground />

        {/* Ambient gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(2,222,252,0.025)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(252,1,151,0.02)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* ── HEADER ── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="flex justify-center mb-5"
            >
              <span className="label-tag">De Ce Nexicore</span>
            </motion.div>

            <RevealTitle />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="text-white/40 max-w-[520px] mx-auto leading-relaxed font-light"
            >
              Nu suntem o agenție generică. Suntem partenerul tău digital
              specializat pe companii B2B din România.
            </motion.p>
          </div>

          {/* ── COUNTERS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 max-w-[700px] mx-auto">
            {counters.map((counter) => (
              <AnimatedCounter key={counter.label} {...counter} />
            ))}
          </div>

          {/* ── Divider line ── */}
          <div className="flex items-center gap-4 mb-16 max-w-[600px] mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#1a1a1a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#02defc]/40 shadow-[0_0_6px_rgba(2,222,252,0.3)]" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#1a1a1a]" />
          </div>

          {/* ── CARDS GRID ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((item, i) => (
              <DifferentiatorCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes why-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -30px) rotate(8deg); }
          66% { transform: translate(-15px, 20px) rotate(-5deg); }
        }
        @keyframes why-float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 15px) rotate(-10deg); }
          66% { transform: translate(18px, -22px) rotate(6deg); }
        }
        @keyframes why-float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, 25px) rotate(12deg); }
          66% { transform: translate(-20px, -18px) rotate(-8deg); }
        }
        @keyframes why-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes why-dash-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -56; }
        }
        @keyframes why-scan {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        @keyframes why-border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes why-icon-pulse {
          0% { box-shadow: 0 0 0 0 var(--glow, rgba(2,222,252,0.3)); opacity: 1; }
          70% { box-shadow: 0 0 0 10px transparent; opacity: 0; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
