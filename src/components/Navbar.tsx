import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../newimages/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // If on a different route, navigate to home first
      if (window.location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleLogoClick = () => {
    // Scroll to top and navigate to home page
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={handleLogoClick} className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          <img src={logo} alt="Militros" className="h-10 w-auto max-w-[180px] object-contain" />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            )
          )}

          <Link to="/contact">
            <Button variant="cta" size="sm">Get in Touch</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-card border-b border-border px-4 pb-6 pt-2">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground border-b border-border last:border-0"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => {
                  handleNavClick(link.href);
                  setOpen(false);
                }}
                className="block py-3 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground border-b border-border last:border-0 bg-transparent border-none cursor-pointer text-left w-full"
              >
                {link.label}
              </button>
            )
          )}

          <Link to="/contact" onClick={() => setOpen(false)}>
            <Button variant="cta" size="sm" className="mt-4 w-full">Get in Touch</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
