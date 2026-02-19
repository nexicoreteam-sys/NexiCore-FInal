import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation helpers
const NAME_RE = /^[a-zA-ZÀ-ž\s\-']+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RO_RE = /^(\+40|0)[0-9]{8,9}$/;
const PHONE_INTL_RE = /^\+[1-9][0-9]{7,14}$/;

function validateName(name: unknown): string | null {
  if (typeof name !== 'string') return 'Name is required.';
  const t = name.trim();
  if (t.length < 2 || t.length > 100) return 'Name must be 2–100 characters.';
  if (!NAME_RE.test(t)) return 'Name contains invalid characters.';
  return null;
}

function validateEmail(email: unknown): string | null {
  if (typeof email !== 'string') return 'Email is required.';
  const t = email.trim();
  if (t.length > 254) return 'Email is too long.';
  if (!EMAIL_RE.test(t)) return 'Please enter a valid email address.';
  return null;
}

function validatePhone(phone: unknown): string | null {
  if (typeof phone !== 'string') return 'Phone is required.';
  const t = phone.trim();
  if (!PHONE_RO_RE.test(t) && !PHONE_INTL_RE.test(t)) {
    return 'Enter a valid phone number (Romanian or international).';
  }
  return null;
}

function stripHtml(str: string): string {
  return typeof str === 'string' ? str.replace(/<[^>]*>/g, '') : '';
}

function buildEmailHtml({
  name,
  email,
  phone,
  conversationExcerpt,
}: {
  name: string;
  email: string;
  phone: string;
  conversationExcerpt: Array<{ role: string; content: string }>;
}): string {
  const safeConversation = Array.isArray(conversationExcerpt)
    ? conversationExcerpt
        .slice(-6)
        .map((m) => {
          const role = m.role === 'user' ? 'Client' : 'Nexicore AI';
          const content = stripHtml(String(m.content || '')).slice(0, 500);
          return `<tr>
            <td style="padding:8px 12px;font-weight:600;color:${m.role === 'user' ? '#9b7bff' : '#aaa'};white-space:nowrap;vertical-align:top;">${role}</td>
            <td style="padding:8px 12px;color:#e0e0e0;">${content}</td>
          </tr>`;
        })
        .join('')
    : '';

  const timestamp = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

  return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"><title>New Lead — Nexicore</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#12121a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6c47ff,#9b7bff);padding:28px 32px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New Lead from Chat Widget</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${timestamp}</p>
          </td>
        </tr>
        <!-- Lead details -->
        <tr>
          <td style="padding:28px 32px;">
            <h2 style="margin:0 0 16px;color:#fff;font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Contact Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
              <tr style="background:rgba(255,255,255,0.03);">
                <td style="padding:10px 16px;color:#888;width:100px;">Name</td>
                <td style="padding:10px 16px;color:#fff;font-weight:600;">${stripHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#888;">Email</td>
                <td style="padding:10px 16px;"><a href="mailto:${stripHtml(email)}" style="color:#9b7bff;text-decoration:none;">${stripHtml(email)}</a></td>
              </tr>
              <tr style="background:rgba(255,255,255,0.03);">
                <td style="padding:10px 16px;color:#888;">Phone</td>
                <td style="padding:10px 16px;"><a href="tel:${stripHtml(phone)}" style="color:#9b7bff;text-decoration:none;">${stripHtml(phone)}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#888;">GDPR</td>
                <td style="padding:10px 16px;color:#4ade80;">✓ Consented</td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Conversation excerpt -->
        ${
          safeConversation
            ? `<tr>
          <td style="padding:0 32px 28px;">
            <h2 style="margin:0 0 16px;color:#fff;font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">Conversation Excerpt</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;background:rgba(0,0,0,0.3);">
              ${safeConversation}
            </table>
          </td>
        </tr>`
            : ''
        }
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px;" align="center">
            <a href="mailto:${stripHtml(email)}?subject=Re: Your inquiry at Nexicore"
               style="display:inline-block;background:linear-gradient(135deg,#6c47ff,#9b7bff);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
              Reply to Lead →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;color:#555;font-size:12px;">
            Nexicore AI Chat Widget · nexicore.vercel.app
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
  }

  const body = await request.json().catch(() => ({}));
  const { name, email, phone, gdprConsent, conversationExcerpt } = body as {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    gdprConsent?: unknown;
    conversationExcerpt?: unknown;
  };

  // Server-side validation
  const errors: Record<string, string> = {};
  const nameErr = validateName(name);
  const emailErr = validateEmail(email);
  const phoneErr = validatePhone(phone);

  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (phoneErr) errors.phone = phoneErr;
  if (gdprConsent !== true) errors.gdpr = 'GDPR consent is required.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 400 });
  }

  const trimmedName = (name as string).trim();
  const trimmedEmail = (email as string).trim();
  const trimmedPhone = (phone as string).trim();

  // Build WhatsApp deep link
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '40745292353';
  const waText = encodeURIComponent(
    `Salut! Am primit un lead nou prin chat-ul de pe site:\n\nNume: ${trimmedName}\nEmail: ${trimmedEmail}\nTelefon: ${trimmedPhone}\nData: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}`
  );
  const whatsappLink = `https://wa.me/${waNumber}?text=${waText}`;

  // Send email via Resend
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.LEAD_EMAIL_RECIPIENT || 'contact@nexicore.ro',
      subject: `New Lead: ${trimmedName} — Nexicore Chat`,
      html: buildEmailHtml({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        conversationExcerpt: Array.isArray(conversationExcerpt)
          ? (conversationExcerpt as Array<{ role: string; content: string }>)
          : [],
      }),
      replyTo: trimmedEmail,
    });
  } catch (err) {
    console.error('[send-lead] Resend error:', (err as Error)?.message || err);
    // Still return whatsappLink even if email fails
    return NextResponse.json({
      success: true,
      emailSent: false,
      whatsappLink,
      warning: 'Email delivery failed, but your details were received.',
    });
  }

  return NextResponse.json({ success: true, emailSent: true, whatsappLink });
}
