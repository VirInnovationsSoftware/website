import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="font-serif text-xl font-bold tracking-tight text-primary-foreground">Militros</Link>
            <p className="text-xs text-primary-foreground/50 mt-3 leading-relaxed">
              Designing for a smarter, safer, future-ready tomorrow.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/70">Company</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/50">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary-foreground transition-colors">Projects</a></li>
              <li><a href="#careers" className="hover:text-primary-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/70">Expertise</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/50">
              <li><a href="#domains" className="hover:text-primary-foreground transition-colors">Defence Systems</a></li>
              <li><a href="#domains" className="hover:text-primary-foreground transition-colors">AI & Emerging Tech</a></li>
              <li><a href="#capabilities" className="hover:text-primary-foreground transition-colors">Capabilities</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-primary-foreground/70">Contact</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/50">
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Get In Touch</Link></li>
              <li>admin@militros.ai</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Militros — All rights reserved.
            <span className="mx-2">·</span>
            <Link to="/admin/login" className="hover:text-primary-foreground transition-colors">Staff login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
