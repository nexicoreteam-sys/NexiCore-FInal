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

export default function AIAssistant() {
  return (
    <section id="asistent-ai" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(2,222,252,0.04)_0%,transparent_60%)] orb-animate" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(252,1,151,0.03)_0%,transparent_60%)] orb-animate" style={{ animationDelay: "-5s" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
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

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[640px] mx-auto"
          >
            {/* Chat shell */}
            <div className="glass-strong rounded-[24px] overflow-hidden shadow-[0_0_80px_-20px_rgba(2,222,252,0.08)]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/[0.04] flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#02defc]/20 to-[#fc0197]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#02defc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#7ffe00] border-2 border-black" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white/80">Asistent Nexicore</div>
                  <div className="text-[11px] text-white/30">Online acum</div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[300px]">
                {/* Bot */}
                <div className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#02defc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.04] rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                    <p className="text-[13px] leading-[1.7] text-white/60 font-light">
                      Iubita mea frumoasa, te ai spalat la pasa? 
                  
                    </p>
                  </div>
                </div>

                {/* User */}
                <div className="flex gap-2.5 justify-end">
                  <div className="bg-[#02defc]/[0.08] border border-[#02defc]/[0.12] rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                    <p className="text-[13px] leading-[1.7] text-white/70 font-light">
                      Da, acum pasarica mea este curata 
                    </p>
                  </div>
                </div>

                {/* Bot response */}
                <div className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#02defc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.04] rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                    <p className="text-[13px] leading-[1.7] text-white/60 font-light">
                      Din pacate nu te pot ajuta, pulica mea este impu
                    </p>
                  </div>
                </div>

                {/* Typing */}
                <div className="flex gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#02defc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.04] rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1.5 items-center h-5">
                      <motion.span
                        className="w-1.5 h-1.5 bg-[#02defc] rounded-full"
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-[#7ffe00] rounded-full"
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-[#fc0197] rounded-full"
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-white/[0.04]">
                <div className="flex gap-3 items-center">
                  <div className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[13px] text-white/20 font-light">
                    Scrie un mesaj...
                  </div>
                  <button
                    disabled
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Feature pills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2.5 mt-8"
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
