"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Neon orbs — floating multi-color */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full orb-animate will-change-transform"
          style={{
            top: "15%",
            left: "10%",
            background: "radial-gradient(circle, rgba(2,222,252,0.05) 0%, rgba(2,222,252,0.02) 30%, transparent 60%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full orb-animate will-change-transform"
          style={{
            bottom: "10%",
            right: "5%",
            background: "radial-gradient(circle, rgba(127,254,0,0.04) 0%, rgba(127,254,0,0.015) 30%, transparent 60%)",
            animationDelay: "-4s",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full orb-animate will-change-transform"
          style={{
            top: "40%",
            right: "25%",
            background: "radial-gradient(circle, rgba(252,1,151,0.035) 0%, rgba(252,1,151,0.01) 30%, transparent 60%)",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => {
          const colors = ["#02defc", "#7ffe00", "#fc0197", "#f47319"];
          const size = 1 + (i % 3);
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${5 + (i * 3.1) % 90}%`,
                top: `${5 + (i * 7.3) % 90}%`,
                backgroundColor: colors[i % colors.length],
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* ─── Floating AI Agent Elements ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Agent 1 — Chat bubble with typing indicator */}
        <motion.div
          className="absolute"
          style={{ top: "18%", left: "18%" }}
          animate={{ y: [0, -14, 0], x: [0, 6, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#02defc]/15 flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                  <path d="M8 2L10 6L14 6.5L11 9.5L12 14L8 11.5L4 14L5 9.5L2 6.5L6 6L8 2Z" fill="#02defc" opacity="0.7" />
                </svg>
              </div>
              <span className="text-[9px] text-white/30 uppercase tracking-wider font-medium">AI Agent</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded-full bg-white/[0.06] w-full" />
              <div className="h-1.5 rounded-full bg-white/[0.04] w-[75%]" />
            </div>
            <div className="flex gap-1 mt-2.5">
              <motion.div className="w-1 h-1 rounded-full bg-[#02defc]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
              <motion.div className="w-1 h-1 rounded-full bg-[#02defc]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
              <motion.div className="w-1 h-1 rounded-full bg-[#02defc]/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
            </div>
          </div>
        </motion.div>

        {/* Agent 2 — Neural network node cluster (top right) */}
        <motion.div
          className="absolute"
          style={{ top: "12%", right: "18%" }}
          animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg viewBox="0 0 100 80" fill="none" className="w-[110px] h-[88px] opacity-25">
            {/* Nodes */}
            <circle cx="20" cy="20" r="4" fill="#7ffe00">
              <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="10" r="3" fill="#02defc">
              <animate attributeName="r" values="2.5;4;2.5" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="25" r="4" fill="#fc0197">
              <animate attributeName="r" values="3;5;3" dur="3.5s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="35" cy="50" r="3" fill="#02defc">
              <animate attributeName="r" values="2.5;4;2.5" dur="2.8s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="55" r="3.5" fill="#7ffe00">
              <animate attributeName="r" values="3;4.5;3" dur="3.2s" begin="0.7s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="70" r="3" fill="#fc0197">
              <animate attributeName="r" values="2.5;4;2.5" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Connections */}
            <line x1="20" y1="20" x2="50" y2="10" stroke="#7ffe00" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="50" y1="10" x2="80" y2="25" stroke="#02defc" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="20" y1="20" x2="35" y2="50" stroke="#02defc" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="25" x2="65" y2="55" stroke="#fc0197" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.2s" repeatCount="indefinite" />
            </line>
            <line x1="35" y1="50" x2="65" y2="55" stroke="#7ffe00" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.8s" repeatCount="indefinite" />
            </line>
            <line x1="65" y1="55" x2="50" y2="70" stroke="#fc0197" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.4s" repeatCount="indefinite" />
            </line>
            <line x1="35" y1="50" x2="50" y2="70" stroke="#02defc" strokeWidth="0.5" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="0;-12" dur="3.2s" repeatCount="indefinite" />
            </line>
            {/* Data packet */}
            <circle r="1.5" fill="#02defc" opacity="0.8">
              <animateMotion dur="4s" repeatCount="indefinite" path="M20 20 L50 10 L80 25 L65 55 L35 50 Z" />
            </circle>
          </svg>
        </motion.div>

        {/* Agent 3 — Code/data stream (left middle) */}
        <motion.div
          className="absolute"
          style={{ top: "50%", left: "15%" }}
          animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl px-3 py-2.5 font-mono text-[9px] leading-relaxed opacity-30 w-[120px]">
            <div className="text-[#7ffe00]/70">{"{"} agent: true</div>
            <div className="text-[#02defc]/60 pl-2">mode: <span className="text-[#fdf301]/60">&quot;auto&quot;</span></div>
            <div className="text-[#fc0197]/50 pl-2">status: <span className="text-[#7ffe00]/70">&quot;active&quot;</span></div>
            <div className="text-[#02defc]/40 pl-2">
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
                processing...
              </motion.span>
            </div>
            <div className="text-[#7ffe00]/70">{"}"}</div>
          </div>
        </motion.div>

        {/* Agent 4 — Workflow pipeline (right middle) */}
        <motion.div
          className="absolute"
          style={{ top: "45%", right: "14%" }}
          animate={{ y: [0, -16, 0], x: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <div className="flex items-center gap-1.5 opacity-25">
            {/* Step nodes connected by arrows */}
            {[
              { icon: "📥", color: "#02defc", label: "Input" },
              { icon: "⚡", color: "#fdf301", label: "Process" },
              { icon: "✓", color: "#7ffe00", label: "Output" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-1.5">
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-9 h-9 rounded-lg border flex items-center justify-center text-xs"
                    style={{ borderColor: `${step.color}40`, background: `${step.color}08` }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  >
                    <span style={{ fontSize: "14px" }}>{step.icon}</span>
                  </motion.div>
                  <span className="text-[7px] uppercase tracking-wider font-medium" style={{ color: `${step.color}60` }}>
                    {step.label}
                  </span>
                </div>
                {i < 2 && (
                  <svg viewBox="0 0 20 10" className="w-4 h-2.5 mb-3" fill="none">
                    <path d="M2 5 L14 5" stroke="white" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 2">
                      <animate attributeName="stroke-dashoffset" values="0;-8" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M12 2 L16 5 L12 8" stroke="white" strokeWidth="0.8" opacity="0.2" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Agent 5 — Qualification badge (bottom left) */}
        <motion.div
          className="absolute"
          style={{ bottom: "20%", left: "20%" }}
          animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-[#7ffe00]/10 rounded-xl px-3.5 py-2.5 opacity-30 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#7ffe00]/10 flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M4 8L7 11L12 5" stroke="#7ffe00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[9px] text-white/40 font-medium">Lead Qualified</div>
              <div className="text-[8px] text-[#7ffe00]/50 font-mono mt-0.5">score: 94/100</div>
            </div>
          </div>
        </motion.div>

        {/* Agent 6 — Notification ping (bottom right) */}
        <motion.div
          className="absolute"
          style={{ bottom: "25%", right: "20%" }}
          animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-[#fc0197]/10 rounded-xl px-3.5 py-2 opacity-25 flex items-center gap-2">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-[#fc0197]/10 flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                  <path d="M8 2C5.5 2 4 4 4 6V9L3 11H13L12 9V6C12 4 10.5 2 8 2Z" fill="#fc0197" opacity="0.6" />
                  <path d="M6.5 11.5C6.5 12.3 7.2 13 8 13C8.8 13 9.5 12.3 9.5 11.5" stroke="#fc0197" strokeWidth="0.8" opacity="0.6" />
                </svg>
              </div>
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#fc0197]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.4, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-[9px] text-white/30">Email trimis</span>
          </div>
        </motion.div>
      </div>

      {/* Radial fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,#000_100%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[900px] mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
          <span className="label-tag">
            Agenție Digitală
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] mb-6"
        >
          
        
          <span className="gradient-text">Soluții moderne, explicate simplu, livrate eficient.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-[clamp(0.95rem,1.8vw,1.15rem)] text-white/40 max-w-[560px] mx-auto mb-12 leading-relaxed font-light"
        >
          Website-uri premium pentru companii de consultanță financiară,
          contabilitate, avocatură, construcții și energie din România.
          <br /><span className="text-white/60 font-normal/"> Rezultate. Nu promisiuni.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="neon-btn !text-[15px] !px-10 !py-4">
            Începe un Proiect
          </a>
          <a href="#servicii" className="ghost-btn !text-[15px] !px-10 !py-4">
            Descoperă Serviciile
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeInUp}
          className="mt-20 flex justify-center gap-12 md:gap-16"
        >
          {[
            { value: "50+", label: "Proiecte Livrate" },
            { value: "<2s", label: "Timp de Încărcare" },
            { value: "100%", label: "Clienți Mulțumiți" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/30 mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 bg-[#02defc] rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
