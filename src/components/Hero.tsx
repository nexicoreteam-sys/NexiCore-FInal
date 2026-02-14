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
          className="absolute w-[600px] h-[600px] rounded-full orb-animate"
          style={{
            top: "15%",
            left: "10%",
            background: "radial-gradient(circle, rgba(2,222,252,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full orb-animate"
          style={{
            bottom: "10%",
            right: "5%",
            background: "radial-gradient(circle, rgba(127,254,0,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "-4s",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full orb-animate"
          style={{
            top: "40%",
            right: "25%",
            background: "radial-gradient(circle, rgba(252,1,151,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
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
                opacity: [0.1, 0.35, 0.1],
                scale: [1, 1.8, 1],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          );
        })}
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
            Agenție Digitală Premium — România
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
