import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Areas } from "@/components/home/Areas";
import { BenefitsPreview } from "@/components/home/BenefitsPreview";
import { DojoSection } from "@/components/home/DojoSection";
import { CTA } from "@/components/home/CTA";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Brasil Startups – Associação que Inspira, Capacita e Conecta Startups"
        description="A Brasil Startups promove inovação e desenvolvimento de startups no Brasil e no mundo. Programas de capacitação, investimento e acesso ao setor público."
        image="og-home.jpg"
        path="/"
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Areas />
        <BenefitsPreview />
        <DojoSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
