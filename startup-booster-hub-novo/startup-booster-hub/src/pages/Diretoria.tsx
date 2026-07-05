import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Users, Linkedin } from "lucide-react";

const executiveBoard = [
  { 
    name: "Hugo Giallanza", 
    roleKey: "president",
    linkedin: "https://www.linkedin.com/in/hugogiallanza/",
    image: "https://brasilstartups.org/wp-content/uploads/sites/2/2022/01/hugo-site.png"
  },
  { 
    name: "Wendely Leal", 
    roleKey: "vicePresident",
    linkedin: "https://www.linkedin.com/in/wendely/",
    image: "https://brasilstartups.org/wp-content/uploads/sites/2/2022/01/wendely-site.png"
  },
  { 
    name: "Juan Ferreira", 
    roleKey: "adminFinance",
    linkedin: "https://www.linkedin.com/in/ojuanferreira/",
    image: "https://brasilstartups.org/wp-content/uploads/sites/2/2023/06/juanferreira.jpeg"
  },
];

const directors = [
  { 
    name: "Monika Heringer", 
    roleKey: "rdDirector",
    linkedin: "https://www.linkedin.com/in/monika-heringer/"
  },
];

const advisors = [
  { 
    name: "Leonardo Valença", 
    roleKey: "fiscalCouncil",
    linkedin: "https://www.linkedin.com/in/leonardovalenca/",
    image: "https://brasilstartups.org/wp-content/uploads/sites/2/2022/01/leonardo-site.png"
  },
  { 
    name: "Hamilton Felix", 
    roleKey: "advisor",
    linkedin: "https://www.linkedin.com/in/hamiltonfelix2/"
  },
  { 
    name: "Samuel Arantes", 
    roleKey: "advisor",
    linkedin: "https://www.linkedin.com/in/sou-samuel-arantes/"
  },
];

const Diretoria = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6 animate-fade-up">
              {t("board.badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up stagger-1">
              {t("board.title")}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto animate-fade-up stagger-2">
              {t("board.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Executive Board */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("board.executive")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("board.executiveDesc")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {executiveBoard.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-accent/10">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                      <Users className="w-16 h-16 text-accent group-hover:text-accent-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">
                  {t(`board.roles.${member.roleKey}`)}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-accent">
                  <Linkedin className="w-4 h-4" />
                  <span>{t("board.viewLinkedIn")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("board.directors")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("board.directorsDesc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {directors.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-all duration-300">
                  <Users className="w-12 h-12 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">
                  {t(`board.roles.${member.roleKey}`)}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-accent">
                  <Linkedin className="w-4 h-4" />
                  <span>{t("board.viewLinkedIn")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t("board.advisors")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("board.advisorsDesc")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advisors.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 animate-fade-up hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-accent/10">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                      <Users className="w-12 h-12 text-accent group-hover:text-accent-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">
                  {t(`board.roles.${member.roleKey}`)}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-accent">
                  <Linkedin className="w-4 h-4" />
                  <span>{t("board.viewLinkedIn")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Diretoria;
