
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Move, Save } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SignatureMarkerProps {
  pdfUrl: string;
  onSave: (positions: Array<{ x: number; y: number; page: number }>) => void;
  onCancel: () => void;
}

const SignatureMarker = ({ pdfUrl, onSave, onCancel }: SignatureMarkerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Array<{ x: number; y: number; page: number }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPlacingMarker, setIsPlacingMarker] = useState(false);
  const [scale, setScale] = useState(1);

  // In a real implementation, we would use a PDF rendering library like PDF.js
  // For this demo, we'll simulate PDF rendering with a placeholder
  
  const handleAddMarker = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingMarker || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // Normalize to 0-1
    const y = (e.clientY - rect.top) / rect.height; // Normalize to 0-1
    
    setMarkers([...markers, { x, y, page: currentPage }]);
    setIsPlacingMarker(false);
    toast.success("Signature marker added");
  };
  
  const handleRemoveMarker = (index: number) => {
    setMarkers(markers.filter((_, i) => i !== index));
    toast.success("Signature marker removed");
  };
  
  const handleSave = () => {
    if (markers.length === 0) {
      toast.error("Please add at least one signature location");
      return;
    }
    
    onSave(markers);
  };
  
  const incrementPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const decrementPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const zoomIn = () => {
    setScale(Math.min(scale + 0.1, 2));
  };
  
  const zoomOut = () => {
    setScale(Math.max(scale - 0.1, 0.5));
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsPlacingMarker(!isPlacingMarker)}
            className={isPlacingMarker ? "bg-primary text-primary-foreground" : ""}
          >
            <Move className="h-4 w-4 mr-1" />
            {isPlacingMarker ? "Placing Marker..." : "Add Signature Marker"}
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-muted rounded-md flex items-center">
            <Button variant="ghost" size="icon" onClick={decrementPage} disabled={currentPage === 1}>
              <span className="sr-only">Previous page</span>
              &larr;
            </Button>
            <span className="text-sm px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="ghost" size="icon" onClick={incrementPage} disabled={currentPage === totalPages}>
              <span className="sr-only">Next page</span>
              &rarr;
            </Button>
          </div>
          
          <div className="bg-muted rounded-md flex items-center">
            <Button variant="ghost" size="icon" onClick={zoomOut} disabled={scale <= 0.5}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2">
              {Math.round(scale * 100)}%
            </span>
            <Button variant="ghost" size="icon" onClick={zoomIn} disabled={scale >= 2}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Save Signature Positions
          </Button>
        </div>
      </div>
      
      <div 
        className="flex-1 border rounded-md overflow-hidden bg-muted/30 relative"
        style={{ minHeight: "500px" }}
      >
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center p-4 cursor-crosshair"
          onClick={handleAddMarker}
          style={{ 
            cursor: isPlacingMarker ? 'crosshair' : 'default',
          }}
        >
          {/* PDF would be rendered here in a real implementation */}
          <div 
            className="bg-white shadow-md aspect-[8.5/11] transition-transform"
            style={{
              transform: `scale(${scale})`,
              width: "100%",
              maxWidth: "600px"
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-muted/10">
              <span className="text-muted-foreground">
                PDF Document Preview - Page {currentPage}
              </span>
            </div>
            
            {/* Render markers for current page */}
            {markers
              .filter(marker => marker.page === currentPage)
              .map((marker, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute border-2 border-primary bg-primary/10 rounded p-2 cursor-pointer"
                  style={{
                    left: `${marker.x * 100}%`,
                    top: `${marker.y * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMarker(index);
                  }}
                >
                  <span className="text-xs font-medium">Signature</span>
                </motion.div>
              ))}
          </div>
        </div>
        
        {isPlacingMarker && (
          <div className="absolute inset-0 bg-primary/5 pointer-events-none flex items-center justify-center">
            <div className="bg-background/80 backdrop-blur-sm rounded-md px-4 py-2 shadow-sm">
              <p className="text-sm font-medium">Click where you want the signature to appear</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureMarker;
