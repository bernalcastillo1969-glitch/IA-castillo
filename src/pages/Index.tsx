import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Layers
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

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#12121f] text-[#e3e0f3] font-sans selection:bg-primary/30">
      
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
        <FloatingCube className="top-[20%] left-[10%]" size={80} color="#d0bcff" speed={25} />
        <FloatingCube className="top-[60%] right-[15%]" size={120} color="#4cd7f6" speed={35} />
      </div>

      {/* ── Navbar ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-3 bg-[#343342]/60 backdrop-blur-xl border border-white/5 rounded-full w-[90%] max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl tracking-tight text-[#d0bcff]">IA Castillo</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-[#cbc3d7]">
          <a className="text-[#4cd7f6] border-b-2 border-[#4cd7f6] pb-0.5" href="#">Ecosystem</a>
          <a className="hover:text-white transition-colors" href="#architecture">Architecture</a>
          <a className="hover:text-white transition-colors" href="#features">Features</a>
          <a className="hover:text-white transition-colors" href="#security">Security</a>
        </div>
        <a href="/chat" className="px-6 py-2 rounded-full text-sm font-bold bg-[#d0bcff] text-[#3c0091] hover:bg-white transition-all shadow-lg shadow-[#d0bcff]/20">
          Get Started
        </a>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden text-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12121f]/50 to-[#12121f]" />
          </motion.div>

          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#292937] border border-white/5 text-[#cbc3d7] text-xs font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span> Sistemas Activos v2.4
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 max-w-5xl text-white"
            >
              Bienvenidos al Mundo de la <br />
              <span className="text-[#4cd7f6]">Inteligencia Artificial</span>
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-xl text-[#cbc3d7] max-w-2xl mb-12"
            >
              Arquitectura de última generación diseñada para potenciar la productividad empresarial con modelos híbridos de baja latencia.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-6 mb-20"
            >
              <a href="/chat" className="px-10 py-5 rounded-xl bg-gradient-to-br from-[#d0bcff] to-[#a078ff] text-[#3c0091] font-bold text-lg shadow-2xl shadow-[#d0bcff]/30 hover:scale-105 transition-all">
                Probar Gratis
              </a>
              <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-colors">
                Ver Documentación
              </button>
            </motion.div>

            {/* Brain 3D Section */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-2xl">
              <Brain3D />
            </motion.div>
          </div>
        </section>

        {/* ── TODO EN UNO (Bento Grid) ── */}
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-white">Todo en <span className="text-[#d0bcff]">Uno</span></h2>
            <p className="text-[#cbc3d7] text-xl max-w-2xl mx-auto">Un ecosistema completo de herramientas diseñadas para integrarse sin fricciones.</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Análisis Pro */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
              className="md:col-span-2 bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-[#4cd7f6]/40 transition-all min-h-[400px]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/20 flex items-center justify-center mb-8 text-[#4cd7f6]">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white text-left">Análisis de Datos Avanzado</h3>
                <p className="text-[#cbc3d7] text-lg leading-relaxed text-left max-w-lg">Conecta tus fuentes de datos y deja que la IA genere visualizaciones y reportes ejecutivos en segundos.</p>
              </div>
              <div className="flex gap-4 mt-8">
                {['SQL', 'Python', 'Tableau'].map(tag => (
                   <span key={tag} className="px-4 py-1.5 rounded-lg bg-[#12121f] border border-white/5 text-[#958ea0] text-xs font-bold uppercase">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Multi-idioma */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 group hover:border-[#d0bcff]/40 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d0bcff]/20 flex items-center justify-center mb-8 text-[#d0bcff]">
                <Languages size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Multi-idioma</h3>
              <p className="text-[#cbc3d7] leading-relaxed">Traducción contextual y soporte en más de 95 idiomas nativos.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 group hover:border-[#a078ff]/40 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#a078ff]/20 flex items-center justify-center mb-8 text-[#a078ff]">
                <Terminal size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Copilot de Código</h3>
              <p className="text-[#cbc3d7] leading-relaxed">Generación de fragmentos de código optimizados y depuración.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="md:col-span-2 bg-[#343342]/40 backdrop-blur-md p-10 rounded-3xl border border-white/5 group hover:border-[#4edea3]/40 transition-all flex items-center gap-10 text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3] shrink-0">
                <Layers size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">API de Nivel Enterprise</h3>
                <p className="text-[#cbc3d7]">Integración directa mediante RESTful API con documentación técnica completa.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── INFRAESTRUCTURA DE CLASE MUNDIAL ── */}
        <section className="relative z-10 py-32 px-6 bg-[#0c0c14]/40">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-white">Infraestructura de <span className="text-[#4cd7f6]">Clase Mundial</span></h2>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               {[
                 { name: 'PYTHON', icon: 'fa-brands fa-python', color: 'text-yellow-500' },
                 { name: 'REACT', icon: 'fa-brands fa-react', color: 'text-blue-400' },
                 { name: 'SUPABASE', icon: 'fa-solid fa-database', color: 'text-emerald-500' },
                 { name: 'TAILWIND', icon: 'fa-solid fa-wind', color: 'text-cyan-400' },
                 { name: 'VERCEL', icon: 'fa-solid fa-triangle-exclamation', color: 'text-white' }
               ].map((tech, i) => (
                 <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                   className="flex flex-col items-center gap-4"
                 >
                   <div className={`text-5xl ${tech.color}`}>
                     <i className={tech.icon}></i>
                   </div>
                   <span className="text-xs font-black tracking-widest text-white/60">{tech.name}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE (Cerebro Híbrido) ── */}
        <section id="architecture" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
              <div className="max-w-2xl text-left">
                <span className="text-[#4cd7f6] text-xs font-black tracking-widest uppercase">Arquitectura del Sistema</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">Cerebro <span className="text-[#4cd7f6]">Híbrido</span></h2>
                <p className="text-[#cbc3d7] text-lg mt-4 leading-relaxed">Nuestra arquitectura distribuye las cargas de trabajo dinámicamente entre los motores más eficientes del mercado.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Cpu />, title: "Gemini Flash 1.5", desc: "Procesamiento masivo de contexto con ventana de 1M de tokens." },
                { icon: <Zap />, title: "Groq LPU", desc: "Inferencia a velocidad ultra-rápida. Respuestas instantáneas." },
                { icon: <CheckCircle2 />, title: "Ruteo Automático", desc: "Optimización de costos y latencia automática por consulta." },
              ].map((item, i) => (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  className="bg-[#343342]/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden h-full flex flex-col items-start group hover:border-[#4cd7f6]/30 transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-[#cbc3d7] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTION (CHAT MOCKUP) ── */}
        <section id="features" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Interacción en <span className="text-[#4cd7f6]">Tiempo Real</span></h2>
              <p className="text-[#cbc3d7] text-xl mb-10 leading-relaxed">
                Experimenta la velocidad de Groq combinada con la inteligencia de Gemini. Nuestra interfaz de chat está diseñada para la máxima productividad.
              </p>
              <div className="space-y-6">
                {["Latencia inferior a 200ms", "Streaming de tokens ultra-fluido", "Soporte para visión y archivos complejos"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#4edea3]/20 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-[#4edea3]" />
                    </div>
                    <span className="text-white font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="absolute -inset-10 bg-[#4cd7f6]/10 rounded-full blur-[80px]" />
              <ChatMockup title="Chat de IA Castillo v2.4" />
            </motion.div>
          </div>
        </section>

        {/* ── SECURITY ── */}
        <section id="security" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-gradient-to-br from-[#1e1e2c] to-[#04040f] rounded-[3rem] p-12 md:p-24 border border-[#4edea3]/20 relative overflow-hidden text-left"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-xs font-bold uppercase tracking-widest mb-8">Security Protocol</span>
                  <h2 className="text-5xl md:text-6xl font-bold mb-10 text-white leading-tight">Protección de Nivel <br/><span className="text-[#4edea3]">Empresarial</span></h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3] border border-[#4edea3]/20">
                        <Lock size={24} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-2 text-white">Supabase RLS</h4>
                        <p className="text-[#cbc3d7] text-lg">Row Level Security para garantizar el aislamiento total de tus datos.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 bg-[#4edea3]/10 rounded-full blur-[100px]" />
                  <div className="relative w-72 h-72 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-[#4edea3]/30 animate-ping" />
                    <ShieldCheck size={140} className="text-[#4edea3] drop-shadow-[0_0_40px_rgba(78,222,163,0.5)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="relative z-10 py-32 px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">Listo para el futuro de la IA</h2>
            <p className="text-xl text-[#cbc3d7] mb-12">Únete a cientos de usuarios y potencia tu productividad hoy mismo.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/chat" className="px-14 py-6 rounded-2xl bg-[#4cd7f6] text-[#003640] font-black text-2xl shadow-3xl shadow-[#4cd7f6]/30 hover:scale-105 transition-all">
                Comenzar Ahora
              </a>
              <button className="px-12 py-6 rounded-2xl border border-white/10 text-white font-bold text-xl hover:bg-white/5 transition-all">
                Agendar Demostración
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-14 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="text-2xl font-bold text-[#d0bcff]">IA Castillo</div>
          <p className="text-white/40 text-sm italic">Creado por Bernal Castillo · 2026</p>
        </div>
        <div className="flex gap-12 text-[#cbc3d7] text-xs font-bold uppercase tracking-widest">
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
           <a href="#" className="hover:text-white transition-colors">Terms</a>
           <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
