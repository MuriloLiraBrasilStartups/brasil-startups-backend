import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  FlaskConical, 
  Brain, 
  Rocket, 
  Handshake, 
  BarChart3,
  Building2,
  GraduationCap,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Target,
  Shield,
  FileText,
  Users
} from "lucide-react";
import ictHeroVideo from "@/assets/ict-hero-video.mp4";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ICT = () => {
  const { t } = useTranslation();

  const ictFeatures = [
    { icon: FlaskConical, titleKey: "research", color: "from-primary to-primary/80" },
    { icon: Brain, titleKey: "development", color: "from-accent to-accent/80" },
    { icon: Rocket, titleKey: "transfer", color: "from-primary to-accent" },
    { icon: Handshake, titleKey: "cooperation", color: "from-accent to-primary" },
    { icon: BarChart3, titleKey: "governance", color: "from-primary/80 to-primary" },
  ];

  const targetAudiences = [
    {
      icon: Rocket,
      titleKey: "startups",
      color: "bg-accent",
      features: ["startupsF1", "startupsF2", "startupsF3", "startupsF4"]
    },
    {
      icon: Building2,
      titleKey: "companies",
      color: "bg-primary",
      features: ["companiesF1", "companiesF2", "companiesF3", "companiesF4"]
    },
    {
      icon: GraduationCap,
      titleKey: "universities",
      color: "bg-accent",
      features: ["universitiesF1", "universitiesF2", "universitiesF3", "universitiesF4"]
    },
    {
      icon: Landmark,
      titleKey: "government",
      color: "bg-primary",
      features: ["governmentF1", "governmentF2", "governmentF3"]
    },
  ];

  const leiBemBenefits = [
    "leiBemB1",
    "leiBemB2",
    "leiBemB3",
    "leiBemB4",
    "leiBemB5"
  ];

  const howWeWork = [
    "howWeWork1",
    "howWeWork2",
    "howWeWork3",
    "howWeWork4",
    "howWeWork5"
  ];

  const whyICT = [
    { icon: Target, key: "why1" },
    { icon: Users, key: "why2" },
    { icon: Lightbulb, key: "why3" },
    { icon: Shield, key: "why4" },
    { icon: FileText, key: "why5" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/placeholder.svg"
          >
            <source src={ictHeroVideo} type="video/mp4" />
          </video>
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium mb-8"
            >
              🌐 {t("ict.badge")}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              ICT Brasil Startups
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-4 leading-relaxed"
            >
              {t("ict.heroSubtitle")}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-white/70 mb-10"
            >
              {t("ict.subdomain")}: <span className="text-accent font-medium">ict.brasilstartups.org</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#connect" className="flex items-center gap-2">
                  {t("ict.cta.diagnostic")} <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 backdrop-blur-sm"
              >
                <a href="#about">
                  {t("ict.cta.learnMore")}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* What is ICT Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("ict.whatIsTitle")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t("ict.whatIsDesc1")}
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
              <p className="text-foreground font-medium italic">
                {t("ict.whatIsHighlight1")}
              </p>
              <p className="text-primary font-semibold mt-2">
                {t("ict.whatIsHighlight2")}
              </p>
            </div>
          </motion.div>

          {/* ICT Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ictFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow border-none bg-card">
                  <CardContent className="pt-6">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {t(`ict.features.${feature.titleKey}`)}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Private ICT Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("ict.whyTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("ict.whySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyICT.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6">
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {t(`ict.why.${item.key}`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("ict.forWhomTitle")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${audience.color} flex items-center justify-center`}>
                        <audience.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">
                        {t(`ict.audiences.${audience.titleKey}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {audience.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {t(`ict.audiences.${audience.titleKey}.${feature}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lei do Bem Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium mb-6">
                {t("ict.leiBem.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("ict.leiBem.title")}
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                {t("ict.leiBem.description")}
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <a href="#connect" className="flex items-center gap-2">
                  {t("ict.leiBem.cta")} <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">
                    {t("ict.leiBem.benefitsTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {leiBemBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-primary-foreground/90">
                          {t(`ict.leiBem.benefits.${benefit}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <p className="mt-4 text-sm text-primary-foreground/70 italic text-center">
                {t("ict.leiBem.highlight")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("ict.howWeWorkTitle")}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
              
              {howWeWork.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <p className="text-foreground">
                        {t(`ict.howWeWork.${step}`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8 italic"
          >
            {t("ict.howWeWorkFooter")}
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-20 bg-gradient-to-br from-accent via-accent/90 to-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
              {t("ict.cta.title")}
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("ict.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <a href="/contato">{t("ict.cta.diagnostic")}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="/contato">{t("ict.cta.startProject")}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-muted-foreground mb-6">
              {t("ict.closing.text")}
            </p>
            <p className="text-2xl font-bold text-primary">
              {t("ict.closing.tagline")}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ICT;
