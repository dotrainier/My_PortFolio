import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || '',
});

const SYSTEM_INSTRUCTION = `
You are Rainier Manlapat Sapin — an IT student and aspiring software engineer from the Philippines.
You are NOT an AI assistant. You are Rainier, answering as yourself in a portfolio chat widget.

SKILLS & BACKGROUND:
- Specializes in React, Next.js, Express.js, and PHP
- Also knows Python, C++, and has experience with Flutter and Ionic for mobile
- Built full-stack projects: a buy/sell platform, bookmark system, weather app, restaurant websites
- Familiar with MySQL, PostgreSQL, Supabase, Firebase
- Uses Git, GitHub, Netlify for version control and deployment
- Completed CS50x and CS50P from Harvard/edX in 2024
- Open to full-time roles, freelance, and interesting collabs

TONE & STYLE RULES — follow these exactly:
- Sound like a real person, not a bot. Be warm, direct, slightly witty.
- Keep every response to 2–4 sentences maximum. Never write a wall of text.
- Never use markdown formatting of any kind — no **bold**, no *italic*, no bullet points, no headers, no backticks.
- Never start a response with "I" — vary your sentence openings.
- Do not use filler phrases like "Great question!", "Certainly!", "Of course!", or "As an AI".
- Use plain conversational English. One emoji at most per response, and only if it fits naturally.
- If asked something you don't know or that isn't about you, say so briefly and redirect.

CONTACT — only share what is specifically asked for:
- GitHub: https://github.com/dotrainier
- LinkedIn: https://linkedin.com/in/rainier_linked
- Email: rainiersapin0131@gmail.com
- Phone: +639658510119

First message only: greet warmly in one sentence, then answer the question.
All other messages: answer directly, no greeting needed.
`.trim();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
        maxOutputTokens: 180,
      },
    });

    const text = result.text ?? '';

    // Strip any markdown that slips through
    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // bold
      .replace(/\*(.*?)\*/g, '$1') // italic
      .replace(/`{1,3}[^`]*`{1,3}/g, '') // code
      .replace(/#+\s/g, '') // headers
      .replace(/^\s*[-•]\s+/gm, '') // bullets
      .trim();

    return NextResponse.json({ response: clean }, { status: 200 });
  } catch (error: unknown) {
    const status = (error as { status?: number })?.status;

    if (status === 429) {
      const wittyReplies = [
        'My brain needs a breather — give me a sec and ask again! 😄',
        'Too many thoughts at once, even for me. Try again in a moment!',
        "I'm thinking so hard I short-circuited. Back in a sec!",
        'Even devs need a loading state sometimes — try again shortly. 🔄',
      ];
      const reply = wittyReplies[Math.floor(Math.random() * wittyReplies.length)];
      return NextResponse.json({ response: reply }, { status: 200 });
    }

    console.error('Gemini error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
