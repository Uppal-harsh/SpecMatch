"use client";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Bookmark, Check, Download, ExternalLink, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

// Mock API Response
const MOCK_BUILD = {
  total: 82500,
  parts: [
    { type: "CPU", name: "AMD Ryzen 5 7600X", price: 18999, link: "#" },
    { type: "Motherboard", name: "MSI B650 Tomahawk ATX", price: 12999, link: "#" },
    { type: "RAM", name: "Corsair 16GB DDR5 5600MHz", price: 6499, link: "#" },
    { type: "Storage", name: "Samsung 970 Evo 1TB NVMe", price: 7499, link: "#" },
    { type: "GPU", name: "Nvidia RTX 4060 8GB", price: 32999, link: "#" },
    { type: "PSU", name: "Corsair RM650 80+ Gold", price: 5499, link: "#" },
    { type: "CPU Cooler", name: "DeepCool AK400", price: 3999, link: "#" },
    { type: "Case", name: "Lian Li Lancool 216", price: 6999, link: "#" }
  ],
  upgrade: {
    cost: 10000,
    part: "GPU",
    to: "RTX 4060 Ti",
    benefit: "+28% gaming performance · same power draw"
  }
};

export default function PCBuilderResults() {
  const router = useRouter();
  const { savePreset } = useStore();
  const [saved, setSaved] = useState(false);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleSave = () => {
    savePreset({
      id: Date.now().toString(),
      title: `🖥️ Gaming PC Build ${formatINR(MOCK_BUILD.total)}`,
      details: "RTX 4060 · Ryzen 5 · 16GB RAM",
      savedAt: "Just now"
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(MOCK_BUILD.parts.map(p => ({
        Component: p.type,
        Model: p.name,
        Price: `Rs. ${p.price}`
    })));
    
    // Add Total Row
    const finalCsv = `${csv}\n\nTotal,,Rs. ${MOCK_BUILD.total}`;

    const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "specmatch_pc_build.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] pt-24 pb-32 px-4 flex justify-center z-10 relative">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        <div className="w-full bg-card/60 backdrop-blur-md border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted/80">
            <span className="text-text font-bold">Your Build:</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">🖥️ PC</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">Budget: ₹85k</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">Gaming Focus</span>
          </div>
          <button 
            onClick={() => router.push("/wizard/pc-builder")}
            className="text-accent2 hover:underline text-xs font-mono font-bold flex items-center gap-1 whitespace-nowrap"
          >
            ← Edit Preferences
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-card/90 backdrop-blur-2xl border border-accent/30 rounded-3xl overflow-hidden shadow-[0_0_50px_-15px_var(--accent)] relative flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-border/50 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
             <div>
               <h1 className="font-display font-extrabold text-3xl md:text-4xl text-text leading-tight mb-2">Your Recommended Build</h1>
               <div className="flex items-center gap-2 text-accent2 text-sm font-mono bg-accent2/10 px-3 py-1.5 rounded-lg border border-accent2/20 w-max">
                 <Check size={16} /> All parts fully compatible
               </div>
             </div>
             <div className="text-left md:text-right">
                <span className="font-mono text-sm text-muted block mb-1 uppercase tracking-widest">Total Estimated</span>
                <span className="font-display text-4xl md:text-5xl font-black text-accent">{formatINR(MOCK_BUILD.total)}</span>
             </div>
          </div>

          {/* Parts List */}
          <div className="p-6 md:p-8 flex-1 grid grid-cols-1 gap-2 z-10 relative">
            {MOCK_BUILD.parts.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 hover:border-border transition-colors group">
                 <div className="flex items-center gap-4 w-full sm:w-2/3">
                   <div className="w-24 font-mono text-xs text-muted uppercase tracking-widest shrink-0">{p.type}</div>
                   <div className="font-display font-bold text-text truncate pr-4">{p.name}</div>
                 </div>
                 <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-1/3 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50 sm:border-transparent">
                   <div className="font-mono font-bold text-text">{formatINR(p.price)}</div>
                   <button className="text-muted hover:text-accent transition-colors flex items-center gap-1 text-xs font-mono bg-card px-2 py-1 rounded">
                     Compare <ExternalLink size={12} />
                   </button>
                 </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8 pt-0 z-10 relative">
             <div className="bg-card w-full rounded-2xl border border-accent/20 p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Lightbulb size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-text">Upgrade Suggestion</h3>
                  <p className="font-body text-sm text-muted mt-1">
                    For <span className="text-accent2 font-mono font-bold">{formatINR(MOCK_BUILD.upgrade.cost)}</span> more → upgrade {MOCK_BUILD.upgrade.part} to <span className="text-text font-bold">{MOCK_BUILD.upgrade.to}</span>
                  </p>
                  <p className="font-mono text-xs text-accent mt-2">{MOCK_BUILD.upgrade.benefit}</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-background border border-border text-text text-sm font-bold hover:border-accent transition-colors whitespace-nowrap">
                  Apply Upgrade
                </button>
             </div>
          </div>

          {/* Actions */}
          <div className="p-6 md:p-8 border-t border-border/50 bg-background/50 z-10 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <button className="py-3.5 rounded-xl bg-card border border-border text-text font-display font-bold hover:bg-border transition-colors flex items-center justify-center gap-2">
              Compare prices via SerpAPI
            </button>
            <button 
              onClick={handleSave}
              disabled={saved}
              className="py-3.5 rounded-xl bg-text text-background font-display font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              {saved ? <><Check size={18} /> Saved</> : <><Bookmark size={18} /> Save Build Preset</>}
            </button>
            <button 
              onClick={handleExportCSV}
              className="py-3.5 rounded-xl bg-card border border-border text-text font-display font-bold hover:border-accent2 hover:text-accent2 transition-colors flex items-center justify-center gap-2 sm:col-span-2 md:col-span-1"
            >
              <Download size={18} /> Export as CSV
            </button>
          </div>

          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>

      </div>
    </div>
  );
}
