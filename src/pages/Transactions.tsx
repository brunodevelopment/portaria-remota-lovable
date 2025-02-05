import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Transactions = ({ isCollapsed, setIsCollapsed }: TransactionsProps) => {
  const mockTransactions = [
    {
      id: 1,
      date: "2024-02-04",
      description: "Salary Deposit",
      type: "Income",
      amount: 5000.00,
    },
    {
      id: 2,
      date: "2024-02-03",
      description: "Grocery Shopping",
      type: "Expense",
      amount: -150.50,
    },
    {
      id: 3,
      date: "2024-02-02",
      description: "Freelance Payment",
      type: "Income",
      amount: 800.00,
    },
    {
      id: 4,
      date: "2024-02-01",
      description: "Utility Bills",
      type: "Expense",
      amount: -200.00,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
      }`}>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className={`text-right ${
                          transaction.amount > 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;