"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "@/components/ui/Stepper";
import ElasticSlider from "@/components/ui/ElasticSlider";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FILTERS = ["Touchscreen Required", "Backlit Keyboard", "Fingerprint Sensor", "Thunderbolt / USB4 Port", "4G/5G LTE Support", "Gaming Grade GPU needed"];
const BRANDS = ["Apple", "Dell", "HP", "Lenovo", "Asus", "MSI", "Acer"];

const USAGE = ["🎮 Gaming", "🎨 Video Editing / Design", "💻 Coding / Development", "📊 Office & Productivity", "🎓 College / Study", "🎬 Content Creation"];
const PORTABILITY = ["Ultra portable — under 1.5kg", "Balanced — 1.5–2kg", "Power over portability — 2kg+"];
const RAM = ["8GB — Everyday tasks", "16GB — Multitasking & light editing", "32GB — Heavy workloads", "64GB+ — Professional use"];
const STORAGE = ["256GB", "512GB", "1TB", "2TB+"];
const DISPLAY_SIZE = ["13\"–14\" (compact)", "15\"–16\" (standard)", "17\"+ (desktop replacement)"];
const DISPLAY_TECH = ["Full HD 1080p", "2K QHD", "4K OLED", "High refresh 144Hz+"];
const BATTERY = ["4–6 hours (always near a charger)", "8–10 hours (on the go sometimes)", "12+ hours (all day away from outlet)"];
const OS = ["Windows", "macOS", "Linux", "No preference"];

export default function LaptopWizard() {
  const router = useRouter();
  const { currentStep, setStep, wizardAnswers, setAnswer, filters, setFilters } = useStore();
  const [loading, setLoading] = useState(false);
  const [loadText, setLoadText] = useState("Analyzing your preferences...");

  useEffect(() => {
    if (currentStep > 8) setStep(0);
  }, [setStep, currentStep]);

  const handleNext = () => setStep(currentStep + 1);
  const handlePrev = () => setStep(currentStep - 1);

  const submitWizard = () => {
    setLoading(true);
    const texts = [
      "Analyzing your preferences...",
      "Scanning 3,100+ laptops...",
      "Comparing prices across 5 stores...",
      "Calculating match scores...",
      "Almost ready..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) setLoadText(texts[i]);
    }, 1200);

    setTimeout(() => {
      clearInterval(interval);
      router.push("/results/laptop");
    }, 6000);
  };

  const OptionTag = ({ option, selected, onClick, multi = false }) => (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl border font-body text-sm font-medium transition-all duration-300 text-left ${
        selected 
          ? "bg-accent/20 border-accent text-accent shadow-[0_0_15px_-3px_var(--accent)]" 
          : "bg-card border-border text-muted hover:border-accent/50 hover:text-text"
      }`}
    >
      {option}
    </button>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
           <motion.div className="absolute inset-0 rounded-full border-2 border-accent/20" animate={{ scale: [1, 2.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
           <motion.div className="absolute inset-0 rounded-full border-2 border-accent/40" animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }} />
           <div className="w-12 h-12 bg-accent rounded-full shadow-[0_0_40px_10px_var(--accent)]" />
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={loadText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-mono text-sm text-muted tracking-widest uppercase">
            {loadText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24 z-10 relative">
      <div className="w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
        
        {currentStep > 0 && <Stepper steps={8} currentStep={currentStep - 1} />}

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <div className="mb-2">
                <h2 className="font-display text-2xl font-bold text-text mb-2">Laptop Preferences</h2>
                <p className="font-body text-muted">Select required features and brands.</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {FILTERS.map(f => (
                  <OptionTag key={f} option={f} selected={filters.includes(f)} multi onClick={() => {
                    if (filters.includes(f)) setFilters(filters.filter(x => x !== f));
                    else setFilters([...filters, f]);
                  }} />
                ))}
              </div>

              <h3 className="font-body font-bold text-text mt-4">Brand Preference</h3>
              <div className="flex flex-wrap gap-3">
                {BRANDS.map(b => (
                  <OptionTag key={b} option={b} selected={filters.includes(b)} multi onClick={() => {
                    if (filters.includes(b)) setFilters(filters.filter(x => x !== b));
                    else setFilters([...filters, b]);
                  }} />
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext} 
                  className="px-8 py-3 rounded-xl font-display font-bold flex items-center gap-2 transition-all bg-accent text-background hover:bg-accent/90"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">What will you mainly use this laptop for?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {USAGE.map(u => {
                  const selection = wizardAnswers[1] || [];
                  return (
                    <OptionTag key={u} option={u} selected={selection.includes(u)} multi onClick={() => {
                      if (selection.includes(u)) setAnswer(1, selection.filter(x => x !== u));
                      else setAnswer(1, [...selection, u]);
                    }} />
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8 w-full">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-4">What&apos;s your budget?</h2>
              <ElasticSlider 
                min={20000} max={500000} step={5000} 
                value={wizardAnswers[2] || [50000, 150000]} 
                onChange={(val) => setAnswer(2, val)} 
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">How important is portability?</h2>
              <div className="flex flex-col gap-3">
                {PORTABILITY.map(c => (
                  <OptionTag key={c} option={c} selected={wizardAnswers[3] === c} onClick={() => setAnswer(3, c)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">How much RAM do you need?</h2>
              <div className="flex flex-col gap-3">
                {RAM.map(b => (
                  <OptionTag key={b} option={b} selected={wizardAnswers[4] === b} onClick={() => setAnswer(4, b)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">What storage size?</h2>
              <div className="grid grid-cols-2 gap-3">
                {STORAGE.map(d => (
                  <OptionTag key={d} option={d} selected={wizardAnswers[5] === d} onClick={() => setAnswer(5, d)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-2">What display do you prefer?</h2>
              
              <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Size</h3>
              <div className="flex flex-col gap-3 mb-2">
                {DISPLAY_SIZE.map(s => (
                  <OptionTag key={s} option={s} selected={wizardAnswers["6_size"] === s} onClick={() => setAnswer("6_size", s)} />
                ))}
              </div>

              <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Technology & Resolution</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISPLAY_TECH.map(s => (
                  <OptionTag key={s} option={s} selected={wizardAnswers["6_tech"] === s} onClick={() => setAnswer("6_tech", s)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold text-text text-center mb-6">Battery life priority?</h2>
              <div className="flex flex-col gap-3">
                {BATTERY.map(b => (
                  <OptionTag key={b} option={b} selected={wizardAnswers[7] === b} onClick={() => setAnswer(7, b)} />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 8 && (
            <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
               <h2 className="font-display text-3xl font-bold text-text text-center mb-4">Operating System preference?</h2>
               <div className="flex flex-col gap-3">
                {OS.map(o => (
                  <OptionTag key={o} option={o} selected={wizardAnswers[8] === o} onClick={() => setAnswer(8, o)} />
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {currentStep > 0 && (
          <div className="flex justify-between items-center mt-10 border-t border-border/50 pt-6">
            <button onClick={handlePrev} className="text-muted hover:text-text font-body text-sm flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            
            {currentStep < 8 ? (
              <button 
                onClick={handleNext}
                disabled={!wizardAnswers[currentStep] && (!wizardAnswers["6_size"] || !wizardAnswers["6_tech"])}
                className="px-6 py-2.5 rounded-xl bg-text text-background font-body font-bold hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={submitWizard}
                disabled={!wizardAnswers[8]}
                className="px-8 py-3 rounded-xl bg-accent text-background font-display font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_-5px_var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Find My Laptop →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
