import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Inicio", href: "#" },
  { label: "Características", href: "#features" },
  { label: "Arquitectura", href: "#architecture" },
  { label: "Seguridad", href: "#security" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">IA</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground">
            IA Castillo
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://ia-castillo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Probar Ahora
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://ia-castillo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-heading font-semibold text-sm"
              >
                Probar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
