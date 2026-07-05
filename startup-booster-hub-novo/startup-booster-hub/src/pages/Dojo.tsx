import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { 
  Users, 
  Calendar, 
  Target, 
  Shield, 
  Lightbulb, 
  ArrowRight,
  Check,
  Clock,
  UserCheck,
  Sparkles
} from "lucide-react";
import dojoLogo from "@/assets/logo-dojo-black.png";
import dojoLogoWhite from "@/assets/logo-dojo-white.png";

const features = [
  {
    icon: Calendar,
    title: "1 Encontro Mensal",
    description: "Com mentor líder + grupo de fundadores (2h)"
  },
  {
    icon: UserCheck,
    title: "2 Mentorias Individuais",
    description: "Por mês com mentores especialistas (1h cada)"
  },
  {
    icon: Users,
    title: "Agenda Colaborativa",
    description: "Acesso a mentores especialistas sob demanda"
  },
  {
    icon: Shield,
    title: "Curadoria e Suporte",
    description: "Acompanhamento da comunidade Brasil Startups"
  },
];

const benefits = [
  {
    icon: Target,
    title: "Mentoria Estratégica Personalizada"
  },
  {
    icon: Users,
    title: "Conexão com Outros Fundadores"
  },
  {
    icon: Sparkles,
    title: "Aceleração do Crescimento"
  },
  {
    icon: Shield,
    title: "Ambiente Seguro e Confidencial"
  },
  {
    icon: Lightbulb,
    title: "Curadoria Baseada nas Dores Reais"
  },
];

const forWho = [
  "Estratégia e clareza na tomada de decisão",
  "Aprendizado prático com quem já viveu o jogo",
  "Apoio em desafios reais de crescimento",
  "Networking e conexões com outros empreendedores"
];

const Dojo = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dojo Brasil Startups | Capacitação e Mentoria para Empreendedores"
        description="Programa de mentoria mensal e individual para fundadores de startups. Encontros com mentores líderes, networking e suporte da comunidade Brasil Startups."
        image="og-dojo.jpg"
        path="/dojo"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* DOJO Logo */}
            <div className="mb-8 animate-fade-up">
              <img 
                src={dojoLogoWhite} 
                alt="DOJO" 
                className="h-20 md:h-28 w-auto mx-auto"
              />
            </div>
            
            <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 animate-fade-up stagger-1">
              Conselho para Startups
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6 animate-fade-up stagger-2">
              Apoio estratégico contínuo para o crescimento da sua startup
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8 animate-fade-up stagger-3">
              Startups crescem mais rápido com acesso a mentores experientes, 
              networking de qualidade e visão estratégica.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
              >
                <a href="https://wa.me/5561981626100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Quero Participar <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* O que é o DOJO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <img 
                src={dojoLogo} 
                alt="DOJO" 
                className="h-16 w-auto mx-auto mb-6"
              />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                O que é o DOJO?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                O DOJO é um programa exclusivo que conecta você com mentores experientes 
                e outros fundadores em uma jornada de evolução estratégica.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Metodologia
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Como Funciona
              </h2>
              <p className="text-lg text-muted-foreground">
                1 Ciclo = 1 mês renovável
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  Encontro Mensal (2h)
                </h3>
                <p className="text-muted-foreground text-sm">
                  Com mentor líder e todos os membros do conselho
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  Mentorias Quinzenais (1h)
                </h3>
                <p className="text-muted-foreground text-sm">
                  Mentores especialistas sob demanda, via agendamento colaborativo
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  Turmas de 8-10 Fundadores
                </h3>
                <p className="text-muted-foreground text-sm">
                  Formato dinâmico, prático e altamente personalizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  Público-alvo
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                  Para Quem é o Conselho?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ideal para fundadores que buscam:
                </p>
                <ul className="space-y-4">
                  {forWho.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="p-4 rounded-xl bg-card border border-border text-center animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <benefit.icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {benefit.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investimento */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              Vagas Limitadas
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4">
              Investimento
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Turmas pequenas. Alta qualidade. Alta entrega.
            </p>
            
            <div className="bg-background/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-primary-foreground/20">
              <div className="text-5xl font-display font-bold text-primary-foreground mb-2">
                R$ 699
              </div>
              <p className="text-primary-foreground/80 mb-6">/mês</p>
              
              <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
                <li className="flex items-center gap-3 text-primary-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  1 encontro de conselho com mentor líder
                </li>
                <li className="flex items-center gap-3 text-primary-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  2 mentorias individuais com mentores especialistas
                </li>
                <li className="flex items-center gap-3 text-primary-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  Acesso à rede e à comunidade
                </li>
                <li className="flex items-center gap-3 text-primary-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  Curadoria e acompanhamento Brasil Startups
                </li>
              </ul>
              
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10"
              >
                <a href="https://wa.me/5561981626100" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Fazer Minha Aplicação <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-foreground/80 text-sm">
              <span>➡ Início de novos ciclos todo mês</span>
              <span className="hidden sm:block">•</span>
              <span>➡ Vagas por ordem de inscrição</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dojo;
