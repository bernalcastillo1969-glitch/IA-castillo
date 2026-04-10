import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  Code2,
  Server,
  Database,
  GitBranch,
  CheckCircle2,
  ArrowRight,
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

// Unsplash image IDs — all AI/tech themed
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#04040f] text-white overflow-x-hidden">

      {/* ── Background atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full bg-purple-700/15 blur-[140px]" />
        <div className="absolute top-[35%] right-[-8%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[20%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 backdrop-blur-xl bg-black/20 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Brain size={17} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tight">
            IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Castillo</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <CheckCircle2 size={9} /> v2.2.1
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm text-white/55 font-medium">
          {[["#architecture","Arquitectura"],["#features","Características"],["#stack","Stack"],["#security","Seguridad"]].map(([href, label]) => (
            <a key={href.toString()} href={href.toString()} className="hover:text-white transition-colors duration-200">{label}</a>
          ))}
        </div>
        <a
          href="/chat"
          className="group flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300"
        >
          Acceder <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Parallax hero image */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.hero})`, opacity: 0.06 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04040f]/60 via-transparent to-[#04040f]" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-semibold backdrop-blur"
          >
            <Star size={13} className="fill-purple-400 text-purple-400" />
            Versión 2.2.1 · Elite Edition · 100% Operativo
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl lg:text-[88px] font-black leading-[1.05] tracking-tighter mb-7 max-w-5xl"
          >
            Bienvenido al <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">
              Mundo de la
            </span>
            <br />Inteligencia Artificial
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="max-w-2xl text-lg md:text-xl text-white/55 leading-relaxed mb-10"
          >
            <strong className="text-white">IA Castillo</strong> es un ecosistema de Inteligencia Artificial híbrido —
            con motores Gemini Flash y Groq LPU — diseñado por{" "}
            <em className="text-purple-300 not-italic font-semibold">Bernal Castillo</em>{" "}
            para estudio, productividad y creatividad sin límites.
          </motion.p>

          {/* CTAs */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <a href="/chat"
              className="group px-9 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-base shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles size={17} /> Probar Gratis Ahora
            </a>
            <a href="#architecture"
              className="px-8 py-4 rounded-full border border-white/15 text-white/65 font-semibold text-base hover:border-purple-500/50 hover:text-white hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
            >
              Explorar arquitectura <ChevronDown size={15} />
            </a>
          </motion.div>

          {/* 3D Brain */}
          <motion.div initial="hidden" animate="visible" variants={scaleIn} className="w-full">
            <Brain3D />
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
          >
            {[
              { label: "Motores IA", value: 2, sub: "Gemini + Groq", icon: <Brain size={18}/> },
              { label: "Latencia", to: 100, suffix: "ms", value: "<100ms", sub: "Groq LPU", icon: <Zap size={18}/> },
              { label: "Plataformas", value: "PWA", sub: "iOS · Android · PC", icon: <Smartphone size={18}/> },
              { label: "Estado", to: 100, suffix: "%", value: "100%", sub: "Operativo", icon: <CheckCircle2 size={18}/> },
            ].map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={6 + i * 0.3}
                className="flex flex-col items-center gap-1 p-5 rounded-2xl backdrop-blur-md bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="text-purple-400 mb-1">{s.icon}</div>
                <span className="text-xl font-black text-white">
                  {typeof s.to === 'number' ? <AnimatedCounter to={s.to} suffix={s.suffix} /> : s.value}
                </span>
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">{s.label}</span>
                <span className="text-[10px] text-white/25">{s.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-xs"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </motion.div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section id="architecture" className="relative z-10 py-28 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-purple-400 text-xs font-black tracking-[0.2em] uppercase">Arquitectura</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Cerebro Híbrido</h2>
            <p className="text-white/45 max-w-lg mx-auto text-base">
              Fábrica de IA con protocolo de ruteo automático — el motor correcto en milisegundos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Eye size={26} />,
                title: "Google Gemini Flash 1.5",
                subtitle: "Motor Multimodal",
                desc: "El cerebro principal para visión. Analiza fotos de cuadernos, documentos, pizarras y archivos de audio con precisión 8K.",
                color: "from-purple-600/20 to-purple-900/10",
                border: "border-purple-500/25 hover:border-purple-400/50",
                iconBg: "bg-purple-500/15 text-purple-400",
                badge: "Imágenes · Audio · PDFs",
              },
              {
                icon: <Zap size={26} />,
                title: "Groq LPU Supersonic",
                subtitle: "Motor de Velocidad",
                desc: "Respuestas de texto en menos de 100ms — más rápido que la lectura humana. Conversaciones fluidas sin esperas.",
                color: "from-cyan-600/20 to-cyan-900/10",
                border: "border-cyan-500/25 hover:border-cyan-400/50",
                iconBg: "bg-cyan-500/15 text-cyan-400",
                badge: "< 100ms latencia",
              },
              {
                icon: <GitBranch size={26} />,
                title: "Ruteo Automático",
                subtitle: "Protocolo Inteligente",
                desc: "El sistema detecta si enviaste imagen, voz o texto y selecciona el motor óptimo en milisegundos — sin configuración manual.",
                color: "from-violet-600/20 to-violet-900/10",
                border: "border-violet-500/25 hover:border-violet-400/50",
                iconBg: "bg-violet-500/15 text-violet-400",
                badge: "Detección automática",
              },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className={`relative p-7 rounded-3xl bg-gradient-to-b ${item.color} border ${item.border} transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-1">{item.subtitle}</div>
                <h3 className="text-lg font-black mb-3 leading-tight">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/40 font-semibold">
                  {item.badge}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Architecture diagram visual */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] flex items-center justify-center py-12"
          >
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.vision})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04040f] via-transparent to-[#04040f]" />
            <div className="relative z-10 flex items-center gap-6 flex-wrap justify-center px-6">
                {[
                  { label: "Usuario", color: "border-purple-500/50 bg-purple-500/10 text-purple-300" },
                  { label: "→", color: "text-white/20 border-transparent bg-transparent text-2xl font-light" },
                  { label: "Ruteo IA", color: "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" },
                  { label: "→", color: "text-white/20 border-transparent bg-transparent text-2xl font-light" },
                  { label: "Gemini Flash", color: "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-300" },
                  { label: "/", color: "text-white/20 border-transparent bg-transparent text-2xl font-light" },
                  { label: "Groq LPU", color: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" },
                  { label: "→", color: "text-white/20 border-transparent bg-transparent text-2xl font-light" },
                  { label: "Respuesta", color: "border-violet-500/50 bg-violet-500/10 text-violet-300" },
                ].map((node, i) => (
                  <div key={i} className={`px-4 py-2 rounded-xl border text-sm font-bold ${node.color}`}>
                    {node.label}
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 py-28 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-cyan-400 text-xs font-black tracking-[0.2em] uppercase">Capacidades</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Todo en uno</h2>
            <p className="text-white/45 max-w-lg mx-auto">El ecosistema completo para estudio, trabajo y creatividad.</p>
          </motion.div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] group min-h-[280px]">
                <img src={IMG.vision} alt="Visión IA" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040f] via-[#04040f]/60 to-transparent" />
                <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <Eye size={22} />
                  </div>
                  <h3 className="text-xl font-black mb-2">Visión 8K</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    Analiza fotos de cuadernos, pizarrones, documentos manuscritos y gráficos complejos. Gemini "ve" y entiende tu tarea.
                  </p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] group min-h-[280px]">
                <img src={IMG.voice} alt="Voz IA" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04040f] via-[#04040f]/60 to-transparent" />
                <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                    <Mic size={22} />
                  </div>
                  <h3 className="text-xl font-black mb-2">Voz Humanoide + Audio Pro</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    Avatar animado estilo Alexa, grabación de notas de voz y síntesis TTS de alta fidelidad para leer respuestas en voz alta.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  img: IMG.pwa,
                  icon: <Smartphone size={20} />,
                  iconColor: "bg-violet-500/20 text-violet-400",
                  title: "PWA Nativa",
                  desc: "Instala IA Castillo en Android, iPhone o PC. Iconos custom, splash screen y carga offline.",
                },
                {
                  img: IMG.chat,
                  icon: <MessageSquare size={20} />,
                  iconColor: "bg-pink-500/20 text-pink-400",
                  title: "Chat Inteligente",
                  desc: "Contexto persistente, adaptación de tono, respuestas personalizadas con memoria de sesión.",
                },
                {
                  img: IMG.security,
                  icon: <History size={20} />,
                  iconColor: "bg-amber-500/20 text-amber-400",
                  title: "Historial Infinito",
                  desc: "Todas tus conversaciones sincronizadas en Supabase — accede desde cualquier dispositivo.",
                },
              ].map((feat) => (
                <div key={feat.title} className="relative rounded-3xl overflow-hidden border border-white/[0.07] group min-h-[240px]">
                  <img src={feat.img} alt={feat.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04040f] via-[#04040f]/50 to-transparent" />
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                    <div className={`w-10 h-10 rounded-xl ${feat.iconColor} flex items-center justify-center mb-3`}>
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-black mb-1.5">{feat.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 p-7 rounded-3xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-500/30 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                  <Lock size={20} />
                </div>
                <h3 className="text-lg font-black mb-2">Acceso de Élite</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Google Login + OTP por email (6 dígitos). Al registrarte recibes un correo de bienvenida formal con estética premium.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["Google OAuth", "OTP Email", "Bienvenida Premium"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 p-7 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 flex flex-wrap md:flex-nowrap gap-6 items-center">
                <div className="flex-1">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center mb-4">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-lg font-black mb-2">Diseño Premium</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Glassmorphism puro, modo oscuro profundo, gradientes dinámicos y micro-animaciones. Interfaz que impacta desde el primer segundo.
                  </p>
                </div>
                <div className="hidden md:flex flex-col gap-3 items-center">
                  <FloatingCube color="#8b5cf6" size={100} />
                  <FloatingCube color="#06b6d4" size={70} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOCKUP DEMO ── */}
      <section className="relative z-10 py-28 px-6 md:px-14 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6">Interactúa en <span className="text-purple-400">tiempo real</span></h2>
                  <p className="text-white/50 text-lg mb-8">Nuestra interfaz está diseñada para que la IA se sienta como una extensión de tu mente.</p>
                  <div className="space-y-4">
                      {[
                          "Respuesta inmediata de baja latencia",
                          "Previsualización de archivos y fotos",
                          "Modo voz activado por gestos",
                          "Sincronización multi-dispositivo"
                      ].map(text => (
                          <div key={text} className="flex items-center gap-3">
                              <CheckCircle2 size={18} className="text-emerald-400" />
                              <span className="text-white/70 font-semibold">{text}</span>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="relative">
                  <ChatMockup />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full z-0" />
              </div>
          </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="stack" className="relative z-10 py-28 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-violet-400 text-xs font-black tracking-[0.2em] uppercase">Stack Técnico</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Corazón del Sistema</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {[
                { icon: <Server size={18} />, label: "Backend", value: "Python + Flask", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                { icon: <Code2 size={18} />, label: "Frontend", value: "React 18 + Vite + HTML5 Premium", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                { icon: <Database size={18} />, label: "Base de Datos", value: "Supabase (PostgreSQL + RLS)", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                { icon: <Globe size={18} />, label: "Despliegue", value: "Vercel · GitHub CI/CD", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                { icon: <Brain size={18} />, label: "Motores IA", value: "Google Gemini Flash 1.5 · Groq LPU", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
                { icon: <Volume2 size={18} />, label: "Síntesis Voz", value: "Cartesia / ElevenLabs TTS", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
              ].map((item) => (
                <div key={item.label}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${item.bg} backdrop-blur`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color} ${item.bg} flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <span className="text-white/40 text-sm font-semibold">{item.label}</span>
                    <span className="text-white text-sm font-bold text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/[0.07]">
              <img src={IMG.stack} alt="Tech Stack" className="w-full h-full object-cover opacity-40" style={{ minHeight: 380 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04040f]/90 via-[#04040f]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-3">
                  <CheckCircle2 size={11} /> Producción · 100% Operativo
                </div>
                <p className="text-white/60 text-sm">Infraestructura cloud-native en Vercel con despliegue automático desde GitHub y sincronización en tiempo real.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section id="security" className="relative z-10 py-28 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-emerald-400 text-xs font-black tracking-[0.2em] uppercase">Seguridad</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-5">
                Protección de<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">nivel empresarial</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Cada usuario vive en su propio silo de datos. Nadie — excepto tú — puede leer tus conversaciones.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield size={17}/>, title: "Supabase RLS", desc: "Row Level Security — datos aislados por usuario, inaccesibles para terceros.", color: "bg-emerald-500/15 text-emerald-400", border: "border-emerald-500/20" },
                  { icon: <Lock size={17}/>, title: "Autenticación Dual", desc: "Google OAuth + OTP de 6 dígitos por email. Doble barrera de acceso.", color: "bg-cyan-500/15 text-cyan-400", border: "border-cyan-500/20" },
                  { icon: <Globe size={17}/>, title: "Vercel Edge Network", desc: "CDN global, HTTPS enforced, despliegue atómico sin downtime.", color: "bg-violet-500/15 text-violet-400", border: "border-violet-500/20" },
                  { icon: <Eye size={17}/>, title: "Monitor Bernal", desc: "Panel secreto de administración — supervisión en tiempo real de accesos y tráfico.", color: "bg-purple-500/15 text-purple-400", border: "border-purple-500/20" },
                ].map((item) => (
                  <div key={item.title} className={`flex gap-4 p-4 rounded-2xl bg-white/[0.03] border ${item.border}`}>
                    <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                    <div>
                      <div className="font-black text-sm mb-0.5">{item.title}</div>
                      <div className="text-white/45 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] aspect-square max-w-md mx-auto">
                <img src={IMG.security} alt="Security" className="w-full h-full object-cover opacity-35" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#04040f]/50 to-[#04040f]/20" />
                {/* Orbits */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-60 h-60">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/25 animate-spin" style={{ animationDuration: "18s" }} />
                    <div className="absolute inset-6 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
                    <div className="absolute inset-12 rounded-full border border-purple-500/25 animate-spin" style={{ animationDuration: "8s" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/15 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                        <Shield size={40} className="text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="about" className="relative z-10 py-28 px-6 md:px-14">
        <div className="max-w-4xl mx-auto text-center relative rounded-[2rem] overflow-hidden border border-white/10 p-12 ">
            {/* BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-violet-700/10 to-cyan-700/15" />
            <img src={IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.07]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04040f]/80 to-transparent" />

            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center mb-6 shadow-2xl shadow-purple-500/50">
                <Brain size={30} className="text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black mb-5">
                <CheckCircle2 size={11} /> 100% Operativo · v2.2.1
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                ¿Listo para el futuro<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">de la inteligencia?</span>
              </h2>
              <p className="text-white/55 mb-8 max-w-lg mx-auto text-base leading-relaxed">
                Únete a IA Castillo — el ecosistema de IA más avanzado creado por <strong className="text-white">Bernal Castillo</strong>. Acceso gratuito disponible ahora.
              </p>
              <a href="/chat"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-base shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105 transition-all duration-300"
              >
                <Sparkles size={17} />
                Acceder a IA Castillo
                <ArrowRight size={15} />
              </a>
            </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-10 px-6 md:px-14 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
              <Brain size={13} className="text-white" />
            </div>
            <span className="font-black text-sm">
              IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Castillo</span>
            </span>
            <span className="text-white/20 text-xs">v2.2.1 · Elite Edition</span>
          </div>
          <p className="text-white/25 text-sm">© 2026 Bernal Castillo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Globe size={13} />
            <a href="/chat" className="hover:text-white/60 transition-colors">
              ia-castillo.vercel.app
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
