import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Recipe from "./pages/Recipe";
import Explore from "./pages/Explore";
import ReverseCooking from "./pages/ReverseCooking";
import Leftovers from "./pages/Leftovers";
import GuidedCooking from "./pages/GuidedCooking";
import Quiz from "./pages/Quiz";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";
import Offline from "./pages/Offline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reverse-cooking" element={<ReverseCooking />} />
          <Route path="/leftovers" element={<Leftovers />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/recipe/:id/cook" element={<GuidedCooking />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
