import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Shield, Wrench, X, Maximize2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

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
  }
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("robotics");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const selectedCategoryData = productCategories.find(cat => cat.id === selectedCategory);
  const previewProduct = previewIndex !== null ? selectedCategoryData?.products[previewIndex] ?? null : null;

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

        {/* Category Tabs (only shown when there is more than one category) */}
        {productCategories.length > 1 && (
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
        )}

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
                      className={`relative h-[243px] overflow-hidden rounded-t-2xl cursor-zoom-in ${product.fit === "contain" ? "bg-muted/40" : ""}`}
                      onClick={() => setPreviewIndex(i)}
                    >
                      <div className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </div>
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

      {/* Image Lightbox (about half the screen) */}
      <DialogPrimitive.Root open={previewProduct !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] md:w-[50vw] max-w-3xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300">
            <div className="overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-black/5">
              {/* Image stage */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-background to-muted/40 px-6 pt-10 pb-6 md:px-10">
                {previewProduct && (
                  <img
                    src={previewProduct.image}
                    alt={previewProduct.title}
                    className="w-full h-auto max-h-[50vh] object-contain drop-shadow-xl select-none"
                    draggable={false}
                  />
                )}
                <DialogPrimitive.Close className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-md bg-card/90 text-foreground shadow-md ring-1 ring-border hover:bg-accent hover:text-accent-foreground hover:ring-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <X className="w-4 h-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              {/* Caption */}
              <div className="flex items-center gap-4 border-t border-border px-6 py-4 md:px-8">
                <div className="w-1 self-stretch rounded-full bg-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium mb-1">
                    {selectedCategoryData?.title}
                  </p>
                  <DialogPrimitive.Title className="text-base md:text-lg font-serif font-bold text-foreground leading-snug">
                    {previewProduct?.title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    Enlarged product image
                  </DialogPrimitive.Description>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0 text-xs">
                  <span className="flex items-center gap-1 text-accent">
                    <Target className="w-3 h-3" /> Defence Ready
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    <Shield className="w-3 h-3" /> Military Grade
                  </span>
                </div>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
};

export default ProjectsSection;
