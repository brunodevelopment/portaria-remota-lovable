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
      petName: "Charlie",
      breed: "Labrador",
      location: "Central Park",
      date: "2024-02-20",
      contact: "John Doe",
      phone: "555-0123",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300",
    },
    {
      id: 2,
      type: "Found",
      petName: "Unknown",
      breed: "Tabby Cat",
      location: "Downtown",
      date: "2024-02-19",
      contact: "Jane Smith",
      phone: "555-0124",
      image: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?q=80&w=300",
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
                  alt={item.petName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge variant={item.type === "Lost" ? "destructive" : "default"}>
                      {item.type}
                    </Badge>
                    <h3 className="font-semibold text-lg mt-2">{item.petName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.breed} • {item.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    Contact: {item.contact}
                  </p>
                  <Button className="w-full">
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