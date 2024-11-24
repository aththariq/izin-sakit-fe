import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertMessageProps {
  type: "success" | "error";
  title: string;
  message: string;
  duration?: number;
}

export function AlertMessage({
  type,
  title,
  message,
  duration = 3000,
}: AlertMessageProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-1/2",
            type === "success"
              ? "bg-green-500 text-white border-green-700"
              : "bg-red-500 text-white border-red-700",
            "alert" // Ensure the alert class for CSS animations
          )}
        >
          <Alert>
            <Terminal className="h-4 w-4 mr-2" />
            <div>
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
