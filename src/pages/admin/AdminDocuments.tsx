
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DocumentGrid from "@/components/documents/DocumentGrid";
import DocumentUploader from "@/components/documents/DocumentUploader";
import EmptyState from "@/components/common/EmptyState";
import { DocumentCardProps } from "@/components/documents/DocumentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { File, FileText, Plus, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock data for admin documents
const MOCK_DOCUMENTS: Omit<DocumentCardProps, "onClick">[] = [
  {
    id: "template1",
    title: "Employment Agreement Template",
    status: "pending",
    date: "Created on Jun 10, 2023",
  },
  {
    id: "template2",
    title: "Health Insurance Form Template",
    status: "pending",
    date: "Created on Jun 5, 2023",
  },
  {
    id: "template3",
    title: "Tax Declaration Form W-4 Template",
    status: "pending",
    date: "Created on May 28, 2023",
  },
];

const AdminDocuments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [showUploader, setShowUploader] = useState(false);
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDocumentClick = (id: string) => {
    navigate(`/admin/documents/${id}`);
  };
  
  const handleAddDocument = () => {
    setShowUploader(true);
  };
  
  const handleUploadCancel = () => {
    setShowUploader(false);
  };
  
  const handleUploadComplete = (file: File, title: string) => {
    // In a real implementation, this would handle the actual upload
    // For now, we'll just add it to our mock data
    
    const newDocId = `template${documents.length + 1}`;
    const newDocument = {
      id: newDocId,
      title: title,
      status: "pending" as const,
      date: `Created on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    };
    
    setDocuments([newDocument, ...documents]);
    setShowUploader(false);
    
    // Navigate to the signature placement page
    navigate(`/admin/documents/${newDocId}/setup`);
  };

  return (
    <MainLayout
      title="Document Templates"
      subtitle="Manage your document templates"
    >
      {showUploader ? (
        <DocumentUploader
          onUpload={handleUploadComplete}
          onCancel={handleUploadCancel}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button onClick={handleAddDocument} className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Upload New Template
            </Button>
          </div>
          
          {filteredDocuments.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DocumentGrid 
                documents={filteredDocuments}
                onDocumentClick={handleDocumentClick}
              />
            </motion.div>
          ) : (
            <EmptyState
              icon={<Upload className="h-10 w-10 text-muted-foreground" />}
              title="No document templates"
              description={
                searchQuery
                  ? "No templates match your search criteria. Try a different search term."
                  : "Start by uploading your first document template."
              }
              actionLabel="Upload Template"
              onAction={handleAddDocument}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default AdminDocuments;
