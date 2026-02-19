"use client";

import { useState } from "react";
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[400px] rounded-full orb-animate will-change-transform"
            style={{
              top: "20%",
              left: "10%",
              background: "radial-gradient(circle, rgba(2,222,252,0.03) 0%, rgba(2,222,252,0.01) 30%, transparent 55%)",
            }}
          />
          <div
            className="absolute w-[500px] h-[350px] rounded-full orb-animate will-change-transform"
            style={{
              bottom: "15%",
              right: "10%",
              background: "radial-gradient(circle, rgba(252,1,151,0.025) 0%, rgba(252,1,151,0.008) 30%, transparent 55%)",
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

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="neon-card p-8 md:p-10 text-left space-y-5 mb-20 max-w-[600px] mx-auto"
            >
              <div>
                <label htmlFor="name" className="block text-[13px] text-white/50 uppercase tracking-wider font-medium mb-2">
                  Nume Complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Numele tău"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[15px] placeholder:text-white/20 outline-none focus:border-[#02defc]/30 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[13px] text-white/50 uppercase tracking-wider font-medium mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+40 7XX XXX XXX"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[15px] placeholder:text-white/20 outline-none focus:border-[#02defc]/30 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[13px] text-white/50 uppercase tracking-wider font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@compania-ta.ro"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[15px] placeholder:text-white/20 outline-none focus:border-[#02defc]/30 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[13px] text-white/50 uppercase tracking-wider font-medium mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Spune-ne pe scurt despre proiectul tău..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-white text-[15px] placeholder:text-white/20 outline-none focus:border-[#02defc]/30 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="neon-btn w-full !py-4 !text-[15px] !font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Se trimite..." : "Trimite Mesajul"}
              </button>
              {status === "sent" && (
                <p className="text-center text-[#7ffe00] text-sm font-medium">
                  Mesajul a fost trimis cu succes! Te vom contacta în curând.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-[#fc0197] text-sm font-medium">
                  A apărut o eroare. Te rugăm să încerci din nou.
                </p>
              )}
            </motion.form>

            {/* Trust signals */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "24h", label: "Răspuns Garantat", color: "#02defc" },
                { value: "0€", label: "Cost Consultanță", color: "#7ffe00" },
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
