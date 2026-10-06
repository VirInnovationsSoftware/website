import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Linkedin, Mail } from "lucide-react";
import { sendContactMessage } from "@/lib/contact";
import { usePageTitle } from "@/hooks/use-page-title";

const inputClass = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  // Hidden "website" field: people never see it, spam bots tend to fill it in.
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: { target: { value: string } }) => setForm(prev => ({ ...prev, [key]: e.target.value })),
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (trap) { setStatus("sent"); return; }
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your message could not be sent. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return <div role="status" className="rounded-2xl border border-border bg-card p-10 text-center">
      <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-accent" />
      <h2 className="text-xl font-serif font-bold text-foreground">Thank you — your message has been sent.</h2>
      <p className="mt-2 text-sm text-muted-foreground">We'll get back to you at the email address you gave us.</p>
    </div>;
  }

  return <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 text-left md:p-8">
    <h2 className="text-xl font-serif font-bold text-foreground">Send us a message</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <label className="block text-sm text-foreground">Name *<input required maxLength={200} autoComplete="name" {...field("name")} className={inputClass} /></label>
      <label className="block text-sm text-foreground">Email *<input required type="email" maxLength={320} autoComplete="email" {...field("email")} className={inputClass} /></label>
    </div>
    <label className="mt-4 block text-sm text-foreground">Phone (optional)<input type="tel" maxLength={40} autoComplete="tel" {...field("phone")} className={inputClass} /></label>
    <label className="mt-4 block text-sm text-foreground">Message *<textarea required rows={5} maxLength={5000} {...field("message")} className={inputClass} /></label>
    <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website<input tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} /></label>
    {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    <Button type="submit" variant="cta" disabled={status === "sending"} className="mt-6 w-full sm:w-auto">{status === "sending" ? "Sending…" : "Send message"}</Button>
  </form>;
};

const Contact = () => {
  usePageTitle("Contact Militros");
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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative mt-12 max-w-3xl mx-auto"
              >
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
