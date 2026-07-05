import { Target, Eye, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Target,
      title: t("about.mission.title"),
      description: t("about.mission.description"),
    },
    {
      icon: Eye,
      title: t("about.vision.title"),
      description: t("about.vision.description"),
    },
    {
      icon: Heart,
      title: t("about.values.title"),
      description: t("about.values.description"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            {t("about.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
            {t("about.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("about.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <value.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
