import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Target, Users, TrendingUp, Heart, Rocket, GraduationCap, Lightbulb, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "startup-brasilia",
    titleKey: "Startup Brasília 2030",
    descriptionKey: "A Startup Brasília 2030 é um projeto da Brasil Startups, com o objetivo de aquecer o ecossistema de tecnologia e inovação do DF e RIDE, por meio da implantação de ações de estímulo à inovação aberta, promovendo novas, melhores e mais frequentes conexões entre atores-chave do ecossistema, sensibilizando-os quanto aos desafios e oportunidades de inovação nos segmentos da saúde, finanças, educação, mulheres e populações vulneráveis, e governo (drivers de inovação).",
    siteUrl: "https://startupbrasilia.com.br/",
    painelUrl: "https://startupbrasilia.com.br/transparencia/#painel",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
    color: "from-primary to-primary/80",
    icon: Rocket
  },
  {
    id: "avante-cerrado",
    titleKey: "Avante Cerrado",
    descriptionKey: "Avante Cerrado é um programa de subvenção econômica não reembolsável, situado no Distrito Federal e na RIDE, que busca estimular o ecossistema empreendedor por meio de capacitações personalizadas e apoio financeiro, direcionado para empreendedores de baixa renda com MVP validado. Além de conceder fomento econômico, o programa oferece suporte abrangente, incluindo orientação especializada e acesso a recursos essenciais, com o objetivo de transformar ideias inovadoras em empreendimentos prósperos, impulsionando assim o desenvolvimento econômico sustentável da região.",
    siteUrl: "https://brasilstartups.org/avante-cerrado/",
    painelUrl: "https://brasilstartups.org/avante-cerrado-monitoramento/",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    color: "from-accent to-accent/80",
    icon: Heart
  },
  {
    id: "dojo",
    titleKey: "DOJO Brasil Startups",
    descriptionKey: "O DOJO é o programa de mentorias da Brasil Startups, desenvolvido em parceria com o CDT/UnB e Finatec. Capacitamos startups em todas as fases de desenvolvimento com metodologia prática e orientação de especialistas reconhecidos no mercado. O programa oferece sessões de mentoria, networking qualificado e certificação reconhecida.",
    siteUrl: "/dojo",
    painelUrl: null,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop",
    color: "from-foreground to-foreground/80",
    icon: GraduationCap,
    internal: true
  },
  {
    id: "fundo-patrimonial",
    titleKey: "Fundo Patrimonial",
    descriptionKey: "O Fundo Patrimonial da Brasil Startups é responsável pelas ações de responsabilidade social e de fomento ao empreendedorismo do futuro. Promovemos ações que contribuem para o ingresso de novos profissionais técnicos no mercado, apoiando educação, empreendedorismo e sustentabilidade (ESG) para criar impactos relevantes na sociedade.",
    siteUrl: "/fundo",
    painelUrl: null,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop",
    color: "from-primary to-accent",
    icon: Building,
    internal: true
  }
];

const Projetos = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Target, value: "4+", labelKey: "projects" },
    { icon: Users, value: "1000+", labelKey: "entrepreneurs" },
    { icon: TrendingUp, value: "R$ 2M+", labelKey: "investment" },
    { icon: Lightbulb, value: "200+", labelKey: "trainings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              {t("projects.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("projects.heroTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-primary">{t("projects.heroTitle").split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("projects.heroSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary-foreground/80 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {t(`projects.stats.${stat.labelKey}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`h-2 w-16 bg-gradient-to-r ${project.color} rounded-full`} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {project.titleKey}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.descriptionKey}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.internal ? (
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90"
                      >
                        <a
                          href={project.siteUrl}
                          className="inline-flex items-center gap-2"
                        >
                          {t("projects.learnMore")}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90"
                      >
                        <a
                          href={project.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          {t("projects.visitSite")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.painelUrl && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <a
                          href={project.painelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          {t("projects.indicators")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="relative">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${project.color} rounded-2xl opacity-20 blur-xl`} />
                    <img
                      src={project.image}
                      alt={project.titleKey}
                      className="relative rounded-2xl shadow-2xl w-full aspect-video object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t("projects.cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("projects.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <a href="/contato">{t("projects.cta.button")}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="/planos">{t("projects.cta.joinButton")}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projetos;
