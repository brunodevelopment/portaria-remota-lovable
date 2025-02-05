import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";

// Interfaces
interface ChatProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}
interface Message {
  id: number;
  sender: string;
  message: string;
  time: string;
  profileImage?: string; // Adicionado campo para imagem de perfil
}
interface Row {
  c: Array<{ v: string | number | null } | null>;
}

const Chat = ({ isCollapsed, setIsCollapsed }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState<{ name: string; email: string; profileImage?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Referência para o ScrollArea
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dicionário para armazenar cores únicas por usuário
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Função para formatar apenas a hora no formato hh.mm.ss
  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}.${minutes}.${seconds}`;
  };

// Função para buscar mensagens do Google Sheets
const fetchMessagesFromGoogleSheets = useCallback(async () => {
  try {
    const sheetId = "1zmtPpTtmvmFfHR-HVfNOc2ugIx6mJz0AwfySYo2RNmE";
    const sheetName = "Chat";
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados do Google Sheets");
    }
    const text = await response.text();
    const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (!jsonString || !jsonString[1]) {
      throw new Error("Erro ao processar os dados do Google Sheets");
    }
    const parsedData = JSON.parse(jsonString[1]);
    const rows = parsedData.table.rows as Row[];
    const formattedMessages = rows.map((row: Row, index: number) => {
      const rawTimestamp = row.c[0]?.v;
      let formattedTime: string;

      // Verifica se o timestamp já está no formato DD.MM.AAAA - hh:mm:ss
      if (typeof rawTimestamp === "string" && /\d{2}\.\d{2}\.\d{4} - \d{2}:\d{2}:\d{2}/.test(rawTimestamp)) {
        // Extrai apenas a parte da hora e substitui ":" por "."
        const timePart = rawTimestamp.split(" - ")[1];
        formattedTime = timePart.replace(/:/g, ".");
      } 
      // Verifica se o timestamp é uma data válida (string ou número)
      else if (
        (typeof rawTimestamp === "string" && !isNaN(Date.parse(rawTimestamp))) || // Data válida como string
        (typeof rawTimestamp === "number" && !isNaN(rawTimestamp)) // Timestamp Unix
      ) {
        // Formata o horário no formato hh.mm.ss
        formattedTime = formatTime(new Date(rawTimestamp));
      } 
      // Fallback: usa a hora atual como último recurso
      else {
        formattedTime = formatTime(new Date());
      }

      return {
        id: index + 1,
        sender: row.c[1]?.v?.toString() || "Unknown",
        message: row.c[4]?.v?.toString() || "",
        time: formattedTime, // Usa o horário formatado
        profileImage: row.c[3]?.v?.toString() || undefined,
      };
    });

    // Ordena as mensagens pela data mais recente
    formattedMessages.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    setMessages(formattedMessages);
  } catch (error) {
    console.error("Erro ao carregar mensagens:", error);
  }
}, []);

  useEffect(() => {
    // Função para buscar mensagens imediatamente ao carregar o componente
    fetchMessagesFromGoogleSheets();
  
    // Configura o intervalo para buscar mensagens a cada 1 segundo
    const intervalId = setInterval(() => {
      fetchMessagesFromGoogleSheets();
    }, 100);
  
    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [fetchMessagesFromGoogleSheets]);

  // Função para enviar mensagem via formulário
  const handleSendMessage = useCallback(async () => {
    if (!userData?.name || !userData?.email || !newMessage.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      const currentTimestamp = formatTime(new Date());
      const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfRrhFQ6iIDnWq635UL0TXyYI0oLfqzdOCb1ngAZIdkRw9ibA/formResponse?usp=pp_url&entry.982624457=${encodeURIComponent(
        userData.name
      )}&entry.2115408969=${encodeURIComponent(userData.email)}&entry.2006143521=${encodeURIComponent(
        userData.profileImage || ""
      )}&entry.1104266422=${encodeURIComponent(newMessage)}&entry.455446286=${encodeURIComponent(currentTimestamp)}`;

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = formUrl;
      document.body.appendChild(iframe);

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);

      setNewMessage("");

      if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

      // Atualiza as mensagens
      fetchMessagesFromGoogleSheets();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userData, newMessage, fetchMessagesFromGoogleSheets]);

  // Memoize a lista de mensagens para evitar re-renderizações desnecessárias
  const memoizedMessages = useMemo(() => messages, [messages]);

  // Função para gerar uma cor aleatória
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Função para obter a cor de um usuário específico
  const getUserColor = useCallback((sender: string) => {
    if (!userColors[sender]) {
      const newColor = generateRandomColor();
      setUserColors((prevColors) => ({ ...prevColors, [sender]: newColor }));
    }
    return userColors[sender];
  }, [userColors]);

  // Rolar para o final das mensagens após atualização
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [memoizedMessages]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Navbar */}
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      {/* Main Content */}
      <main
        className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
          isCollapsed ? "ml-[60px]" : "ml-[240px]"
        }`}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Chat</h2>
          {/* Chat Messages */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-4">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {memoizedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start ${msg.sender === userData?.name ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender !== userData?.name && (
                        <div className="mr-2">
                          <img
                            src={msg.profileImage || "/default-avatar.png"}
                            alt={`${msg.sender}'s profile`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === userData?.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 text-black" // Fundo claro para outros usuários
                        }`}
                      >
                        <div
                          className={`font-semibold text-sm ${
                            msg.sender === userData?.name
                              ? "text-primary-foreground"
                              : `text-${getUserColor(msg.sender)}-600` // Cor gerada para o nome
                          }`}
                        >
                          {msg.sender}
                        </div>
                        <div>{msg.message}</div>
                        <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                      </div>
                      {msg.sender === userData?.name && (
                        <div className="ml-2">
                          <img
                            src={userData.profileImage || "/default-avatar.png"}
                            alt={`${msg.sender}'s profile`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          {/* Input Area */}
          <div className="flex items-center gap-2 mt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? (
                <span className="animate-spin">...</span>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;