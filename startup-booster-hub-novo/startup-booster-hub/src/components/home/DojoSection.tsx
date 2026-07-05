import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Calendar, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const DojoSection = () => {
  const { t } = useTranslation();

  const dojoFeatures = [
    { icon: GraduationCap, title: t("dojo.features.mentoring.title"), description: t("dojo.features.mentoring.description") },
    { icon: Users, title: t("dojo.features.networking.title"), description: t("dojo.features.networking.description") },
    { icon: Calendar, title: t("dojo.features.schedule.title"), description: t("dojo.features.schedule.description") },
    { icon: Award, title: t("dojo.features.certification.title"), description: t("dojo.features.certification.description") },
  ];

  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-10 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">{t("dojo.badge")}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              {t("dojo.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t("dojo.description")}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {dojoFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-primary-foreground/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary text-lg px-8">
                <Link to="/dojo" className="flex items-center gap-2">
                  {t("dojo.learnMore")} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gold bg-gold/10 text-gold hover:bg-gold/20">
                <a href="https://dojo.brasilstartups.org" target="_blank" rel="noopener noreferrer">
                  {t("dojo.accessPortal")}
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="aspect-square max-w-lg mx-auto">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-2xl bg-gradient-to-br from-accent to-sky shadow-2xl transform rotate-6 animate-float" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-2xl bg-gradient-to-br from-gold to-gold-light shadow-2xl transform -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-display font-bold text-primary-foreground mb-2">道場</p>
                  <p className="text-primary-foreground/70">DOJO</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
