import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroAi from "@/assets/hero-ai.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroAi}
          alt="IA Castillo cerebro artificial"
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(220, 80%, 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220, 80%, 60%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-[80px] animate-float pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-accent/10 blur-[60px] animate-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="container max-w-6xl mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground text-sm font-heading font-medium">
                Versión 2.0 — Elite Edition
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-foreground">Tu Asistente</span>
              <br />
              <span className="text-gradient glow-text">IA de Élite</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Ecosistema de Inteligencia Artificial colaborativa. 
              Rápido, empático e increíblemente poderoso.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://ia-castillo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading font-bold hover:opacity-90 transition-opacity glow-primary"
              >
                Probar Ahora
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-foreground font-heading font-semibold hover:bg-muted/50 transition-colors"
              >
                Explorar
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-3 gap-6"
          >
            {[
              { value: "3", label: "Motores IA" },
              { value: "<100ms", label: "Latencia" },
              { value: "24/7", label: "Disponible" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <p className="font-heading text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
