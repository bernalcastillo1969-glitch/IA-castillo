const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-[10px]">IA</span>
          </div>
          <span className="font-heading font-bold text-foreground text-sm">IA Castillo</span>
        </div>
        <p className="text-muted-foreground text-xs font-body">
          © {new Date().getFullYear()} Bernal Castillo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
