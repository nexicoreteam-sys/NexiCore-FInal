"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ─── CHAT MESSAGES ─── */
const chatMessages = [
  { role: "user" as const, text: "Bună! Aveți disponibilitate pentru un website de consultanță financiară?" },
  { role: "ai" as const, text: "Bună ziua! Da, suntem specializați în website-uri pentru consultanță financiară. Ce funcționalități aveți nevoie?" },
  { role: "user" as const, text: "Vreau un site profesional cu formulare de contact și booking online." },
  { role: "ai" as const, text: "Excelent! Am identificat nevoile dvs. Pentru a vă pregăti o ofertă personalizată, am nevoie de câteva detalii." },
  { role: "ai" as const, text: "Care este numele dvs. complet și numele companiei?" },
  { role: "user" as const, text: "Andrei Popescu, SC FinAdvisor SRL" },
  { role: "ai" as const, text: "Mulțumesc, Andrei! Care este adresa dvs. de email și un număr de telefon?" },
  { role: "user" as const, text: "andrei@finadvisor.ro, 0740 123 456" },
  { role: "ai" as const, text: "✓ Perfect! Datele au fost înregistrate. Veți primi un email de confirmare în câteva momente. Echipa noastră vă va contacta în maxim 24h." },
];

/* ─── FUNNEL STAGES ─── */
const funnelStages = [
  { label: "Vizitatori", count: "2,847", color: "#02defc" },
  { label: "Conversații AI", count: "1,203", color: "#7ffe00" },
  { label: "Lead-uri Calificate", count: "487", color: "#f47319" },
  { label: "Clienți Potențiali", count: "142", color: "#fc0197" },
];

/* ─── LEAD NOTIFICATIONS ─── */
const leadNotifications = [
  { name: "Andrei Popescu", company: "FinAdvisor SRL", industry: "Consultanță Financiară", score: 94, time: "Acum 2 min" },
  { name: "Maria Ionescu", company: "BuildPro SRL", industry: "Construcții", score: 87, time: "Acum 8 min" },
  { name: "Elena Dragomir", company: "LegalFirst SRL", industry: "Avocatură", score: 92, time: "Acum 15 min" },
  { name: "Cristian Radu", company: "EnergoPlus SA", industry: "Energie", score: 78, time: "Acum 23 min" },
];

/* ─── STATS ─── */
const stats = [
  { value: "85%", label: "Rată de Calificare", icon: "target", color: "#7ffe00" },
  { value: "< 3s", label: "Timp de Răspuns", icon: "zap", color: "#02defc" },
  { value: "24/7", label: "Disponibilitate", icon: "clock", color: "#f47319" },
];

function SectionDivider() {
  return (
    <div className="section-line section-line-dots">
      <span className="dot-left" />
      <span className="dot-right" />
    </div>
  );
}

/* ─── TYPING INDICATOR ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#02defc]/60"
          style={{
            animation: "typing-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── ANIMATED CHAT ─── */
function AnimatedChat() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    if (visibleCount >= chatMessages.length) return;

    const nextMsg = chatMessages[visibleCount];
    const typingDelay = nextMsg.role === "ai" ? 1800 : 800;
    const showDelay = nextMsg.role === "ai" ? 1200 : 600;

    setShowTyping(true);
    const t1 = setTimeout(() => {
      setShowTyping(false);
      const t2 = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 200);
      return () => clearTimeout(t2);
    }, typingDelay);

    return () => clearTimeout(t1);
  }, [visibleCount, hasStarted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, showTyping]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => {
        if (!hasStarted) {
          setTimeout(() => setHasStarted(true), 600);
        }
      }}
      className="w-full max-w-[420px] mx-auto"
    >
      {/* Chat window */}
      <div className="rounded-2xl border border-[#1a1a1a] bg-[#060606] overflow-hidden shadow-[0_8px_40px_-12px_rgba(2,222,252,0.08)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#1a1a1a] bg-[#0a0a0a]">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#02defc]/20 to-[#7ffe00]/20 border border-[#02defc]/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#02defc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#7ffe00] border-2 border-[#060606]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white/80">Nexicore AI</p>
            <p className="text-[10px] text-[#7ffe00]/70 font-medium">Online acum</p>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-[380px] overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {chatMessages.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-[1.6] ${
                    msg.role === "user"
                      ? "bg-[#02defc]/10 border border-[#02defc]/15 text-white/75 rounded-br-md"
                      : "bg-white/[0.04] border border-white/[0.06] text-white/60 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── ANIMATED FUNNEL ─── */
function AnimatedFunnel() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full max-w-[380px] mx-auto"
    >
      <div className="relative">
        {/* Funnel SVG */}
        <svg viewBox="0 0 380 420" fill="none" className="w-full h-auto">
          <defs>
            <linearGradient id="funnel-grad" x1="190" y1="0" x2="190" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#02defc" stopOpacity="0.12" />
              <stop offset="35%" stopColor="#7ffe00" stopOpacity="0.08" />
              <stop offset="65%" stopColor="#f47319" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#fc0197" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="funnel-stroke" x1="190" y1="0" x2="190" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#02defc" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#7ffe00" stopOpacity="0.2" />
              <stop offset="65%" stopColor="#f47319" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#fc0197" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Funnel shape */}
          <path
            d="M20 30 L360 30 L280 160 L260 230 L240 310 L220 390 L160 390 L140 310 L120 230 L100 160 Z"
            fill="url(#funnel-grad)"
            stroke="url(#funnel-stroke)"
            strokeWidth="1"
          />

          {/* Stage dividers */}
          <line x1="95" y1="120" x2="285" y2="120" stroke="white" strokeOpacity="0.06" strokeDasharray="4 4" />
          <line x1="115" y1="210" x2="265" y2="210" stroke="white" strokeOpacity="0.06" strokeDasharray="4 4" />
          <line x1="135" y1="300" x2="245" y2="300" stroke="white" strokeOpacity="0.06" strokeDasharray="4 4" />

          {/* Animated particles flowing through funnel */}
          {/* Top section - many particles */}
          {[...Array(8)].map((_, i) => (
            <circle key={`p1-${i}`} r="3" fill="#02defc" opacity="0.6">
              <animate
                attributeName="cy"
                values="35;115"
                dur={`${2.5 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
              <animate
                attributeName="cx"
                values={`${80 + i * 35};${120 + i * 20}`}
                dur={`${2.5 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
              <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
            </circle>
          ))}

          {/* Middle section - fewer particles */}
          {[...Array(5)].map((_, i) => (
            <circle key={`p2-${i}`} r="3" fill="#7ffe00" opacity="0.5">
              <animate
                attributeName="cy"
                values="125;205"
                dur={`${2.8 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
              <animate
                attributeName="cx"
                values={`${130 + i * 25};${150 + i * 18}`}
                dur={`${2.8 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
            </circle>
          ))}

          {/* Filtered out particles - drifting sideways and fading */}
          {[...Array(4)].map((_, i) => (
            <circle key={`pf-${i}`} r="2.5" fill="#fc0197" opacity="0.4">
              <animate
                attributeName="cy"
                values={`${140 + i * 40};${160 + i * 40}`}
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 1.2}s`}
              />
              <animate
                attributeName="cx"
                values={`${i % 2 === 0 ? 100 - i * 5 : 280 + i * 5};${i % 2 === 0 ? 30 : 350}`}
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 1.2}s`}
              />
              <animate attributeName="opacity" values="0;0.5;0.3;0" dur="3s" repeatCount="indefinite" begin={`${i * 1.2}s`} />
            </circle>
          ))}

          {/* Bottom section - qualified leads */}
          {[...Array(3)].map((_, i) => (
            <circle key={`p3-${i}`} r="3.5" fill="#f47319" opacity="0.7">
              <animate
                attributeName="cy"
                values="215;295"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.8}s`}
              />
              <animate
                attributeName="cx"
                values={`${160 + i * 20};${170 + i * 14}`}
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={`${i * 0.8}s`}
              />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
            </circle>
          ))}

          {/* Exit particles */}
          {[...Array(2)].map((_, i) => (
            <circle key={`p4-${i}`} r="4" fill="#fc0197" opacity="0.8">
              <animate
                attributeName="cy"
                values="305;385"
                dur={`${3.5 + i * 0.6}s`}
                repeatCount="indefinite"
                begin={`${i * 1.5}s`}
              />
              <animate
                attributeName="cx"
                values={`${175 + i * 15};${180 + i * 10}`}
                dur={`${3.5 + i * 0.6}s`}
                repeatCount="indefinite"
                begin={`${i * 1.5}s`}
              />
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${3.5 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 1.5}s`} />
            </circle>
          ))}
        </svg>

        {/* Stage labels overlaid on funnel */}
        {funnelStages.map((stage, i) => (
          <div
            key={stage.label}
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{ top: `${7 + i * 22}%` }}
          >
            <p className="text-[13px] font-semibold text-white/70" style={{ color: `${stage.color}cc` }}>
              {stage.label}
            </p>
            <p className="text-[20px] font-bold text-white/90 tabular-nums">
              {stage.count}
            </p>
          </div>
        ))}

        {/* "X" markers for filtered leads */}
        <div className="absolute left-2 top-[35%] text-[10px] text-[#fc0197]/40 font-mono">
          <span style={{ animation: "fade-pulse 3s ease infinite" }}>✕ necalificat</span>
        </div>
        <div className="absolute right-2 top-[50%] text-[10px] text-[#fc0197]/40 font-mono">
          <span style={{ animation: "fade-pulse 3s ease infinite 1.5s" }}>✕ necalificat</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── CLIENT INBOX ─── */
function ClientInbox() {
  const [visibleLeads, setVisibleLeads] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    if (visibleLeads >= leadNotifications.length) return;

    const timer = setTimeout(() => {
      setVisibleLeads((c) => c + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [visibleLeads, hasStarted]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => {
        if (!hasStarted) {
          setTimeout(() => setHasStarted(true), 1200);
        }
      }}
      className="w-full max-w-[380px] mx-auto"
    >
      <div className="rounded-2xl border border-[#1a1a1a] bg-[#060606] overflow-hidden shadow-[0_8px_40px_-12px_rgba(127,254,0,0.06)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1a1a1a] bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7ffe00]/20 to-[#f47319]/20 border border-[#7ffe00]/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7ffe00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/80">Inbox Lead-uri</p>
              <p className="text-[10px] text-white/30">Leads calificate de AI</p>
            </div>
          </div>
          {visibleLeads > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 rounded-full bg-[#7ffe00] flex items-center justify-center text-[10px] font-bold text-black"
            >
              {visibleLeads}
            </motion.span>
          )}
        </div>

        {/* Lead list */}
        <div className="h-[380px] overflow-y-auto px-3 py-3 space-y-2.5 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {leadNotifications.slice(0, visibleLeads).map((lead, i) => (
              <motion.div
                key={lead.name}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="rounded-xl border border-[#1a1a1a] bg-white/[0.02] hover:bg-white/[0.04] p-3.5 transition-colors duration-300 cursor-default"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold border"
                      style={{
                        background: `${funnelStages[i % 4].color}10`,
                        borderColor: `${funnelStages[i % 4].color}25`,
                        color: `${funnelStages[i % 4].color}cc`,
                      }}
                    >
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-white/80">{lead.name}</p>
                      <p className="text-[10.5px] text-white/30">{lead.company}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-white/20 whitespace-nowrap mt-0.5">{lead.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/25 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04]">
                    {lead.industry}
                  </span>
                  {/* Lead score */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lead.score}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        className="h-full rounded-full"
                        style={{
                          background: lead.score >= 90
                            ? "linear-gradient(90deg, #7ffe00, #02defc)"
                            : lead.score >= 80
                            ? "linear-gradient(90deg, #f47319, #fdf301)"
                            : "linear-gradient(90deg, #fc0197, #f47319)",
                          boxShadow: lead.score >= 90
                            ? "0 0 8px rgba(127,254,0,0.4)"
                            : "0 0 8px rgba(244,115,25,0.3)",
                        }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-bold tabular-nums"
                      style={{
                        color: lead.score >= 90 ? "#7ffe00" : lead.score >= 80 ? "#f47319" : "#fc0197",
                      }}
                    >
                      {lead.score}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleLeads === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 opacity-40">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <p className="text-[12px] text-white/20">Se așteaptă lead-uri...</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── STAT ICON ─── */
function StatIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === "target")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    );
  if (icon === "zap")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function AIAssistant() {
  return (
    <section id="asistent-ai" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(2,222,252,0.03)_0%,transparent_60%)] pointer-events-none orb-animate" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(252,1,151,0.025)_0%,transparent_60%)] pointer-events-none orb-animate" style={{ animationDelay: "-6s" }} />

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
              <span className="label-tag">Asistent AI</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5"
            >
              De la Conversație la{" "}
              <span className="gradient-text">Client Calificat</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[560px] mx-auto leading-relaxed font-light"
            >
              Asistentul AI poartă conversații inteligente cu vizitatorii, identifică
              intenția de cumpărare și îți livrează doar lead-urile cu potențial real.
            </motion.p>
          </motion.div>

          {/* ── 3-COLUMN VISUAL STORY ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start mb-20">
            {/* Left: Chat */}
            <div className="relative">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#02defc]/80 bg-[#02defc]/5 border border-[#02defc]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#02defc] shadow-[0_0_6px_#02defc]" />
                  Conversație AI
                </span>
              </div>
              <AnimatedChat />
            </div>

            {/* Center: Funnel */}
            <div className="relative">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#f47319]/80 bg-[#f47319]/5 border border-[#f47319]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f47319] shadow-[0_0_6px_#f47319]" />
                  Filtrare & Calificare
                </span>
              </div>
              <AnimatedFunnel />
            </div>

            {/* Right: Inbox */}
            <div>
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#7ffe00]/80 bg-[#7ffe00]/5 border border-[#7ffe00]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ffe00] shadow-[0_0_6px_#7ffe00]" />
                  Inbox-ul Tău
                </span>
              </div>
              <ClientInbox />
            </div>
          </div>

          {/* ── STATS ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="neon-card !rounded-2xl p-6 text-center group"
              >
                <div className="flex justify-center mb-3 opacity-50 group-hover:opacity-80 transition-opacity">
                  <StatIcon icon={stat.icon} color={stat.color} />
                </div>
                <p
                  className="text-[28px] font-bold tracking-tight mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-[12px] text-white/35 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
