import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

const Termos = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Termos de Uso | Brasil Startups"
        description="Termos de uso do site e dos serviços da Brasil Startups. Conheça as regras de utilização da plataforma e dos programas oferecidos."
        path="/termos"
      />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Termos de Uso
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Ao acessar e utilizar o site da Brasil Startups, você concorda com os
              termos e condições descritos abaixo.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              1. Aceitação dos Termos
            </h2>
            <p>
              O uso deste site implica a aceitação integral destes termos. Se você
              não concorda, recomendamos não utilizar a plataforma.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              2. Uso do Conteúdo
            </h2>
            <p>
              Todo o conteúdo deste site (textos, imagens, logos, marcas) é de
              propriedade da Brasil Startups ou de seus parceiros, sendo proibida
              a reprodução sem autorização prévia, exceto materiais disponibilizados
              no Manual de Marca.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              3. Responsabilidades
            </h2>
            <p>
              A Brasil Startups se compromete a manter as informações atualizadas,
              mas não se responsabiliza por eventuais erros, omissões ou
              indisponibilidades temporárias do serviço.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              4. Programas e Benefícios
            </h2>
            <p>
              A participação em programas, eventos e benefícios oferecidos está
              sujeita a regras específicas, comunicadas no momento da inscrição
              ou contratação.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              5. Alterações
            </h2>
            <p>
              Estes termos podem ser atualizados periodicamente. Recomendamos a
              consulta regular desta página.
            </p>

            <h2 className="text-2xl font-display font-semibold text-foreground mt-8">
              6. Contato
            </h2>
            <p>
              Dúvidas? Escreva para{" "}
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

export default Termos;
