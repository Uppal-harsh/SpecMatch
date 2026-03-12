"use client";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import MatchScoreRing from "@/components/results/MatchScoreRing";
import PriceComparisonTable from "@/components/results/PriceComparisonTable";
import { ArrowLeft, Bookmark, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock API Response
const MOCK_RESULT = {
  name: "MacBook Air M3 (13-inch)",
  brand: "Apple",
  category: "Laptop",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
  matchScore: 92,
  specs: ["Apple M3 Chip", "16GB Unified Memory", "512GB SSD", "13.6\" Liquid Retina", "1.24 kg"],
  whyThisDevice: "Based on your preference for an ultra-portable device for coding and everyday productivity, the MacBook Air M3 is the absolute best choice. It offers up to 18 hours of battery life, saving you from needing a charger all day, and provides phenomenal performance without any fan noise.",
  prices: [
    { name: "Amazon", price: 134900, rating: 4.8, link: "#amazon" },
    { name: "Flipkart", price: 135900, rating: 4.7, link: "#flipkart" },
    { name: "Croma", price: 134900, rating: 4.8, link: "#croma" },
    { name: "Vijay Sales", price: 136900, rating: 4.5, link: "#vijay" },
    { name: "Reliance Digital", price: 134900, rating: 4.6, link: "#reliance" }
  ]
};

export default function LaptopResults() {
  const router = useRouter();
  const { savePreset } = useStore();
  const [saved, setSaved] = useState(false);
  const [showPrices, setShowPrices] = useState(true);

  const handleSave = () => {
    savePreset({
      id: Date.now().toString(),
      title: `💻 ${MOCK_RESULT.name} Search`,
      details: "Auto-saved comparison from laptop wizard.",
      savedAt: "Just now"
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-32 px-4 flex flex-col items-center z-10 relative">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Top summary bar */}
        <div className="w-full bg-card/60 backdrop-blur-md border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted/80">
            <span className="text-text font-bold">Your Search:</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">💻 Laptop</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">Budget: ₹1.5L</span>
            <span className="bg-background px-2 py-1 rounded-md border border-border">Ultra-portable</span>
          </div>
          <button 
            onClick={() => router.push("/wizard/laptop")}
            className="text-accent2 hover:underline text-xs font-mono font-bold flex items-center gap-1 whitespace-nowrap"
          >
            ← Edit Preferences
          </button>
        </div>

        {/* Featured Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full bg-card/90 backdrop-blur-2xl border border-accent/30 rounded-3xl p-6 shadow-[0_0_50px_-15px_var(--accent)] relative overflow-hidden flex flex-col"
        >
          {/* Badge */}
          <div className="absolute top-0 left-0 bg-accent text-background font-display font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-br-2xl shadow-md z-20">
            #1 Best Match
          </div>

          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start mt-6 z-10 relative">
            
            {/* Image (Mocked) */}
            <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl bg-background border border-border overflow-hidden shrink-0 relative group">
              <img src={MOCK_RESULT.image} alt={MOCK_RESULT.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* details */}
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-muted font-body font-bold text-sm mb-1">{MOCK_RESULT.brand}</h3>
                    <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text leading-tight mb-4">{MOCK_RESULT.name}</h1>
                  </div>
                  <MatchScoreRing score={MOCK_RESULT.matchScore} />
                </div>

                <hr className="border-border/50 mb-4" />

                <div className="flex flex-wrap gap-2 mb-6">
                  {MOCK_RESULT.specs.map(s => (
                    <span key={s} className="bg-background border border-border/50 text-text font-mono text-xs px-3 py-1.5 rounded-lg shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>

                <hr className="border-border/50 mb-4" />

                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 mb-6 relative mt-auto">
                  <span className="absolute -top-3 left-4 bg-card text-accent font-display font-bold text-[10px] uppercase tracking-widest px-2 pb-0.5 border border-accent/20 rounded-full flex items-center gap-1">
                    <span className="text-sm">✦</span> Why This Device
                  </span>
                  <p className="font-body text-sm text-text/90 leading-relaxed mt-1">
                    {MOCK_RESULT.whyThisDevice}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button 
                  onClick={() => setShowPrices(!showPrices)}
                  className="flex-1 py-3.5 rounded-xl bg-text text-background font-display font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                  {showPrices ? "Hide Prices" : "Compare Prices ▼"}
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saved}
                  className="px-6 py-3.5 rounded-xl bg-background border border-border text-text font-display font-bold hover:border-accent2 hover:text-accent2 transition-colors flex items-center justify-center gap-2 min-w-[160px]"
                >
                  {saved ? <><Check size={18} /> Saved</> : <><Bookmark size={18} /> Save Preset</>}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expandable Prices */}
        <AnimatePresence>
          {showPrices && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PriceComparisonTable prices={MOCK_RESULT.prices} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
