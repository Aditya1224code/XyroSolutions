import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, ChevronLeft, Moon, Send, Sparkles, SunMedium, Trash2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useContent } from '../hooks/useContent';

type ChatMessage = {
  role: 'assistant' | 'user';
  text: string;
};

const publicWhatsAppNumber = '+91 91231 08081';

function createReply(question: string, email: string, location: string) {
  const normalized = question.toLowerCase().trim();

  const sensitiveKeywords = [
    'password',
    'passcode',
    'token',
    'api key',
    'secret',
    'admin',
    'admin portal',
    'login credentials',
    'credential',
    'otp',
    'private key',
    'database',
    'server password',
    'ssh',
  ];

  if (sensitiveKeywords.some((keyword) => normalized.includes(keyword))) {
    return "I can’t help with passwords, admin access, private credentials, or secret system details. I can answer public questions like contact info, services, process, or how to reach us.";
  }

  if (/^(hi|hello|hey|help)\b/.test(normalized)) {
    return 'Hi, I’m doing well. I can also answer public questions about XyroSolutions: email, WhatsApp, services, process, location, and how the website works.';
  }

  if (normalized.includes('how are you') || normalized.includes('how are u') || normalized.includes('how r you')) {
    return 'I’m doing well, thanks for asking. I can help with XyroSolutions website questions too, like our email, WhatsApp, services, process, location, and how the site works.';
  }

  if (normalized.includes('email') || normalized.includes('mail')) {
    return `Our public email is ${email}.`;
  }

  if (normalized.includes('whatsapp') || normalized.includes('whats app') || normalized.includes('wa')) {
    return `Our WhatsApp number is ${publicWhatsAppNumber}.`;
  }

  if (normalized.includes('phone') || normalized.includes('call') || normalized.includes('contact number')) {
    return `The public WhatsApp contact number is ${publicWhatsAppNumber}.`;
  }

  if (normalized.includes('location') || normalized.includes('where are you') || normalized.includes('based')) {
    return `We’re based everywhere / ${location}.`;
  }

  if (normalized.includes('service') || normalized.includes('what do you do') || normalized.includes('what can you do')) {
    return 'We design and develop brand systems, web platforms, portfolio sites, campaigns, and automation-focused digital experiences for growing businesses.';
  }

  if (normalized.includes('web') || normalized.includes('website') || normalized.includes('site') || normalized.includes('page')) {
    return 'This website shows our hero section, about section, portfolio, process, results, blog, and contact area. You can ask about any section or how to reach us.';
  }

  if (normalized.includes('how do you work') || normalized.includes('process') || normalized.includes('workflow')) {
    return 'Our process is simple: Discover, Design, Deliver. We start by understanding the goal, then design the solution, and finally build and hand it over cleanly.';
  }

  if (normalized.includes('about') || normalized.includes('who are you') || normalized.includes('who we are')) {
    return 'XyroSolutions is a creative agency focused on brand identity, web design, and digital campaigns for ambitious startups and growing businesses.';
  }

  if (normalized.includes('pricing') || normalized.includes('cost') || normalized.includes('budget')) {
    return 'Pricing depends on the scope, timeline, and features. Send us a short brief and we’ll respond with the best next step.';
  }

  if (normalized.includes('social') || normalized.includes('instagram') || normalized.includes('facebook')) {
    return 'You can find us on Instagram from the contact section. If you want, I can also help summarize the best way to reach us.';
  }

  return 'I can help with public questions about XyroSolutions, including email, WhatsApp, services, process, location, pricing, who we are, and how this website works. Try asking a more specific question and I’ll answer in a simple way.';
}

export default function XyroAiPage({ onBack }: { onBack: () => void }) {
  const { content } = useContent();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [question, setQuestion] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Good morning, how can I help you today? Ask me about our email, WhatsApp, services, process, or how the website works.'
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const suggestions = useMemo(
    () => [
      'What is your email?',
      'What is your WhatsApp number?',
      'How do you work?',
      'What services do you offer?',
      'Who are you?',
      'Where are you based?'
    ],
    []
  );

  const sendQuestion = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const reply = createReply(trimmed, content.contact.email, content.contact.location);

    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: reply }
    ]);
    setQuestion('');
  };

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(184,255,61,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.08),_transparent_24%),linear-gradient(135deg,_#F6F9F1_0%,_#EEF3EE_42%,_#ECF2F8_100%)] text-dark dark:bg-[radial-gradient(circle_at_top_left,_rgba(184,255,61,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_24%),linear-gradient(135deg,_#050608_0%,_#09111D_45%,_#111827_100%)] dark:text-white">
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-70">
        <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-lime/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-2.5 py-2.5 sm:px-4 sm:py-4">
        <header className="mb-3.5 flex items-center justify-between gap-1.5 rounded-[1.35rem] border border-black/5 bg-white/70 px-2.5 py-2 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-1.5 py-1 text-[10px] font-medium text-dark transition-all hover:-translate-y-0.5 hover:border-lime/40 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-lime/40 sm:px-2.5 sm:py-1.5 sm:text-xs"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-lime/25 via-cyan-200/30 to-sky-200/30 text-lime ring-1 ring-lime/20 shadow-sm dark:from-lime/20 dark:via-cyan-500/20 dark:to-blue-500/15">
              <Bot size={15} />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-gray-custom uppercase dark:text-slate-400">Xyro AI</p>
              <p className="text-[11px] font-semibold text-dark dark:text-white sm:text-sm">Public answers only</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-1.5 py-1 text-[10px] font-medium text-dark transition-all hover:-translate-y-0.5 hover:border-lime/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-lime/40 sm:px-2.5 sm:py-1.5 sm:text-xs"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            disabled={!mounted}
          >
            {mounted ? isDark ? <SunMedium size={12} /> : <Moon size={12} /> : <span className="h-3 w-3" />}
            Theme
          </button>
        </header>

        <main className="flex flex-1">
          <section className="flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-black/5 bg-white/50 shadow-[0_22px_52px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_22px_52px_rgba(0,0,0,0.35)]">
            <div className="border-b border-black/5 bg-gradient-to-r from-white/80 via-white/60 to-transparent px-3 py-3 dark:border-white/10 dark:from-white/8 dark:via-white/5 dark:to-transparent sm:px-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-lime uppercase">Ask Xyro AI</p>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendQuestion(suggestion)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/68 px-1.5 py-1 text-[9px] font-medium text-dark transition-all hover:-translate-y-0.5 hover:border-lime/40 dark:border-white/10 dark:bg-white/5 dark:text-white sm:px-2.5 sm:py-1.5 sm:text-[11px]"
                  >
                    <Sparkles size={10} className="text-lime" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-2.5 px-3 py-3 max-h-[58vh] overflow-y-auto sm:px-4 sm:py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[92%] rounded-[1.35rem] px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-lime to-cyan-200 text-dark'
                        : 'border border-black/5 bg-white/85 text-dark dark:border-white/10 dark:bg-white/8 dark:text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              className="border-t border-black/5 p-2.25 sm:p-4 dark:border-white/10"
              onSubmit={(event) => {
                event.preventDefault();
                sendQuestion(question);
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex-1 rounded-[1.15rem] border border-black/10 bg-white/82 px-3 py-2.25 focus-within:border-lime/40 dark:border-white/10 dark:bg-white/5 sm:px-4 sm:py-3">
                  <label htmlFor="xyro-ai-question" className="sr-only">
                    Ask a public question
                  </label>
                  <input
                    id="xyro-ai-question"
                    type="text"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask about email, WhatsApp, services, or process"
                    className="w-full bg-transparent text-[13px] leading-6 text-dark outline-none placeholder:text-gray-custom/70 dark:text-white dark:placeholder:text-slate-400"
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        sendQuestion(question);
                      }
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-[0.85rem] bg-gradient-to-r from-slate-700 via-emerald-500 to-cyan-500 px-2 py-1.25 text-[9px] font-semibold text-white shadow-[0_8px_18px_rgba(15,23,42,0.14)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(34,211,238,0.14)] sm:px-3 sm:py-1.75 sm:text-[11px]"
                  >
                    <Send size={12} />
                    Ask Xyro AI
                  </button>

                  <button
                    type="button"
                    onClick={() => setMessages([{ role: 'assistant', text: 'Good morning, how can I help you today? Ask me about our website, services, or contact details.' }])}
                    className="inline-flex items-center justify-center gap-1.5 rounded-[0.85rem] border border-black/10 bg-white/75 px-2 py-1.25 text-[9px] font-medium text-dark transition-colors hover:border-lime/40 dark:border-white/10 dark:bg-white/5 dark:text-white sm:px-3 sm:py-1.75 sm:text-[11px]"
                  >
                    <Trash2 size={12} />
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
