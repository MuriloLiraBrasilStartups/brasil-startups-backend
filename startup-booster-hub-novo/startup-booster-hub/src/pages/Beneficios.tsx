import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Code, 
  CreditCard, 
  Scale, 
  Megaphone, 
  Users, 
  ArrowRight,
  Check,
  Filter
} from "lucide-react";

const categories = [
  { id: "all", name: "Todos", icon: Filter },
  { id: "cloud", name: "Cloud", icon: Cloud },
  { id: "saas", name: "SaaS", icon: Code },
  { id: "financeiro", name: "Financeiro", icon: CreditCard },
  { id: "juridico", name: "Jurídico", icon: Scale },
  { id: "marketing", name: "Marketing", icon: Megaphone },
  { id: "rh", name: "RH & Gestão", icon: Users },
];

const benefits = [
  {
    name: "AWS Activate",
    category: "cloud",
    value: "US$100.000",
    description: "Créditos para serviços AWS, suporte técnico e treinamentos exclusivos.",
    features: ["Créditos em cloud", "Suporte técnico", "AWS Training"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Microsoft for Startups",
    category: "cloud",
    value: "US$150.000",
    description: "Acesso ao Azure, GitHub Enterprise, Microsoft 365 e suporte técnico.",
    features: ["Azure credits", "GitHub Enterprise", "Microsoft 365"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
  },
  {
    name: "Google Cloud",
    category: "cloud",
    value: "US$100.000",
    description: "Créditos para Google Cloud Platform, Firebase e ferramentas de IA.",
    features: ["GCP credits", "Firebase", "Google AI/ML"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
  },
  {
    name: "HubSpot for Startups",
    category: "saas",
    value: "90% OFF",
    description: "Desconto no primeiro ano em todas as ferramentas de CRM e Marketing.",
    features: ["CRM gratuito", "Marketing Hub", "Sales Hub"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg",
  },
  {
    name: "Zendesk for Startups",
    category: "saas",
    value: "6 meses grátis",
    description: "Plataforma completa de atendimento ao cliente e suporte.",
    features: ["Support Suite", "Chat", "Talk"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg",
  },
  {
    name: "Twilio",
    category: "saas",
    value: "US$2.500",
    description: "Créditos para APIs de comunicação: SMS, voz, vídeo e WhatsApp.",
    features: ["SMS/MMS", "Voice", "WhatsApp API"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg",
  },
  {
    name: "Stripe",
    category: "financeiro",
    value: "Isenção de taxas",
    description: "Processamento de pagamentos sem taxas no primeiro volume.",
    features: ["Payments", "Billing", "Connect"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "L.O. Baptista Advogados",
    category: "juridico",
    value: "30% OFF",
    description: "Assessoria jurídica especializada em startups e venture capital.",
    features: ["Contratos", "M&A", "Propriedade intelectual"],
    logo: "https://lobfranca.com/wp-content/uploads/2024/08/logo-lob-light.svg",
  },
];

const Beneficios = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredBenefits = activeCategory === "all" 
    ? benefits 
    : benefits.filter(b => b.category === activeCategory);

  const totalValue = "R$ 180.000+";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-success/20 text-success text-sm font-medium mb-6 animate-fade-up">
              Benefícios Exclusivos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up stagger-1">
              Mais de {totalValue} em Benefícios
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8 animate-fade-up stagger-2">
              Acesse ferramentas e serviços premium de parceiros líderes de mercado com 
              descontos exclusivos para associados da Brasil Startups.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 animate-fade-up stagger-3"
            >
              <Link to="/planos" className="flex items-center gap-2">
                Ver Planos <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/10"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit, index) => (
              <div
                key={benefit.name}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Logo */}
                <div className="h-12 mb-4 flex items-center">
                  <img 
                    src={benefit.logo} 
                    alt={`${benefit.name} logo`}
                    className="h-8 max-w-[120px] object-contain"
                  />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {benefit.name}
                  </h3>
                  <span className="px-2 py-1 rounded-md bg-success/10 text-success text-sm font-medium">
                    {benefit.value}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {benefit.description}
                </p>

                <div className="space-y-2">
                  {benefit.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
              Quer Acesso a Todos os Benefícios?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Associe-se à Brasil Startups e tenha acesso a mais de R$180.000 em benefícios 
              exclusivos, além de networking, mentorias e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10"
              >
                <Link to="/planos" className="flex items-center gap-2">
                  Ver Planos e Preços <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-10"
              >
                <a href="https://wa.me/5561981626100" target="_blank" rel="noopener noreferrer">
                  Falar com a Equipe
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Beneficios;
