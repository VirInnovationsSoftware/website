import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Cpu, Settings, Zap, Sprout, FlaskConical } from "lucide-react";

const domains = [
  {
    icon: Shield,
    title: "Defence Systems",
    description: "Future-ready reconnaissance, intelligence, surveillance, and border deployment systems used by defence organisations.",
  },
  {
    icon: Cpu,
    title: "AI & Emerging Tech",
    description: "Machine learning platforms, autonomous decision-support systems, and predictive intelligence for mission-critical operations.",
  },
  {
    icon: Settings,
    title: "Robotics Technology",
    description: "End-to-end product engineering with hardware integration, mechanical design, and robotics-ready prototyping.",
  },
  {
    icon: Zap,
    title: "Product Development",
    description: "From concept to market — electric vehicles, healthcare tech, robotics, and industrial automation solutions.",
  },
  {
    icon: Sprout,
    title: "Agri Technology",
    description: "Smart farming solutions with field robotics, sensor-based crop monitoring, and automation that improve yield and reduce manual effort.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description: "Applied R&D in robotics, AI, and embedded systems, turning new ideas into tested prototypes in collaboration with academia and industry.",
  },
];

const DomainsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="domains" className="py-16 bg-section-alt relative overflow-hidden">
      {/* Animated flowing background */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ x: backgroundX }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-transparent to-primary/30" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-accent rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4 inline-block"
            initial={{ opacity: 0, x: -40, rotateZ: -5 }}
            animate={inView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
          >
            Core Domains
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Multi-Domain Expertise
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-8">
          <AnimatePresence>
            {domains.map((domain, i) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    delay: i * 0.08,
                    ease: "easeOut"
                  }
                } : {}}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredDomain(i)}
                onHoverEnd={() => setHoveredDomain(null)}
                exit={{ opacity: 0, y: 20 }}
                className={`bg-card border p-8 cursor-pointer transition-all duration-300 w-full h-full ${
                  hoveredDomain === i 
                    ? 'border-accent/50 shadow-lg bg-gradient-to-br from-card to-accent/3' 
                    : 'border-border hover:border-accent/30'
                }`}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{
                    scale: hoveredDomain === i ? 1.1 : 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="mb-5"
                >
                  <domain.icon className={`h-10 w-10 transition-colors duration-300 ${
                    hoveredDomain === i ? 'text-primary' : 'text-accent'
                  }`} strokeWidth={1.5} />
                </motion.div>
                <motion.h3 
                  className="text-base font-serif font-bold text-foreground mb-3"
                  animate={{
                    color: hoveredDomain === i ? "hsl(var(--primary))" : "hsl(var(--foreground))"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {domain.title}
                </motion.h3>
                <motion.p 
                  className="text-sm text-muted-foreground leading-relaxed"
                  animate={{
                    opacity: hoveredDomain === i ? 1 : 0.85
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {domain.description}
                </motion.p>
                
                {/* Classic hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredDomain === i ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
