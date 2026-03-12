"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="w-full flex items-center justify-between relative mt-8 mb-12">
      {/* Background track */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border rounded-full z-0" />
      
      {/* Active track */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent rounded-full z-0"
        initial={{ width: "0%" }}
        animate={{ width: `${(currentStep / (steps - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      {Array.from({ length: steps }).map((_, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        
        return (
          <div key={idx} className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isCompleted || isActive ? "var(--accent)" : "var(--card)",
                borderColor: isCompleted || isActive ? "var(--accent)" : "var(--border)",
                color: isCompleted || isActive ? "var(--background)" : "var(--muted)",
                scale: isActive ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold shadow-md"
            >
              {isCompleted ? <Check size={14} /> : idx + 1}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
