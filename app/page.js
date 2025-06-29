import Features from "@/components/features-1";
import FooterNew from "@/components/footer-new";
import HeroSection from "@/components/hero-section";
import Testimonials from "@/components/testimonials";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Testimonials />
      <CTASection />
      <FooterNew />
    </>
  );
}
