import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BrandsMarquee from './sections/BrandsMarquee';
import FeaturesSection from './sections/FeaturesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import DifferentialsSection from './sections/DifferentialsSection';
import BenefitsSection from './sections/BenefitsSection';
import DeliverySection from './sections/DeliverySection';
import VideoShowcaseSection from './sections/VideoShowcaseSection';
import PricingSection from './sections/PricingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        <HeroSection />
        <BrandsMarquee />
        <FeaturesSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <BenefitsSection />
        <DeliverySection />
        <VideoShowcaseSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
