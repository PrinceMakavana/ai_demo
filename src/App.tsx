
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppSidebar from "./components/Sidebar";
import Index from "./pages/Index";
import SearchEngineSelection from "./pages/SearchEngineSelection";
import CompetitorSelection from "./pages/CompetitorSelection";
import QuerySelection from "./pages/QuerySelection";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RecommendImprovements from "./pages/RecommendImprovements";
import { ReduxProvider } from "./store/provider";
const queryClient = new QueryClient();

const App = () => (
  <ReduxProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppSidebar>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analyze/search-engines" element={<SearchEngineSelection />} />
              <Route path="/analyze/competitors" element={<CompetitorSelection />} />
              <Route path="/analyze/queries" element={<QuerySelection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recommend-improvements" element={<RecommendImprovements />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppSidebar>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;
