import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <Services />
      <Work />
      <AboutSection />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  );
}
