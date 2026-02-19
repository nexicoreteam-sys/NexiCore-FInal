import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { buildSystemPrompt } from '@/lib/context';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Module-scope rate limiter: max 20 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const limit = 20;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60_000);

function stripHtml(str: string): string {
  return typeof str === 'string' ? str.replace(/<[^>]*>/g, '') : '';
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
  }

  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const { messages } = body as { messages?: unknown };

  // Validate messages array
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages must be an array' }, { status: 400 });
  }

  // Validate each message shape
  const validRoles = ['user', 'assistant'];
  for (const msg of messages) {
    if (
      typeof msg !== 'object' ||
      msg === null ||
      !validRoles.includes((msg as { role?: string }).role ?? '') ||
      typeof (msg as { content?: string }).content !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }
  }

  // Cap history and sanitize
  const history = (messages as Array<{ role: string; content: string }>)
    .slice(-20)
    .map((msg) => ({ role: msg.role as 'user' | 'assistant', content: stripHtml(msg.content).slice(0, 4000) }));

  const sanitizedHistory: ChatCompletionMessageParam[] = history.filter((m) => m.content.trim().length > 0);

  try {
    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...sanitizedHistory,
      ],
    });

    const reply = response.choices[0]?.message?.content || '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] Groq error:', (err as Error)?.message || err);
    return NextResponse.json({ error: 'AI service temporarily unavailable.' }, { status: 500 });
  }
}
