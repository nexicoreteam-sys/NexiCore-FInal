"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("nexicore-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("nexicore-cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("nexicore-cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6"
      style={{
        animation: "cookie-slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#1a1a1a] bg-[#060606]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_-8px_40px_-12px_rgba(2,222,252,0.08)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1a1a1a] bg-[#0d0d0d]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#02defc]"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
              <circle cx="10.5" cy="15.5" r="1" fill="currentColor" />
              <circle cx="15.5" cy="12.5" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/80 leading-relaxed">
              Folosim cookie-uri pentru a îmbunătăți experiența dvs. pe site.
              Prin continuarea navigării, sunteți de acord cu{" "}
              <a
                href="/politica-cookie"
                className="text-[#02defc] hover:text-[#3de8ff] underline underline-offset-2 transition-colors"
              >
                Politica de Cookie-uri
              </a>
              .
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={decline}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 border border-[#1a1a1a] bg-transparent hover:border-white/20 hover:text-white/80 transition-all duration-300 cursor-pointer"
            >
              Refuz
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold text-black bg-[#02defc] hover:bg-[#3de8ff] shadow-[0_0_20px_-4px_rgba(2,222,252,0.3)] hover:shadow-[0_0_24px_-2px_rgba(2,222,252,0.45)] transition-all duration-300 cursor-pointer"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
