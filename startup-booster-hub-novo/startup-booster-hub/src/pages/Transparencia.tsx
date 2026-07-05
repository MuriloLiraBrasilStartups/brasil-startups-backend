import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Target, Users, TrendingUp, Heart, GraduationCap, BookOpen, Lightbulb, UserCheck, Mic, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    titleKey: "Startup Brasília 2030",
    descriptionKey: "A Startup Brasília 2030 é um projeto da Brasil Startups, com o objetivo de aquecer o ecossistema de tecnologia e inovação do DF e RIDE, por meio da implantação de ações de estímulo à inovação aberta, promovendo novas, melhores e mais frequentes conexões entre atores-chave do ecossistema, sensibilizando-os quanto aos desafios e oportunidades de inovação nos segmentos da saúde, finanças, educação, mulheres e populações vulneráveis, e governo (drivers de inovação).",
    siteUrl: "https://startupbrasilia.com.br/",
    painelUrl: "https://startupbrasilia.com.br/transparencia/#painel",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
    color: "from-primary to-primary/80"
  },
  {
    titleKey: "Avante Cerrado",
    descriptionKey: "Avante Cerrado é um programa de subvenção econômica não reembolsável, situado no Distrito Federal e na RIDE, que busca estimular o ecossistema empreendedor por meio de capacitações personalizadas e apoio financeiro, direcionado para empreendedores de baixa renda com MVP validado. Além de conceder fomento econômico, o programa oferece suporte abrangente, incluindo orientação especializada e acesso a recursos essenciais, com o objetivo de transformar ideias inovadoras em empreendimentos prósperos, impulsionando assim o desenvolvimento econômico sustentável da região.",
    siteUrl: "https://brasilstartups.org/avante-cerrado/",
    painelUrl: "https://brasilstartups.org/avante-cerrado-monitoramento/",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    color: "from-accent to-accent/80"
  }
];

const Transparencia = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Target, value: "3+", labelKey: "projects" },
    { icon: Users, value: "1.600+", labelKey: "entrepreneurs" },
    { icon: TrendingUp, value: "R$ 2M+", labelKey: "investment" },
    { icon: Heart, value: "100+", labelKey: "trainings" },
  ];

  const mtechNumbers = [
    { icon: GraduationCap, value: "80", label: "Cursos (básico e avançado)" },
    { icon: Mic, value: "360", label: "Palestras" },
    { icon: UserCheck, value: "720", label: "Mentorias" },
  ];

  const mtechPillars = [
    {
      icon: BookOpen,
      title: "Técnica",
      items: ["Programação", "Dados", "IA", "Automação", "Plataformas digitais"],
    },
    {
      icon: BrainCircuit,
      title: "Comportamental",
      items: ["Agilidade", "Colaboração", "Pensamento crítico", "Mindset de inovação"],
    },
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
              {t("transparency.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("transparency.heroTitle").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-primary">{t("transparency.heroTitle").split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("transparency.heroSubtitle")}
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
                  {t(`transparency.stats.${stat.labelKey}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MTECH 2025 Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Termo de Fomento nº TF-45-SECTI/2025
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                MTECH 2025
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Promover acesso à inovação, tecnologia e empreendedorismo sustentável, por meio da capacitação de jovens e adultos no desenvolvimento de soluções digitais e negócios de base tecnológica.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Execução</p>
                  <p className="font-bold text-foreground">Brasil Startups</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Apoio</p>
                  <p className="font-bold text-foreground">SECTI/DF</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Valor</p>
                  <p className="font-bold text-foreground">R$ 1.099.999,96</p>
                </CardContent>
              </Card>
            </div>

            {/* Governance note */}
            <Card className="border-accent/20 mb-12">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  A Brasil Startups assegura a execução responsável, com governança, rastreabilidade e prestação de contas integral dos recursos públicos, alinhada ao plano aprovado e aos indicadores de impacto.
                </p>
              </CardContent>
            </Card>

            {/* Pillars */}
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Estrutura de Formação</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {mtechPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <Card className="h-full border-primary/20 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <pillar.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold text-foreground">{pillar.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {pillar.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <Lightbulb className="w-4 h-4 text-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Numbers */}
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Público e Alcance</h3>
            <p className="text-center text-muted-foreground mb-8">
              <span className="text-3xl font-bold text-primary">1.160</span>{" "}
              participantes (16 a 65 anos)
            </p>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {mtechNumbers.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center border-primary/20">
                    <CardContent className="p-6">
                      <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-3xl font-bold text-foreground mb-1">{item.value}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Expected Result */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">Resultado Esperado</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                  Formação de lideranças tecnológicas capazes de atuar em ambientes digitais, desenvolver soluções inovadoras e gerar impacto econômico e social.
                </p>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90"
                >
                  <a
                    href="https://brasilstartups.org/mtech-2025/transparencia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Painel de Indicadores MTECH 2025
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
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
                  <div className={`inline-block w-16 h-2 bg-gradient-to-r ${project.color} rounded-full mb-6`} />
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {project.titleKey}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {project.descriptionKey}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
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
                        {t("transparency.visitSite")}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
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
                        {t("transparency.indicators")}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
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
              {t("transparency.cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("transparency.cta.subtitle")}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              <a href="/contato">{t("transparency.cta.button")}</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Transparencia;
