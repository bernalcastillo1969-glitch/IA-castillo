import React from "react";
import { Link } from "react-router-dom";
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
  Terminal,
  PersonStanding,
  Workflow,
  Lock,
  ChevronDown
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#12121f] text-[#e3e0f3] font-sans selection:bg-primary/30">
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-[#343342]/60 backdrop-blur-xl rounded-full mt-4 mx-auto max-w-5xl shadow-[0_0_40px_rgba(208,188,255,0.08)] border border-white/5">
        <div className="text-2xl font-bold text-[#d0bcff] tracking-tight font-headline">IA Castillo</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-[#4cd7f6] font-semibold border-b-2 border-[#4cd7f6] pb-1 font-label" href="#">Ecosystem</a>
          <a className="text-[#cbc3d7] hover:text-[#e3e0f3] transition-colors font-label" href="#architecture">Architecture</a>
          <a className="text-[#cbc3d7] hover:text-[#e3e0f3] transition-colors font-label" href="#features">Features</a>
          <a className="text-[#cbc3d7] hover:text-[#e3e0f3] transition-colors font-label" href="#security">Security</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/chat" className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-br from-[#d0bcff] to-[#a078ff] text-[#3c0091] hover:scale-105 transition-transform">
            Acceder
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-32 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d0bcff]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#292937] border border-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-xs font-label text-[#cbc3d7] uppercase tracking-widest">Sistemas Activos v2.4</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-white">
            Bienvenidos al Mundo de la <br/>
            <span className="text-[#4cd7f6]">Inteligencia Artificial</span>
          </h1>
          <p className="text-xl text-[#cbc3d7] max-w-2xl mx-auto mb-12">
            Arquitectura de última generación diseñada para potenciar la productividad empresarial con modelos híbridos de baja latencia.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/chat" className="px-10 py-5 rounded-xl bg-gradient-to-br from-[#d0bcff] to-[#a078ff] text-[#340080] font-bold text-lg shadow-[0_0_30px_rgba(208,188,255,0.3)] hover:scale-105 transition-transform active:scale-95">
              Probar Gratis
            </Link>
            <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-semibold text-lg hover:bg-[#1a1a28] transition-colors">
              Ver Documentación
            </button>
          </div>
        </section>

        {/* Architecture Section (Cerebro Híbrido) */}
        <section id="architecture" className="max-w-7xl mx-auto px-6 mb-40">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl font-bold mb-4">Cerebro <span className="text-[#4cd7f6]">Híbrido</span></h2>
              <p className="text-[#cbc3d7] text-lg">Nuestra arquitectura distribuye las cargas de trabajo dinámicamente entre los motores más eficientes del mercado.</p>
            </div>
            <div className="text-[#958ea0] text-sm tracking-widest uppercase">Arquitectura del Sistema</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gemini Card */}
            <div className="bg-[#343342]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain size={64} />
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#d0bcff]/20 flex items-center justify-center mb-6 text-[#d0bcff]">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Gemini Flash 1.5</h3>
              <p className="text-[#cbc3d7] leading-relaxed">Procesamiento masivo de contexto con una ventana de 1M de tokens para análisis profundos.</p>
            </div>
            {/* Groq Card */}
            <div className="bg-[#343342]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={64} />
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#4cd7f6]/20 flex items-center justify-center mb-6 text-[#4cd7f6]">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Groq LPU</h3>
              <p className="text-[#cbc3d7] leading-relaxed">Inferencia a velocidad ultra-rápida. Respuestas casi instantáneas para flujos de trabajo en tiempo real.</p>
            </div>
            {/* Ruteo Card */}
            <div className="bg-[#343342]/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Workflow size={64} />
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#4edea3]/20 flex items-center justify-center mb-6 text-[#4edea3]">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ruteo Automático</h3>
              <p className="text-[#cbc3d7] leading-relaxed">Optimización de costos y latencia. El sistema elige el modelo ideal para cada consulta específica.</p>
            </div>
          </div>
        </section>

        {/* Real-Time Interaction Preview */}
        <section id="features" className="max-w-7xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-6">Interacción en <span className="text-[#4cd7f6]">Tiempo Real</span></h2>
              <p className="text-[#cbc3d7] text-lg mb-8 leading-relaxed">
                Experimenta la velocidad de Groq combinada con la inteligencia de Gemini. Nuestra interfaz de chat está diseñada para la máxima productividad, con soporte para Markdown, código y visualización de archivos.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#4edea3]" />
                  <span>Latencia inferior a 200ms</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#4edea3]" />
                  <span>Streaming de tokens ultra-fluido</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#4edea3]" />
                  <span>Soporte para visión y archivos complejos</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0d0d1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-[#292937] px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                  </div>
                  <span className="text-xs text-[#958ea0] ml-2">Chat de IA Castillo — v2.0</span>
                </div>
              </div>
              <div className="p-6 space-y-6 min-h-[300px] text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#343342] flex items-center justify-center shrink-0">
                    <PersonStanding size={16} />
                  </div>
                  <div className="bg-[#1a1a28] p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                    ¿Puedes analizar mi base de datos?
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#d0bcff]/20 flex items-center justify-center shrink-0 text-[#d0bcff]">
                    <Sparkles size={16} />
                  </div>
                  <div className="bg-[#292937] p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm border-l-2 border-[#d0bcff]">
                    Analizando esquema... 3 puntos de optimización detectados.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="max-w-7xl mx-auto px-6 mb-40">
          <div className="bg-[#343342]/40 backdrop-blur-md rounded-[2rem] p-12 md:p-20 border border-[#4edea3]/20 relative overflow-hidden text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-xs font-bold uppercase tracking-widest mb-6">
                  Security Protocol
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Protección de Nivel <br/><span className="text-[#4edea3]">Empresarial</span></h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Supabase RLS</h4>
                      <p className="text-[#cbc3d7]">Row Level Security para garantizar que cada usuario solo acceda a su información.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative">
                <div className="absolute inset-0 bg-[#4edea3]/10 rounded-full blur-3xl"></div>
                <div className="relative p-12 bg-[#292937] rounded-full border border-[#4edea3]/30">
                  <ShieldCheck size={120} className="text-[#4edea3]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-tight text-white">Listo para el Futuro de la IA</h2>
          <p className="text-xl text-[#cbc3d7] mb-12">Únete a cientos de desarrolladores y empresas que ya están construyendo el mañana con IA Castillo.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/chat" className="w-full md:w-auto px-12 py-6 rounded-2xl bg-[#4cd7f6] text-[#003640] font-black text-xl hover:shadow-[0_0_40px_rgba(76,215,246,0.4)] transition-all hover:-translate-y-1">
              Comenzar Ahora
            </Link>
            <button className="w-full md:w-auto px-12 py-6 rounded-2xl border border-white/20 text-white font-bold text-xl hover:bg-[#292937] transition-colors">
              Agendar Demo
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#12121f] border-t border-white/5">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-[#d0bcff]">IA Castillo</div>
          <p className="text-[#cbc3d7] text-sm">© 2026 IA Castillo. Neural-Architected AI by Bernal.</p>
        </div>
        <div className="flex gap-8 text-[#cbc3d7] text-sm">
          <a href="#" className="hover:text-[#4cd7f6] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#4cd7f6] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#4cd7f6] transition-colors">Docs</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
