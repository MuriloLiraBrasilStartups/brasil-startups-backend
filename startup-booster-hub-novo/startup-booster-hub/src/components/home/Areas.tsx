import { Scale, GraduationCap, Globe, Users, Compass, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Areas = () => {
  const { t } = useTranslation();

  const areas = [
    { icon: Scale, title: t("areas.publicPolicies.title"), description: t("areas.publicPolicies.description") },
    { icon: GraduationCap, title: t("areas.education.title"), description: t("areas.education.description") },
    { icon: Globe, title: t("areas.internationalization.title"), description: t("areas.internationalization.description") },
    { icon: Users, title: t("areas.networking.title"), description: t("areas.networking.description") },
    { icon: Compass, title: t("areas.journey.title"), description: t("areas.journey.description") },
    { icon: BookOpen, title: t("areas.knowledge.title"), description: t("areas.knowledge.description") },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            {t("areas.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
            {t("areas.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("areas.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-accent overflow-hidden transition-all duration-300 hover-lift"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <area.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
