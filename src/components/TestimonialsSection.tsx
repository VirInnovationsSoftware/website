import { Quote, Star, Target, Truck } from "lucide-react";

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
  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Defence Leaders
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what military organizations and defence partners say about our technology solutions and mission-critical systems.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative text-center p-6 md:p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 min-w-[240px] md:min-w-[280px] max-w-[320px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-accent mb-2 uppercase tracking-wider">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </div>

                {/* Decorative Bottom Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-0.5 bg-gradient-to-r from-accent to-primary" />
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              {/* Card Background Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-3xl blur opacity-10"></div>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
