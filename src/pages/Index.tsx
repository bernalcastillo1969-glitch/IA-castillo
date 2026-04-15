import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Database, 
  Code2, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Lock,
  ChevronDown,
  BarChart3,
  Languages,
  Terminal,
  Layers,
  GraduationCap,
  Microscope,
  Menu,
  X,
  Fingerprint
} from "lucide-react";
import Brain3D from "@/components/Brain3D";
import FloatingCube from "@/components/FloatingCube";
import ChatMockup from "@/components/ChatMockup";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const navItems = [
  { id: 'ecosistema', label: 'Ecosistema', href: '#' },
  { id: 'arquitectura', label: 'Arquitectura', href: '#architecture' },
  { id: 'funciones', label: 'Funciones', href: '#features' },
  { id: 'seguridad', label: 'Seguridad', href: '#security' },
  { id: 'autor', label: 'Desarrollador', href: '#sobre-mi' },
];

const techLogos = [
  { name: 'PYTHON', icon: 'fa-brands fa-python', color: 'text-[#3776ab]' },
  { name: 'REACT', icon: 'fa-brands fa-react', color: 'text-[#61dafb]' },
  { name: 'SUPABASE', icon: 'fa-solid fa-database', color: 'text-[#3ecf8e]' },
  { name: 'TAILWIND', icon: 'fa-solid fa-wind', color: 'text-[#06b6d4]' },
  { name: 'VERCEL', icon: 'fa-solid fa-triangle-exclamation', color: 'text-white' },
];

const Index = () => {
  const [activeItem, setActiveItem] = useState('ecosistema');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#12121f] text-[#e3e0f3] font-sans selection:bg-primary/30 overflow-x-hidden scroll-smooth">
      
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
        <FloatingCube className="top-[20%] left-[10%]" size={80} color="#d0bcff" speed={25} />
        <FloatingCube className="top-[60%] right-[15%]" size={120} color="#4cd7f6" speed={35} />
      </div>

      {/* ── Navbar Mejorada con Colores ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 py-3 bg-[#343342]/60 backdrop-blur-xl border border-white/5 rounded-full w-[92%] max-w-5xl shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg md:text-xl tracking-tight text-[#d0bcff]">IA Castillo</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 relative h-full">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} onClick={() => setActiveItem(item.id)}
              className={`px-4 py-2 text-sm font-semibold transition-colors relative z-10 ${
                activeItem === item.id ? 'text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              {item.label}
              {activeItem === item.id && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff]" initial={false} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/chat" className="hidden sm:inline-block px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#d0bcff] to-[#a078ff] text-[#3c0091] hover:bg-white transition-all shadow-lg shadow-[#d0bcff]/20">Comenzar</a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#cbc3d7] active:scale-90 transition-transform">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-[45] md:hidden bg-[#1e1e2c]/95 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-center italic">
              {navItems.map((item) => (
                <a key={item.id} href={item.href} onClick={() => { setActiveItem(item.id); setMobileMenuOpen(false); }}
                  className={`text-xl font-bold ${activeItem === item.id ? 'text-[#4cd7f6]' : 'text-[#cbc3d7]'}`}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-white/5" />
              <a href="/chat" className="w-full py-4 rounded-2xl bg-gradient-to-br from-[#d0bcff] to-[#a078ff] text-[#3c0091] font-black text-xl">Comenzar Chat</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION (Diseño Restaurado) */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12121f]/50 to-[#12121f]" />
          </motion.div>

          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#292937] border border-white/5 text-[#cbc3d7] text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span> Sistemas Activos v2.4
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 text-white">
              Bienvenidos al Mundo de la <br /> <span className="text-[#4cd7f6]">Inteligencia Artificial</span>
            </motion.h1>
            <p className="text-xl text-[#cbc3d7] max-w-2xl mx-auto mb-12">Arquitectura de última generación diseñada para potenciar la productividad empresarial con modelos híbridos de baja latencia.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20 text-center">
              <a href="/chat" className="px-10 py-5 rounded-xl bg-gradient-to-br from-[#d0bcff] to-[#a078ff] text-[#3c0091] font-bold text-lg shadow-2xl shadow-[#d0bcff]/30 hover:scale-105 transition-all">Probar Gratis</a>
              <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors">Ver Documentación</button>
            </div>
            <div className="w-full max-w-2xl"><Brain3D /></div>
          </div>
        </section>

        {/* ── TODO EN UNO ── */}
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">Todo en <span className="text-[#d0bcff]">Uno</span></h2>
            <p className="text-[#cbc3d7] text-xl max-w-2xl mx-auto">Un ecosistema completo de herramientas diseñadas para integrarse sin fricciones.</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-[#4cd7f6]/40 transition-all min-h-[400px]">
              <div className="text-left">
                <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/20 flex items-center justify-center mb-8 text-[#4cd7f6]"><BarChart3 size={28} /></div>
                <h3 className="text-3xl font-bold mb-6 text-white">Análisis de Datos Avanzado</h3>
                <p className="text-[#cbc3d7] text-lg leading-relaxed">Conecta tus fuentes de datos y deja que la IA genere visualizaciones y reportes ejecutivos en segundos.</p>
              </div>
              <div className="flex gap-4 mt-8">{['SQL', 'Python', 'Tableau'].map(tag => <span key={tag} className="px-4 py-1.5 rounded-lg bg-[#12121f] border border-white/5 text-[#958ea0] text-xs font-bold uppercase">{tag}</span>)}</div>
            </motion.div>
            <div className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 text-left"><div className="w-12 h-12 rounded-xl bg-[#d0bcff]/20 flex items-center justify-center mb-8 text-[#d0bcff]"><Languages size={28} /></div><h3 className="text-2xl font-bold mb-4 text-white">Multi-idioma</h3><p className="text-[#cbc3d7] leading-relaxed">Traducción contextual y soporte en más de 95 idiomas nativos.</p></div>
            <div className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 text-left"><div className="w-12 h-12 rounded-xl bg-[#a078ff]/20 flex items-center justify-center mb-8 text-[#a078ff]"><Terminal size={28} /></div><h3 className="text-2xl font-bold mb-4 text-white">Copilot de Código</h3><p className="text-[#cbc3d7] leading-relaxed">Generación de fragmentos de código optimizados y depuración.</p></div>
            <div className="md:col-span-2 bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 flex items-center gap-10 text-left"><div className="w-20 h-20 rounded-2xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3] shrink-0"><Layers size={40} /></div><div><h3 className="text-2xl font-bold mb-2 text-white">API de Nivel Enterprise</h3><p className="text-[#cbc3d7]">Integración directa mediante RESTful API con documentación técnica completa.</p></div></div>
          </div>
        </section>

        {/* ── INFRAESTRUCTURA (Marquee Colorido) ── */}
        <section className="relative z-10 py-32 overflow-hidden border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-white text-center">Infraestructura de <span className="text-[#4cd7f6]">Clase Mundial</span></h2></div>
          <div className="flex overflow-hidden relative group">
            <motion.div className="flex gap-20 items-center justify-center whitespace-nowrap min-w-full" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }}>
              {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((tech, i) => (
                <div key={i} className="flex flex-col items-center gap-4 opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-default text-center">
                  <div className={`text-6xl ${tech.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}><i className={tech.icon}></i></div>
                  <span className="text-[10px] font-black tracking-widest text-white/60">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#12121f] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#12121f] to-transparent z-10 pointer-events-none" />
        </section>

        {/* ── ARCHITECTURE ── */}
        <section id="architecture" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white text-left">Cerebro <span className="text-[#4cd7f6]">Híbrido</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { icon: <Cpu />, title: "Gemini Flash 1.5", desc: "Procesamiento masivo de contexto." },
                { icon: <Zap />, title: "Groq LPU", desc: "Inferencia a velocidad ultra-rápida." },
                { icon: <CheckCircle2 />, title: "Ruteo Automático", desc: "Optimización de costos y latencia." },
              ].map((item, i) => (
                <div key={item.title} className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-[#4cd7f6]">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-[#cbc3d7] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left"><h2 className="text-4xl md:text-5xl font-bold text-white">Interacción en <span className="text-[#4cd7f6]">Tiempo Real</span></h2></div><ChatMockup title="Chat de IA Castillo v2.4" />
          </div>
        </section>

        {/* ── SECURITY ── */}
        <section id="security" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#1e1e2c] to-[#04040f] rounded-[3rem] p-12 md:p-24 border border-[#4edea3]/20 text-left relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <h2 className="text-5xl md:text-6xl font-bold mb-10 text-white">Protección <br/><span className="text-[#4edea3]">Empresarial</span></h2>
                  <div className="flex gap-6"><Lock className="text-[#4edea3]" /><div><h4 className="text-2xl font-bold text-white">Supabase RLS</h4><p className="text-[#cbc3d7]">Seguridad de nivel bancario.</p></div></div>
                </div><ShieldCheck size={180} className="text-[#4edea3] opacity-30" />
            </div>
          </div>
        </section>

        {/* ── SOBRE MI ── */}
        <section id="sobre-mi" className="relative z-10 py-32 px-6 text-left">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#343342]/40 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 border border-white/5 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><GraduationCap size={400} /></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 text-left">
                <div className="lg:col-span-5 text-left">
                  <h2 className="text-4xl md:text-5xl font-black mb-8 text-white underline decoration-[#4cd7f6] decoration-4 underline-offset-8">Bernal Castillo</h2>
                  <p className="text-xl text-[#cbc3d7] italic mb-8 border-l-4 border-[#4cd7f6] pl-6 text-left">"Resolución de problemas mediante tecnología."</p>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#12121f]/60 border border-white/5"><GraduationCap className="text-[#4cd7f6]" /><div><p className="text-white font-bold">Estudiante de LUZ</p></div></div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 italic text-left">
                  <div><h4 className="font-bold text-white mb-2">Programación</h4><p className="text-[#cbc3d7] text-sm text-left">Arquitecturas con Flask y Supabase.</p></div>
                  <div><h4 className="font-bold text-white mb-2">Gestión de Datos</h4><p className="text-[#cbc3d7] text-sm text-left">Análisis eficiente y seguro.</p></div>
                  <div><h4 className="font-bold text-white mb-2">IA & Despliegue</h4><p className="text-[#cbc3d7] text-sm text-left">Implementación de Gemini y Vercel.</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 py-40 text-center italic"><a href="/chat" className="px-14 py-6 rounded-2xl bg-[#4cd7f6] text-[#003640] font-black text-2xl shadow-3xl inline-block">Probar Ahora</a></section>
      </main>

      <footer className="relative z-10 py-20 px-14 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-[#12121f] text-white/40 italic"><div className="text-2xl font-bold text-[#d0bcff]">IA Castillo</div><p>© 2026 Bernal Castillo.</p></footer>
    </div>
  );
};

export default Index;
