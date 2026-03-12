"use client";
import React from "react";
import RotatingText from "@/components/ui/RotatingText";
import CountUp from "@/components/ui/CountUp";
import CategoryFlowingMenu from "@/components/ui/CategoryFlowingMenu";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartMatching = () => {
    // Scroll to FlowingMenu or just highlight it
    document.getElementById("category-selector")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 relative">
      
      {/* Hero Content */}
      <div className="flex flex-col items-center text-center max-w-4xl w-full z-10">
        <RotatingText 
          phrases={[
            "Find your perfect Phone",
            "Find your perfect Laptop",
            "Find your perfect PC Build"
          ]} 
        />
        
        <div className="h-8 md:h-8" />
        
        <motion.h1 
          className="font-display text-5xl md:text-[80px] font-extrabold text-text tracking-tighter leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          STOP SCROLLING.<br className="hidden md:block" />
          START MATCHING.
        </motion.h1>
        
        <div className="h-6 md:h-5" />
        
        <motion.p 
          className="font-body text-lg text-muted max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Answer a few questions. Get the exact device you need.
          Compare prices across 5 stores instantly.
        </motion.p>
        
        <div className="h-10 md:h-10" />
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button 
            onClick={handleStartMatching}
            className="px-8 py-4 rounded-xl bg-accent text-background font-display font-semibold text-lg hover:bg-accent/90 transition-all shadow-[0_0_30px_-5px_var(--accent)] hover:shadow-[0_0_40px_0px_var(--accent)] whitespace-nowrap"
          >
            Find My Device →
          </button>
          <button 
            className="px-8 py-4 rounded-xl bg-transparent border border-border text-text font-display font-semibold text-lg hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
          >
            How It Works
          </button>
        </motion.div>
      </div>

      <div className="h-20 md:h-20" />

      {/* Stats Row */}
      <motion.div 
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-border/50 z-10 bg-background/20 backdrop-blur-sm rounded-3xl md:border md:border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={100} suffix="+" duration={2.5} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Comparable Devices</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={5} duration={2} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Stores Compared</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl text-accent2 font-bold mb-2">
            <CountUp to={4} duration={1.5} />
          </div>
          <span className="font-body text-muted uppercase tracking-wider text-sm">Device Categories</span>
        </div>
      </motion.div>

      <div className="h-20 md:h-20" id="category-selector" />

      {/* Flowing Menu Section */}
      <motion.div 
        className="w-full max-w-6xl px-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-text mb-2">Select a Category</h2>
          <p className="text-muted font-body">Choose what you are looking for to begin the matching process.</p>
        </div>
        <CategoryFlowingMenu />
      </motion.div>

    </main>
  );
}
