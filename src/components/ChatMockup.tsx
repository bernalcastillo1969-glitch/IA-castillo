import { useEffect, useState } from "react";
import { Brain, User, Mic, Image, Send } from "lucide-react";

const CONVERSATION = [
  { role: "user", text: "Analiza esta foto de mi cuaderno de química 📷", delay: 0 },
  {
    role: "ai",
    text: "¡Claro! Veo la ecuación de equilibrio:\nCH₄ + 2O₂ → CO₂ + 2H₂O\n\nEsta es la combustión completa del metano. La entalpía estándar es **−890 kJ/mol**. ¿Quieres que calcule la masa de CO₂ producida?",
    delay: 1200,
  },
  { role: "user", text: "Sí, si quemo 32g de metano", delay: 2800 },
  {
    role: "ai",
    text: "32g de CH₄ = **2 moles** (M = 16 g/mol)\n\nReacción: 1 mol CH₄ → 1 mol CO₂\n➜ 2 moles CH₄ → **2 moles CO₂ = 88g de CO₂**\n\n¿Necesitas la energía liberada también? ⚡",
    delay: 4200,
  },
];

export default function ChatMockup() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const startConversation = () => {
      setVisible([]);
      setTyping(false);
      
      CONVERSATION.forEach((msg, i) => {
        if (msg.role === "ai") {
          timers.push(
            setTimeout(() => {
              if (!cancelled) setTyping(true);
            }, msg.delay - 600)
          );
        }
        timers.push(
          setTimeout(() => {
            if (!cancelled) {
              setTyping(false);
              setVisible((v) => [...v, i]);
            }
          }, msg.delay)
        );
      });

      // Loop
      const total = CONVERSATION[CONVERSATION.length - 1].delay + 3500;
      timers.push(
        setTimeout(() => {
          if (!cancelled) startConversation();
        }, total)
      );
    };

    startConversation();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-purple-300 font-bold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a1a] shadow-2xl shadow-purple-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.03]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
          <Brain size={15} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-black text-white">IA Castillo</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400">En línea · Gemini Flash activo</span>
          </div>
        </div>
        <div className="flex gap-2">
            <Mic size={12} className="text-white/30" />
            <Image size={12} className="text-white/30" />
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-hidden flex flex-col justify-end px-4 py-4 gap-3 bg-[#030308]/50">
        {CONVERSATION.slice(0, visible.length === 0 ? 0 : Math.max(...visible) + 1).map((msg, i) => {
          if (!visible.includes(i)) return null;
          return (
            <div
              key={i}
              className={`flex gap-2 items-end animate-in fade-in slide-in-from-bottom-2 duration-400 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "ai"
                    ? "bg-gradient-to-br from-purple-500 to-cyan-400"
                    : "bg-white/10"
                }`}
              >
                {msg.role === "ai" ? (
                  <Brain size={11} className="text-white" />
                ) : (
                  <User size={11} className="text-white/60" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === "ai"
                    ? "bg-white/[0.06] border border-white/[0.08] text-white/80 rounded-bl-sm"
                    : "bg-gradient-to-br from-purple-600/70 to-violet-600/70 text-white rounded-br-sm"
                }`}
              >
                {formatText(msg.text)}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-2 items-end animate-in fade-in duration-300">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <Brain size={11} className="text-white" />
            </div>
            <div className="px-3.5 py-3 rounded-2xl rounded-bl-sm bg-white/[0.06] border border-white/[0.08] flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 bg-white/[0.02]">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <span className="flex-1 text-xs text-white/20">Analiza esta foto...</span>
          <div className="flex gap-1.5">
            <Send size={11} className="text-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
