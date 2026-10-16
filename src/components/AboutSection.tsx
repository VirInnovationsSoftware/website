import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Shield, Wrench, Brain, Zap, Users, Award, Lightbulb } from "lucide-react";

const coreValues = [
  {
    icon: Heart,
    title: "Passion",
    description: "Deep commitment to every problem we solve — driven by purpose, not just process."
  },
  {
    icon: Shield,
    title: "Integrity", 
    description: "We hold ourselves accountable — to our clients, our team, and the mission."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Challenging conventional thinking to deliver breakthrough solutions that matter."
  },
  {
    icon: Award,
    title: "Quality",
    description: "Uncompromising standards — because lives depend on what we build."
  },
  {
    icon: Brain,
    title: "Evolve",
    description: "Continuously learning, adapting, and growing in a rapidly changing world."
  }
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-50 via-green-50 to-emerald-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Gradient Orbs */}
        <motion.div
          style={{ y: floatY1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: floatY2 }}
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: floatY3 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-lime-300/20 to-green-300/20 rounded-full blur-3xl"
        />
        
        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-32 right-32 w-32 h-32 border-2 border-orange-300/30"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-20 w-24 h-24 border-2 border-green-300/30"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p 
            className="text-xs tracking-[0.3em] uppercase text-orange-600 font-medium mb-4 inline-block"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Militros
          </motion.p>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Who We Are
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg max-w-none mb-16"
          >
            <p className="text-gray-700 leading-relaxed text-lg mb-5">
              Founded in 2025 and headquartered in Hyderabad, Militros is a performance-driven product design and development company. We are a team of young pioneers committed to solving complex problems at the intersection of defence and everyday life.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-5">
              Our core strength is unmanned ground robotics. Our UGV portfolio spans the Multi Utility Unmanned Ground Vehicle (MU-UGV), Tactical Combat Robot, Ground Control Station, Smart Target System and Stair Climbing Robot, built for payload delivery, surveillance, ordnance disposal, casualty evacuation and firing-range training. We hold Joint Development Partner status with the Indian Army, and our systems are certified for deployment with Indian Army forces.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              We take every product from concept to field-ready system in-house, covering mechanical design, electronics and hardware integration, embedded software and AI. Beyond defence, we apply the same engineering to agri technology and applied research.
            </p>
          </motion.div>
        </motion.div>

        {/* What Drives Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            What Drives Us
          </motion.h3>
          
          <motion.p 
            className="text-gray-700 leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            We operate at the frontier of accelerated technological progress — designing smarter, safer, and more efficient alternatives to existing defence systems. Our work goes beyond engineering; it is a mission to make the world a more secure place for every individual.
          </motion.p>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Our Vision & Mission
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: 15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0, type: "spring" }}
              whileHover={{ x: 10, rotateY: 5 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/30"
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider">
                VISION
              </h4>
              <h5 className="text-xl font-serif font-bold text-red-800 mb-4">
                Leading Innovator in Defence Technology
              </h5>
              <p className="text-gray-700 leading-relaxed">
                To become a globally recognized innovator — ensuring our advanced automation solutions enhance security, efficiency, and resilience across modern defence and civilian life.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
              whileHover={{ x: -10, rotateY: -5 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30"
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wider">
                MISSION
              </h4>
              <h5 className="text-xl font-serif font-bold text-green-800 mb-4">
                Cutting-Edge Technology for a Safer World
              </h5>
              <p className="text-gray-700 leading-relaxed">
                Develop high-impact defence technologies that bring automation, enhance security, protect lives, and drive meaningful innovation — one breakthrough at a time.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-12">
            <motion.h3 
              className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Our Core Values
            </motion.h3>
            <motion.p 
              className="text-gray-700 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Five principles that define how we think, build, and deliver — every single day.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: 1.7 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }
                  } : {}}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h4 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
