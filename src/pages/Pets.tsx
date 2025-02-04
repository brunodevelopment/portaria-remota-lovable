import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

interface PetsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Pets = ({ isCollapsed, setIsCollapsed }: PetsProps) => {
  const mockPets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: 2,
      status: "Available",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=300",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: 1,
      status: "Available",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300",
    },
    {
      id: 3,
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      age: 3,
      status: "Adopted",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=300",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Pets</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {mockPets.map((pet) => (
            <Card key={pet.id}>
              <CardHeader>
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pet.breed} • {pet.age} years old
                    </p>
                  </div>
                  <Badge variant={pet.status === "Available" ? "default" : "secondary"}>
                    {pet.status}
                  </Badge>
                </div>
                <Button className="w-full" disabled={pet.status !== "Available"}>
                  <Heart className="mr-2 h-4 w-4" />
                  {pet.status === "Available" ? "Adopt Me" : "Already Adopted"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pets;