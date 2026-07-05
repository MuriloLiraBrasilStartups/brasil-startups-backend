import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, Calculator, ArrowRight, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";

const plans = [
  {
    id: "trailblazer",
    name: "Trailblazer",
    price: 29,
    descriptionKey: "trailblazer",
    color: "from-blue-500 to-cyan-500",
    paymentLink: "https://pag.ae/81otZUEhR",
    features: {
      comunidade: true,
      eventos: true,
      networking: true,
      descontosBasicos: true,
      dojo: false,
      mentoria: false,
      beneficiosPremium: false,
      suporteVip: false,
    },
  },
  {
    id: "builders",
    name: "Builders",
    price: 49,
    descriptionKey: "builders",
    popular: true,
    color: "from-accent to-sky-light",
    paymentLink: "https://pag.ae/81otZaqTR",
    features: {
      comunidade: true,
      eventos: true,
      networking: true,
      descontosBasicos: true,
      dojo: true,
      mentoria: true,
      beneficiosPremium: false,
      suporteVip: false,
    },
  },
  {
    id: "miners",
    name: "Miners",
    price: 99,
    descriptionKey: "miners",
    color: "from-gold to-gold-light",
    paymentLink: "https://pag.ae/81ot-xJ7R",
    features: {
      comunidade: true,
      eventos: true,
      networking: true,
      descontosBasicos: true,
      dojo: true,
      mentoria: true,
      beneficiosPremium: true,
      suporteVip: true,
    },
  },
];

const benefits = [
  { name: "AWS Activate", value: 100000, category: "Cloud" },
  { name: "Microsoft for Startups", value: 50000, category: "Cloud" },
  { name: "Google Cloud", value: 20000, category: "Cloud" },
  { name: "HubSpot", value: 15000, category: "CRM" },
  { name: "Zendesk", value: 10000, category: "Suporte" },
  { name: "Stripe", value: 5000, category: "Pagamentos" },
  { name: "Twilio", value: 3000, category: "Comunicação" },
  { name: "Conta Azul", value: 2000, category: "Financeiro" },
];

const Planos = () => {
  const { t } = useTranslation();
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const totalSavings = useMemo(() => {
    return benefits
      .filter((b) => selectedBenefits.includes(b.name))
      .reduce((sum, b) => sum + b.value, 0);
  }, [selectedBenefits]);

  const toggleBenefit = (name: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );
  };

  const featureKeys = [
    "comunidade",
    "eventos",
    "networking",
    "descontosBasicos",
    "dojo",
    "mentoria",
    "beneficiosPremium",
    "suporteVip",
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Planos para Startups | Trailblazer, Builders e Miners — Brasil Startups"
        description="Escolha o plano ideal para sua startup: Trailblazer, Builders ou Miners. Acesso a mentoria, benefícios exclusivos, networking e descontos de até R$ 180.000+."
        image="og-planos.jpg"
        path="/planos"
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t("plans.badge")}</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
              {t("plans.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              {t("plans.subtitle")}
            </p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="py-20 -mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-3xl bg-card border-2 transition-all duration-300 hover-lift ${
                    plan.popular ? "border-accent shadow-glow" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                      {t("plans.popular")}
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                    <span className="text-2xl font-display font-bold text-white">
                      {plan.name[0]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t(`plans.planDescriptions.${plan.descriptionKey}`)}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-display font-bold text-foreground">
                      R${plan.price}
                    </span>
                    <span className="text-muted-foreground">{t("plans.monthly")}</span>
                  </div>
                  <Button
                    asChild
                    className={`w-full mb-6 ${
                      plan.popular
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <a
                      href={plan.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("plans.choose")} {plan.name}
                    </a>
                  </Button>
                  <ul className="space-y-3">
                    {featureKeys.map((key) => (
                      <li key={key} className="flex items-center gap-3">
                        {plan.features[key] ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40" />
                        )}
                        <span className={plan.features[key] ? "text-foreground" : "text-muted-foreground/60"}>
                          {t(`plans.features.${key}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Calculator */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
                  <Calculator className="w-4 h-4" />
                  <span className="text-sm font-medium">{t("plans.calculator.badge")}</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                  {t("plans.calculator.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("plans.calculator.subtitle")}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-card border border-border">
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit) => (
                    <button
                      key={benefit.name}
                      onClick={() => toggleBenefit(benefit.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedBenefits.includes(benefit.name)
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{benefit.name}</p>
                          <p className="text-sm text-muted-foreground">{benefit.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-accent">
                            R${benefit.value.toLocaleString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-navy-light text-center">
                  <p className="text-primary-foreground/80 mb-2">{t("plans.calculator.yourSavings")}</p>
                  <p className="text-5xl font-display font-bold text-primary-foreground mb-4">
                    R${totalSavings.toLocaleString("pt-BR")}
                    <span className="text-lg font-normal text-primary-foreground/70">{t("plans.calculator.perYear")}</span>
                  </p>
                  {totalSavings > 0 && (
                    <p className="text-accent">
                      {t("plans.calculator.vsPlans").replace("{times}", String(Math.round(totalSavings / 49)))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              {t("plans.ctaSection.title")}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("plans.ctaSection.subtitle")}
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <a
                href="https://wa.me/5561981626100"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {t("plans.ctaSection.button")} <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Planos;
