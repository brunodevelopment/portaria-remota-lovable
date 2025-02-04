import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ChatProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Chat = ({ isCollapsed, setIsCollapsed }: ChatProps) => {
  const mockMessages = [
    { id: 1, sender: "John Doe", message: "Hello! How are you?", time: "09:00" },
    { id: 2, sender: "Me", message: "I'm good, thanks! How about you?", time: "09:01" },
    { id: 3, sender: "John Doe", message: "Great! Just checking in.", time: "09:02" },
    { id: 4, sender: "Me", message: "Appreciate it!", time: "09:03" },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
        </div>
        <div className="grid gap-4 mt-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "Me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === "Me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="font-semibold">{msg.sender}</div>
                        <div>{msg.message}</div>
                        <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2 mt-4">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Chat;