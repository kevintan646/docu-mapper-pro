
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import SignatureMarker from "@/components/documents/SignatureMarker";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminDocumentSetup = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real implementation, we would fetch the document data and PDF URL
    // For now, we'll just simulate loading
    setTimeout(() => {
      setPdfUrl("/sample.pdf"); // This would be a real URL in production
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleBack = () => {
    navigate("/admin/documents");
  };
  
  const handleSaveSignaturePositions = (positions: Array<{ x: number; y: number; page: number }>) => {
    // In a real implementation, this would save the signature positions to the backend
    console.log("Saving signature positions:", positions);
    
    toast.success("Signature positions saved successfully");
    navigate("/admin/documents");
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

  return (
    <MainLayout
      title="Configure Signature Positions"
      subtitle="Define where signatures should be placed on the document"
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Button>
      </div>
      
      <div className="bg-background rounded-lg border border-border/50 p-4 min-h-[600px]">
        <SignatureMarker
          pdfUrl={pdfUrl}
          onSave={handleSaveSignaturePositions}
          onCancel={handleBack}
        />
      </div>
    </MainLayout>
  );
};

export default AdminDocumentSetup;
