import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";

interface LostFoundProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const LostFound = ({ isCollapsed, setIsCollapsed }: LostFoundProps) => {
  const mockItems = [
    {
      id: 1,
      type: "Lost",
      item: "iPhone 13",
      location: "Central Park",
      date: "2024-02-04",
      description: "Black iPhone 13 with blue case",
      contact: "John Doe",
      phone: "555-0123",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=300",
    },
    {
      id: 2,
      type: "Found",
      item: "Keys",
      location: "Library",
      date: "2024-02-03",
      description: "Set of keys with red keychain",
      contact: "Jane Smith",
      phone: "555-0124",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=300",
    },
    {
      id: 3,
      type: "Lost",
      item: "Wallet",
      location: "Bus Station",
      date: "2024-02-02",
      description: "Brown leather wallet",
      contact: "Mike Johnson",
      phone: "555-0125",
      image: "https://images.unsplash.com/photo-1627843563095-f6e94676cfe0?q=80&w=300",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Lost & Found</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {mockItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <img
                  src={item.image}
                  alt={item.item}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge
                      variant={item.type === "Lost" ? "destructive" : "default"}
                      className="mb-2"
                    >
                      {item.type}
                    </Badge>
                    <h3 className="font-semibold text-lg">{item.item}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.location} • {item.date}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-4">{item.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Contact: {item.contact}</p>
                  <Button className="w-full" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call {item.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LostFound;