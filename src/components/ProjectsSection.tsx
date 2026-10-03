import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Zap, Target, Shield, Wrench, Brain, CircuitBoard, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Product = {
  title: string;
  image: string;
  // "contain" shows the whole image instead of cropping it to fill the card
  fit?: "contain";
  description: string;
  specs: string[];
};

const productCategories: { id: string; title: string; icon: typeof Wrench; image?: string; products: Product[] }[] = [
  {
    id: "robotics",
    title: "Robotics – UGV",
    icon: Wrench,
    products: [
      {
        title: "Multi Utility Unmanned Ground Vehicle (MU-UGV)",
        image: "/project-images/Slide 11 - MU-UGV 3.png",
        description: "A versatile robotic platform built for mission-critical support in payload delivery, ordnance disposal, and casualty evacuation. Versatile multi-role platform for defense and support with 120 kg payload at 9 kmph, built to perform under pressure. Features secure RF communication with seamless Army radio integration and live video & telemetry streaming. Available attachments include robotic arm, ground penetrating radar, and tethered drone power supply. Trusted by Indian Army with Joint Development Partner status.",
        specs: ["120 kg payload at 9 kmph", "Secure RF communication", "Army radio integration", "Live video & telemetry", "Robotic arm attachment", "Ground Penetrating Radar", "Tethered drone power supply", "Indian Army deployment"]
      },
      {
        title: "Tactical Combat Robot",
        image: "/project-images/Slide 12 - TCR.png",
        description: "Mission-ready force multiplier. An offensive unmanned ground system designed to gather intelligence, support target engagement, and operate in high-risk environments such as war zones, counter-terrorism, and counter-insurgency missions where soldiers face direct fire. Protecting front-line soldiers and saving lives.",
        specs: ["EO-IR system", "LMG & MMG weapon systems compatible", "Control Range: 3 km smart radio link", "Target detection and tracking", "Day/night identification", "Distance measurement", "Payload delivery up to 60 kg", "Ammunition counter"]
      },
      {
        title: "Ground Control Station",
        image: "/project-images/Slide 12 - TCR GCS.png",
        description: "Advanced command and control center for operations. Provides real-time video streaming, telemetry monitoring, and intuitive control interfaces for seamless remote operation in tactical environments. Enables battlefield coordination with secure communication links for enhanced mission effectiveness.",
        specs: ["Real-time video streaming", "Telemetry data monitoring", "Remote control interface", "3 km control range", "Secure communication", "Battlefield coordination", "TCR integration", "Mission planning interface"]
      },
      {
        title: "Smart Target System",
        image: "/project-images/Smarttargetsystem.png",
        description: "A cutting-edge mobile robotic target platform designed to simulate real combat scenarios in all terrains and weather conditions. Combines smart automation, robust design, and real-time feedback for enhanced firing range training and tactical evaluation.",
        specs: ["Mobile Platform", "Armour Protection (5.56/7.62/9mm)", "GPS Navigation", "Self-healing Mannequins", "1hr Battery Backup", "Real-time Mapping"]
      },
      {
        title: "Stair Climbing Robot",
        image: "/project-images/Slide 14 - Stair Climbing Robot.png",
        description: "A compact, man-portable tactical surveillance robot designed to climb stairs and provide real-time video feed to commanders during CI/CT operations, especially in NER, northern regions, and urban warfare scenarios.",
        specs: ["Dimensions: 250 × 400 × 250 mm; 18 kg", "Advanced stair-climbing mechanism", "360° camera with pistol mount", "Day/night operation with live video", "Secure wireless communication", "Intuitive handheld controller"]
      }
    ]
  },
  {
    id: "iot",
    title: "Internet of Things",
    icon: CircuitBoard,
    image: "/dti-images/internetofthings.png",
    products: [
            {
        title: "Integrated Fire Detection and suppression System",
        image: "/project-images/Slide 15 - IFDSS.png",
        description: "The primary objective of IFDSS is to provide a rapid, reliable, and automated fire detection and suppression solution for armored and military vehicles, ensuring the safety of personnel and protection of critical systems during combat or operational scenarios.",
        specs: ["IR Flame Sensors", "Thermal Detection", "Automated Suppression", "Audio-Visual Alerts", "Up to 8 Sensors", "IP65 Protection"]
      },
      {
        title: "EO-IR System",
        image: "/project-images/Slide 18 - EOIR.png",
        description: "A compact EOIR payload combining HD day optical zoom camera, thermal imaging, and laser range finding for day/night surveillance and AI-based target tracking. Designed for turret, UGV, RCWS and perimeter security integration.",
        specs: ["1080p @ 60fps", "40x Optical Zoom", "LWIR Thermal", "Laser Range Finder", "AI Detection", "Ethernet & USB"]
      },
      {
        title: "Roads that Honk",
        image: "/project-images/roadsthathonk.png",
        description: "An innovative road-safety intervention deploying radar-enabled smart poles on hazardous hairpin bends (e.g. Jammu-Srinagar highway), one of the world's deadliest routes. These poles measure vehicle speed, communicate across bends, and emit a loud honking alert to oncoming drivers, prompting them to slow down before risk zones.",
        specs: ["Speed Sensing Radar", "180m Range", "P10 LED Traffic Light", "Solar Power Backup", "-40°C to +50°C", "30°×16° Field of View"]
      },
      {
        title: "81mm Mortar Telemetry Bomb",
        image: "/project-images/3.81mm Mortar Telemetry System.jpeg",
        description: "A telemetry-enabled 81mm mortar bomb designed for live tracking of projectile flight in real time. It transmits encrypted GNSS-based positional data to a receiver station for trajectory analysis and training support.",
        specs: ["GNSS Tracking", "≤5m Accuracy", "VHF/UHF Transmission", "5km LoS Range", "Telemetry Data Output", "IP65 Receiver"]
      },
    ]
  },
  {
    id: "simulators",
    title: "Simulators",
    icon: Brain,
    products: [
      {
        title: "Simple Driving Simulator / Universal Driving Simulator",
        image: "/project-images/Simpledrvingsimulater.png",
        description: "A portable, steel-framed driving simulator equipped with essential vehicle controls and a 32\" display. Designed to train learners in basic handling and maneuvering techniques in a controlled, fuel-free environment.",
        specs: ["Dimensions: 1800L×1000W×1800H mm", "Steel Frame", "32\" LED Display", "Steering, Gear, Accelerator", "Adjustable Seat", "1 KVA UPS"]
      },
      {
        title: "VR Based Training Simulator",
        image: "/project-images/Slide 21 - VR based Training Simulator(1).png",
        description: "Compact, immersive VR simulator with 3DOF motion (pitch, roll, yaw) for realistic training across driving and flight scenarios, delivering high-fidelity visuals and responsive motion feedback.",
        specs: ["Vehicle Types: Light vehicles, trucks, armored units, flight & helicopter", "VR Cabin: Ergonomic cockpit with steering/flight controls, pedals, and VR headset integration", "Instructor Station: Scenario creation, trainee monitoring, performance analytics, fault injection", "Display System: High-resolution VR headset with 360° immersive environment", "Motion System (3DOF): Pitch, roll, yaw with speeds up to 160°/s (roll/pitch) & 360°/s (yaw)", "Terrains & Modes: Urban, desert, mountain, off-road; day/night cycles with dynamic lighting"]
      },
      {
        title: "Recovery Training Simulator",
        image: "/project-images/recoverytraining-v2.png",
        description: "Advanced recovery training simulator for military vehicle operators, focusing on vehicle recovery techniques, towing operations, and emergency response procedures in various terrain conditions.",
        specs: ["Recovery Operations", "Towing Training", "Emergency Response", "Terrain Simulation", "Instructor Control", "Performance Metrics"]
      },
      {
        title: "Hill Driving Training Simulator",
        image: "/project-images/armytrucksimulator.png",
        description: "Specialized simulator for hill driving training, designed to prepare military drivers for challenging mountain terrains, steep gradients, and adverse weather conditions encountered in high-altitude operations.",
        specs: ["Hill Terrain Simulation", "Gradient Training", "Weather Effects", "Altitude Simulation", "Safety Systems", "Real-time Feedback"]
      }
    ]
  },
  {
    id: "fire-control",
    title: "Fire Control Systems",
    icon: Lock,
    products: [
      {
        title: "ASTRA-E",
        image: "/project-images/ASTRAE.png",
        description: "ASTRA-E is a lightweight, AI-powered electro-optic module equipped with picatinny rail for easy mount. It integrates real-time human detection, laser range finding, and wireless communication to assist shooters with precision targeting and commander-level situational awareness.",
        specs: ["<800g Weight", "50mm Lens Camera", "10 TOPS AI Processor", "3.2\" Display", "Laser Range Finder", "Secure Wireless"]
      },
            {
        title: "AI Based automated Target tracking NSVT for TK-90",
        image: "/project-images/Slide 23 - NSVT(1).png",
        description: "An IP-65 rated autonomous drone detection and neutralization system using AI-powered vision, seamlessly integrated with the T-90 AA turret for real-time threat engagement comprising the EOIR and GCS.",
        specs: ["AI-Driven Detection", "Real-time Tracking", "Integrated Turret Control", "EO-IR System", "Ethernet & USB", "70m Range"]
      },
      {
        title: "Remote Controlled Weapon System – LMG/MMG",
        image: "/project-images/Slide 24 - RCWS.png",
        description: "Remote Controlled Weapon System (RCWS) is a modular, AI enabled enemy detection and tracking system that can be controlled and fired at the enemy via GCS from distance of up to 1 KM.",
        specs: ["Modular Platform", "LMG/MMG Compatible", "1 KM Range", "AI Detection", "Solar Power Compatible", "IP Compatible"]
      },
      {
        title: "Ten AI Weapon System (TAIWS)",
        image: "/project-images/Slide 25 - TAIWS(1).png",
        description: "TAIWS is AI-based weapon system designed to enhance border surveillance and counter-infiltration operations. The system integrates advanced secondary vision technology (thermal and optical sensors) with a machine gun to enable target detection and engagement in low-visibility, rugged terrains like those along the LoC.",
        specs: ["AI Integration", "Thermal Camera (2km)", "Optical Camera", "LoC Surveillance", "IP65 Rating", "Machine Gun Integration"]
      }
    ]
  }
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("robotics");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  const selectedCategoryData = productCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-section-alt relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            Our Product Offerings
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Defence Technology Solutions Delivered
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {productCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-card border border-border hover:border-accent text-foreground hover:text-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {category.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch"
        >
          {selectedCategoryData?.products.map((product, i) => {
            const isHovered = hoveredProduct === i;

            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative group cursor-pointer h-full flex flex-col"
                onHoverStart={() => setHoveredProduct(i)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                {/* Main Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-card border border-border rounded-2xl group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Product Image */}
                  {product.image && (
                    <div
                      className={`h-[243px] overflow-hidden rounded-t-2xl cursor-zoom-in ${product.fit === "contain" ? "bg-muted/40" : ""}`}
                      onClick={() => setPreviewImage({ src: product.image, title: product.title })}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`w-full h-full ${product.fit === "contain" ? "object-contain" : "object-cover"} group-hover:scale-102 transition-transform duration-500`}
                      />
                    </div>
                  )}

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20"></div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Product Title */}
                    <motion.h3
                      className="text-lg font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors relative z-10"
                      animate={isHovered ? { x: 2 } : { x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10"
                      animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Specifications */}
                    <div className="space-y-2 mb-4 relative z-10">
                      <h4 className="text-xs font-semibold text-accent uppercase tracking-widest">Key Specifications</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {product.specs.map((spec, specIndex) => (
                          <motion.div
                            key={specIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                            transition={{ duration: 0.3, delay: specIndex * 0.05 }}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            <span>{spec}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Details */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={isHovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 -mt-2 -translate-y-[30%] border-t border-border/50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs px-2">
                      <div className="flex items-center gap-1 text-accent truncate">
                        <Target className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Defence Ready</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary truncate">
                        <Shield className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Military Grade</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Full Image Preview (30% larger than the card image) */}
      <Dialog open={previewImage !== null} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-[586px] p-3 gap-3">
          <DialogTitle className="pr-8 text-base">{previewImage?.title}</DialogTitle>
          {previewImage && (
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
