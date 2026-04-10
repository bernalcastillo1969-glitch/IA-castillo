import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Eye,
  Smartphone,
  Sparkles,
  Zap,
  Brain,
  Shield,
  Mic,
  CheckCircle2,
  Cpu,
  User,
  Send,
  Database,
  Image as ImageIcon
} from "lucide-react";

/* ─────────────────────────────────────────
   ANIMATED COUNTER COMPONENT
───────────────────────────────────────── */
function AnimatedCounter({ to, duration = 2000, suffix = "", prefix = "" }: { to: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   CHAT MOCKUP COMPONENT
───────────────────────────────────────── */
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

function ChatMockup() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const startLoop = () => {
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

      const total = CONVERSATION[CONVERSATION.length - 1].delay + 3500;
      timers.push(
        setTimeout(() => {
          if (!cancelled) startLoop();
        }, total)
      );
    };

    startLoop();

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
    <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a1a] shadow-2xl shadow-purple-500/10 scale-90 md:scale-100">
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
            <ImageIcon size={12} className="text-white/30" />
        </div>
      </div>

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

      <div className="px-4 pb-4 bg-white/[0.02]">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <span className="flex-1 text-xs text-white/20">Analiza esta foto...</span>
          <div className="flex gap-1.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
              <Send size={11} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ORB 3D COMPONENT
───────────────────────────────────────── */
function Orb3D({ size = 200, colors = ["#7c3aed", "#06b6d4"], className = "" }: { size?: number; colors?: string[]; className?: string }) {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]}, #000)`,
        boxShadow: `0 0 ${size * 0.4}px ${colors[0]}50, inset 0 0 ${size * 0.3}px #ffffff15, 0 ${size * 0.1}px ${size * 0.3}px #00000080`,
        transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.35,
          height: size * 0.2,
          top: size * 0.1,
          left: size * 0.15,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 200deg, transparent 60%, ${colors[1]}40 80%, transparent 90%)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   CARD 3D COMPONENT
───────────────────────────────────────── */
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    setRot({ x: rx, y: ry });
  };
  const resetRot = () => setRot({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetRot}
      className={className}
      style={{
        transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: rot.x === 0 ? "transform 0.5s ease" : "transform 0.1s ease",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */

const AI_IMAGE = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80";
const NEURAL_IMAGE = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80";
const CHAT_IMAGE = "https://images.unsplash.com/photo-1655720035861-ba4fd21a598d?w=800&q=80";
const VOICE_IMAGE = "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 70, damping: 14 } },
};

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#030308] text-white overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#030308]" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-1/4 -left-1/4 w-full h-full bg-purple-700/20 blur-[120px] rounded-full" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-cyan-600/15 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-5 backdrop-blur-xl bg-black/30 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Brain size={20} className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tight">IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Castillo</span></span>
          <span className="hidden sm:block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 border border-purple-500/40 text-purple-300">v2.2.1</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/50 font-medium">
          {["Arquitectura", "Características", "Seguridad"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <a href="/chat" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-transform">
          Acceder
        </a>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center px-6 md:px-14 pt-20 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-20">
          <div className="text-center lg:text-left">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Élite Edition 2026 Operativo
            </motion.div>
            
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-black leading-tight mb-6">
              El asistente IA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400">más potente</span> <br />
              del mundo
            </motion.h1>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-white/50 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Cerebro híbrido diseñado por <strong className="text-white">Bernal Castillo</strong>. Visión 8K, velocidad supersónica y diseño de lujo.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="/chat" className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Probar Gratis <Sparkles size={18} />
              </a>
              <a href="#arquitectura" className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-colors">
                Ver Arquitectura
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
            <div className="relative z-10">
              <ChatMockup />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 blur-[80px] rounded-full z-0" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { to: 100, suffix: "ms", label: "Latencia máxima", icon: <Zap /> },
                { to: 3, suffix: " Motores", label: "IA Híbrida", icon: <Brain /> },
                { to: 5, suffix: " Funciones", label: "Multimodal", icon: <Cpu /> },
                { to: 100, suffix: "%", label: "Eficiencia Bernal", icon: <CheckCircle2 /> }
            ].map((s, i) => (
                <div key={i} className="text-center group">
                    <div className="text-purple-400 mb-3 flex justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div className="text-4xl font-black text-white mb-2">
                        <AnimatedCounter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest">{s.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="arquitectura" className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                  <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.3em]">Arquitectura Pro</span>
                  <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">Cerebro <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Híbrido</span></h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { title: "Gemini Flash 1.5", sub: "Cerebro Multimodal", desc: "Visión 8K superior y control de audio en tiempo real.", icon: <Eye />, color: "border-purple-500/20" },
                      { title: "Groq LPU", sub: "Velocidad Supersónica", desc: "Respuestas ultra rápidas (< 100ms) más veloces que la lectura humana.", icon: <Zap />, color: "border-cyan-500/20" },
                      { title: "Seguridad Bernal", sub: "Control Total", desc: "Google Login, OTP vía correo nativo y base en Supabase PostgreSQL.", icon: <Shield />, color: "border-violet-500/20" },
                      { title: "PWA Nativa", sub: "Multiplataforma", desc: "Instalable en cualquier dispositivo Android, iPhone o Windows.", icon: <Smartphone />, color: "border-emerald-500/20" },
                      { title: "Audio Pro", sub: "Modo Voz", desc: "Avatar inteligente estilo Alexa con procesamiento de voz nativo.", icon: <Mic />, color: "border-pink-500/20" },
                      { title: "Historial Mágico", sub: "Sincronización", desc: "Base de datos persistente; tus conversaciones están en todos lados.", icon: <Database />, color: "border-amber-500/20" }
                  ].map((item, i) => (
                      <Card3D key={i} className={`p-8 rounded-3xl border ${item.color} bg-white/[0.03] backdrop-blur-xl`}>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400 mb-6">{item.icon}</div>
                          <div className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-2">{item.sub}</div>
                          <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                      </Card3D>
                  ))}
              </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-black/40 text-center">
          <div className="font-black text-lg mb-4">IA CASTILLO</div>
          <p className="text-white/30 text-xs uppercase tracking-[0.4em]">Hecho con pasión por Bernal Castillo &copy; 2026</p>
      </footer>
    </main>
  );
}
