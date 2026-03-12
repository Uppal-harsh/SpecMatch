"use client";
import { useStore } from "@/lib/store";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PCBuildSummary() {
  const { currentStep } = useStore();
  
  const parts = [
    { label: "CPU", step: 2 },
    { label: "Motherboard", step: 3 },
    { label: "RAM", step: 4 },
    { label: "Storage", step: 5 },
    { label: "GPU", step: 6 },
    { label: "PSU", step: 7 },
    { label: "CPU Cooler", step: 8 },
    { label: "Case", step: 9 },
  ];

  const totalEstimate = "₹ 0"; // Real estimate from API later

  return (
    <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[30%] bg-accent/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="flex justify-between items-end mb-6 border-b border-border/50 pb-4">
        <h2 className="font-display text-xl font-bold text-text tracking-wide uppercase">Your Build</h2>
        <div className="text-right">
          <span className="text-xs font-mono text-muted block">Estimated Total</span>
          <span className="font-mono text-lg font-bold text-accent2">{totalEstimate}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {parts.map((part) => {
          const isComplete = currentStep > part.step;
          const isActive = currentStep === part.step;
          
          return (
            <motion.div 
              key={part.label}
              initial={false}
              animate={{
                opacity: isComplete || isActive ? 1 : 0.5,
                x: isActive ? 5 : 0
              }}
              className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${
                isActive ? "bg-accent/10 border-accent/50 text-text" : isComplete ? "bg-background/50 border-border text-text" : "bg-transparent border-transparent text-muted"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider">{part.label}</span>
                <span className={`font-body text-sm ${isComplete ? "font-medium" : "italic opacity-60"}`}>
                  {isComplete ? "[Selected]" : "[Pending...]"}
                </span>
              </div>
              <span className="font-mono text-sm opacity-60">₹ —</span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {currentStep > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-4 border-t border-border/50 flex items-center justify-center gap-2 text-accent2 font-body text-sm bg-accent2/10 p-3 rounded-xl"
          >
            <CheckCircle2 size={16} /> All parts currently compatible
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
