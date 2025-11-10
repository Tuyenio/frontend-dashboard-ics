import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutContactSection from '@/components/landing/AboutContactSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="about">
          <AboutContactSection />
        </section>
      </main>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}

