
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Employee routes
import EmployeeDocuments from "./pages/employee/EmployeeDocuments";
import EmployeeDocumentView from "./pages/employee/EmployeeDocumentView";

// Admin routes
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminDocumentView from "./pages/admin/AdminDocumentView";
import AdminDocumentSetup from "./pages/admin/AdminDocumentSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Employee routes */}
            <Route path="/employee/documents" element={<EmployeeDocuments />} />
            <Route path="/employee/documents/:id" element={<EmployeeDocumentView />} />
            
            {/* Admin routes */}
            <Route path="/admin/documents" element={<AdminDocuments />} />
            <Route path="/admin/documents/:id" element={<AdminDocumentView />} />
            <Route path="/admin/documents/:id/setup" element={<AdminDocumentSetup />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
