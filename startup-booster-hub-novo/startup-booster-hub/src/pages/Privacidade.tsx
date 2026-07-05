import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Política de Privacidade | Brasil Startups"
        description="Política de privacidade da Brasil Startups: como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD."
        path="/privacidade"
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Política de Privacidade
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              A Brasil Startups respeita sua privacidade e está comprometida com a
              proteção dos seus dados pessoais, em conformidade com a Lei Geral de
              Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              1. Dados que Coletamos
            </h2>
            <p>
              Coletamos informações fornecidas voluntariamente nos formulários de
              contato, inscrição e cadastro: nome, e-mail, telefone, empresa e
              mensagens enviadas.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              2. Como Usamos seus Dados
            </h2>
            <p>
              Utilizamos seus dados para responder solicitações, enviar comunicações
              institucionais, divulgar eventos, programas e oportunidades do
              ecossistema de startups.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              3. Compartilhamento
            </h2>
            <p>
              Não compartilhamos seus dados com terceiros sem seu consentimento,
              exceto quando exigido por lei ou para cumprimento de obrigações
              contratuais com parceiros do ecossistema.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              4. Seus Direitos
            </h2>
            <p>
              Você pode solicitar acesso, correção, exclusão ou portabilidade dos
              seus dados a qualquer momento, escrevendo para{" "}
              <a
                href="mailto:contato@brasilstartups.org"
                className="text-accent hover:underline"
              >
                contato@brasilstartups.org
              </a>
              .
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              5. Contato
            </h2>
            <p>
              Para dúvidas sobre esta política, entre em contato pelo e-mail{" "}
              <a
                href="mailto:contato@brasilstartups.org"
                className="text-accent hover:underline"
              >
                contato@brasilstartups.org
              </a>
              .
            </p>

            <p className="text-sm mt-12">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
