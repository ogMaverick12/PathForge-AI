import { NextResponse } from 'next/server';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const systemPrompt = `You are the PathForge AI Follow-up Engine, an elite career counselor and strategist.
Your goal is to answer user follow-up questions regarding their career paths, failures, and risks.
Always maintain an authoritative, analytical, and supportive tone.
Base your advice on the following context, which contains the user's profile and their generated career paths:

--- USER CONTEXT ---
${JSON.stringify(context, null, 2)}
--------------------

Keep your responses concise, actionable, and formatted in clean markdown.`;

    const apiKey = process.env.NVIDIA_API_KEY;
    
    if (!apiKey || apiKey === 'dummy_key') {
      // No API key — return a flag so client uses fallback reasoning
      return NextResponse.json({ 
        text: null, 
        useFallback: true,
        reason: 'No NVIDIA API key configured. Using client-side reasoning.'
      });
    }

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NVIDIA API Error:', response.status, errorText);
      // Return fallback flag instead of 500
      return NextResponse.json({ 
        text: null, 
        useFallback: true,
        reason: `API error ${response.status}. Using client-side reasoning.`
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'No response generated.';
    
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Chat API Error:', error);
    // Return fallback flag instead of crashing
    return NextResponse.json({ 
      text: null, 
      useFallback: true,
      reason: 'Connection error. Using client-side reasoning.'
    });
  }
}
