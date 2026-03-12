"use client";
import { motion } from "framer-motion";

export default function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0b0f] pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, #231a2d 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px]"
        style={{
          background: "radial-gradient(circle, #2a1c63 0%, transparent 70%)",
        }}
      />
       <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, #10072c 0%, transparent 70%)",
        }}
      />
      
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
