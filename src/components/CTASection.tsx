import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-10 md:p-16 text-center glow-primary"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-heading font-medium">Versión 2.0 — Elite Edition</span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Experimenta el futuro
            <br />
            <span className="text-gradient">de la IA</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Únete a IA Castillo y descubre cómo la inteligencia artificial puede 
            transformar tu forma de estudiar y trabajar.
          </p>

          <a
            href="https://ia-castillo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground font-heading font-bold text-lg hover:opacity-90 transition-opacity animate-gradient"
          >
            Comenzar Ahora
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="text-muted-foreground text-sm mt-6">
            Creado por <span className="text-foreground font-semibold">Bernal Castillo</span> · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
