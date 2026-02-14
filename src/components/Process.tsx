"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Descoperire",
    description:
      "Analizăm afacerea ta, industria și obiectivele. Înțelegem ce te face diferit și cum să comunicăm asta digital.",
    accent: "#02defc",
  },
  {
    number: "02",
    title: "Strategie & Design",
    description:
      "Creăm arhitectura, designul și strategia de conținut. Fiecare element este gândit pentru conversie și credibilitate.",
    accent: "#7ffe00",
  },
  {
    number: "03",
    title: "Dezvoltare",
    description:
      "Construim cu tehnologii moderne — rapid, securizat și optimizat. Cod curat, performanță maximă.",
    accent: "#f47319",
  },
  {
    number: "04",
    title: "Lansare & Optimizare",
    description:
      "Lansăm, monitorizăm și optimizăm continuu. SEO, viteză și integrări — totul funcționează impecabil.",
    accent: "#fc0197",
  },
];

function SectionDivider() {
  return (
    <div className="section-line section-line-dots">
      <span className="dot-left" />
      <span className="dot-right" />
    </div>
  );
}

export default function Process() {
  return (
    <section id="proces" className="relative">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(2,222,252,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
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
              className="text-white/40 max-w-[520px] mx-auto leading-relaxed font-light"
            >
              Un proces structurat și transparent care transformă viziunea ta
              într-o prezență digitală de impact.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative"
          >
            {/* Horizontal connector line — desktop only */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>

            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                whileHover={cardHover}
                className="relative group"
              >
                <div className="neon-card p-7 h-full">
                  {/* Step number with accent glow */}
                  <div className="relative mb-5">
                    <span
                      className="text-[2.5rem] font-bold leading-none"
                      style={{
                        color: step.accent,
                        opacity: 0.15,
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="absolute top-1/2 left-3 -translate-y-1/2 w-6 h-6 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: step.accent }}
                    />
                  </div>

                  {/* Accent dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-4 opacity-60"
                    style={{
                      background: step.accent,
                      boxShadow: `0 0 8px ${step.accent}40`,
                    }}
                  />

                  <h3 className="text-[15px] font-semibold mb-2.5 text-white/90 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/35 text-[13px] leading-[1.7] font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
