import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gunmetal via-olive to-slate-blue" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-primary-foreground/70 text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-medium mb-6"
        >
          Robotics · Defence · AI · IoT
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground tracking-tight leading-tight max-w-5xl"
        >
          Designing for a Smarter,<br />Safer Tomorrow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-primary-foreground/80 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          Innovation happens by building the future — not refining the past.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#capabilities">
            <Button variant="hero" size="lg">
              Explore Capabilities
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="heroOutline" size="lg">
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
