import { CaseStudiesSection } from "@/components/sections/case-studies";
import { CtaSection } from "@/components/sections/cta";
import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
