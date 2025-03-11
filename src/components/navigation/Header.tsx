
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, File, Upload } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-16 border-b border-border/40 bg-background/80 backdrop-blur-sm fixed top-0 z-50 px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="sr-only">Document Signature System</span>
            DocuMapper
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/employee/documents" 
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <File className="mr-2 h-4 w-4" />
            Employee View
          </Link>
          
          <Link 
            to="/admin/documents" 
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="mr-2 h-4 w-4" />
            Admin View
          </Link>

          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
