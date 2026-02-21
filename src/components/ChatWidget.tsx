'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessage, submitLead } from '../lib/chat';
import '../styles/chat.css';

const SESSION_KEY = 'nexicore_chat_v1';
const LEAD_DATA_RE = /\[LEAD_DATA:([^\]]+)\]/;

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: 'Salut! Sunt Nexi, din echipa Nexicore. Cu ce te pot ajuta?',
};


// ── AI Orb Icon (toggle button) ───────────────────────────────────────────────
function IconAIOrb() {
  return (
    <div style={{ position: 'relative', width: 58, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 58 58" fill="none" aria-hidden="true" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#02defc" stopOpacity="1" />
            <stop offset="55%"  stopColor="#02defc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#02defc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-sphere" cx="38%" cy="32%" r="60%">
            <stop offset="0%"   stopColor="rgba(2,222,252,0.18)" />
            <stop offset="100%" stopColor="rgba(2,222,252,0.02)" />
          </radialGradient>
          <filter id="orb-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* HUD corner brackets */}
        <path d="M2 12 L2 2 L12 2"   stroke="rgba(2,222,252,0.8)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 2 L56 2 L56 12" stroke="rgba(2,222,252,0.8)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 46 L2 56 L12 56" stroke="rgba(2,222,252,0.8)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 56 L56 56 L56 46" stroke="rgba(2,222,252,0.8)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Outer dashed halo */}
        <circle cx="29" cy="29" r="26" stroke="rgba(2,222,252,0.08)" strokeWidth="0.6" strokeDasharray="5 3" />

        {/* Ring 1 — horizontal, clockwise, cyan */}
        <g>
          <ellipse cx="29" cy="29" rx="22" ry="6" stroke="rgba(2,222,252,0.5)" strokeWidth="1.1" strokeDasharray="3.5 2" fill="none" />
          <circle cx="51" cy="29" r="2.5" fill="#02defc" filter="url(#dot-glow)" />
          <animateTransform attributeName="transform" type="rotate" from="0 29 29" to="360 29 29" dur="5s" repeatCount="indefinite" />
        </g>

        {/* Ring 2 — tilted 62°, counter-clockwise, lime */}
        <g transform="rotate(62 29 29)">
          <g>
            <ellipse cx="29" cy="29" rx="20" ry="5.5" stroke="rgba(127,254,0,0.45)" strokeWidth="0.9" strokeDasharray="2.5 3" fill="none" />
            <circle cx="49" cy="29" r="2" fill="#7ffe00" filter="url(#dot-glow)" />
            <animateTransform attributeName="transform" type="rotate" from="0 29 29" to="-360 29 29" dur="8s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Ring 3 — tilted -62°, clockwise, orange */}
        <g transform="rotate(-62 29 29)">
          <g>
            <ellipse cx="29" cy="29" rx="17" ry="4.5" stroke="rgba(244,115,25,0.35)" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />
            <circle cx="46" cy="29" r="1.7" fill="#f47319" filter="url(#dot-glow)" />
            <animateTransform attributeName="transform" type="rotate" from="0 29 29" to="360 29 29" dur="12s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Sphere shell */}
        <circle cx="29" cy="29" r="11" fill="url(#orb-sphere)" stroke="rgba(2,222,252,0.55)" strokeWidth="1.1" filter="url(#orb-glow)" />

        {/* Sphere crosshairs */}
        <line x1="18" y1="29" x2="40" y2="29" stroke="rgba(2,222,252,0.22)" strokeWidth="0.6" />
        <line x1="29" y1="18" x2="29" y2="40" stroke="rgba(2,222,252,0.22)" strokeWidth="0.6" />

        {/* Pulsing inner glow */}
        <circle cx="29" cy="29" r="7" fill="url(#orb-core)">
          <animate attributeName="r"       values="5;9;5"     dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* Core dot */}
        <circle cx="29" cy="29" r="3.8" fill="#02defc" filter="url(#orb-glow)">
          <animate attributeName="r"       values="3.2;4.6;3.2" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.6;1"      dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* Scanning line */}
        <line x1="18" y1="29" x2="40" y2="29" stroke="rgba(2,222,252,0.55)" strokeWidth="0.7">
          <animateTransform attributeName="transform" type="rotate" from="0 29 29" to="360 29 29" dur="3s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

// ── Robot Avatar Icon (chat header) ──────────────────────────────────────────
function IconRobot({ uid = 'a' }: { uid?: string }) {
  const gradId = `rb-grad-${uid}`;
  const glowId = `rb-glow-${uid}`;
  const clipId = `rb-clip-${uid}`;

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#02defc" />
          <stop offset="100%" stopColor="#7ffe00" />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={clipId}>
          <rect x="5" y="9" width="22" height="17" rx="3" />
        </clipPath>
      </defs>
      <rect x="15" y="5.5" width="2" height="3.5" rx="1" fill="#02defc" opacity="0.75" />
      <circle cx="16" cy="4.5" r="2" fill="#02defc" filter={`url(#${glowId})`}>
        <animate attributeName="r"       values="1.5;2.5;1.5" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.25;1"    dur="1.8s" repeatCount="indefinite" />
      </circle>
      <rect x="5" y="9" width="22" height="17" rx="3"
        stroke={`url(#${gradId})`} strokeWidth="1.3"
        fill="rgba(2,222,252,0.04)" filter={`url(#${glowId})`} />
      <line x1="8" y1="12.5" x2="24" y2="12.5" stroke="#02defc" strokeWidth="0.5" opacity="0.22" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="5" y="9" width="22" height="1.4" fill="#02defc" opacity="0.38">
          <animateTransform attributeName="transform" type="translate"
            values="0,0;0,16;0,0" dur="3s" calcMode="linear" repeatCount="indefinite" />
        </rect>
      </g>
      <rect x="8" y="14" width="6" height="4" rx="1.2" fill="#02defc" filter={`url(#${glowId})`}>
        <animate attributeName="opacity" values="0.95;0.95;0.08;0.95;0.95"
          keyTimes="0;0.44;0.5;0.56;1" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="8" y="14" width="2" height="4" rx="0.6" fill="rgba(255,255,255,0.22)" />
      <rect x="18" y="14" width="6" height="4" rx="1.2" fill="#02defc" filter={`url(#${glowId})`}>
        <animate attributeName="opacity" values="0.95;0.95;0.08;0.95;0.95"
          keyTimes="0;0.44;0.5;0.56;1" dur="5s" begin="0.18s" repeatCount="indefinite" />
      </rect>
      <rect x="18" y="14" width="2" height="4" rx="0.6" fill="rgba(255,255,255,0.22)" />

      {/* ── Mouth – segmented LED bars ── */}
      <rect x="9"    y="21.5" width="4" height="1.8" rx="0.5" fill="#7ffe00" opacity="0.9" />
      <rect x="14"   y="21.5" width="4" height="1.8" rx="0.5" fill="#7ffe00" opacity="0.65">
        <animate attributeName="opacity" values="0.65;1;0.65" dur="0.95s" repeatCount="indefinite" />
      </rect>
      <rect x="19"   y="21.5" width="4" height="1.8" rx="0.5" fill="#7ffe00" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.85;0.35" dur="0.95s" begin="0.48s" repeatCount="indefinite" />
      </rect>

      {/* ── Left ear connector ── */}
      <rect x="2" y="14" width="3" height="6" rx="1"
        stroke="#02defc" strokeWidth="1" fill="rgba(2,222,252,0.04)" opacity="0.75" />
      <circle cx="3.5" cy="17" r="0.8" fill="#02defc" opacity="0.55" />

      {/* ── Right ear connector ── */}
      <rect x="27" y="14" width="3" height="6" rx="1"
        stroke="#02defc" strokeWidth="1" fill="rgba(2,222,252,0.04)" opacity="0.75" />
      <circle cx="28.5" cy="17" r="0.8" fill="#02defc" opacity="0.55" />
    </svg>
  );
}

// ── Other Icons ───────────────────────────────────────────────────────────────
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Restore from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // ── Persist messages to localStorage ───────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // storage might be full
    }
  }, [messages]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Focus input after open animation ─────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Send message ──────────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setChatError('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }));

      const rawReply = await sendMessage(history);

      const leadMatch = rawReply.match(LEAD_DATA_RE);
      const cleanReply = rawReply.replace(LEAD_DATA_RE, '').trim();

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanReply,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (leadMatch) {
        const pairs: Record<string, string> = {};
        leadMatch[1].split('|').forEach((pair) => {
          const idx = pair.indexOf('=');
          if (idx !== -1) {
            pairs[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
          }
        });
        try {
          const excerpt = [...messages, userMsg, assistantMsg]
            .slice(-8)
            .map(({ role, content }) => ({ role, content }));
          const result = await submitLead({
            name: pairs.name || '',
            company: pairs.company || '',
            email: pairs.email || '',
            phone: pairs.phone || '',
            gdprConsent: true,
            conversationExcerpt: excerpt,
          });
          if (result.whatsappLink) setWhatsappLink(result.whatsappLink);
        } catch {
          // silent — confirmation message already shown to user
        }
      }
    } catch (err) {
      setChatError((err as Error).message || 'A apărut o eroare. Vă rugăm încercați din nou.');
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputValue, isLoading, messages]);

  // ── Enter key to send ──────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Toggle Button */}
      <button
        className={`chat-toggle${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Închide chat' : 'Deschide chat'}
        aria-expanded={isOpen}
      >
        <span className="chat-toggle-robot-icon"><IconRobot uid="toggle" /></span>
      </button>

      {/* Chat Panel */}
      <div
        className={`chat-panel${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Chat Nexicore AI"
        aria-modal="true"
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar" aria-hidden="true">
            <IconRobot uid="header" />
          </div>
          <div className="chat-header-info">
            <div className="chat-header-name">Nexi</div>
            <div className="chat-header-status">
              <span className="chat-online-dot" aria-hidden="true" />
              Online • răspunde instant
            </div>
          </div>
          <button
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Închide chat"
          >
            <IconClose />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" aria-live="polite" aria-label="Conversație">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.role}`}>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}


          {isLoading && (
            <div className="chat-typing" aria-label="AI scrie...">
              <span /><span /><span />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {chatError && (
          <div className="chat-error" role="alert">{chatError}</div>
        )}

        {/* WhatsApp CTA */}
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-whatsapp-btn"
          >
            <IconWhatsApp />
            Continuați pe WhatsApp
          </a>
        )}

        {/* Input Area */}
        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Scrieți un mesaj..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            aria-label="Câmp mesaj"
          />
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Trimite mesaj"
          >
            <IconSend />
          </button>
        </div>

        <div className="chat-powered-by">Asistent AI • Nexicore</div>
      </div>
    </>
  );
}
