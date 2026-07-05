import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, Leaf, Star, TrendingUp, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import fundoLogoWhite from "@/assets/fundo-logo-white.svg";
import fundoAbstract01 from "@/assets/fundo-abstract-01.png";
import fundoAbstract02 from "@/assets/fundo-abstract-02.png";
import fundoImage01 from "@/assets/fundo-image-01.jpg";
import fundoImage02 from "@/assets/fundo-image-02.jpg";
import fundoImage03 from "@/assets/fundo-image-03.jpg";
import fundoFluxo from "@/assets/fundo-fluxo.png";
import fundoImage04 from "@/assets/fundo-image-04.jpg";
import fundoImage06 from "@/assets/fundo-image-06.jpg";
import fundoImage07 from "@/assets/fundo-image-07.jpg";
import fundoImage09 from "@/assets/fundo-image-09.jpg";
import fundoQrCode from "@/assets/fundo-qr-code.png";

const Fundo = () => {
  const { t } = useTranslation();

  const areas = [
    {
      icon: GraduationCap,
      titleKey: "education",
      image: fundoImage01,
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: Rocket,
      titleKey: "entrepreneurship",
      image: fundoImage02,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Leaf,
      titleKey: "sustainability",
      image: fundoImage03,
      color: "from-green-500 to-green-600",
    },
  ];

  const benefits = [
    { icon: Star, key: "reputation" },
    { icon: TrendingUp, key: "marketing" },
    { icon: Leaf, key: "esg" },
    { icon: Users, key: "community" },
  ];

  const stats = [
    { value: "+900", image: fundoImage04 },
    { value: "+1700", image: fundoImage06 },
    { value: "+1700", image: fundoImage07 },
    { value: "+150", image: fundoImage09 },
  ];

  const faqs = [
    {
      question: "O que é o fundo patrimonial?",
      answer: "O Fundo Patrimonial da Brasil Startups é uma fonte permanente de recursos privados, oriundos de doações de pessoas físicas e jurídicas, com o objetivo de apoiar, de forma contínua, ações de responsabilidade social e de fomento ao empreendedorismo, inovação, educação e sustentabilidade. Ele é gerido com base nos princípios da ética, transparência e responsabilidade, visando impactar positivamente a sociedade por meio da preservação do capital e aplicação de seus rendimentos em projetos de alto impacto social.",
    },
    {
      question: "Qual é a missão do Fundo Patrimonial da Brasil Startups?",
      answer: "A missão do Fundo Patrimonial é contribuir para a formação e inclusão de novos profissionais técnicos no mercado de trabalho até 2030, período no qual estima-se a abertura de mais de 700 mil vagas no setor de tecnologia. Além disso, o fundo apoia o desenvolvimento de startups inovadoras, promovendo um ecossistema mais justo, sustentável e competitivo.",
    },
    {
      question: "Em quais áreas o Fundo Patrimonial atua?",
      answer: "O Fundo atua principalmente em Educação (investimento na capacitação de gestores e professores, implementação de tecnologias em sala de aula e preparação de jovens para o mercado de trabalho), Empreendedorismo (apoio direto a startups, financiamento de ideias inovadoras e fortalecimento do ecossistema empreendedor) e Sustentabilidade ESG (fomento a projetos que reduzem a emissão de carbono e contribuem para um futuro mais verde e sustentável).",
    },
    {
      question: "Quais os benefícios de doar para o Fundo Patrimonial da Brasil Startups?",
      answer: "Impacto Social: Transforme ideias em soluções reais que promovem equidade e sustentabilidade. Reputação Pública: Eleve o perfil da sua organização com ações que geram valor. Marketing com Propósito: Potencialize suas estratégias de marketing com iniciativas autênticas. ESG: Contribua diretamente para a política de ESG da sua organização. Conexão com a Comunidade: Estreite laços com comunidades locais.",
    },
    {
      question: "Como é feita a governança do Fundo?",
      answer: "A governança do Fundo Patrimonial da Brasil Startups é estruturada de forma robusta e transparente, sendo composta por três órgãos principais: Conselho Curador (responsável por todas as deliberações estratégicas), Comitê de Investimentos (assessora o Conselho Curador na tomada de decisões financeiras) e Conselho Fiscal (fiscaliza a gestão do fundo e emite pareceres sobre as contas).",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header logoSrc={fundoLogoWhite} logoAlt="Brasil Startups Endowment" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a1f3c] via-[#2d1b4e] to-[#1a1f3c] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-500/30 via-purple-500/20 to-transparent" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-cyan-500/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("fund.hero.title")}
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("fund.hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="bg-cyan-400 hover:bg-cyan-500 text-primary-foreground font-bold px-8"
                onClick={() => document.getElementById('doacao')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t("fund.hero.cta")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="relative rounded-2xl overflow-hidden bg-teal-500 p-8 min-h-[200px]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-white mb-2 max-w-xs">
                {t("fund.impact.card1")}
              </h3>
              <img 
                src={fundoAbstract02} 
                alt="Abstract" 
                className="absolute bottom-0 right-0 w-48 h-auto opacity-80"
              />
            </motion.div>
            <motion.div 
              className="relative rounded-2xl overflow-hidden bg-blue-500 p-8 min-h-[200px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold text-white mb-2 max-w-xs">
                {t("fund.impact.card2")}
              </h3>
              <img 
                src={fundoAbstract01} 
                alt="Abstract" 
                className="absolute bottom-0 right-0 w-48 h-auto opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* O que é o Fundo */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("fund.whatIs.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              className="p-8 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                {t("fund.whatIs.what")}
              </h3>
              <p className="text-muted-foreground">
                {t("fund.whatIs.whatDesc")}
              </p>
            </motion.div>
            <motion.div 
              className="p-8 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                {t("fund.whatIs.mission")}
              </h3>
              <p className="text-muted-foreground">
                {t("fund.whatIs.missionDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nossa Atuação */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("fund.areas.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("fund.areas.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <motion.div
                key={area.titleKey}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={t(`fund.areas.${area.titleKey}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center`}>
                      <area.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {t(`fund.areas.${area.titleKey}.title`)}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t(`fund.areas.${area.titleKey}.description`)}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('doacao')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t("fund.areas.invest")} {t(`fund.areas.${area.titleKey}.title`).split(' ')[0]}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatística */}
      <section className="py-16 bg-gradient-to-r from-primary to-navy-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("fund.stats.title")}
          </motion.h2>
          <p className="text-primary-foreground/80">{t("fund.stats.source")}</p>
        </div>
      </section>

      {/* Faça Parte da Revolução */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("fund.benefits.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.key}
                className="p-6 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {t(`fund.benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`fund.benefits.${benefit.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("fund.howItWorks.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("fund.howItWorks.subtitle")}
            </p>
          </div>
          <motion.div 
            className="max-w-5xl mx-auto bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src={fundoFluxo} 
              alt="Fluxo de Funcionamento" 
              className="w-full h-auto filter brightness-110 hue-rotate-[200deg] saturate-150"
            />
          </motion.div>
        </div>
      </section>

      {/* Impacto Stats */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={stat.image} 
                  alt="Impacto"
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <p className="text-4xl font-display font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white/80 text-sm">Jovens beneficiados com as ações do Innovatour Young.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faça sua Doação */}
      <section id="doacao" className="py-24 bg-gradient-to-br from-primary to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4">
                {t("fund.donation.title")}
              </h2>
              <h3 className="text-2xl font-display font-semibold text-primary-foreground mb-6">
                {t("fund.donation.fundName")}
              </h3>
              <p className="text-primary-foreground/80 text-lg">
                {t("fund.donation.description")}
              </p>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-2xl">
                <img 
                  src={fundoQrCode} 
                  alt="QR Code para doação" 
                  className="w-64 h-64 object-contain"
                />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {t("fund.donation.scanQr")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("fund.faq.title")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fundo;
