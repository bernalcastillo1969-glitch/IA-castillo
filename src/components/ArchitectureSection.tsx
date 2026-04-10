import { motion } from "framer-motion";
import { Zap, Eye as EyeIcon, Brain } from "lucide-react";

const engines = [
  {
    icon: EyeIcon,
    name: "Gemini Maestro",
    subtitle: "Modo Visión",
    description: "Activado automáticamente con imágenes y documentos. Experto en análisis visual y razonamiento profundo.",
    color: "primary",
    dotColor: "bg-primary",
  },
  {
    icon: Zap,
    name: "Groq Supersonic",
    subtitle: "Modo Velocidad",
    description: "Motor principal para chats de texto. Respuestas casi instantáneas con ultra-latencia baja.",
    color: "accent",
    dotColor: "bg-accent",
  },
  {
    icon: Brain,
    name: "Cerebro Multimodal",
    subtitle: "Modo Híbrido",
    description: "Procesamiento simultáneo de texto, imagen y audio para una comprensión completa.",
    color: "secondary",
    dotColor: "bg-secondary",
  },
];

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24 md:py-32 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-heading font-semibold tracking-widest uppercase text-sm mb-4">
              Arquitectura
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Cerebro <span className="text-gradient">Híbrido</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              IA Castillo utiliza un protocolo de selección dinámica de motores 
              para garantizar la mejor respuesta según cada necesidad. El sistema 
              elige automáticamente el motor óptimo.
            </p>

            {/* Visual connection */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" style={{ animationDelay: "1s" }} />
                <div className="w-3 h-3 rounded-full bg-secondary animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <span className="text-muted-foreground text-xs font-body ml-2">Selección dinámica activa</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary animate-gradient w-full" />
              </div>
            </div>
          </motion.div>

          {/* Right - Engine cards */}
          <div className="space-y-5">
            {engines.map((engine, index) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${engine.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <engine.icon className={`w-5 h-5 text-${engine.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground">
                        {engine.name}
                      </h3>
                      <span className={`${engine.dotColor} text-xs px-2 py-0.5 rounded-full text-primary-foreground font-heading font-medium`}>
                        {engine.subtitle}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {engine.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
