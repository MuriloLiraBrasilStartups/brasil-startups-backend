import { useState } from "react";
import { submitContactForm } from "@/lib/submitContactForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  BarChart3,
  Network,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Globe,
  Award,
  Target,
  Briefcase,
  Send,
  Phone,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const supportCategories = [
  {
    icon: Users,
    title: "Mentoria Estratégica",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
    description:
      "Acesso direto a founders experientes, especialistas de mercado e ex-executivos do ecossistema. Sessões práticas que acceleram seu processo de due diligence.",
    courses: [
      "Como avaliar founders em early stage",
      "Red flags em pitch e documentação",
      "Dinâmica de cap table e diluição",
    ],
  },
  {
    icon: Shield,
    title: "Governança & Compliance",
    color: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    iconColor: "text-accent",
    description:
      "Estruture seus investimentos com segurança jurídica e fiscal. Documentação, acordos de sócios, term sheets e proteção patrimonial com suporte especializado.",
    courses: [
      "Term sheet: cláusulas essenciais",
      "Acordos de sócios e anti-diluição",
      "Estruturas jurídicas para investimento",
    ],
  },
  {
    icon: BarChart3,
    title: "Análise de Produto & Mercado",
    color: "from-primary/20 to-accent/10",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
    description:
      "Metodologias práticas para avaliar product-market fit, tração real, métricas unitárias e potencial de escala antes de alocar capital.",
    courses: [
      "Como ler métricas SaaS e marketplace",
      "Análise de cohort e retenção",
      "Validação de PMF em early stage",
    ],
  },
  {
    icon: Network,
    title: "Networking de Alta Densidade",
    color: "from-accent/15 to-primary/10",
    borderColor: "border-accent/20",
    iconColor: "text-accent",
    description:
      "Co-investidores, gestores de fundos, aceleradoras e corporações em um ambiente curado para gerar negócios reais e sindicatos de investimento.",
    courses: [
      "Como estruturar um sindicato de investimento",
      "Relação com VCs e family offices",
      "Comunidade exclusiva de investidores",
    ],
  },
];

const learningTrack = [
  {
    step: "01",
    title: "Imersão no Ecossistema",
    description:
      "Entenda profundamente como startups funcionam — da ideação ao crescimento. Vocabulário, métricas, dinâmicas e cultura do ecossistema brasileiro.",
    icon: BookOpen,
    duration: "1º Trimestre",
  },
  {
    step: "02",
    title: "Análise & Due Diligence",
    description:
      "Aprenda a estruturar seu processo de análise: desde o primeiro pitch até a decisão final de investimento com segurança técnica e metodológica.",
    icon: Target,
    duration: "2º Trimestre",
  },
  {
    step: "03",
    title: "Portfólio & Governança",
    description:
      "Gerencie ativamente seus investimentos. Governança, follow-ons, board participation, proteção de capital e estratégias de saída.",
    icon: Briefcase,
    duration: "3º Trimestre",
  },
  {
    step: "04",
    title: "Tese & Estratégia Avançada",
    description:
      "Desenvolva sua tese de investimento pessoal, construa reputação no ecossistema e expanda para investimentos sindicados e internacionais.",
    icon: Lightbulb,
    duration: "4º Trimestre",
  },
];

const stats = [
  { value: "+500", label: "Startups curadas", icon: TrendingUp },
  { value: "+120", label: "Investidores ativos", icon: Users },
  { value: "R$80M+", label: "Mobilizados em investimento", icon: Globe },
  { value: "14 anos", label: "De ecossistema construído", icon: Award },
];

const faqs = [
  {
    question: "O que diferencia a Brasil Startups de outros hubs de inovação?",
    answer:
      "A Brasil Startups é a maior associação de startups do Brasil com presença institucional ativa junto ao Governo Federal. Nosso diferencial é a curadoria técnica contínua — não apenas conectamos investidores a startups, mas formamos, qualificamos e acompanhamos os dois lados da equação, reduzindo drasticamente o risco de early stage.",
  },
  {
    question: "Preciso ter experiência prévia em investimentos para participar?",
    answer:
      "Não. Nossa trilha de Educação Continuada foi desenhada justamente para investidores em diferentes estágios de maturidade. Desde quem está fazendo seu primeiro investimento em startup até investidores experientes que querem aprofundar suas teses e expandir seu portfólio.",
  },
  {
    question: "Como funciona o processo de curadoria das startups?",
    answer:
      "Todas as startups que acessam nossa base passam por um processo de qualificação multidimensional: análise de time, produto, mercado, tração e modelo de negócio. Apenas startups com potencial real de escala e founders comprometidos chegam ao nosso ecossistema de investimento.",
  },
  {
    question: "É possível co-investir com outros membros da rede?",
    answer:
      "Sim. Estruturamos regularmente sindicatos de investimento entre nossos membros, permitindo que múltiplos investidores façam aportes conjuntos com menor exposição individual e maior poder de negociação. Contamos com suporte jurídico especializado para formalização das estruturas.",
  },
  {
    question: "Qual o ticket mínimo para investimento via Brasil Startups?",
    answer:
      "Não existe um ticket mínimo fixo, pois cada oportunidade tem suas próprias condições. Trabalhamos com diferentes perfis de investidores, desde angels individuais até family offices e fundos. O importante é o alinhamento de tese e o comprometimento com a jornada de aprendizado.",
  },
  {
    question: "Como a Lei do Bem se relaciona com investimentos em startups?",
    answer:
      "Por meio do ICT Brasil Startups, empresas que investem em PD&I podem deduzir até 34% dos aportes do IRPJ e CSLL. Isso cria uma oportunidade única: combinar investimento estratégico em startups com inteligência fiscal, reduzindo o custo efetivo do capital investido.",
  },
];

const ticketOptions = [
  "Até R$25.000",
  "R$25.000 – R$50.000",
  "R$50.000 – R$100.000",
  "R$100.000 – R$250.000",
  "R$250.000 – R$500.000",
  "Acima de R$500.000",
];

const areaOptions = [
  "Agro & FoodTech",
  "CleanTech & Sustentabilidade",
  "EducaTech",
  "FinTech",
  "HealthTech",
  "LegalTech & GovTech",
  "PropTech",
  "SaaS & Enterprise Software",
  "Deep Tech & Ciência Aplicada",
  "Outro",
];

const InvestorForm = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    ticket: "",
    area: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveAndNotify = async () => {
    if (!form.nome || !form.email || !form.telefone || !form.ticket || !form.area) {
      alert("Por favor, preencha todos os campos antes de continuar.");
      return false;
    }
    try {
      await submitContactForm({
        source: "investidores",
        name: form.nome,
        email: form.email,
        phone: form.telefone,
        ticket: form.ticket,
        area: form.area,
      });
      return true;
    } catch {
      alert("Erro ao enviar. Tente novamente.");
      return false;
    }
  };

  const handleWhatsApp = async () => {
    const ok = await saveAndNotify();
    if (!ok) return;
    const msg = encodeURIComponent(
      `Olá, Brasil Startups! Tenho interesse em investir via a plataforma.\n\n` +
      `*Nome:* ${form.nome}\n` +
      `*E-mail:* ${form.email}\n` +
      `*Telefone:* ${form.telefone}\n` +
      `*Ticket médio:* ${form.ticket}\n` +
      `*Área de interesse:* ${form.area}`
    );
    window.open(`https://wa.me/5561981626100?text=${msg}`, "_blank");
  };

  const handleEmail = async () => {
    const ok = await saveAndNotify();
    if (!ok) return;
    const subject = encodeURIComponent(`Cadastro de Interesse — Investidor: ${form.nome}`);
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\nTicket médio: ${form.ticket}\nÁrea de interesse: ${form.area}`
    );
    window.location.href = `mailto:contato@brasilstartups.org?subject=${subject}&body=${body}`;
  };

  return (
    <Card className="border border-border shadow-lg bg-card">
      <CardContent className="p-8 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-foreground font-medium">
              Nome completo <span className="text-accent">*</span>
            </Label>
            <Input
              id="nome"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              className="h-11"
              maxLength={100}
            />
          </div>

          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              E-mail <span className="text-accent">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              className="h-11"
              maxLength={255}
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-foreground font-medium">
              Telefone / WhatsApp <span className="text-accent">*</span>
            </Label>
            <Input
              id="telefone"
              name="telefone"
              type="tel"
              placeholder="+55 (61) 9 0000-0000"
              value={form.telefone}
              onChange={handleChange}
              className="h-11"
              maxLength={20}
            />
          </div>

          {/* Ticket médio */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">
              Ticket médio de investimento <span className="text-accent">*</span>
            </Label>
            <Select onValueChange={(v) => setForm((p) => ({ ...p, ticket: v }))}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                {ticketOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Área de interesse — full width */}
        <div className="space-y-2 mb-8">
          <Label className="text-foreground font-medium">
            Área de interesse principal <span className="text-accent">*</span>
          </Label>
          <Select onValueChange={(v) => setForm((p) => ({ ...p, area: v }))}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione um setor" />
            </SelectTrigger>
            <SelectContent>
              {areaOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleWhatsApp}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-semibold"
          >
            <Phone className="w-5 h-5" />
            Enviar pelo WhatsApp
          </Button>
          <Button
            onClick={handleEmail}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            <Send className="w-5 h-5" />
            Enviar por E-mail
          </Button>
        </div>

        <p className="text-muted-foreground text-xs text-center mt-5">
          Suas informações são tratadas com confidencialidade e não são
          compartilhadas com terceiros.
        </p>
      </CardContent>
    </Card>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Investidores() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.3),transparent_50%)]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary-foreground)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)/0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
              Programa Exclusivo para Investidores
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Transforme seu capital em{" "}
            <span className="text-accent">impacto</span> com a segurança de uma{" "}
            <span className="text-accent">curadoria técnica</span>
          </motion.h1>

          <motion.p
            className="text-primary-foreground/80 text-lg sm:text-xl max-w-3xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            A Brasil Startups oferece ao investidor moderno algo raro:{" "}
            <strong className="text-primary-foreground">
              acesso qualificado a startups
            </strong>
            , educação continuada e uma rede de alto valor — tudo integrado no
            maior ecossistema de inovação do Brasil.
          </motion.p>

          <motion.p
            className="text-accent font-semibold text-base sm:text-lg max-w-2xl mx-auto mb-10 italic"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            "Pós-graduação empírica que oportuniza o conhecimento do
            ecossistema."
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base shadow-lg"
            >
              <a href="https://wa.me/5561981626100" target="_blank" rel="noopener noreferrer">
                Quero investir com curadoria
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base backdrop-blur-sm"
            >
              <a href="#trilha">Conhecer a trilha de aprendizado</a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-primary-foreground/40" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="font-display text-3xl lg:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCAÇÃO CONTINUADA ── */}
      <section id="trilha" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">
              Educação Continuada para Investidores
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Aprenda investindo.{" "}
              <span className="text-primary">Invista aprendendo.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Nossa trilha anual foi desenhada para reduzir riscos e aumentar a
              assertividade no early stage. Uma{" "}
              <strong className="text-foreground">
                pós-graduação empírica
              </strong>{" "}
              que você vivencia junto ao maior ecossistema de startups do Brasil.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/30 to-transparent -translate-x-1/2" />

            <div className="space-y-12 lg:space-y-0">
              {learningTrack.map((item, i) => (
                <motion.div
                  key={item.step}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Content */}
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""} mb-8 lg:mb-0`}>
                    <Card className="border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg bg-card">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-5">
                          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-accent font-mono text-sm font-bold">{item.duration}</span>
                            </div>
                            <h3 className="font-display text-xl font-bold text-foreground mb-3">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step number */}
                  <div className={`hidden lg:flex ${i % 2 === 1 ? "lg:order-1" : ""} justify-center`}>
                    <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                      <span className="font-display text-2xl font-bold text-primary-foreground">
                        {item.step}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS DE SUPORTE ── */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="mb-4 bg-accent/10 text-accent border border-accent/20">
              Categorias de Suporte
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Suporte completo em{" "}
              <span className="text-accent">cada dimensão</span> do investimento
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quatro pilares de conhecimento e relacionamento para você investir
              com mais segurança, eficiência e impacto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {supportCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Card
                  className={`h-full border ${cat.borderColor} transition-all duration-300 cursor-pointer overflow-hidden ${
                    hoveredCategory === i
                      ? "shadow-xl scale-[1.02] border-opacity-100"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />
                  <CardContent className="relative p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-5 transition-transform duration-300 ${hoveredCategory === i ? "scale-110" : ""}`}>
                      <cat.icon className={`w-7 h-7 ${cat.iconColor}`} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {cat.description}
                    </p>

                    {/* Courses preview on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredCategory === i ? 1 : 0,
                        height: hoveredCategory === i ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border/50 pt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          O que você aprende:
                        </p>
                        <ul className="space-y-2">
                          {cat.courses.map((course) => (
                            <li key={course} className="flex items-start gap-2">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cat.iconColor}`} />
                              <span className="text-sm text-foreground/80">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BRASIL STARTUPS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">
                Por que Brasil Startups?
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Inovação deixa de ser custo.{" "}
                <span className="text-primary">Passa a ser estratégia.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Em 14 anos construindo o ecossistema brasileiro de startups,
                desenvolvemos um método único de curadoria, educação e
                conexão — que hoje protege e potencializa o capital de centenas
                de investidores.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Aqui você não apenas investe: você aprende, conecta-se com
                pessoas extraordinárias e constrói uma reputação sólida dentro
                do ecossistema de inovação mais relevante do Brasil.
              </p>
              <div className="space-y-4">
                {[
                  "Curadoria técnica multidimensional de startups",
                  "Acesso antecipado a rodadas de early stage",
                  "Rede qualificada de co-investidores e gestores",
                  "Benefícios fiscais via ICT Brasil Startups (Lei do Bem)",
                  "Suporte jurídico para estruturação de investimentos",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                {
                  title: "Acesso Privilegiado",
                  desc: "Oportunidades de investimento antes da abertura ao mercado geral",
                  icon: Target,
                },
                {
                  title: "Risco Reduzido",
                  desc: "Curadoria técnica que filtra e valida startups com potencial real",
                  icon: Shield,
                },
                {
                  title: "Rede de Alto Valor",
                  desc: "Conexão com os melhores founders, investidores e gestores do Brasil",
                  icon: Network,
                },
                {
                  title: "Inteligência Fiscal",
                  desc: "Estruture investimentos com benefícios da Lei do Bem via ICT",
                  icon: TrendingUp,
                },
              ].map((item, i) => (
                <Card
                  key={item.title}
                  className="border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO DE CADASTRO ── */}
      <section id="cadastro" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <Badge className="mb-4 bg-accent/10 text-accent border border-accent/20">
              Cadastro de Interesse
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Dê o primeiro passo para{" "}
              <span className="text-primary">investir com inteligência</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Preencha o formulário abaixo e nossa equipe entrará em contato
              para apresentar as melhores oportunidades para o seu perfil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <InvestorForm />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">
              Perguntas Frequentes
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tire suas dúvidas sobre{" "}
              <span className="text-primary">a tese de investimento</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Respondemos as principais perguntas de quem está considerando
              investir através da Brasil Startups.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border rounded-xl px-6 bg-card hover:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.1),transparent_70%)]" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Pronto para investir com{" "}
              <span className="text-accent">inteligência e curadoria</span>?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
              Junte-se a mais de 120 investidores que já usam a Brasil Startups
              para descobrir, analisar e aportar nas melhores startups
              brasileiras com segurança técnica e suporte contínuo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base shadow-lg"
              >
                <a href="https://wa.me/5561981626100" target="_blank" rel="noopener noreferrer">
                  Falar com nossa equipe
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base"
              >
                <Link to="/planos">Ver planos de associação</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
