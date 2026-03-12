"use client";
import { motion } from "framer-motion";

export default function MatchScoreRing({ score }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20 shadow-lg rounded-full shrink-0">
      <div className="absolute inset-0 bg-background rounded-full" />
      <svg className="w-full h-full transform -rotate-90 relative z-10">
        <circle cx="40" cy="40" r={radius} stroke="var(--border)" strokeWidth="6" fill="transparent" />
        <motion.circle
          cx="40" cy="40" r={radius}
          stroke="var(--accent2)" strokeWidth="6" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute font-display font-bold text-xl text-text z-20 flex items-baseline">
        {score}<span className="text-[10px] text-muted ml-0.5">%</span>
      </div>
    </div>
  );
}
