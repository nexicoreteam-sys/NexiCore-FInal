"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useRef, useEffect, useState } from "react";

/* ─── TECH GRAPHICS (animated looping SVGs for each service card) ─── */

function CircuitGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid lines */}
      {[60, 120, 180, 240].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#02defc" strokeWidth="0.5" />
      ))}
      {[80, 160, 240, 320].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#02defc" strokeWidth="0.5" />
      ))}
      {/* Pulsing junction nodes */}
      {[
        [80, 60], [160, 120], [240, 60], [320, 180],
        [80, 180], [160, 240], [240, 240], [320, 120],
      ].map(([cx, cy], i) => (
        <circle key={`n-${i}`} cx={cx} cy={cy} r="3" fill="#02defc" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Animated trace paths — data flowing through circuit */}
      <path d="M80 60 L160 60 L160 120" stroke="#02defc" strokeWidth="1" opacity="0.4" strokeDasharray="8 12" >
        <animate attributeName="stroke-dashoffset" values="0;-40" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M240 60 L240 120 L320 120" stroke="#7ffe00" strokeWidth="1" opacity="0.4" strokeDasharray="8 12">
        <animate attributeName="stroke-dashoffset" values="0;-40" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M80 180 L160 180 L160 240" stroke="#fc0197" strokeWidth="1" opacity="0.4" strokeDasharray="8 12">
        <animate attributeName="stroke-dashoffset" values="0;-40" dur="3.5s" repeatCount="indefinite" />
      </path>
      {/* Traveling data packet */}
      <circle r="2" fill="#02defc" opacity="0.9">
        <animateMotion dur="4s" repeatCount="indefinite" path="M80 60 L160 60 L160 120 L240 120 L240 60" />
      </circle>
      <circle r="1.5" fill="#fc0197" opacity="0.8">
        <animateMotion dur="5s" repeatCount="indefinite" path="M320 180 L240 180 L240 240 L160 240 L160 180 L80 180" />
      </circle>
    </svg>
  );
}

function WebsiteGraphic() {
  return (
    <div className="absolute bottom-4 right-4 w-[180px] h-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-700">
      <svg viewBox="0 0 180 120" fill="none" className="w-full h-full">
        {/* Browser frame */}
        <rect x="4" y="4" width="172" height="112" rx="8" stroke="#02defc" strokeWidth="1" />
        <line x1="4" y1="24" x2="176" y2="24" stroke="#02defc" strokeWidth="0.5" />
        {/* Browser dots pulsing */}
        <circle cx="16" cy="14" r="3" fill="#fc0197">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="26" cy="14" r="3" fill="#fdf301">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="36" cy="14" r="3" fill="#7ffe00">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        {/* Loading content — shimmer bars */}
        <rect x="14" y="34" width="70" height="8" rx="2" fill="#02defc" opacity="0.4">
          <animate attributeName="width" values="40;70;40" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="14" y="48" width="152" height="4" rx="1" fill="#fff" opacity="0.15">
          <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2.5s" repeatCount="indefinite" />
        </rect>
        <rect x="14" y="56" width="130" height="4" rx="1" fill="#fff" opacity="0.1">
          <animate attributeName="opacity" values="0.05;0.15;0.05" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
        </rect>
        <rect x="14" y="64" width="145" height="4" rx="1" fill="#fff" opacity="0.08">
          <animate attributeName="opacity" values="0.04;0.12;0.04" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
        </rect>
        {/* Grid blocks — sequential highlight */}
        <rect x="14" y="78" width="46" height="30" rx="4" stroke="#02defc" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="66" y="78" width="46" height="30" rx="4" stroke="#7ffe00" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" begin="1s" repeatCount="indefinite" />
        </rect>
        <rect x="118" y="78" width="46" height="30" rx="4" stroke="#fc0197" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" begin="2s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  );
}

function AIBrainGraphic() {
  return (
    <div className="absolute bottom-6 right-6 w-[140px] h-[140px] opacity-15 group-hover:opacity-35 transition-opacity duration-700">
      <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
        {/* Spinning orbit rings */}
        <circle cx="70" cy="70" r="25" stroke="#fc0197" strokeWidth="0.8" strokeDasharray="4 3">
          <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="12s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="70" r="40" stroke="#fc0197" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="360 70 70" to="0 70 70" dur="18s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="70" r="55" stroke="#fc0197" strokeWidth="0.3" strokeDasharray="1 5" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="25s" repeatCount="indefinite" />
        </circle>
        {/* Pulsing neural nodes */}
        {[
          [70, 45], [90, 55], [95, 75], [85, 95],
          [65, 95], [45, 80], [45, 60], [60, 50],
          [80, 65], [60, 75],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#fc0197">
            <animate attributeName="opacity" values={`${0.2 + (i % 3) * 0.1};${0.7 + (i % 3) * 0.1};${0.2 + (i % 3) * 0.1}`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="r" values="2;3.5;2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Neural connections with flowing dash */}
        <path d="M70 45 L90 55 L95 75 L85 95 L65 95 L45 80 L45 60 L60 50 Z" stroke="#fc0197" strokeWidth="0.6" opacity="0.3" strokeDasharray="5 8">
          <animate attributeName="stroke-dashoffset" values="0;-26" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M80 65 L60 75 L60 50 M80 65 L90 55 M60 75 L45 80 M80 65 L85 95" stroke="#fc0197" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 6">
          <animate attributeName="stroke-dashoffset" values="0;20" dur="4s" repeatCount="indefinite" />
        </path>
        {/* Core pulse */}
        <circle cx="70" cy="70" r="4" fill="#fc0197">
          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.08;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="70" r="2" fill="#fc0197">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function SEOGraphic() {
  return (
    <div className="absolute bottom-4 right-4 w-[120px] h-[100px] opacity-15 group-hover:opacity-35 transition-opacity duration-700">
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        {/* Animated bar chart — bars grow up and down */}
        <rect x="10" y="60" width="14" rx="2" fill="#7ffe00" opacity="0.4">
          <animate attributeName="y" values="65;55;65" dur="3s" repeatCount="indefinite" />
          <animate attributeName="height" values="25;35;25" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="30" width="14" rx="2" fill="#7ffe00" opacity="0.5">
          <animate attributeName="y" values="48;38;48" dur="3s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="height" values="42;52;42" dur="3s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="50" width="14" rx="2" fill="#7ffe00" opacity="0.6">
          <animate attributeName="y" values="33;22;33" dur="3s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="height" values="57;68;57" dur="3s" begin="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="70" width="14" rx="2" fill="#7ffe00" opacity="0.7">
          <animate attributeName="y" values="23;12;23" dur="3s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="height" values="67;78;67" dur="3s" begin="0.9s" repeatCount="indefinite" />
        </rect>
        <rect x="90" width="14" rx="2" fill="#7ffe00" opacity="0.8">
          <animate attributeName="y" values="13;5;13" dur="3s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="height" values="77;85;77" dur="3s" begin="1.2s" repeatCount="indefinite" />
        </rect>
        {/* Pulsing data points along trend */}
        {[
          [17, 58, 0], [37, 43, 0.4], [57, 28, 0.8], [77, 18, 1.2], [97, 8, 1.6]
        ].map(([cx, cy, delay], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#7ffe00">
            <animate attributeName="r" values="1.5;3;1.5" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* Animated trend line */}
        <path d="M17 58 L37 43 L57 28 L77 18 L97 8" stroke="#7ffe00" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="120" opacity="0.5">
          <animate attributeName="stroke-dashoffset" values="120;0" dur="2s" fill="freeze" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

function LandingPageGraphic() {
  return (
    <div className="absolute bottom-4 right-4 w-[110px] h-[100px] opacity-15 group-hover:opacity-35 transition-opacity duration-700">
      <svg viewBox="0 0 110 100" fill="none" className="w-full h-full">
        {/* Funnel shape */}
        <path d="M15 10 L95 10 L75 45 L65 70 L55 90 L45 70 L35 45 Z" stroke="#f47319" strokeWidth="0.8" fill="#f47319" fillOpacity="0.05" />
        {/* Animated dashed level lines */}
        <line x1="25" y1="28" x2="85" y2="28" stroke="#f47319" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="35" y1="45" x2="75" y2="45" stroke="#f47319" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="42" y1="62" x2="68" y2="62" stroke="#f47319" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4">
          <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite" />
        </line>
        {/* Pulsing arrow at bottom */}
        <path d="M50 82 L55 92 L60 82" stroke="#f47319" strokeWidth="1" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />
        </path>
        {/* Falling visitor dots — descending through funnel */}
        <circle r="2" fill="#f47319">
          <animate attributeName="cx" values="35;45;55" dur="4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="16;35;55" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.5;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#f47319">
          <animate attributeName="cx" values="75;65;55" dur="4s" begin="1.3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="16;35;55" dur="4s" begin="1.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.5;0.3" dur="4s" begin="1.3s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill="#f47319">
          <animate attributeName="cx" values="55;55;55" dur="4s" begin="2.6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="16;45;85" dur="4s" begin="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.6;0.2" dur="4s" begin="2.6s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function ResponsiveGraphic() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Animated gradient mesh — slowly shifting */}
      <div
        className="absolute inset-0 opacity-[0.035] group-hover:opacity-[0.07] transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(135deg, #02defc 0%, transparent 40%),
            linear-gradient(225deg, #fc0197 0%, transparent 40%),
            linear-gradient(315deg, #7ffe00 0%, transparent 30%)
          `,
          backgroundSize: "200% 200%",
          animation: "responsive-gradient-shift 8s ease infinite",
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Floating orbs */}
      <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[200px] h-[150px] rounded-full bg-[#02defc] opacity-[0.025] blur-[70px]" style={{ animation: "responsive-orb-1 6s ease-in-out infinite" }} />
      <div className="absolute top-[30%] right-[40%] w-[150px] h-[120px] rounded-full bg-[#fc0197] opacity-[0.02] blur-[60px]" style={{ animation: "responsive-orb-2 8s ease-in-out infinite" }} />
      <div className="absolute bottom-[20%] right-[15%] w-[120px] h-[100px] rounded-full bg-[#7ffe00] opacity-[0.02] blur-[50px]" style={{ animation: "responsive-orb-3 7s ease-in-out infinite" }} />
    </div>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            start = Math.floor(eased * value);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold tracking-tight">
        <span className="gradient-text">{count}{suffix}</span>
      </div>
      <div className="text-[11px] text-white/30 mt-1 uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

/* ─── FLOATING PARTICLES ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: ["#02defc", "#7ffe00", "#fc0197", "#f47319", "#fdf301", "#02defc"][i],
            left: `${10 + i * 16}%`,
            top: `${20 + (i * 13) % 60}%`,
            opacity: 0.15,
            animation: `float-particle-${i % 3} ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── DEVICE MORPH ANIMATION ─── */
const devices = [
  {
    label: "Desktop",
    color: "#02defc",
    // Wide monitor shape
    width: 120,
    height: 80,
    rx: 8,
    // Content inside
    content: (
      <>
        {/* Screen */}
        <rect x="8" y="8" width="104" height="52" rx="3" fill="#02defc" opacity="0.06" />
        {/* Nav bar */}
        <rect x="14" y="13" width="30" height="3" rx="1" fill="#02defc" opacity="0.4" />
        <rect x="80" y="13" width="6" height="3" rx="1" fill="#02defc" opacity="0.2" />
        <rect x="90" y="13" width="6" height="3" rx="1" fill="#02defc" opacity="0.2" />
        <rect x="100" y="13" width="6" height="3" rx="1" fill="#02defc" opacity="0.2" />
        {/* Content */}
        <rect x="14" y="22" width="50" height="4" rx="1" fill="#02defc" opacity="0.25" />
        <rect x="14" y="29" width="90" height="2.5" rx="1" fill="#fff" opacity="0.1" />
        <rect x="14" y="34" width="75" height="2.5" rx="1" fill="#fff" opacity="0.07" />
        {/* Cards */}
        <rect x="14" y="41" width="28" height="16" rx="3" stroke="#02defc" strokeWidth="0.5" opacity="0.2" />
        <rect x="46" y="41" width="28" height="16" rx="3" stroke="#02defc" strokeWidth="0.5" opacity="0.2" />
        <rect x="78" y="41" width="28" height="16" rx="3" stroke="#02defc" strokeWidth="0.5" opacity="0.2" />
        {/* Stand */}
        <rect x="45" y="64" width="30" height="4" rx="1.5" fill="#02defc" opacity="0.15" />
        <rect x="52" y="60" width="16" height="6" rx="1" fill="#02defc" opacity="0.1" />
      </>
    ),
  },
  {
    label: "Tabletă",
    color: "#7ffe00",
    // Portrait tablet
    width: 72,
    height: 96,
    rx: 10,
    content: (
      <>
        {/* Screen */}
        <rect x="6" y="10" width="60" height="72" rx="3" fill="#7ffe00" opacity="0.06" />
        {/* Camera */}
        <circle cx="36" cy="6" r="1.5" fill="#7ffe00" opacity="0.25" />
        {/* Nav bar */}
        <rect x="12" y="15" width="24" height="3" rx="1" fill="#7ffe00" opacity="0.35" />
        {/* Content */}
        <rect x="12" y="23" width="48" height="3" rx="1" fill="#fff" opacity="0.1" />
        <rect x="12" y="29" width="40" height="3" rx="1" fill="#fff" opacity="0.07" />
        {/* Image block */}
        <rect x="12" y="37" width="48" height="20" rx="3" stroke="#7ffe00" strokeWidth="0.5" opacity="0.2" />
        {/* Cards */}
        <rect x="12" y="62" width="22" height="14" rx="3" stroke="#7ffe00" strokeWidth="0.5" opacity="0.2" />
        <rect x="38" y="62" width="22" height="14" rx="3" stroke="#7ffe00" strokeWidth="0.5" opacity="0.2" />
        {/* Home indicator */}
        <rect x="26" y="86" width="20" height="2.5" rx="1.2" fill="#7ffe00" opacity="0.15" />
      </>
    ),
  },
  {
    label: "Mobil",
    color: "#fc0197",
    // Phone
    width: 52,
    height: 100,
    rx: 12,
    content: (
      <>
        {/* Screen */}
        <rect x="5" y="12" width="42" height="72" rx="3" fill="#fc0197" opacity="0.06" />
        {/* Notch */}
        <rect x="16" y="5" width="20" height="4" rx="2" fill="#fc0197" opacity="0.2" />
        {/* Nav bar */}
        <rect x="10" y="17" width="18" height="3" rx="1" fill="#fc0197" opacity="0.35" />
        {/* Content */}
        <rect x="10" y="25" width="32" height="2.5" rx="1" fill="#fff" opacity="0.1" />
        <rect x="10" y="30" width="26" height="2.5" rx="1" fill="#fff" opacity="0.07" />
        {/* Image */}
        <rect x="10" y="37" width="32" height="16" rx="3" stroke="#fc0197" strokeWidth="0.5" opacity="0.2" />
        {/* Card */}
        <rect x="10" y="58" width="32" height="12" rx="3" stroke="#fc0197" strokeWidth="0.5" opacity="0.2" />
        {/* Button */}
        <rect x="14" y="74" width="24" height="6" rx="3" fill="#fc0197" opacity="0.1" />
        {/* Home indicator */}
        <rect x="18" y="90" width="16" height="2.5" rx="1.2" fill="#fc0197" opacity="0.15" />
      </>
    ),
  },
];

function DeviceMorphAnimation() {
  const [deviceIndex, setDeviceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceIndex((prev) => (prev + 1) % devices.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const device = devices[deviceIndex];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[130px] h-[110px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={deviceIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              viewBox={`0 0 ${device.width} ${device.height}`}
              fill="none"
              style={{ width: device.width, height: device.height, maxWidth: "100%", maxHeight: "100%" }}
            >
              {/* Device frame */}
              <rect
                x="1"
                y="1"
                width={device.width - 2}
                height={device.height - 2}
                rx={device.rx}
                stroke={device.color}
                strokeWidth="1.2"
                opacity="0.5"
              />
              {device.content}
            </svg>
            {/* Glow behind device */}
            <div
              className="absolute inset-0 rounded-full blur-[30px] opacity-[0.12]"
              style={{ background: device.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.span
          key={device.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-[11px] font-medium tracking-wider uppercase"
          style={{ color: `${device.color}90` }}
        >
          {device.label}
        </motion.span>
      </AnimatePresence>
    </div>
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

/* ─── BENTO CARD WRAPPER ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

/* ─── MAIN COMPONENT ─── */
export default function Services() {
  return (
    <section id="servicii" className="relative">
      <SectionDivider />
      <div className="py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-5">
              <span className="label-tag">Servicii</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5"
            >
              Soluții Digitale{" "}
              <span className="gradient-text">Complete</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[520px] mx-auto leading-relaxed font-light"
            >
              Tot ce ai nevoie pentru a construi o prezență digitală puternică și
              profesională care generează rezultate reale.
            </motion.p>
          </motion.div>

          {/* ─── BENTO GRID ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(200px,auto)]">

            {/* ── CARD 1: Website-uri Premium (featured — wide) ── */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="neon-card group p-8 md:p-10 md:col-span-2 lg:col-span-2 relative overflow-hidden min-h-[240px] flex flex-col justify-between"
            >
              <CircuitGrid />
              <WebsiteGraphic />
              <FloatingParticles />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400"
                    style={{ background: "rgba(2,222,252,0.08)", color: "#02defc" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.47.353-2.856.978-4.082" />
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">Serviciu Principal</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors duration-300">
                  Website-uri Premium
                </h3>
                <p className="text-white/35 text-sm leading-relaxed font-light max-w-[480px]">
                  Website-uri rapide, moderne și optimizate SEO care generează credibilitate și
                  încredere pentru afacerea ta. Construite cu cele mai noi tehnologii, fiecare site
                  este o investiție strategică în succesul tău digital.
                </p>
              </div>
              {/* Stats row */}
              <div className="relative z-10 flex items-center gap-8 mt-6 pt-6 border-t border-white/[0.04]">
                <AnimatedStat value={100} suffix="+" label="Proiecte" />
                <AnimatedStat value={99} suffix="%" label="Uptime" />
                <AnimatedStat value={95} suffix="+" label="Lighthouse" />
              </div>
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#02defc] opacity-[0.02] blur-[80px] group-hover:opacity-[0.05] transition-opacity duration-700" />
            </motion.div>

            {/* ── CARD 2: Asistent AI (tall) ── */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="neon-card group p-8 lg:row-span-2 relative overflow-hidden flex flex-col justify-between min-h-[240px]"
            >
              <AIBrainGraphic />
              <div className="relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-400"
                  style={{ background: "rgba(252,1,151,0.08)", color: "#fc0197" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white/90 group-hover:text-white transition-colors duration-300">
                  Asistent AI Integrat
                </h3>
                <p className="text-white/35 text-[13px] leading-relaxed font-light">
                  Asistent AI inteligent care califică lead-uri, răspunde întrebărilor și automatizează
                  comunicarea cu potențialii clienți — disponibil 24/7.
                </p>
              </div>

              {/* AI chat preview */}
              <div className="relative z-10 mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#fc0197]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fc0197]" />
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl rounded-tl-sm px-3 py-2">
                    <p className="text-[11px] text-white/30 leading-relaxed">Bună! Cum te pot ajuta astăzi?</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#fc0197]/[0.06] border border-[#fc0197]/[0.08] rounded-xl rounded-tr-sm px-3 py-2">
                    <p className="text-[11px] text-white/30 leading-relaxed">Am nevoie de un website...</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pl-7">
                  <div className="w-1 h-1 rounded-full bg-[#fc0197]/40 animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[#fc0197]/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1 h-1 rounded-full bg-[#fc0197]/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#fc0197] opacity-[0.02] blur-[60px] group-hover:opacity-[0.05] transition-opacity duration-700" />
            </motion.div>

            {/* ── CARD 3: Optimizare SEO ── */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="neon-card group p-7 relative overflow-hidden min-h-[200px] flex flex-col justify-between"
            >
              <SEOGraphic />
              <div className="relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-400"
                  style={{ background: "rgba(127,254,0,0.08)", color: "#7ffe00" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                  Optimizare SEO
                </h3>
                <p className="text-white/35 text-[13px] leading-[1.7] font-light">
                  Strategii SEO locale pentru România. Aducem afacerea ta în fața clienților care te
                  caută activ online.
                </p>
              </div>
              {/* Mini tags */}
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-4">
                {["Local SEO", "On-Page", "Analytics"].map((tag) => (
                  <span key={tag} className="text-[10px] text-[#7ffe00]/40 border border-[#7ffe00]/10 rounded-full px-2.5 py-1 bg-[#7ffe00]/[0.03]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#7ffe00] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
            </motion.div>

            {/* ── CARD 4: Landing Pages ── */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="neon-card group p-7 relative overflow-hidden min-h-[200px] flex flex-col justify-between"
            >
              <LandingPageGraphic />
              <div className="relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-400"
                  style={{ background: "rgba(244,115,25,0.08)", color: "#f47319" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                  Landing Pages
                </h3>
                <p className="text-white/35 text-[13px] leading-[1.7] font-light">
                  Pagini de destinație optimizate pentru conversie care transformă vizitatorii în
                  clienți potențiali.
                </p>
              </div>
              {/* Conversion rate indicator */}
              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/20 uppercase tracking-wider">Rată de conversie</span>
                  <span className="text-[11px] text-[#f47319]/60 font-semibold">+340%</span>
                </div>
                <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #f47319, #fdf301)" }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-[#f47319] opacity-[0.02] blur-[50px] group-hover:opacity-[0.04] transition-opacity duration-700" />
            </motion.div>

            {/* ── CARD 5: Design Responsive (wide bottom) ── */}
            <motion.div
              custom={4}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="neon-card group p-8 md:col-span-2 lg:col-span-3 relative overflow-hidden min-h-[180px]"
            >
              <ResponsiveGraphic />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-400"
                      style={{ background: "rgba(2,222,252,0.08)", color: "#02defc" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                        Design Responsive
                      </h3>
                      <p className="text-[11px] text-white/25 mt-0.5">Experiență perfectă pe orice dispozitiv</p>
                    </div>
                  </div>
                  <p className="text-white/35 text-[13px] leading-[1.7] font-light max-w-[500px]">
                    Experiențe impecabile pe orice dispozitiv — desktop, tabletă sau mobil.
                    Fiecare pixel contează, fiecare interacțiune este optimizată.
                  </p>
                </div>
                {/* Morphing device animation */}
                <DeviceMorphAnimation />
              </div>
              {/* Glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-[#02defc] opacity-[0.015] blur-[80px] group-hover:opacity-[0.035] transition-opacity duration-700" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS for floating particles */}
      <style jsx>{`
        @keyframes float-particle-0 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -20px); }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 15px); }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 10px); }
        }
        @keyframes responsive-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes responsive-orb-1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -60%) scale(1.15); opacity: 0.04; }
        }
        @keyframes responsive-orb-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(10px) scale(1.1); opacity: 0.035; }
        }
        @keyframes responsive-orb-3 {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(-15px) scale(1.12); opacity: 0.035; }
        }
      `}</style>
    </section>
  );
}
