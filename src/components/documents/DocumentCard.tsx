
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { File, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export interface DocumentCardProps {
  id: string;
  title: string;
  jobTitle?: string;
  status: "pending" | "signed" | "expired";
  date: string;
  onClick: (id: string) => void;
}

const DocumentCard = ({ id, title, jobTitle, status, date, onClick }: DocumentCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-muted-foreground" />
              {status === "signed" && (
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Signed
                </Badge>
              )}
              {status === "pending" && (
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <CardTitle className="text-base font-medium mt-2">{title}</CardTitle>
          {jobTitle && (
            <p className="text-sm text-muted-foreground mt-1">{jobTitle}</p>
          )}
        </CardHeader>
        <CardContent className="pb-3">
          <div className="w-full bg-muted/50 rounded-md h-32 flex items-center justify-center">
            <File className="h-12 w-12 text-muted-foreground/50" />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="secondary" 
            className="w-full transition-all" 
            onClick={() => onClick(id)}
          >
            {status === "signed" ? "View Signed Document" : "View & Sign"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DocumentCard;
