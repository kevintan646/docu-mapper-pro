
import { ReactNode } from "react";
import Header from "@/components/navigation/Header";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const MainLayout = ({ children, title, subtitle }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 min-h-[calc(100vh-64px)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-7xl mx-auto px-6 py-8"
        >
          {(title || subtitle) && (
            <div className="mb-8">
              {title && (
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-semibold tracking-tight"
                >
                  {title}
                </motion.h1>
              )}
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-muted-foreground mt-2"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          )}
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;
