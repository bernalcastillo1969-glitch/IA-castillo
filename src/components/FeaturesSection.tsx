import { motion } from "framer-motion";
import { Eye, Mic, Smartphone, Lock, Palette, Brain } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Visión Avanzada",
    description: "Lee fotos de cuadernos, libros, gráficos y documentos. Extrae información y resuelve problemas visuales al instante.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Mic,
    title: "Modo Voz Humanoide",
    description: "Interfaz de voz interactiva con avatar animado y síntesis de voz de alta fidelidad estilo Alexa.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Smartphone,
    title: "Experiencia PWA",
    description: "Instalable en Android, iOS y escritorio como app nativa con tiempos de carga optimizados.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Lock,
    title: "Acceso de Élite",
    description: "Autenticación dual con Google Login y códigos por email. Solo usuarios autorizados.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Palette,
    title: "Diseño Premium",
    description: "Glassmorphism, modo oscuro puro, gradientes dinámicos y micro-animaciones de primer nivel.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Brain,
    title: "Cerebro Multimodal",
    description: "Procesa simultáneamente texto, imagen y audio con razonamiento profundo e inteligente.",
    gradient: "from-secondary to-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-heading font-semibold tracking-widest uppercase text-sm mb-4">
            Características
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Potencia <span className="text-gradient">sin límites</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada función ha sido diseñada para ofrecer una experiencia de IA premium, rápida y accesible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-7 group hover:glow-primary transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
