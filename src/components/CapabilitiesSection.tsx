import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FlaskConical, CheckCircle, Wrench, Sprout } from "lucide-react";

type Capability = {
  icon: typeof Wrench;
  image?: string;
  title: string;
  description: string;
  points?: string[];
};

const capabilities: Capability[] = [
  {
    icon: Wrench,
    image: "/dti-images/MU-UGV 5.png",
    title: "Defence Robotics – UGV",
    description: "Rugged unmanned ground vehicles that take soldiers out of harm's way in payload delivery, surveillance, ordnance disposal and combat support.",
  },
  {
    icon: Sprout,
    title: "Agri Robotics",
    description: "Bringing our field-proven robotics to agriculture with autonomous platforms for crop monitoring, precision spraying and farm automation that cut manual effort and improve yield.",
  },
  {
    icon: FlaskConical,
    title: "Research Robotics",
    description: "Applied research in autonomy, perception, AI and robotic mobility, building testbeds and prototypes in collaboration with academia and industry to shape our next generation of systems.",
  },
];

const CapabilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="capabilities" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            Segments we bring innovation to
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Defence Technology Innovation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border-t-2 px-4 pt-8 pb-8 group cursor-pointer transition-all duration-300 border-accent/30 hover:border-accent hover:shadow-2xl hover:shadow-accent/20"
            >
              <div className="mb-5 h-[180px] overflow-hidden rounded-lg">
                {cap.image ? (
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 via-muted/40 to-primary/15">
                    <cap.icon className="h-14 w-14 text-accent group-hover:text-primary transition-colors" strokeWidth={1.25} />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cap.description}
              </p>
              {cap.points && (
                <ul className="space-y-3">
                  {cap.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
