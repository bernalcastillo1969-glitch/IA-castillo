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
    <div className="min-h-screen bg-[#12121f] text-[#e3e0f3] font-sans selection:bg-primary/30 overflow-x-hidden scroll-smooth transition-colors duration-500">
      
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
        <FloatingCube className="top-[20%] left-[10%]" size={80} color="#d0bcff" speed={25} />
        <FloatingCube className="top-[60%] right-[15%]" size={120} color="#4cd7f6" speed={35} />
      </div>

      {/* ── Navbar Premium ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 py-3 bg-[#1e1e2c]/70 backdrop-blur-2xl border border-white/10 rounded-full w-[92%] max-w-5xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4cd7f6] to-[#d0bcff] flex items-center justify-center font-black text-white text-xs">IC</div>
          <span className="font-black text-lg md:text-xl tracking-tighter text-white">IA Castillo</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 relative h-full">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`px-5 py-2 text-xs font-black uppercase tracking-widest transition-all relative z-10 ${
                activeItem === item.id ? 'text-[#4cd7f6]' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              {item.label}
              {activeItem === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] shadow-[0_0_15px_rgba(76,215,246,0.5)] z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/chat" className="hidden sm:inline-block px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#d0bcff] to-[#a078ff] text-[#3c0091] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(208,188,255,0.4)]">
            Comenzar
          </a>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white active:scale-90 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[40] md:hidden" />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] z-[45] md:hidden bg-gradient-to-b from-[#1e1e2c] to-[#12121f] border-l border-white/10 p-10 flex flex-col shadow-2xl"
            >
              <div className="flex flex-col gap-8 mt-20">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-black uppercase tracking-tighter text-left transition-all ${
                      activeItem === item.id ? 'text-[#4cd7f6] translate-x-4' : 'text-[#cbc3d7]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto">
                <a href="/chat" className="flex items-center justify-center w-full py-5 rounded-2xl bg-gradient-to-br from-[#d0bcff] to-[#4cd7f6] text-[#3c0091] font-black text-xl shadow-xl">
                  Comenzar Chat
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12121f]/50 to-[#12121f]" />
          </motion.div>
          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#4edea3] text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(78,222,163,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse shadow-[0_0_10px_#4edea3]"></span> Sistemas Activos v2.4
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter mb-10 text-white text-glow">
              Bienvenido <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff]">IA Castillo</span>
            </motion.h1>
            <p className="text-lg md:text-2xl text-[#cbc3d7] max-w-2xl mx-auto mb-16 leading-relaxed font-medium">Arquitectura neuronal diseñada para potenciar la productividad con modelos de inteligencia artificial de hiper-velocidad.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
              <a href="/chat" className="group px-12 py-6 rounded-2xl bg-white text-[#12121f] font-black text-xl hover:bg-[#4cd7f6] hover:text-white transition-all shadow-xl hover:shadow-[0_0_40px_rgba(76,215,246,0.4)] flex items-center gap-3">
                Probar Gratis <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="px-12 py-6 rounded-2xl border border-white/20 text-white font-black text-xl hover:bg-white/5 transition-all">Ver Docs</button>
            </div>
            <div className="w-full max-w-2xl"><Brain3D /></div>
          </div>
        </section>

        {/* ── TODO EN UNO ── */}
        <section className="relative z-10 py-40 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 md:row-span-2 bg-[#1e1e2c]/40 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 flex flex-col justify-between group hover:border-[#4cd7f6]/40 transition-all min-h-[500px] shadow-2xl">
              <div className="text-left">
                <div className="w-20 h-20 rounded-3xl bg-[#4cd7f6]/10 flex items-center justify-center text-[#4cd7f6] mb-10 shadow-[0_0_30px_rgba(76,215,246,0.1)]"><BarChart3 size={40} /></div>
                <h3 className="text-4xl font-black mb-6 text-white leading-tight">Análisis de <br/>Datos Pro</h3>
                <p className="text-[#cbc3d7] text-xl leading-relaxed">Conecta tus fuentes de datos y deja que la IA genere visualizaciones y reportes ejecutivos en segundos.</p>
              </div>
              <div className="flex gap-4 mt-8">{['SQL', 'Python', 'Tableau'].map(tag => <span key={tag} className="px-5 py-2 rounded-xl bg-white/5 text-[10px] font-black uppercase text-white/50 tracking-widest">{tag}</span>)}</div>
            </motion.div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 italic">
               <div className="bg-[#1e1e2c]/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-left hover:border-[#d0bcff]/40 transition-all shadow-xl">
                 <Languages className="text-[#d0bcff] mb-6" size={32} /><h4 className="text-2xl font-black mb-3 text-white">Traducción</h4><p className="text-[#cbc3d7] text-sm">Contextual en más de 95 idiomas.</p>
               </div>
               <div className="bg-[#1e1e2c]/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-left hover:border-[#4edea3]/40 transition-all shadow-xl">
                 <Terminal className="text-[#4edea3] mb-6" size={32} /><h4 className="text-2xl font-black mb-3 text-white">Copilot</h4><p className="text-[#cbc3d7] text-sm">Generación de código y depuración.</p>
               </div>
            </div>
            <div className="md:col-span-2 bg-[#1e1e2c]/40 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 flex items-center gap-10 text-left hover:border-white/20 transition-all shadow-2xl">
               <div className="shrink-0 w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-white"><Layers size={48} /></div>
               <div><h4 className="text-3xl font-black mb-3 text-white">API Enterprise</h4><p className="text-[#cbc3d7] text-lg">Integración robusta mediante RESTful API.</p></div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE INFRAESTRUCTURA ── */}
        <section className="relative z-10 py-40 overflow-hidden border-y border-white/5 bg-[#12121f]">
          <div className="max-w-7xl mx-auto text-center mb-24">
             <span className="text-[#4cd7f6] text-xs font-black tracking-[0.5em] uppercase mb-4 block animate-pulse">Tecnologías de Élite</span>
             <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic">Infraestructura <span className="text-[#4cd7f6]">Global</span></h2>
          </div>
          <div className="flex overflow-hidden relative">
            <motion.div className="flex gap-32 items-center justify-center whitespace-nowrap min-w-full" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 18, repeat: Infinity }}>
              {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((tech, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group cursor-pointer transition-all">
                  <div className={`text-8xl ${tech.color} drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all`}>
                    <i className={tech.icon}></i>
                  </div>
                  <span className="text-xs font-black tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#12121f] via-[#12121f]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#12121f] via-[#12121f]/80 to-transparent z-10 pointer-events-none" />
        </section>

        {/* ── SOBRE MI ── */}
        <section id="sobre-mi" className="relative z-10 py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-[#1e1e2c] to-[#12121f] rounded-[5rem] p-16 md:p-24 border border-white/10 relative overflow-hidden text-left shadow-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
                <div className="lg:col-span-5">
                  <div className="w-20 h-20 rounded-full bg-[#d0bcff]/10 border border-[#d0bcff]/20 flex items-center justify-center text-[#d0bcff] mb-12"><GraduationCap size={40} /></div>
                  <h2 className="text-6xl md:text-8xl font-black mb-10 text-white tracking-tighter">Bernal <br/> <span className="text-[#4cd7f6]">Castillo</span></h2>
                  <p className="text-2xl text-[#cbc3d7] italic mb-10 border-l-8 border-[#4cd7f6] pl-10 font-medium">"Mi enfoque principal es la resolución de problemas mediante tecnología de vanguardia."</p>
                  <p className="text-white font-bold text-xl uppercase tracking-widest bg-white/5 py-4 px-8 rounded-2xl border border-white/5 inline-block">LUZ / Computación</p>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 italic">
                  <div>
                    <div className="flex items-center gap-4 text-[#4cd7f6] mb-6"><Terminal size={24} /><h4 className="font-black text-2xl text-white">Programación</h4></div>
                    <p className="text-[#cbc3d7] text-lg leading-relaxed">Arquitecturas robustas con Flask e integración nativa con Supabase.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-[#d0bcff] mb-6"><Database size={24} /><h4 className="font-black text-2xl text-white">Gestión</h4></div>
                    <p className="text-[#cbc3d7] text-lg leading-relaxed">Manejo eficiente de flujos de datos críticos.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-[#4edea3] mb-6"><Zap size={24} /><h4 className="font-black text-2xl text-white">IA</h4></div>
                    <p className="text-[#cbc3d7] text-lg leading-relaxed">Implementación de Gemini y despliegue en Vercel.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-white/40 mb-6"><Microscope size={24} /><h4 className="font-black text-2xl text-white text-white/60">I+D</h4></div>
                    <p className="text-[#cbc3d7] text-lg leading-relaxed">Investigación constante en metodologías ágiles.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── REST OF SECTIONS ── */}
        <section id="architecture" className="py-40 px-6 text-left max-w-7xl mx-auto italic">
           <h2 className="text-5xl font-black mb-20 text-white">Arquitectura <span className="text-[#4cd7f6]">Híbrida</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[{ icon: <Cpu />, title: "Gemini 1.5", desc: "1M de Tokens de contexto." }, { icon: <Zap />, title: "Groq LPU", desc: "Velocidad de respuesta instantánea." }, { icon: <CheckCircle2 />, title: "Ruteo AI", desc: "Optimización dinámica de modelos." }].map((item, i) => (
                <div key={i} className="bg-white/5 p-12 rounded-[3.5rem] border border-white/5"><div className="text-[#4cd7f6] mb-8 scale-150 origin-left">{item.icon}</div><h3 className="text-3xl font-black mb-4 text-white">{item.title}</h3><p className="text-[#cbc3d7] text-lg">{item.desc}</p></div>
              ))}
           </div>
        </section>

        <section id="security" className="py-20 px-6"><div className="max-w-7xl mx-auto bg-gradient-to-br from-[#1e1e2c] to-[#04040f] rounded-[5rem] p-24 border border-[#4edea3]/20 text-left flex flex-col md:flex-row items-center gap-20 shadow-3xl"><div className="flex-1"><h2 className="text-6xl font-black mb-10 text-white">Seguridad <br/><span className="text-[#4edea3]">Militar</span></h2><div className="flex gap-6 mb-10"><Lock className="text-[#4edea3]" size={40} /><div><h4 className="text-2xl font-bold text-white">Supabase RLS</h4><p className="text-[#cbc3d7] text-xl">Aislamiento total de datos por usuario.</p></div></div></div><ShieldCheck size={200} className="text-[#4edea3] opacity-20" /></div></section>

        <section className="py-40 text-center italic">
          <a href="/chat" className="px-20 py-8 rounded-[3rem] bg-gradient-to-r from-[#4cd7f6] to-[#d0bcff] text-[#12121f] font-black text-4xl shadow-3xl hover:scale-105 active:scale-95 transition-all">Comenzar Ahora</a>
        </section>
      </main>

      <footer className="py-20 px-14 border-t border-white/10 flex flex-col md:flex-row justify-between items-center bg-[#12121f] italic"><div className="text-3xl font-black text-[#d0bcff] tracking-tight">IA Castillo</div><p className="text-white/40 text-lg">© 2026 Bernal Castillo. Élite Edition.</p></footer>
    </div>
  );
};

export default Index;
