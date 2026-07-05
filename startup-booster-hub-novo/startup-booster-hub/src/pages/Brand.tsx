import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Palette, FileImage, FileText, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoPreview from "@/assets/brand-logo-preview.jpg";
import logoWhite from "@/assets/brasilstartups-logo-white.png";
import logoColor from "@/assets/brasilstartups-logo.png";

const Brand = () => {
  const { t } = useTranslation();

  const brandColors = [
    { name: "Primary Blue", hex: "#002766", description: t("brand.colors.primaryDesc") },
    { name: "Accent Green", hex: "#0c8ff2", description: t("brand.colors.accentDesc") },
    { name: "Light Gray", hex: "#efefef", description: t("brand.colors.lightDesc") },
    { name: "Dark", hex: "#080d16", description: t("brand.colors.darkDesc") },
  ];

  const downloadAssets = [
    {
      title: t("brand.assets.logoPdf"),
      description: t("brand.assets.logoPdfDesc"),
      icon: FileImage,
      href: "/brand/logo_brasil_startups.pdf",
      format: "PDF",
    },
    {
      title: t("brand.assets.logoStandard"),
      description: t("brand.assets.logoStandardDesc"),
      icon: FileImage,
      href: "/brand/BRASIL_STARTUPS_PADRAO.pdf",
      format: "PDF",
    },
    {
      title: t("brand.assets.colors"),
      description: t("brand.assets.colorsDesc"),
      icon: Palette,
      href: "/brand/CORES.pdf",
      format: "PDF",
    },
    {
      title: t("brand.assets.miv"),
      description: t("brand.assets.mivDesc"),
      icon: FileText,
      href: "/brand/Brasil_Startups_MIV_2021.ps",
      format: "PS",
    },
    {
      title: t("brand.assets.colorsPs"),
      description: t("brand.assets.colorsPsDesc"),
      icon: Palette,
      href: "/brand/CORES.ps",
      format: "PS",
    },
  ];

  const usageGuidelines = [
    {
      title: t("brand.guidelines.spacing.title"),
      description: t("brand.guidelines.spacing.description"),
    },
    {
      title: t("brand.guidelines.contrast.title"),
      description: t("brand.guidelines.contrast.description"),
    },
    {
      title: t("brand.guidelines.distortion.title"),
      description: t("brand.guidelines.distortion.description"),
    },
    {
      title: t("brand.guidelines.colors.title"),
      description: t("brand.guidelines.colors.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              {t("brand.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              {t("brand.title")}
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {t("brand.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Logo Preview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              {t("brand.logoSection.title")}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t("brand.logoSection.description")}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Light Background */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">{t("brand.logoSection.lightBg")}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 bg-white flex items-center justify-center min-h-[200px]">
                  <img 
                    src={logoColor} 
                    alt="Brasil Startups Logo - Fundo Claro" 
                    className="h-20 w-auto"
                  />
                </CardContent>
              </Card>
              
              {/* Dark Background */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg">{t("brand.logoSection.darkBg")}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 bg-primary flex items-center justify-center min-h-[200px]">
                  <img 
                    src={logoWhite} 
                    alt="Brasil Startups Logo - Fundo Escuro" 
                    className="h-20 w-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              {t("brand.colorsSection.title")}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t("brand.colorsSection.description")}
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandColors.map((color) => (
                <Card key={color.hex} className="overflow-hidden">
                  <div 
                    className="h-32 w-full" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <CardContent className="p-4">
                    <p className="font-semibold text-foreground">{color.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{color.hex.toUpperCase()}</p>
                    <p className="text-sm text-muted-foreground mt-2">{color.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-display font-bold text-foreground">
                {t("brand.guidelinesSection.title")}
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t("brand.guidelinesSection.description")}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {usageGuidelines.map((guideline, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guideline.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Assets Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              {t("brand.downloadSection.title")}
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              {t("brand.downloadSection.description")}
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadAssets.map((asset, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <asset.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{asset.title}</CardTitle>
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                          {asset.format}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{asset.description}</CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <a href={asset.href} download className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {t("brand.download")}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
              {t("brand.cta.title")}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {t("brand.cta.description")}
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href="mailto:contato@brasilstartups.org">
                {t("brand.cta.button")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brand;
