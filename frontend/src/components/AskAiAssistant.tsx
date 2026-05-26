import { useMemo, useState } from 'react';
import { Bot, MessageCircle, Send, Sparkles } from 'lucide-react';
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
    return "I can answer public questions about XyroSolutions: email, WhatsApp, services, process, location, and what we do. Try asking one of the suggestions below.";
  }

  if (normalized.includes('email') || normalized.includes('mail')) {
    return `Our public email is ${email}.`;
  }

  if (normalized.includes('whatsapp') || normalized.includes('whats app') || normalized.includes('wa')) {
    return `Our WhatsApp number is ${publicWhatsAppNumber}. You can also open it directly from the contact section.`;
  }

  if (normalized.includes('phone') || normalized.includes('call') || normalized.includes('contact number')) {
    return `The public WhatsApp contact number is ${publicWhatsAppNumber}. If you want a direct phone line added later, we can set that up too.`;
  }

  if (normalized.includes('location') || normalized.includes('where are you') || normalized.includes('based')) {
    return `We’re based everywhere / ${location}.`;
  }

  if (normalized.includes('service') || normalized.includes('what do you do') || normalized.includes('what can you do')) {
    return 'We design and develop brand systems, web platforms, portfolio sites, campaigns, and automation-focused digital experiences for growing businesses.';
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

  return 'I can help with public questions about XyroSolutions, including email, WhatsApp, services, process, location, pricing, and who we are. Ask something like “What is your email?” or “How do you work?”';
}

export default function AskAiAssistant() {
  const { content } = useContent();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Ask me about our email, WhatsApp, services, process, or how we work. I only answer public information.'
    }
  ]);

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

  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime/15 text-lime ring-1 ring-lime/20">
          <Bot size={20} />
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">Ask Xyro AI</p>
          <h3 className="mt-1 text-2xl font-display font-bold text-white">Public answers only</h3>
          <p className="mt-1 text-sm text-white/60 max-w-2xl">
            Ask about our contact details, services, workflow, or general information. Sensitive items like passwords, admin access, and private credentials are blocked.
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-lime text-dark'
                  : 'bg-[#0B0F14] text-white/90 border border-white/10'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => sendQuestion(suggestion)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 transition-colors hover:border-lime/30 hover:text-white"
          >
            <Sparkles size={12} className="text-lime" />
            {suggestion}
          </button>
        ))}
      </div>

      <form
        className="mt-5 flex flex-col gap-3 md:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          sendQuestion(question);
        }}
      >
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-lime/40">
          <label htmlFor="ask-ai-question" className="sr-only">
            Ask a public question
          </label>
          <input
            id="ask-ai-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about email, WhatsApp, services, or process"
            className="w-full bg-transparent text-white placeholder:text-white/35 outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-3 font-medium text-dark transition-transform hover:-translate-y-0.5"
        >
          <Send size={16} />
          Ask
        </button>
      </form>

      <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
        <MessageCircle size={14} />
        <span>Example: “How do we work?” or “What is your WhatsApp number?”</span>
      </div>
    </section>
  );
}
