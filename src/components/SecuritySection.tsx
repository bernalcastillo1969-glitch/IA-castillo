import { motion } from "framer-motion";
import { Shield, Server, Activity } from "lucide-react";

const SecuritySection = () => {
  return (
    <section id="security" className="py-24 md:py-32 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-heading font-semibold tracking-widest uppercase text-sm mb-4">
            Seguridad
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Infraestructura <span className="text-gradient">blindada</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tus datos están protegidos con los más altos estándares de seguridad en la industria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
              RLS Activado
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Row Level Security en Supabase. Los datos de cada usuario están blindados e inaccesibles para terceros.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Server className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
              Cloud-Native
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ejecutado en infraestructura Vercel con estabilidad global y actualizaciones en tiempo real.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-8 text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
              Monitoreo 24/7
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Panel de administración para monitorear rendimiento y actividad del sistema en tiempo real.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
