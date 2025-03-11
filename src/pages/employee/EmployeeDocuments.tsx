
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DocumentGrid from "@/components/documents/DocumentGrid";
import EmptyState from "@/components/common/EmptyState";
import { DocumentCardProps } from "@/components/documents/DocumentCard";
import { Input } from "@/components/ui/input";
import { File, FileText, Search } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock data for employee documents
const MOCK_DOCUMENTS: Omit<DocumentCardProps, "onClick">[] = [
  {
    id: "doc1",
    title: "Employment Agreement",
    jobTitle: "Software Engineer",
    status: "pending",
    date: "Added on Jun 12, 2023",
  },
  {
    id: "doc2",
    title: "Health Insurance Form",
    jobTitle: "Software Engineer",
    status: "signed",
    date: "Signed on Jun 14, 2023",
  },
  {
    id: "doc3",
    title: "Tax Declaration Form W-4",
    jobTitle: "Software Engineer",
    status: "pending",
    date: "Added on Jun 12, 2023",
  },
  {
    id: "doc4",
    title: "Company Policy Acknowledgment",
    jobTitle: "Software Engineer",
    status: "signed",
    date: "Signed on Jun 13, 2023",
  },
  {
    id: "doc5",
    title: "Direct Deposit Authorization",
    jobTitle: "Software Engineer",
    status: "pending",
    date: "Added on Jun 12, 2023",
  },
];

const EmployeeDocuments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.jobTitle && doc.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleDocumentClick = (id: string) => {
    navigate(`/employee/documents/${id}`);
  };

  return (
    <MainLayout
      title="Your Documents"
      subtitle="View and sign your onboarding documents"
    >
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
          icon={<FileText className="h-10 w-10 text-muted-foreground" />}
          title="No documents found"
          description={
            searchQuery
              ? "No documents match your search criteria. Try a different search term."
              : "You don't have any documents yet."
          }
        />
      )}
    </MainLayout>
  );
};

export default EmployeeDocuments;
