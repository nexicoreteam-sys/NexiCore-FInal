"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function SectionDivider() {
  return (
    <div className="section-line section-line-dots">
      <span className="dot-left" />
      <span className="dot-right" />
    </div>
  );
}

/* Small connector dot used on vertical lines */
function ConnectorDot({ color = "#02defc" }: { color?: string }) {
  return (
    <span
      className="block w-2 h-2 rounded-full mx-auto"
      style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
    />
  );
}

/* Vertical dashed line between flow steps */
function VerticalLine() {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <span className="w-px h-4 bg-white/10" />
      <ConnectorDot />
      <span className="w-px h-4 bg-white/10" />
    </div>
  );
}

const inputSources = [
  { icon: "🌐", label: "Website" },
  { icon: "💬", label: "Chat" },
  { icon: "📞", label: "Telefon" },
  { icon: "📧", label: "Email" },
  { icon: "📱", label: "Social Media" },
];

const flowSteps = [
  { label: "Primire & Analiză Cerere", desc: "AI procesează mesajul clientului" },
  { label: "Calificare Automată Lead", desc: "Detectare intenție de cumpărare" },
  { label: "Colectare Date Client", desc: "Nume, Email, Telefon, Companie" },
  { label: "Validare & Îmbogățire Date", desc: "Verificare email, telefon, industrie" },
];

const outputResults = [
  { icon: "📩", label: "Email Notificare" },
  { icon: "🔗", label: "Webhook n8n" },
  { icon: "👤", label: "Follow-up Manual" },
  { icon: "📊", label: "Raport Lead" },
];

export default function AIAssistant() {
  return (
    <section id="asistent-ai" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(2,222,252,0.04)_0%,transparent_60%)] orb-animate" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(252,1,151,0.03)_0%,transparent_60%)] orb-animate"
            style={{ animationDelay: "-5s" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-5">
              <span className="label-tag">Asistent AI</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5"
            >
              Inteligență Artificială{" "}
              <span className="gradient-text">la Dispoziția Ta</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[520px] mx-auto leading-relaxed font-light"
            >
              Un asistent AI care lucrează non-stop pentru afacerea ta — răspunde
              întrebărilor, califică lead-uri și automatizează comunicarea.
            </motion.p>
          </motion.div>

          {/* ── FLOW DIAGRAM ── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Desktop: 3-column layout | Mobile: stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-6 items-center">

              {/* ─── LEFT: INPUT SOURCES ─── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-end"
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#02defc] to-[#7ffe00]">
                    Input
                  </span>
                </motion.div>

                <div className="relative">
                  {/* Glow behind icons */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(2,222,252,0.06) 0%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3 relative">
                    {inputSources.map((src) => (
                      <motion.div
                        key={src.label}
                        variants={fadeInUp}
                        className="neon-card !rounded-2xl p-4 flex flex-col items-center gap-2 min-w-[90px]"
                      >
                        <span className="text-2xl">{src.icon}</span>
                        <span className="text-[11px] text-white/40 font-medium tracking-wide">
                          {src.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Horizontal connector (desktop only) */}
                <div className="hidden lg:flex items-center gap-1.5 mt-6 self-end pr-0">
                  <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#02defc]/30" />
                  <ConnectorDot />
                </div>
                {/* Vertical connector (mobile only) */}
                <div className="lg:hidden mt-4">
                  <VerticalLine />
                </div>
              </motion.div>

              {/* ─── CENTER: PROCESSING FLOW ─── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                {/* Outer glow frame */}
                <div className="relative">
                  <div
                    className="absolute -inset-4 rounded-[32px] pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(2,222,252,0.04) 0%, rgba(127,254,0,0.02) 50%, rgba(252,1,151,0.04) 100%)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "32px",
                    }}
                  />

                  <div className="relative flex flex-col items-center">
                    {flowSteps.map((step, i) => (
                      <div key={step.label} className="flex flex-col items-center">
                        {i > 0 && <VerticalLine />}
                        <motion.div
                          variants={fadeInUp}
                          className="glass-strong rounded-2xl px-6 py-4 text-center max-w-[340px] w-full relative group"
                        >
                          {/* Side accent */}
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-full opacity-60"
                            style={{
                              background:
                                i === 0 ? "#02defc" :
                                i === 1 ? "#7ffe00" :
                                i === 2 ? "#f47319" : "#fc0197",
                              boxShadow: `0 0 12px ${
                                i === 0 ? "#02defc" :
                                i === 1 ? "#7ffe00" :
                                i === 2 ? "#f47319" : "#fc0197"
                              }40`,
                            }}
                          />
                          <p className="text-[14px] text-white/80 font-medium mb-1">
                            {step.label}
                          </p>
                          <p className="text-[12px] text-white/30 font-light">
                            {step.desc}
                          </p>
                        </motion.div>
                      </div>
                    ))}

                    {/* Bottom branch: Approvals + Automation */}
                    <VerticalLine />
                    <motion.div variants={fadeInUp} className="flex items-center gap-4">
                      <div className="glass-strong rounded-xl px-5 py-3 text-center">
                        <p className="text-[13px] text-white/70 font-medium">Automatizare</p>
                        <p className="text-[11px] text-white/25 font-light">n8n Webhook</p>
                      </div>
                      <span className="text-white/15">←</span>
                      <div className="rounded-xl px-5 py-3 text-center bg-gradient-to-r from-[#7ffe00]/10 to-[#02defc]/10 border border-[#7ffe00]/15">
                        <p className="text-[13px] text-white/70 font-medium">Confirmare</p>
                        <p className="text-[11px] text-white/25 font-light">Email automat</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* ─── RIGHT: OUTPUT RESULTS ─── */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-start"
              >
                {/* Horizontal connector (desktop only) */}
                <div className="hidden lg:flex items-center gap-1.5 mb-6 self-start pl-0">
                  <ConnectorDot color="#7ffe00" />
                  <span className="w-12 h-px bg-gradient-to-r from-[#7ffe00]/30 to-transparent" />
                </div>
                {/* Vertical connector (mobile only) */}
                <div className="lg:hidden mb-4">
                  <VerticalLine />
                </div>

                <motion.div variants={fadeInUp} className="mb-6 flex justify-center lg:justify-start w-full">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#7ffe00] to-[#02defc]">
                    Output
                  </span>
                </motion.div>

                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(127,254,0,0.06) 0%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3 relative">
                    {outputResults.map((out) => (
                      <motion.div
                        key={out.label}
                        variants={fadeInUp}
                        className="neon-card !rounded-2xl p-4 flex flex-col items-center gap-2 min-w-[110px]"
                      >
                        <span className="text-2xl">{out.icon}</span>
                        <span className="text-[11px] text-white/40 font-medium tracking-wide text-center">
                          {out.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature pills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2.5 mt-16"
            >
              {[
                { label: "Disponibil 24/7", color: "#02defc" },
                { label: "Răspuns Instant", color: "#7ffe00" },
                { label: "Calificare Lead-uri", color: "#f47319" },
                { label: "Automatizare Email", color: "#fc0197" },
              ].map((feature) => (
                <motion.span
                  key={feature.label}
                  variants={fadeInUp}
                  className="glass px-4 py-2 rounded-full text-[12px] text-white/35 font-light flex items-center gap-2"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: feature.color, boxShadow: `0 0 4px ${feature.color}60` }}
                  />
                  {feature.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
