
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import SignatureCanvas from "@/components/documents/SignatureCanvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, Clock, Download, FileText, Pencil } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock document data
const mockDocuments = {
  doc1: {
    id: "doc1",
    title: "Employment Agreement",
    jobTitle: "Software Engineer",
    status: "pending",
    date: "Added on Jun 12, 2023",
    fileUrl: "/sample.pdf", // This would be a real URL in production
  },
  doc2: {
    id: "doc2",
    title: "Health Insurance Form",
    jobTitle: "Software Engineer",
    status: "signed",
    date: "Signed on Jun 14, 2023",
    fileUrl: "/sample.pdf",
    signedBy: "John Doe",
    signedDate: "Jun 14, 2023",
  },
};

const EmployeeDocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
  
  useEffect(() => {
    // Simulate fetching document data
    setTimeout(() => {
      if (id && (id in mockDocuments)) {
        setDocument(mockDocuments[id as keyof typeof mockDocuments]);
      } else {
        toast.error("Document not found");
        navigate("/employee/documents");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);
  
  const handleBack = () => {
    navigate("/employee/documents");
  };
  
  const handleDownload = () => {
    // In a real implementation, this would download the PDF
    toast.success("Document downloaded successfully");
  };
  
  const handleSign = () => {
    setShowSignatureCanvas(true);
  };
  
  const handleSignatureCancel = () => {
    setShowSignatureCanvas(false);
  };
  
  const handleSignatureSave = (signatureData: { name: string; signature: string }) => {
    // In a real implementation, this would save the signature and apply it to the PDF
    toast.success("Document signed successfully");
    
    // Update document status
    setDocument({
      ...document,
      status: "signed",
      signedBy: signatureData.name,
      signedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    
    setShowSignatureCanvas(false);
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
  
  if (!document) {
    return null;
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack} className="gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{document.title}</h1>
              {document.status === "signed" ? (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Signed
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">{document.jobTitle}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            {document.status !== "signed" && (
              <Button onClick={handleSign} className="gap-2">
                <Pencil className="h-4 w-4" />
                Sign Document
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {showSignatureCanvas ? (
        <SignatureCanvas 
          onSave={handleSignatureSave}
          onCancel={handleSignatureCancel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="border border-border/50 overflow-hidden">
              <div className="bg-muted/20 w-full aspect-[8.5/11] flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground/50" />
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="border border-border/50">
              <div className="p-6">
                <h3 className="font-medium mb-2">Document Details</h3>
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Document Title</p>
                    <p className="font-medium">{document.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="font-medium">{document.jobTitle}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Added On</p>
                    <p className="font-medium">{document.date}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="flex items-center mt-1">
                      {document.status === "signed" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                          <span className="font-medium text-green-600">
                            Signed by {document.signedBy} on {document.signedDate}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-500 mr-1.5" />
                          <span className="font-medium text-amber-600">
                            Pending Signature
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default EmployeeDocumentView;
