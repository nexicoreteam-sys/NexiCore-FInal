/**
 * Client-side fetch wrappers — no SDK imports, no secrets.
 * All actual API keys live server-side in /app/api/*.
 */

/**
 * Send a message to the chat proxy endpoint.
 */
export async function sendMessage(messages: Array<{ role: string; content: string }>): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || `Chat request failed (${res.status})`);
  }

  const data = await res.json();
  return (data as { reply: string }).reply;
}

/**
 * Submit a qualified lead to the notification endpoint.
 */
export async function submitLead(leadData: {
  name: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
  conversationExcerpt: Array<{ role: string; content: string }>;
}): Promise<{ success: boolean; whatsappLink?: string }> {
  const res = await fetch('/api/send-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || `Lead submission failed (${res.status})`);
  }

  return res.json();
}
