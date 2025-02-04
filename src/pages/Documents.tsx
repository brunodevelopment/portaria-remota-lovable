import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

interface DocumentsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Documents = ({ isCollapsed, setIsCollapsed }: DocumentsProps) => {
  const mockDocuments = [
    { id: 1, name: "Annual Report 2023", type: "PDF", size: "2.5 MB", date: "2024-02-20" },
    { id: 2, name: "Contract Template", type: "DOCX", size: "1.2 MB", date: "2024-02-19" },
    { id: 3, name: "Meeting Notes", type: "PDF", size: "500 KB", date: "2024-02-18" },
    { id: 4, name: "Project Proposal", type: "PDF", size: "3.1 MB", date: "2024-02-17" },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        </div>
        <div className="grid gap-4 mt-4">
          {mockDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Documents;