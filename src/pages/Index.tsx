
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Upload, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary/5 rounded-full p-4 mb-6"
        >
          <FileText className="h-10 w-10 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-semibold tracking-tight mb-4 max-w-xl"
        >
          Document Signature Management
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground mb-8 max-w-lg"
        >
          Upload, manage, and sign onboarding documents with ease. 
          A streamlined solution for employees and administrators.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg" className="gap-2">
            <Link to="/employee/documents">
              <Users className="h-5 w-5" />
              Employee View
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/admin/documents">
              <Upload className="h-5 w-5" />
              Admin View
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 py-12 w-full"
      >
        <Card className="bg-background border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-muted/60 rounded-full p-3 mb-4">
                <Upload className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
              <p className="text-muted-foreground text-sm">
                Upload PDF documents and configure signature positions visually.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-muted/60 rounded-full p-3 mb-4">
                <FileText className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Manage Forms</h3>
              <p className="text-muted-foreground text-sm">
                Assign forms to employees and track completion status.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-muted/60 rounded-full p-3 mb-4">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Signing</h3>
              <p className="text-muted-foreground text-sm">
                Employees can quickly sign documents with a simple digital signature process.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
