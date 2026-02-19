'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessage, submitLead } from '../lib/chat';
import '../styles/chat.css';

const SESSION_KEY = 'nexicore_chat_v1';
const LEAD_TOKEN = '[SHOW_LEAD_FORM]';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: 'Salut! Sunt Nexi, din echipa Nexicore. Cu ce te pot ajuta?',
};

// ── Validation (mirrors server rules) ────────────────────────────────────────
const NAME_RE = /^[a-zA-ZÀ-ž\s\-']+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RO_RE = /^(\+40|0)[0-9]{8,9}$/;
const PHONE_INTL_RE = /^\+[1-9][0-9]{7,14}$/;

function validateLead({ name, email, phone, gdprConsent }: {
  name: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
}) {
  const errors: Record<string, string> = {};
  const n = (name || '').trim();
  const e = (email || '').trim();
  const p = (phone || '').trim();

  if (n.length < 2 || n.length > 100 || !NAME_RE.test(n))
    errors.name = 'Introduceți un nume valid (2–100 caractere).';
  if (!EMAIL_RE.test(e) || e.length > 254)
    errors.email = 'Introduceți o adresă de email validă.';
  if (!PHONE_RO_RE.test(p) && !PHONE_INTL_RE.test(p))
    errors.phone = 'Introduceți un număr de telefon valid.';
  if (gdprConsent !== true)
    errors.gdpr = 'Acordul GDPR este obligatoriu.';

  return errors;
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

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

function IconNexicore() {
  return (
    <svg viewBox="0 0 44 44" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="nexi-lg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#02defc" />
          <stop offset="100%" stopColor="#7ffe00" />
        </linearGradient>
        <filter id="nexi-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g style={{ transformOrigin: '22px 22px', animation: 'nexi-spin 30s linear infinite' }}>
        <path d="M22 2 L42 22 L22 42 L2 22 Z" stroke="url(#nexi-lg)" strokeWidth="1.3" strokeLinejoin="miter" fill="none" opacity="0.8" />
        <circle cx="22" cy="2"  r="1.2" fill="#02defc" opacity="0.6" />
        <circle cx="42" cy="22" r="1.2" fill="#02defc" opacity="0.5" />
        <circle cx="22" cy="42" r="1.2" fill="#7ffe00" opacity="0.6" />
        <circle cx="2"  cy="22" r="1.2" fill="#7ffe00" opacity="0.5" />
      </g>
      <g style={{ transformOrigin: '22px 22px', animation: 'nexi-spin-reverse 24s linear infinite' }}>
        <path d="M22 10 L34 22 L22 34 L10 22 Z" stroke="url(#nexi-lg)" strokeWidth="0.7" strokeLinejoin="miter" fill="url(#nexi-lg)" fillOpacity="0.06" />
      </g>
      <path d="M22 16 L28 22 L22 28 L16 22 Z" stroke="url(#nexi-lg)" strokeWidth="0.8" fill="url(#nexi-lg)" fillOpacity="0.12" filter="url(#nexi-glow)">
        <animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" repeatCount="indefinite" />
      </path>
      <circle cx="22" cy="22" r="1.8" fill="url(#nexi-lg)">
        <animate attributeName="r" values="1.4;2.2;1.4" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', gdprConsent: false });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [chatError, setChatError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Restore from sessionStorage on mount ──────────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
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

  // ── Persist messages to sessionStorage ───────────────────────────────────
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // storage might be full
    }
  }, [messages]);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showLeadForm]);

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
      // Build history (exclude static welcome, send role/content only)
      const history = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }));

      const rawReply = await sendMessage(history);

      // Detect lead form trigger
      const hasToken = rawReply.includes(LEAD_TOKEN);
      const cleanReply = rawReply.replace(LEAD_TOKEN, '').trim();

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanReply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (hasToken) setShowLeadForm(true);
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

  // ── Lead form field change ─────────────────────────────────────────────────
  const handleLeadChange = (field: string, value: string | boolean) => {
    setLeadData((prev) => ({ ...prev, [field]: value }));
    if (leadErrors[field]) {
      setLeadErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // ── Lead form submit ───────────────────────────────────────────────────────
  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateLead(leadData);
    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    setIsSubmittingLead(true);
    setLeadErrors({});

    try {
      // Last 6 messages as conversation excerpt
      const excerpt = messages.slice(-6).map(({ role, content }) => ({ role, content }));

      const result = await submitLead({
        name: leadData.name.trim(),
        email: leadData.email.trim(),
        phone: leadData.phone.trim(),
        gdprConsent: true,
        conversationExcerpt: excerpt,
      });

      setLeadSubmitted(true);
      setShowLeadForm(false);

      if (result.whatsappLink) setWhatsappLink(result.whatsappLink);

      const confirmMsg = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          '✅ Mulțumim! Datele dumneavoastră au fost primite. Cineva din echipa Nexicore vă va contacta în cel mai scurt timp.',
      };
      setMessages((prev) => [...prev, confirmMsg]);
    } catch (err) {
      setLeadErrors({ submit: (err as Error).message || 'Eroare la trimitere. Încercați din nou.' });
    } finally {
      setIsSubmittingLead(false);
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
        {isOpen ? <IconClose /> : <IconChat />}
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
          <div className="chat-header-avatar" aria-hidden="true"><IconNexicore /></div>
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

          {showLeadForm && !leadSubmitted && (
            <form className="chat-lead-form" onSubmit={handleLeadSubmit} noValidate>
              <h3>Lăsați datele de contact</h3>

              <div className="chat-lead-field">
                <label htmlFor="lead-name">Nume *</label>
                <input
                  id="lead-name"
                  type="text"
                  placeholder="Ex: Ion Popescu"
                  value={leadData.name}
                  onChange={(e) => handleLeadChange('name', e.target.value)}
                  className={leadErrors.name ? 'error' : ''}
                  autoComplete="name"
                />
                {leadErrors.name && <span className="chat-field-error">{leadErrors.name}</span>}
              </div>

              <div className="chat-lead-field">
                <label htmlFor="lead-email">Email *</label>
                <input
                  id="lead-email"
                  type="email"
                  placeholder="Ex: ion@companie.ro"
                  value={leadData.email}
                  onChange={(e) => handleLeadChange('email', e.target.value)}
                  className={leadErrors.email ? 'error' : ''}
                  autoComplete="email"
                />
                {leadErrors.email && <span className="chat-field-error">{leadErrors.email}</span>}
              </div>

              <div className="chat-lead-field">
                <label htmlFor="lead-phone">Telefon *</label>
                <input
                  id="lead-phone"
                  type="tel"
                  placeholder="Ex: 0740 123 456"
                  value={leadData.phone}
                  onChange={(e) => handleLeadChange('phone', e.target.value)}
                  className={leadErrors.phone ? 'error' : ''}
                  autoComplete="tel"
                />
                {leadErrors.phone && <span className="chat-field-error">{leadErrors.phone}</span>}
              </div>

              <div className="chat-gdpr-row">
                <input
                  id="lead-gdpr"
                  type="checkbox"
                  checked={leadData.gdprConsent}
                  onChange={(e) => handleLeadChange('gdprConsent', e.target.checked)}
                />
                <label htmlFor="lead-gdpr">
                  Sunt de acord cu prelucrarea datelor personale conform GDPR.
                </label>
              </div>
              {leadErrors.gdpr && <span className="chat-field-error">{leadErrors.gdpr}</span>}
              {leadErrors.submit && <span className="chat-field-error">{leadErrors.submit}</span>}

              <button
                type="submit"
                className="chat-lead-submit"
                disabled={isSubmittingLead}
              >
                {isSubmittingLead ? 'Se trimite...' : 'Trimite datele →'}
              </button>
            </form>
          )}

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
