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

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      // Send to your webhook / API endpoint
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
    <section id="contact-form" className="relative overflow-hidden">
      <SectionDivider />
      <div className="py-28 md:py-36 relative">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[400px] rounded-full orb-animate"
            style={{
              top: "10%",
              right: "5%",
              background: "radial-gradient(circle, rgba(2,222,252,0.04) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute w-[400px] h-[300px] rounded-full orb-animate"
            style={{
              bottom: "10%",
              left: "5%",
              background: "radial-gradient(circle, rgba(127,254,0,0.03) 0%, transparent 60%)",
              filter: "blur(60px)",
              animationDelay: "-4s",
            }}
          />
        </div>

        <div className="max-w-[700px] mx-auto px-6 lg:px-10 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-5">
              <span className="label-tag">Contactează-ne</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] mb-5 text-center"
            >
              Trimite-ne un <span className="gradient-text">Mesaj</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/40 max-w-[480px] mx-auto mb-12 text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed font-light text-center"
            >
              Completează formularul de mai jos și te vom contacta în cel mai scurt timp posibil.
            </motion.p>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="neon-card p-8 md:p-10 space-y-6"
            >
              {/* Name */}
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

              {/* Phone */}
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

              {/* Email */}
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

              {/* Message */}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="neon-btn w-full !py-4 !text-[15px] !font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Se trimite..." : "Trimite Mesajul"}
              </button>

              {/* Status messages */}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
