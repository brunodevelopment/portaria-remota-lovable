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
import Chat from "./pages/Chat";
import Transactions from "./pages/Transactions";
import Orders from "./pages/Orders";
import Documents from "./pages/Documents";
import Polls from "./pages/Polls";
import Pets from "./pages/Pets";
import Login from "./pages/Login";
import LostFound from "./pages/LostFound";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

  // Função para lidar com login bem-sucedido
  const handleLoginSuccess = (data: { name: string; email: string; profileImage: string}) => {
    console.log("Login bem-sucedido:", data);
    setIsAuthenticated(true); // Atualiza o estado de autenticação
    // Você pode armazenar tokens ou outros dados aqui, se necessário
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rota pública */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            {/* Rotas protegidas */}
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route
                path="/"
                element={
                  <Index isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/contacts"
                element={
                  <Contacts isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/contacts/:id"
                element={
                  <ContactDetails isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/deals"
                element={
                  <Deals isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/chat"
                element={
                  <Chat isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/transactions"
                element={
                  <Transactions isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/orders"
                element={
                  <Orders isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/documents"
                element={
                  <Documents isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/polls"
                element={
                  <Polls isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/pets"
                element={
                  <Pets isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
              <Route
                path="/lost-found"
                element={
                  <LostFound isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                }
              />
            </Route>

            {/* Rota padrão */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;