import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import Deals from "./pages/Deals";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAuthenticated = true; // In a real app, this would be managed by your auth system

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Auth />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Index isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/contacts"
              element={
                isAuthenticated ? (
                  <Contacts isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/contacts/:id"
              element={
                isAuthenticated ? (
                  <ContactDetails isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/deals"
              element={
                isAuthenticated ? (
                  <Deals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;