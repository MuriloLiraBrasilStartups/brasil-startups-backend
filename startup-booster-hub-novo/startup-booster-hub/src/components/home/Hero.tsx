import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, TrendingUp, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroBackdrop from "@/assets/hero-backdrop.gif";

const partners = [
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Zendesk", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
];

export const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Users, value: "500+", label: t("hero.stats.startups") },
    { icon: Award, value: "R$180k", label: t("hero.stats.benefits") },
    { icon: TrendingUp, value: "50+", label: t("hero.stats.events") },
    { icon: Rocket, value: "10", label: t("common.years", "Anos") },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Backdrop */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBackdrop}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent backdrop-blur-sm animate-fade-up mb-8">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">{t("hero.badge")}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight animate-fade-up stagger-1 max-w-4xl">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mt-6 animate-fade-up stagger-2">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 animate-fade-up stagger-3">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-xl shadow-glow hover-lift"
            >
              <Link to="/planos" className="flex items-center gap-2">
                {t("hero.cta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent/30 text-foreground hover:bg-accent/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
            >
              <Link to="/dojo" className="flex items-center gap-2">
                {t("hero.ctaSecondary")}
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16 animate-fade-up stagger-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center backdrop-blur-sm bg-background/20 rounded-xl p-4">
                <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm text-muted-foreground mb-8 animate-fade-up">
            {t("hero.partners")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 animate-fade-up stagger-1">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="hsl(var(--muted))"
            fillOpacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
};
