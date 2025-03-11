
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Edit, FileText, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock document data
const mockTemplates = {
  template1: {
    id: "template1",
    title: "Employment Agreement Template",
    date: "Created on Jun 10, 2023",
    assignedCount: 12,
    signaturePositions: [
      { x: 0.2, y: 0.7, page: 1 },
      { x: 0.8, y: 0.9, page: 3 },
    ],
  },
  template2: {
    id: "template2",
    title: "Health Insurance Form Template",
    date: "Created on Jun 5, 2023",
    assignedCount: 8,
    signaturePositions: [
      { x: 0.5, y: 0.8, page: 2 },
    ],
  },
  template3: {
    id: "template3",
    title: "Tax Declaration Form W-4 Template",
    date: "Created on May 28, 2023",
    assignedCount: 15,
    signaturePositions: [
      { x: 0.3, y: 0.6, page: 1 },
      { x: 0.7, y: 0.3, page: 2 },
    ],
  },
};

const AdminDocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  useEffect(() => {
    // Simulate fetching document data
    setTimeout(() => {
      if (id && (id in mockTemplates)) {
        setTemplate(mockTemplates[id as keyof typeof mockTemplates]);
      } else {
        toast.error("Template not found");
        navigate("/admin/documents");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);
  
  const handleBack = () => {
    navigate("/admin/documents");
  };
  
  const handleDownload = () => {
    // In a real implementation, this would download the PDF
    toast.success("Template downloaded successfully");
  };
  
  const handleEdit = () => {
    navigate(`/admin/documents/${id}/setup`);
  };
  
  const handleDelete = () => {
    // In a real implementation, this would delete the template
    toast.success("Template deleted successfully");
    navigate("/admin/documents");
  };
  
  const handleAssign = () => {
    // In a real implementation, this would open a dialog to assign the template to employees
    toast("This feature would allow assigning the template to employees");
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-muted rounded-lg mb-4"></div>
            <div className="h-6 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!template) {
    return null;
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack} className="gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{template.title}</h1>
            <p className="text-muted-foreground mt-1">{template.date}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            <Button variant="outline" onClick={handleAssign} className="gap-2">
              <Users className="h-4 w-4" />
              Assign to Employees
            </Button>
            
            <Button variant="outline" onClick={handleEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Signature Positions
            </Button>
            
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-destructive/20 hover:border-destructive/50 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this template?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the
                    document template and remove it from your account.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border border-border/50 overflow-hidden">
            <div className="bg-muted/20 w-full aspect-[8.5/11] flex items-center justify-center">
              <FileText className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border border-border/50">
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Template Details</h3>
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Template Title</p>
                  <p className="font-medium">{template.title}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{template.date}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{template.assignedCount} employees</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Signature Positions</p>
                  <p className="font-medium">{template.signaturePositions.length} positions configured</p>
                  <div className="mt-2 space-y-2">
                    {template.signaturePositions.map((pos: any, index: number) => (
                      <div key={index} className="text-sm bg-muted/30 p-2 rounded">
                        Position {index + 1}: Page {pos.page}, coordinates ({Math.round(pos.x * 100)}%, {Math.round(pos.y * 100)}%)
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDocumentView;
