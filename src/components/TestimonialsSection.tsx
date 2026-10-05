import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, Target, Users, Truck } from "lucide-react";

interface Testimonial {
  name: string;
  position: string;
  organization: string;
  content: string;
  rating: number;
  metrics: Record<string, string>;
}

const testimonials: Testimonial[] = [
];

const stats = [
  {
    icon: Target,
    value: "99.7%",
    label: "Accuracy Rate",
    description: "Average system precision"
  },
  {
    icon: Truck,
    value: "15+",
    label: "Projects Delivered",
    description: "Successfully delivered projects"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Client Rating",
    description: "Average satisfaction score"
  }
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Defence Leaders
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what military organizations and defence partners say about our technology solutions and mission-critical systems.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
                animate={inView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: { 
                    duration: 0.8, 
                    delay: 0.3 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                } : {}}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative text-center p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 min-w-[240px] md:min-w-[280px] max-w-[320px]"
              >
                {/* Animated Icon Container */}
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                {/* Animated Value */}
                <motion.div 
                  className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={inView ? { 
                    scale: [0, 1.2, 1],
                    transition: { 
                      duration: 0.6, 
                      delay: 0.8 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }
                  } : {}}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.div>

                {/* Label with Hover Effect */}
                <motion.div 
                  className="text-sm font-semibold text-accent mb-2 uppercase tracking-wider"
                  whileHover={{ scale: 1.05, x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.label}
                </motion.div>

                {/* Description */}
                <motion.div 
                  className="text-xs text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={inView ? { 
                    opacity: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: 1.0 + index * 0.15
                    }
                  } : {}}
                >
                  {stat.description}
                </motion.div>

                {/* Decorative Bottom Line */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-primary"
                  whileHover={{ 
                    width: "80%",
                    transition: { duration: 0.3 }
                  }}
                  style={{ width: inView ? "60%" : "0%" }}
                  animate={{ 
                    width: ["0%", "60%", "60%"],
                    transition: { 
                      duration: 0.8, 
                      delay: 1.2 + index * 0.15,
                      ease: "easeOut"
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="relative group"
            >
              {/* Card Background with Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

              <div className="relative bg-card border border-border rounded-3xl p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-8 h-8 text-accent/30" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg text-foreground leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-accent">{testimonial.position}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.organization}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-sm font-semibold text-accent">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
