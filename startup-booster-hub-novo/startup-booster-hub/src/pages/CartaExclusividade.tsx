import { useState } from "react";
import { submitContactForm } from "@/lib/submitContactForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Scale,
  Quote,
} from "lucide-react";

const CartaExclusividade = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveAndNotify = async () => {
    if (!formData.nome || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome e e-mail.",
        variant: "destructive",
      });
      return false;
    }
    try {
      await submitContactForm({
        source: "carta_exclusividade",
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        company: formData.empresa,
        message: formData.mensagem,
      });
      return true;
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleWhatsApp = async () => {
    const ok = await saveAndNotify();
    if (!ok) return;
    const text = `Olá! Tenho interesse na Carta de Exclusividade.\n\nNome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}\nEmpresa: ${formData.empresa}\nMensagem: ${formData.mensagem}`;
    window.open(`https://wa.me/5561981626100?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleEmail = async () => {
    const ok = await saveAndNotify();
    if (!ok) return;
    const subject = encodeURIComponent("Interesse na Carta de Exclusividade");
    const body = encodeURIComponent(
      `Nome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}\nEmpresa: ${formData.empresa}\nMensagem: ${formData.mensagem}`
    );
    window.location.href = `mailto:contato@brasilstartups.org?subject=${subject}&body=${body}`;
  };

  const benefits = [
    { icon: Landmark, text: "Contratação direta com órgãos públicos sem concorrência" },
    { icon: TrendingUp, text: "Maior chance de fechar contratos relevantes para crescimento" },
    { icon: ShieldCheck, text: "Destaque competitivo frente ao mercado tradicional" },
    { icon: FileCheck, text: "Redução de barreiras burocráticas típicas em licitações" },
  ];

  const comparativo = [
    {
      aspecto: "Base para exclusividade",
      lei8666: "Sim, mas com menos critérios",
      lei14133: "Exclusividade com foco em vantajosidade e transparência",
    },
    {
      aspecto: "Inexigibilidade por singularidade",
      lei8666: "Só produtos únicos",
      lei14133: "Amplia para serviços/tecnologias singulares",
    },
    {
      aspecto: "Critérios objetivos",
      lei8666: "Não detalhados",
      lei14133: "Qualidade, preço, prazo e justificativa administrativa",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/10 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Scale className="w-4 h-4" />
              Contratação Pública
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Impulsione sua startup nas contratações públicas com a{" "}
              <span className="text-gradient">Carta de Exclusividade</span>
            </motion.h1>
            <motion.p
              className="text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Torne-se fornecedor direto do governo — sem concorrência — e acelere negócios com órgãos públicos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8"
                onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })}
              >
                Quero minha Carta de Exclusividade
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                O que é a Carta de Exclusividade?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Carta de Exclusividade é um documento que atesta que o seu produto ou serviço é{" "}
                <strong className="text-foreground">único no mercado</strong> e que não existe equivalente, abrindo
                caminho para <strong className="text-foreground">contratação direta com o setor público</strong> sem
                necessidade de licitação.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como funciona por lei */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Como funciona por lei
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4 text-left">
                <p>
                  Historicamente, a <strong className="text-foreground">Lei nº 8.666/1993</strong>, em seu artigo 25,
                  permite a dispensa de licitação quando não existe possibilidade de competição — e é aqui que a Carta de
                  Exclusividade se encaixa.
                </p>
                <p>
                  Com o novo marco jurídico da <strong className="text-foreground">Lei nº 14.133/2021</strong>, esse
                  instrumento foi mantido e ganhou critérios mais rigorosos de avaliação, ampliando a possibilidade de
                  contratação direta para produtos ou serviços singulares.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparativo Legal */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Comparativo Legal
              </h2>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-border overflow-hidden bg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary">
                    <TableHead className="text-primary-foreground font-bold">Aspecto</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Lei 8.666/93</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Lei 14.133/21</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparativo.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-foreground">{row.aspecto}</TableCell>
                      <TableCell className="text-muted-foreground">{row.lei8666}</TableCell>
                      <TableCell className="text-accent font-medium">{row.lei14133}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
            <motion.p
              className="text-center text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              A legislação atual valoriza <strong className="text-foreground">inovação e singularidade</strong>, abrindo
              uma rota mais sólida para startups em contratos públicos.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                Quais são os benefícios para sua startup
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-foreground font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimento / Prova Social */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary to-navy-light text-primary-foreground"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Quote className="w-12 h-12 text-accent/50 mb-4" />
              <blockquote className="text-xl sm:text-2xl font-display leading-relaxed mb-6">
                "Esse mecanismo é fantástico e faz muito sentido para empresas que vendem para o governo. A Carta de
                Exclusividade nos abriu portas que levariam anos para conseguir em processos licitatórios tradicionais."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">CEO de Startup Associada</p>
                  <p className="text-sm text-primary-foreground/70">Startup do setor de tecnologia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA + Formulário */}
      <section id="formulario" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Quero minha Carta de Exclusividade
              </h2>
              <p className="text-lg text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe entrará em contato para iniciar o processo.
              </p>
            </motion.div>

            <motion.div
              className="bg-card rounded-2xl border border-border p-8 sm:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="empresa">Empresa / Startup</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    placeholder="Nome da sua empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div className="mb-6">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Conte-nos sobre seu produto/serviço e como pretende atuar com o setor público..."
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1.5"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleWhatsApp}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                  size="lg"
                >
                  Enviar via WhatsApp
                </Button>
                <Button
                  onClick={handleEmail}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Enviar via E-mail
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Pronto para vender para o governo?
          </motion.h2>
          <motion.p
            className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A Carta de Exclusividade é o primeiro passo para destravar contratos públicos e acelerar o crescimento da sua startup.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8"
              onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })}
            >
              Quero minha Carta de Exclusividade
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contato">Falar com a Equipe</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartaExclusividade;
