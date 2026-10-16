import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DomainsSection from "@/components/DomainsSection";
import MissionSection from "@/components/MissionSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import SecuritySection from "@/components/SecuritySection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import CareersSection from "@/components/CareersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DomainsSection />
      <MissionSection />
      <CapabilitiesSection />
      <TechnologyShowcase />
      <ProjectsSection />
      <ResearchSection />
      <SecuritySection />
      <CollaboratorsSection />
      <CareersSection />
      <Footer />
    </div>
  );
};

export default Index;
