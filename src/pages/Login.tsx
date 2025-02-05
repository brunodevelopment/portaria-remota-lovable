import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definindo o tipo para as linhas do Google Sheets
interface SheetRow {
  c: Array<{ v?: string } | null>; // Cada célula pode ter um valor (v) ou ser nula
}

const Login: React.FC<{ onLoginSuccess: (data: { name: string; email: string; profileImage: string }) => void }> = ({
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false); // Estado para alternar entre Login e Cadastro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [residentType, setResidentType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Função para remover @#$ do início e fim de uma string
  const removeSpecialChars = (value: string | null): string => {
    if (!value) return "";
    return value.replace(/^@#\$|@#\$$/g, ""); // Remove @#$ no início e no fim
  };

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const sheetId = "1zmtPpTtmvmFfHR-HVfNOc2ugIx6mJz0AwfySYo2RNmE";
      const sheetName = "Cadastro de pessoas";
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do Google Sheets");
      }
      const data = await response.text();
      const jsonString = data.substring(47).slice(0, -2); // Extrai o JSON válido
      const parsedData = JSON.parse(jsonString);
      const rows = parsedData.table.rows;

      const user = rows.find(
        (row: SheetRow) =>
          removeSpecialChars(row.c[4]?.v) === email &&
          removeSpecialChars(row.c[5]?.v) === password
      );
      if (user) {
        const userName = removeSpecialChars(user.c[1]?.v) || "Unknown";
        const userProfileLink = removeSpecialChars(user.c[10]?.v) || ""; // Link Perfil está na coluna 8

        // Salva os dados do usuário no localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ name: userName, email, profileImage: userProfileLink })
        );

        // Chama a função de sucesso passada como prop
        onLoginSuccess({ name: userName, email, profileImage: userProfileLink });

        // Redireciona para a página inicial
        navigate("/");
      } else {
        setError("Credenciais inválidas!");
      }
    } catch (err) {
      console.error("Erro ao verificar credenciais:", err);
      setError("Erro ao verificar credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o cadastro
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const url = `https://docs.google.com/forms/d/e/1FAIpQLScr95mWZSfvw7F27v6VmKWsOhd0nfemmwTZTZT1Oqh591WAGQ/formResponse`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "entry.1727119256": name,
          "entry.793291253": email,
          "entry.2030234234": password,
          "entry.1585703458": birthDate,
          "entry.719152736": gender,
          "entry.394790052": residentType,
        }),
      });
      console.log("Resposta do servidor:", response);
      console.log("Status:", response.status);
      if (response.status === 200) {
        // Redireciona para a página de login
        setIsSignUp(false); // Volta para a aba de login após o cadastro
      } else {
        // Exibe erro se o status não for 200
        throw new Error(`Erro ao enviar os dados. Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setIsSignUp(false); // Volta para a aba de login após o cadastro
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen space-y-4 bg-gray-900 text-white">
      {/* Abas para alternar entre Login e Cadastro */}
      <div className="flex w-full max-w-md justify-center bg-gray-800 p-2 rounded-t-md">
        <button
          onClick={() => setIsSignUp(false)}
          className={`px-4 py-2 rounded-md ${
            !isSignUp ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className={`px-4 py-2 rounded-md ${
            isSignUp ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          Cadastro
        </button>
      </div>
      {/* Formulário de Login ou Cadastro */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-b-md">
        {error && <p className="text-red-500">{error}</p>}
        {isSignUp ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
              required
            />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
            >
              <option value="">Selecione o gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <select
              value={residentType}
              onChange={(e) => setResidentType(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
            >
              <option value="">Selecione o tipo de morador</option>
              <option value="Proprietário">Proprietário</option>
              <option value="Locatário">Locatário</option>
              <option value="Visitante">Visitante</option>
            </select>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Carregando..." : "Cadastrar"}
            </button>
          </form>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md bg-gray-700 text-white w-full"
            />
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
          </>
        )}
      </div>
      {/* Dados de apresentação do projeto */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold">Bem-vindo ao Projeto Portaria Remota</h2>
        <p className="mt-2">
          Este é um sistema de autenticação integrado com Google Sheets para gerenciar usuários.
        </p>
        <p className="mt-2">
          Faça login ou cadastre-se para acessar as funcionalidades.
        </p>
      </div>
    </div>
  );
};

export default Login;