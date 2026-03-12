"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ElasticSlider({ min = 5000, max = 150000, step = 1000, value, onChange }) {
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  // To avoid hydration mismatch if value is passed from server somehow
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-12 w-full animate-pulse bg-border rounded-full"></div>;

  return (
    <div className="w-full flex flex-col gap-6 font-body">
      <div className="flex justify-between text-muted text-sm font-mono">
        <span>{formatINR(min)}</span>
        <span>{formatINR(max)}</span>
      </div>
      <div className="relative h-2 bg-border rounded-full flex items-center group mt-2">
         {/* Active Track */}
         <div 
           className="absolute h-full bg-accent rounded-full pointer-events-none" 
           style={{
             left: `${((value[0] - min) / (max - min)) * 100}%`,
             right: `${100 - ((value[1] - min) / (max - min)) * 100}%`
           }}
         />
         
         <input 
           type="range" min={min} max={max} step={step} value={value[0]} 
           onChange={(e) => {
             const val = Number(e.target.value);
             if (val <= value[1]) onChange([val, value[1]]);
           }}
           className="absolute w-full dual-slider h-0 outline-none z-30"
         />
         <input 
           type="range" min={min} max={max} step={step} value={value[1]} 
           onChange={(e) => {
             const val = Number(e.target.value);
             if (val >= value[0]) onChange([value[0], val]);
           }}
           className="absolute w-full dual-slider h-0 outline-none z-30"
         />
         
         {/* Custom thumbs */}
         <motion.div 
           className="absolute w-5 h-5 bg-text rounded-full shadow-lg border-2 border-accent pointer-events-none z-10 flex justify-center thumb-transition"
           style={{ left: `calc(${((value[0] - min) / (max - min)) * 100}% - 10px)` }}
         >
           <div className="absolute -top-10 bg-card border border-border px-3 py-1 rounded-lg text-xs font-mono text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {formatINR(value[0])}
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-b border-r border-border rotate-45"></div>
           </div>
         </motion.div>
         <motion.div 
           className="absolute w-5 h-5 bg-text rounded-full shadow-lg border-2 border-accent pointer-events-none z-10 flex justify-center thumb-transition"
           style={{ left: `calc(${((value[1] - min) / (max - min)) * 100}% - 10px)` }}
         >
           <div className="absolute -top-10 bg-card border border-border px-3 py-1 rounded-lg text-xs font-mono text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {formatINR(value[1])}
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-b border-r border-border rotate-45"></div>
           </div>
         </motion.div>
      </div>
    </div>
  );
}
