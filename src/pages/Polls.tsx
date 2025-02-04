import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";

interface PollsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Polls = ({ isCollapsed, setIsCollapsed }: PollsProps) => {
  const mockPolls = [
    {
      id: 1,
      question: "What's your preferred work schedule?",
      options: [
        { id: "a", text: "9 AM - 5 PM", votes: 45 },
        { id: "b", text: "8 AM - 4 PM", votes: 30 },
        { id: "c", text: "10 AM - 6 PM", votes: 25 },
      ],
      totalVotes: 100,
      status: "active",
    },
    {
      id: 2,
      question: "Which office location do you prefer?",
      options: [
        { id: "a", text: "Downtown", votes: 60 },
        { id: "b", text: "Suburb", votes: 40 },
      ],
      totalVotes: 100,
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Polls</h2>
        </div>
        <div className="grid gap-4 mt-4">
          {mockPolls.map((poll) => (
            <Card key={poll.id}>
              <CardHeader>
                <CardTitle>{poll.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup defaultValue={poll.options[0].id}>
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={`${poll.id}-${option.id}`} />
                          <Label htmlFor={`${poll.id}-${option.id}`}>{option.text}</Label>
                        </div>
                        <Progress value={(option.votes / poll.totalVotes) * 100} />
                        <div className="text-sm text-muted-foreground">
                          {option.votes} votes ({((option.votes / poll.totalVotes) * 100).toFixed(1)}%)
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button className="w-full">Vote</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Polls;