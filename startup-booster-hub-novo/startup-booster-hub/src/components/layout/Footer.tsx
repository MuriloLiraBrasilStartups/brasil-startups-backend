import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoWhite from "@/assets/brasilstartups-logo-white.png";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/brasil.startups/" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/brasilstartups/" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@brasil.startups" },
];

// Shared focus styles for keyboard accessibility (visible ring on dark bg)
// Uses a high-contrast white ring with offset against the primary background
// to guarantee visibility at all viewport sizes (WCAG 2.1 SC 2.4.7).
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm";

// Shared link styles: ensures AA contrast at rest (white text on navy ≈ 12:1)
// and a clear hover state with underline + color shift for non-color cues.
const linkBase =
  "text-primary-foreground hover:text-accent hover:underline underline-offset-4 decoration-2 transition-colors duration-200";

// Shared icon styles: inherits text color from parent link (so hover/focus
// states on `linkBase` automatically propagate to the icon) while keeping a
// consistent size and preventing flex shrink in tight layouts.
const iconBase = "w-5 h-5 flex-shrink-0";

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    institucional: [
      { name: t("nav.about"), href: "/sobre" },
      { name: t("nav.board"), href: "/diretoria" },
      { name: t("nav.transparency"), href: "/transparencia" },
      { name: t("footer.brandManual"), href: "/brand" },
      { name: "Estatuto", href: "https://4e10f45f-75fd-49aa-b720-51a8832db888.filesusr.com/ugd/1de972_71935e3db040478fbdf934a5bc45adfd.pdf" },
      { name: "Ata da Posse", href: "https://4e10f45f-75fd-49aa-b720-51a8832db888.filesusr.com/ugd/1de972_f0f4aa7a9e62405eaca9e420b423d5f2.pdf" },
    ],
    associados: [
      { name: t("nav.plans"), href: "/planos" },
      { name: t("nav.benefits"), href: "/beneficios" },
      { name: t("nav.dojo"), href: "/dojo" },
      { name: t("nav.projects"), href: "/projetos" },
      { name: t("nav.ict"), href: "/ict" },
      { name: t("nav.investors"), href: "/investidores" },
    ],
  };

  return (
    <footer
      role="contentinfo"
      aria-label={t("footer.contact")}
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              aria-label={t("nav.home") || "Brasil Startups - Home"}
              className={`flex items-center mb-6 ${focusRing}`}
            >
              <img
                src={logoWhite}
                alt="Brasil Startups - Logotipo institucional"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-primary-foreground mb-6 max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <nav aria-label="Redes sociais">
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg bg-primary-foreground/20 text-primary-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/90 flex items-center justify-center transition-colors duration-200 ${focusRing}`}
                      aria-label={`${social.name} - abre em nova aba`}
                    >
                      <social.icon className="w-5 h-5" aria-hidden="true" focusable="false" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Institutional Links */}
          <nav aria-labelledby="footer-institutional">
            <h3
              id="footer-institutional"
              className="font-display font-semibold text-lg mb-4 text-primary-foreground"
            >
              {t("footer.institutional")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.name} - abre em nova aba`}
                      className={`inline-block py-1 ${linkBase} ${focusRing}`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`inline-block py-1 ${linkBase} ${focusRing}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Associates Links */}
          <nav aria-labelledby="footer-associates">
            <h3
              id="footer-associates"
              className="font-display font-semibold text-lg mb-4 text-primary-foreground"
            >
              {t("footer.associates")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.associados.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`inline-block py-1 ${linkBase} ${focusRing}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-primary-foreground">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5561981626100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp: +55 (61) 9 8162-6100 - abre em nova aba"
                  className={`flex items-center gap-3 py-1 ${linkBase} ${focusRing}`}
                >
                  <Phone className={iconBase} aria-hidden="true" focusable="false" />
                  <span>+55 (61) 9 8162-6100</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@brasilstartups.org"
                  aria-label="Enviar e-mail para contato@brasilstartups.org"
                  className={`flex items-center gap-3 py-1 break-all ${linkBase} ${focusRing}`}
                >
                  <Mail className={iconBase} aria-hidden="true" focusable="false" />
                  <span>contato@brasilstartups.org</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground">
                <MapPin className={`${iconBase} mt-1`} aria-hidden="true" focusable="false" />
                <address className="not-italic">Brasília, DF - Brasil</address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Brasil Startups. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacidade"
              className={`text-sm py-1 ${linkBase} ${focusRing}`}
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/termos"
              className={`text-sm py-1 ${linkBase} ${focusRing}`}
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
