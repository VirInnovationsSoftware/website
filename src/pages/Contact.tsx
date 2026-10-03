import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
                Get In Touch
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
                Get In Touch
              </h1>
              <p className="text-muted-foreground text-lg mb-16 max-w-3xl mx-auto leading-relaxed">
                We are always looking for talented engineers, designers, consultants, and passionate contributors to help us build the future of defence technology. Reach out — let's create something extraordinary together.
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                {/* LinkedIn */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => window.open('https://linkedin.com/company/militros', '_blank')}
                  className="bg-card border border-border p-8 rounded-2xl hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group cursor-pointer"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Linkedin className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                    LinkedIn
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://linkedin.com/company/militros', '_blank');
                    }}
                    className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    Visit LinkedIn
                  </Button>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card border border-border p-8 rounded-2xl hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                    Email
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = 'mailto:admin@militros.ai'}
                    className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    Send Email
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
