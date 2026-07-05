import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Planos from "./pages/Planos";
import Sobre from "./pages/Sobre";
import Beneficios from "./pages/Beneficios";
import Dojo from "./pages/Dojo";
import Contato from "./pages/Contato";
import Fundo from "./pages/Fundo";
import Transparencia from "./pages/Transparencia";
import Diretoria from "./pages/Diretoria";
import Brand from "./pages/Brand";
import Projetos from "./pages/Projetos";
import ICT from "./pages/ICT";
import Investidores from "./pages/Investidores";
import CartaExclusividade from "./pages/CartaExclusividade";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/dojo" element={<Dojo />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/fundo" element={<Fundo />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/diretoria" element={<Diretoria />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/ict" element={<ICT />} />
          <Route path="/investidores" element={<Investidores />} />
          <Route path="/carta-de-exclusividade" element={<CartaExclusividade />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
