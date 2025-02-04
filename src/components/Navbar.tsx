import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PieChart,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ArrowRightLeft,
  Package,
  FileText,
  Poll,
  PawPrint,
  Search,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Navbar = ({ isCollapsed, setIsCollapsed }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Handle logout logic here
    window.location.href = "/auth";
  };
  
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full flex transition-all duration-300 z-50",
      isCollapsed ? "w-[60px]" : "w-full sm:w-64"
    )}>
      <nav className="w-full bg-card p-4 relative">
        <div className={cn(
          "mb-8 flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && <h1 className="text-2xl font-bold text-primary">CRM</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          
          <Link
            to="/contacts"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/contacts") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Contacts</span>}
          </Link>
          
          <Link
            to="/deals"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/deals") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <PieChart className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Deals</span>}
          </Link>

          <Link
            to="/chat"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/chat") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <MessageSquare className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Chat</span>}
          </Link>

          <Link
            to="/transactions"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/transactions") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <ArrowRightLeft className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Transactions</span>}
          </Link>

          <Link
            to="/orders"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/orders") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <Package className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Orders</span>}
          </Link>

          <Link
            to="/documents"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/documents") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <FileText className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Documents</span>}
          </Link>

          <Link
            to="/polls"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/polls") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <Poll className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Polls</span>}
          </Link>

          <Link
            to="/pets"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/pets") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <PawPrint className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Pets</span>}
          </Link>

          <Link
            to="/lost-found"
            className={cn(
              "flex items-center p-3 rounded-lg transition-colors",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive("/lost-found") ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <Search className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Lost & Found</span>}
          </Link>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center justify-center p-3 rounded-lg transition-colors",
                  !isCollapsed && "justify-between"
                )}
              >
                <User className="h-5 w-5" />
                {!isCollapsed && <span>John Doe</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <Separator className="my-2" />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <Separator orientation="vertical" className="h-full" />
    </div>
  );
};

export default Navbar;