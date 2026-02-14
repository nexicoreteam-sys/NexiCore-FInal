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

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[400px] rounded-full orb-animate"
            style={{
              top: "20%",
              left: "10%",
              background: "radial-gradient(circle, rgba(2,222,252,0.04) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute w-[500px] h-[350px] rounded-full orb-animate"
            style={{
              bottom: "15%",
              right: "10%",
              background: "radial-gradient(circle, rgba(252,1,151,0.03) 0%, transparent 60%)",
              filter: "blur(60px)",
              animationDelay: "-6s",
            }}
          />
        </div>

        <div className="max-w-[800px] mx-auto px-6 lg:px-10 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-5">
              <span className="label-tag">Hai să Începem</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5"
            >
              Pregătit să-ți Transformi
              <br />
              <span className="gradient-text">Prezența Digitală?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[480px] mx-auto mb-12 text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed font-light"
            >
              Discută cu noi despre proiectul tău. Fără obligații, fără costuri
              ascunse — doar o conversație despre cum te putem ajuta.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <a href="mailto:contact@nexicore.ro" className="neon-btn !text-[15px] !px-10 !py-4">
                Contactează-ne
              </a>
              <a href="tel:+40700000000" className="ghost-btn !text-[15px] !px-10 !py-4">
                Sună Acum
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "24h", label: "Răspuns Garantat", color: "#02defc" },
                { value: "0", label: "Cost Consultanță", color: "#7ffe00" },
                { value: "100%", label: "Transparență", color: "#f47319" },
                { value: "∞", label: "Suport Post-Lansare", color: "#fc0197" },
              ].map((item) => (
                <div key={item.label} className="text-center group">
                  <div
                    className="text-[clamp(1.5rem,3vw,2rem)] font-bold mb-1 transition-all duration-300"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="text-[11px] text-white/25 uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
