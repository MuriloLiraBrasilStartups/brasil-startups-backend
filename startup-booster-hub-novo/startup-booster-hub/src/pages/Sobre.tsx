import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Target, Eye, Heart, Users, Globe, Award, Building, Handshake } from "lucide-react";

const Sobre = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "2014", labelKey: "founded" },
    { value: "500+", labelKey: "startups" },
    { value: "50+", labelKey: "events" },
    { value: "R$180M+", labelKey: "benefits" },
  ];

  const values = [
    {
      icon: Target,
      titleKey: "mission",
    },
    {
      icon: Eye,
      titleKey: "vision",
    },
    {
      icon: Heart,
      titleKey: "values",
    },
  ];

  const pillars = [
    { icon: Building, key: "policies" },
    { icon: Award, key: "education" },
    { icon: Globe, key: "internationalization" },
    { icon: Handshake, key: "networking" },
  ];

  const directors = [
    { 
      name: "Monika Heringer", 
      roleKey: "rdDirector",
      linkedin: "https://www.linkedin.com/in/monika-heringer/"
    },
  ];

  const advisors = [
    { 
      name: "Hamilton Felix", 
      roleKey: "advisor",
      linkedin: "https://www.linkedin.com/in/hamiltonfelix2/"
    },
    { 
      name: "Samuel Arantes", 
      roleKey: "advisor",
      linkedin: "https://www.linkedin.com/in/sou-samuel-arantes/"
    },
  ];

  const team = [
    { nameKey: "executive", roleKey: "executive" },
    { nameKey: "fiscal", roleKey: "fiscal" },
    { nameKey: "advisory", roleKey: "advisory" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 animate-fade-up">
              {t("aboutPage.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up stagger-1">
              {t("aboutPage.title")}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto animate-fade-up stagger-2">
              {t("aboutPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.labelKey} 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl lg:text-5xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{t(`aboutPage.stats.${stat.labelKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="animate-fade-up">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                {t("aboutPage.history.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("aboutPage.history.p1")}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t("aboutPage.history.p2")}
              </p>
              <p className="text-lg text-muted-foreground">
                {t("aboutPage.history.p3")}
              </p>
            </div>
            <div className="relative animate-fade-up stagger-2">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary to-navy-light overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-hero-pattern opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="text-2xl font-display font-bold text-primary-foreground">
                      {t("aboutPage.community")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                {t("aboutPage.valuesTitle")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("aboutPage.valuesSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.titleKey}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-all duration-300">
                    <value.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {t(`aboutPage.${value.titleKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`aboutPage.${value.titleKey}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                {t("aboutPage.pillarsTitle")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("aboutPage.pillarsSubtitle")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.key}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {t(`aboutPage.pillars.${pillar.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`aboutPage.pillars.${pillar.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fundo Patrimonial */}
          <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary to-navy-light relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4">
                {t("aboutPage.fund.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
                {t("aboutPage.fund.title")}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-6">
                {t("aboutPage.fund.p1")}
              </p>
              <p className="text-lg text-primary-foreground/80">
                {t("aboutPage.fund.p2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("aboutPage.directorsTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("aboutPage.directorsSubtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            {directors.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-all duration-300">
                  <Users className="w-12 h-12 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-2">
                  {t(`board.roles.${member.roleKey}`)}
                </p>
                <p className="text-sm text-muted-foreground">{t("board.viewLinkedIn")} →</p>
              </a>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              {t("aboutPage.advisorsTitle")}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            {advisors.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-all duration-300">
                  <Users className="w-12 h-12 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-2">
                  {t(`board.roles.${member.roleKey}`)}
                </p>
                <p className="text-sm text-muted-foreground">{t("board.viewLinkedIn")} →</p>
              </a>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              {t("aboutPage.structureTitle")}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.nameKey}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {t(`aboutPage.structure.${member.nameKey}.name`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`aboutPage.structure.${member.roleKey}.role`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
