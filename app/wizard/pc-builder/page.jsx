"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "@/components/ui/Stepper";
import ElasticSlider from "@/components/ui/ElasticSlider";
import PCBuildSummary from "@/components/pc-builder/PCBuildSummary";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FILTERS = ["Gaming PC", "Video Editing / 3D Rendering Workstation", "Programming / Development Machine", "Office / Home Use PC", "Streaming PC", "Budget Build", "No compromise — go all in"];
const CPU_PREF = ["AMD Ryzen (better price/performance)", "Intel Core (better single-core)", "No preference"];
const CPU_TIER = ["Entry", "Mid-range", "High-end", "Flagship"];
const MOBO_AUTO = ["Yes — recommend compatible board", "No — I want to choose chipset"];
const MOBO_CHIPSET_AMD = ["A620 (Entry)", "B650 (Mid)", "X670 (High)", "X870 (Enthusiast)"];
const MOBO_CHIPSET_INTEL = ["H610 (Entry)", "B760 (Mid)", "Z790 (High)", "Z890 (Enthusiast)"];
const RAM_SIZE = ["8GB", "16GB", "32GB", "64GB"];
const RAM_TYPE = ["DDR4 (affordable)", "DDR5 (future-proof)"];
const RAM_STICKS = ["1×16GB", "2×8GB", "2×16GB", "4×8GB"];
const STORAGE_TYPE = ["NVMe SSD — fast, expensive", "SATA SSD — balanced", "HDD — cheap, slow"];
const STORAGE_SIZE = ["256GB", "512GB", "1TB", "2TB", "4TB+"];
const GPU_NEEDED = ["Yes — Gaming / Editing", "No — Integrated graphics is fine"];
const GPU_TIER = ["Entry RTX 4060 class", "Mid RTX 4070 class", "High-end RTX 4080 class", "Flagship RTX 4090"];
const PSU_CALC = ["Yes — recommend based on build", "No — I know what I want"];
const PSU_WATTS = ["450W", "550W", "650W", "750W", "850W", "1000W+"];
const PSU_EFFICIENCY = ["80+ Bronze", "80+ Gold", "80+ Platinum"];
const COOLER_TYPE = ["Stock cooler (included with CPU)", "Air cooler (quiet, reliable)", "AIO Liquid cooler (best thermal performance)"];
const COOLER_SIZE = ["120mm", "240mm", "360mm"];
const CASE_PREF = ["Compact Mini-ITX", "Standard Mid-Tower ATX", "Full Tower (maximum airflow)", "Tempered Glass (RGB showcase)", "No preference"];

export default function PCBuilderWizard() {
  const router = useRouter();
  const { currentStep, setStep, wizardAnswers, setAnswer, filters, setFilters } = useStore();
  const [loading, setLoading] = useState(false);
  const [loadText, setLoadText] = useState("Analyzing build compatibility...");

  useEffect(() => {
    if (currentStep > 9) setStep(0);
  }, [setStep, currentStep]);

  const handleNext = () => setStep(currentStep + 1);
  const handlePrev = () => setStep(currentStep - 1);

  const submitWizard = () => {
    setLoading(true);
    const texts = [
      "Analyzing build compatibility...",
      "Generating optimal parts list...",
      "Checking current market prices...",
      "Finding upgrade paths...",
      "Finalizing your rig..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) setLoadText(texts[i]);
    }, 1200);

    setTimeout(() => {
      clearInterval(interval);
      router.push("/results/pc-builder");
    }, 6000);
  };

  const OptionTag = ({ option, selected, onClick, multi = false }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl border font-body text-sm font-medium transition-all duration-300 text-left ${
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
           <div className="w-12 h-12 bg-accent rounded-full shadow-[0_0_40px_10px_var(--accent)] flex items-center justify-center">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
           </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={loadText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-mono text-sm text-muted tracking-widest uppercase">
            {loadText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  // Helper validation logic for next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0: return filters.length > 0;
      case 1: return wizardAnswers[1];
      case 2: return wizardAnswers["2_pref"] && wizardAnswers["2_tier"];
      case 3:
        if (wizardAnswers["3_auto"] === "Yes — recommend compatible board") return true;
        return wizardAnswers["3_auto"] && wizardAnswers["3_chipset"];
      case 4: return wizardAnswers["4_size"] && wizardAnswers["4_type"] && wizardAnswers["4_sticks"];
      case 5: return wizardAnswers["5_type"] && wizardAnswers["5_size"] && wizardAnswers["5_secondary"];
      case 6:
        if (wizardAnswers["6_needed"] === "No — Integrated graphics is fine") return true;
        return wizardAnswers["6_needed"] && wizardAnswers["6_tier"];
      case 7:
        if (wizardAnswers["7_auto"] === "Yes — recommend based on build") return true;
        return wizardAnswers["7_auto"] && wizardAnswers["7_watts"] && wizardAnswers["7_eff"];
      case 8:
        if (wizardAnswers["8_type"]?.includes("AIO Liquid")) return !!wizardAnswers["8_size"];
        return !!wizardAnswers["8_type"];
      case 9: return !!wizardAnswers[9];
      default: return true;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-4 pt-20 pb-24 z-10 relative flex justify-center max-w-[1400px] mx-auto">
      
      {/* Container: split layout on LG, stacked on smaller */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
        
        {/* LEFT COLUMN: 55% Questions */}
        <div className="w-full lg:w-[55%] flex flex-col bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-10 shadow-2xl relative h-full">
          {currentStep > 0 && <Stepper steps={9} currentStep={currentStep - 1} />}

          <div className="flex-1 overflow-y-auto mb-6 pr-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <div className="mb-2">
                    <h2 className="font-display text-2xl font-bold text-text mb-2">What kind of PC are you building?</h2>
                    <p className="font-body text-muted">Select all that apply.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {FILTERS.map(f => (
                      <OptionTag key={f} option={f} selected={filters.includes(f)} multi onClick={() => {
                        if (filters.includes(f)) setFilters(filters.filter(x => x !== f));
                        else setFilters([...filters, f]);
                      }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8 w-full mt-4">
                  <h2 className="font-display text-3xl font-bold text-text text-center mb-4">What&apos;s your total budget?</h2>
                  <p className="font-body text-muted text-center mb-2">For the entire PC build.</p>
                  <ElasticSlider 
                    min={20000} max={500000} step={5000} 
                    value={wizardAnswers[1] || [80000, 150000]} 
                    onChange={(val) => setAnswer(1, val)} 
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-3xl font-bold text-text text-center mb-6">CPU — Processor Preferences</h2>
                  
                  <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Brand Preference</h3>
                  <div className="flex flex-col gap-3 mb-2">
                    {CPU_PREF.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["2_pref"] === s} onClick={() => setAnswer("2_pref", s)} />)}
                  </div>

                  <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Performance Tier</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CPU_TIER.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["2_tier"] === s} onClick={() => setAnswer("2_tier", s)} />)}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">Motherboard Selection</h2>
                  <div className="flex flex-col gap-3 mb-4">
                    {MOBO_AUTO.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["3_auto"] === s} onClick={() => {
                        setAnswer("3_auto", s);
                        if (s === MOBO_AUTO[0]) setAnswer("3_chipset", null);
                    }} />)}
                  </div>

                  {wizardAnswers["3_auto"] === MOBO_AUTO[1] && (
                    <>
                      <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">{wizardAnswers["2_pref"]?.includes("Intel") ? "Intel Chipset" : "AMD Chipset"}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {(wizardAnswers["2_pref"]?.includes("Intel") ? MOBO_CHIPSET_INTEL : MOBO_CHIPSET_AMD).map(s => 
                          <OptionTag key={s} option={s} selected={wizardAnswers["3_chipset"] === s} onClick={() => setAnswer("3_chipset", s)} />
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-2">Memory (RAM)</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-body text-muted text-sm uppercase tracking-widest mb-3">Capacity</h3>
                      <div className="flex flex-col gap-2">
                        {RAM_SIZE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["4_size"] === s} onClick={() => setAnswer("4_size", s)} />)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-body text-muted text-sm uppercase tracking-widest mb-3">Type & Sticks</h3>
                      <div className="flex flex-col gap-2 mb-4">
                        {RAM_TYPE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["4_type"] === s} onClick={() => setAnswer("4_type", s)} />)}
                      </div>
                      <div className="flex flex-col gap-2">
                        {RAM_STICKS.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["4_sticks"] === s} onClick={() => setAnswer("4_sticks", s)} />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">Storage (Primary)</h2>
                  <div className="flex flex-col gap-2 mb-2">
                    {STORAGE_TYPE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["5_type"] === s} onClick={() => setAnswer("5_type", s)} />)}
                  </div>
                  <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Capacity</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {STORAGE_SIZE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["5_size"] === s} onClick={() => setAnswer("5_size", s)} />)}
                  </div>
                  <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-4">Add Secondary Storage?</h3>
                  <div className="flex gap-2">
                    {["Yes", "No"].map(s => <OptionTag key={s} option={s} selected={wizardAnswers["5_secondary"] === s} onClick={() => setAnswer("5_secondary", s)} />)}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">Graphics Card (GPU)</h2>
                  <div className="flex flex-col gap-3 mb-4">
                    {GPU_NEEDED.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["6_needed"] === s} onClick={() => setAnswer("6_needed", s)} />)}
                  </div>
                  
                  {wizardAnswers["6_needed"]?.includes("Yes") && (
                    <>
                      <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">GPU Tier</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {GPU_TIER.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["6_tier"] === s} onClick={() => setAnswer("6_tier", s)} />)}
                        <p className="text-xs text-muted/50 mt-1 pl-2">*AMD equivalent will also be considered</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 7 && (
                <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">Power Supply (PSU)</h2>
                  <div className="flex flex-col gap-3 mb-4">
                    {PSU_CALC.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["7_auto"] === s} onClick={() => {
                        setAnswer("7_auto", s);
                        if (s === PSU_CALC[0]) { setAnswer("7_watts", null); setAnswer("7_eff", null); }
                    }} />)}
                  </div>
                  
                  {wizardAnswers["7_auto"] === PSU_CALC[1] && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-body text-muted text-sm uppercase tracking-widest mb-3">Wattage</h3>
                        <div className="flex flex-col gap-2">
                          {PSU_WATTS.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["7_watts"] === s} onClick={() => setAnswer("7_watts", s)} />)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-body text-muted text-sm uppercase tracking-widest mb-3">Efficiency</h3>
                        <div className="flex flex-col gap-2">
                          {PSU_EFFICIENCY.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["7_eff"] === s} onClick={() => setAnswer("7_eff", s)} />)}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 8 && (
                <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">CPU Cooler</h2>
                  <div className="flex flex-col gap-3 mb-4">
                    {COOLER_TYPE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["8_type"] === s} onClick={() => {
                        setAnswer("8_type", s);
                        if (!s.includes("AIO")) setAnswer("8_size", null);
                    }} />)}
                  </div>
                  
                  {wizardAnswers["8_type"]?.includes("AIO") && (
                    <>
                      <h3 className="font-body text-muted text-sm uppercase tracking-widest mt-2">Radiator Size</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {COOLER_SIZE.map(s => <OptionTag key={s} option={s} selected={wizardAnswers["8_size"] === s} onClick={() => setAnswer("8_size", s)} />)}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {currentStep === 9 && (
                <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="font-display text-2xl font-bold text-text mb-4">Cabinet / Case</h2>
                  <div className="flex flex-col gap-3">
                    {CASE_PREF.map(s => <OptionTag key={s} option={s} selected={wizardAnswers[9] === s} onClick={() => setAnswer(9, s)} />)}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Controls Footer */}
          <div className="flex justify-between items-center mt-auto border-t border-border/50 pt-6">
            <button 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              className={`font-body text-sm flex items-center gap-1 transition-colors ${currentStep === 0 ? "text-transparent pointer-events-none" : "text-muted hover:text-text"}`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            
            {currentStep < 9 ? (
              <button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2.5 rounded-xl bg-text text-background font-body font-bold hover:bg-muted transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 0 ? "Start Build" : "Next Step"}
              </button>
            ) : (
              <button 
                onClick={submitWizard}
                disabled={!isStepValid()}
                className="px-8 py-3 rounded-xl bg-accent text-background font-display font-bold hover:bg-accent/90 transition-all shadow-[0_0_20px_-5px_var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Build My PC →
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: 45% Live Summary */}
        <div className="w-full lg:w-[45%] h-[400px] lg:h-full">
          <PCBuildSummary />
        </div>

      </div>
    </div>
  );
}
