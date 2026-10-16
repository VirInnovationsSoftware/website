import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FlaskConical, CheckCircle, Wrench, Radio } from "lucide-react";

const capabilities = [
  {
    icon: Wrench,
    image: "/dti-images/MU-UGV 5.png",
    title: "Robotics – UGV",
    points: ["Multi Utility Unmanned Ground Vehicle (MU-UGV)", "Tactical Combat Robot", "Ground Control Station", "Smart Target System", "Stair Climbing Robot"],
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

        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border-t-2 px-4 pt-8 pb-8 md:px-8 group cursor-pointer transition-all duration-300 border-accent/30 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 md:grid md:grid-cols-2 md:gap-10 md:items-center"
            >
              {cap.image ? (
                <div className="mb-6 md:mb-0 h-[200px] md:h-[300px] overflow-hidden rounded-lg">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <cap.icon className="h-7 w-7 text-accent group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
              )}
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-5 group-hover:text-primary transition-colors">
                  {cap.title}
                </h3>
                <ul className="space-y-3">
                  {cap.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
