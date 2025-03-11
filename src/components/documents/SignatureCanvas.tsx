
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Undo2, Save, Trash } from "lucide-react";
import { motion } from "framer-motion";

interface SignatureCanvasProps {
  onSave: (signatureData: { name: string; signature: string }) => void;
  onCancel: () => void;
}

const SignatureCanvas = ({ onSave, onCancel }: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    if (context) {
      context.lineWidth = 2;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "black";
      setCtx(context);
    }
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Restore context properties after resize
      if (context) {
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    setIsDrawing(true);
    setIsEmpty(false);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);
    ctx.closePath();
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsEmpty(true);
  };

  const handleSave = () => {
    if (!canvasRef.current || isEmpty || !name.trim()) return;
    
    const signatureData = {
      name: name.trim(),
      signature: canvasRef.current.toDataURL("image/png")
    };
    
    onSave(signatureData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-lg mx-auto shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Sign Document</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your Full Name
            </label>
            <Input
              id="name"
              placeholder="Type your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="transition-all focus-visible:ring-primary focus-visible:ring-opacity-50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Signature</label>
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-1 h-48 bg-muted/10">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                className="w-full h-full bg-white rounded-md cursor-crosshair"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Draw your signature inside the box above
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-2">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCanvas}
              disabled={isEmpty}
              className="text-destructive hover:text-destructive"
            >
              <Trash className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
            >
              <Undo2 className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
          <Button 
            onClick={handleSave}
            disabled={isEmpty || !name.trim()}
            className="transition-all"
          >
            <Save className="h-4 w-4 mr-1" />
            Apply Signature
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignatureCanvas;
