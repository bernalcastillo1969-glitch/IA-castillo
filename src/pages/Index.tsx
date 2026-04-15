import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import type { Variants } from "framer-motion";
import {
  Eye,
  Smartphone,
  Lock,
  Sparkles,
  Zap,
  Brain,
  Shield,
  Star,
  ChevronDown,
  Globe,
  MessageSquare,
  Volume2,
  History,
  Mic,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import Brain3D from "@/components/Brain3D";
import FloatingCube from "@/components/FloatingCube";
import AnimatedCounter from "@/components/AnimatedCounter";
import ChatMockup from "@/components/ChatMockup";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop",
  vision: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?w=600&q=80&auto=format&fit=crop",
  voice: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80&auto=format&fit=crop",
  pwa: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format&fit=crop",
  security: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop",
  chat: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600&q=80&auto=format&fit=crop",
  stack: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=800&q=80&auto=format&fit=crop",
};

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#030014] text-white overflow-x-hidden selection:bg-purple-500/30">
      {/* ── Background atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full bg-purple-700/15 blur-[140px]" />
        <div className="absolute top-[35%] right-[-8%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[20%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 backdrop-blur-xl bg-black/20 border-b border-white/[0.07]">
        <div className="flex items-center gap-3 font-heading">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Brain size={17} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tight">
            IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Castillo</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            Elite 2026
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50 font-medium tracking-wide">
          {["Arquitectura", "Características", "Seguridad"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/chat"
            className="hidden sm:flex group items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-black shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300"
          >
            ACCEDER <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})`, opacity: 0.05 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/60 via-transparent to-[#030014]" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-sm"
          >
            <Sparkles size={12} className="fill-purple-400" /> Sistema Desplegado · v2.2.1
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.95] tracking-tighter mb-8 max-w-5xl"
          >
            El asistente IA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
              más inteligente
            </span>
            <br />de 2026
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed mb-12 font-medium"
          >
            <strong className="text-white">IA Castillo</strong> es un ecosistema híbrido diseñado por{" "}
            <span className="text-purple-400">Bernal Castillo</span> para potenciar tu 
            estudio y creatividad con la potencia de Gemini y Groq.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center gap-5 mb-16"
          >
            <a href="/chat"
              className="group px-10 py-5 rounded-2xl bg-white text-black font-black text-lg shadow-2xl hover:bg-white/90 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              Probar Gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#architecture"
              className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Ver Arquitectura
            </a>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={scaleIn} className="w-full max-w-4xl relative">
            <div className="absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full" />
            <Brain3D />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { label: "Latencia", value: 100, suffix: "ms", sub: "Groq LPU", icon: <Zap size={18}/> },
              { label: "Motores", value: 3, suffix: "", sub: "Multimodal", icon: <Brain size={18}/> },
              { label: "Visión", value: 8, suffix: "K", sub: "Gemini Pro", icon: <Eye size={18}/> },
              { label: "Seguridad", value: 100, suffix: "%", sub: "Cifrado RLS", icon: <Shield size={18}/> },
            ].map((s, i) => (
              <div key={s.label} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
                <div className="text-purple-400 mb-3">{s.icon}</div>
                <div className="text-3xl font-black mb-1">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{s.label}</div>
                <div className="text-[9px] text-white/20 mt-1">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section id="architecture" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">Cerebro <span className="text-purple-400">Híbrido</span></h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Ruteo inteligente entre los modelos más avanzados del planeta.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Gemini Vision", icon: <Eye />, desc: "Análisis multimodal de alta precisión para fotos y documentos." },
              { title: "Groq Speed", icon: <Zap />, desc: "Inferencia en milisegundos para flujos de trabajo en tiempo real." },
              { title: "Smart Routing", icon: <Brain />, desc: "Selección automática del motor óptimo según tu consulta." },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-[32px] bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <ChatMockup />
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section id="caracteristicas" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2 p-10 rounded-[40px] bg-gradient-to-br from-purple-900/20 to-transparent border border-white/[0.08] flex flex-col justify-between min-h-[400px]">
              <div>
                <Sparkles className="text-purple-400 size-10 mb-6" />
                <h3 className="text-4xl font-black mb-4 leading-tight">Potencia<br />Multimodal</h3>
                <p className="text-white/50 text-lg">IA Castillo procesa audio, imagen y texto simultáneamente.</p>
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/60 text-white/50">VISION</div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/60 text-white/50">VOICE</div>
              </div>
            </div>

            <div className="p-10 rounded-[40px] bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center text-center">
              <History className="text-cyan-400 size-10 mb-6" />
              <h4 className="text-xl font-black mb-2">Memoria</h4>
              <p className="text-white/40 text-sm italic">"Tu contexto nunca se pierde."</p>
            </div>

            <div className="p-10 rounded-[40px] bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center text-center">
              <Smartphone className="text-fuchsia-400 size-10 mb-6" />
              <h4 className="text-xl font-black mb-2">PWA</h4>
              <p className="text-white/40 text-sm">Instalable en iOS y Android.</p>
            </div>

            <div className="md:col-span-4 p-12 rounded-[50px] bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                 <Lock className="text-emerald-400 size-12 mb-6" />
                 <h3 className="text-4xl font-black mb-6 tracking-tighter">Seguridad Inquebrantable</h3>
                 <p className="text-white/50 text-xl leading-relaxed">Protección de datos de nivel bancario con Supabase RLS y autenticación segura.</p>
               </div>
               <div className="flex gap-4">
                  <FloatingCube color="#8b5cf6" size={120} />
                  <FloatingCube color="#06b6d4" size={80} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 border-t border-white/[0.05] bg-black/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black">IC</div>
            <span className="text-2xl font-black tracking-tighter italic uppercase text-white">IA CASTILLO</span>
          </div>
          <p className="text-white/30 text-sm font-medium tracking-widest uppercase">
            © 2026 Bernal Castillo · Neural Architecture Premium
          </p>
        </div>
      </footer>
    </main>
  );
}
