import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import VendorLanding from "./pages/VendorLanding";
import VendorRegistration from "./pages/VendorRegistration";
import About from "./pages/About";
import Events from "./pages/Events";
import SearchResults from "./pages/SearchResults";
import EventDetails from "./pages/EventDetails";
import NotFound from "./pages/NotFound";
import HelpCenter from "./components/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HelpCenter />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/list-your-service" element={<VendorLanding />} />
            <Route path="/vendor-registration" element={<VendorRegistration />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/event/:eventType" element={<EventDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
