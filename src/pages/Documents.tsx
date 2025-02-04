import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Documents = ({ isCollapsed, setIsCollapsed }: DocumentsProps) => {
  const mockDocuments = [
    {
      id: 1,
      name: "Annual Report 2023",
      type: "PDF",
      size: "2.5 MB",
      uploadedDate: "2024-02-04",
      category: "Reports",
    },
    {
      id: 2,
      name: "Employee Handbook",
      type: "DOC",
      size: "1.8 MB",
      uploadedDate: "2024-02-03",
      category: "HR",
    },
    {
      id: 3,
      name: "Project Proposal",
      type: "PDF",
      size: "3.2 MB",
      uploadedDate: "2024-02-02",
      category: "Projects",
    },
    {
      id: 4,
      name: "Meeting Minutes",
      type: "DOC",
      size: "0.5 MB",
      uploadedDate: "2024-02-01",
      category: "Meetings",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {doc.name}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                <div>Type: {doc.type}</div>
                <div>Size: {doc.size}</div>
                <div>Category: {doc.category}</div>
                <div>Uploaded: {doc.uploadedDate}</div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;