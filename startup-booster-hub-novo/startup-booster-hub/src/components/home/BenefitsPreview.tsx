import { Link } from "react-router-dom";
import { ArrowRight, Cloud, CreditCard, Scale, Megaphone, Code, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const BenefitsPreview = () => {
  const { t } = useTranslation();

  const benefitCategories = [
    { icon: Cloud, title: t("benefits.categories.cloud"), value: "R$150.000+", partners: ["AWS", "Microsoft Azure", "Google Cloud"] },
    { icon: Code, title: t("benefits.categories.saas"), value: "R$50.000+", partners: ["HubSpot", "Zendesk", "Twilio"] },
    { icon: CreditCard, title: t("benefits.categories.financial"), value: "R$10.000+", partners: ["Stripe", "Conta Azul"] },
    { icon: Scale, title: t("benefits.categories.legal"), value: "R$5.000+", partners: ["L.O. Baptista", "Parceiros Jurídicos"] },
    { icon: Megaphone, title: t("benefits.categories.marketing"), value: "R$15.000+", partners: ["RD Station", "Meta Ads"] },
    { icon: Users, title: t("benefits.categories.hr"), value: "R$8.000+", partners: ["Gupy", "Convenia"] },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              {t("benefits.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              {t("benefits.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/beneficios" className="flex items-center gap-2">
              {t("benefits.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {benefitCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="flex-shrink-0 w-72 p-6 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 hover-lift"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-2xl font-display font-bold text-accent mb-3">
                {category.value}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.partners.map((partner) => (
                  <span key={partner} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                    {partner}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
