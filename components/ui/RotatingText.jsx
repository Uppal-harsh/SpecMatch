"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingText({ phrases }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className="relative h-16 w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="absolute text-3xl md:text-5xl font-display text-text font-black text-center"
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
