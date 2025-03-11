
import DocumentCard, { DocumentCardProps } from "./DocumentCard";

interface DocumentGridProps {
  documents: Omit<DocumentCardProps, "onClick">[];
  onDocumentClick: (id: string) => void;
}

const DocumentGrid = ({ documents, onDocumentClick }: DocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          {...doc}
          onClick={onDocumentClick}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;
