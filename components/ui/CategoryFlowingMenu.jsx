"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { ChevronRight } from "lucide-react";

const categories = [
  { 
    id: "smartphone", 
    title: "Smartphones", 
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop", 
    href: "/wizard/smartphone" 
  },
  { 
    id: "laptop", 
    title: "Laptops", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop", 
    href: "/wizard/laptop" 
  },
  { 
    id: "pc-builder", 
    title: "PC Builder", 
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1000&auto=format&fit=crop", 
    href: "/wizard/pc-builder" 
  },
];

export default function CategoryFlowingMenu() {
  const [hovered, setHovered] = useState(null);
  const setCategory = useStore((state) => state.setCategory);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 h-[65vh] md:h-[400px]">
      {categories.map((cat) => {
        const isHovered = hovered === cat.id;
        const isOthersHovered = hovered !== null && !isHovered;

        return (
          <motion.div
            key={cat.id}
            onHoverStart={() => setHovered(cat.id)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              flex: isHovered ? 4 : isOthersHovered ? 1 : 2,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative overflow-hidden rounded-3xl cursor-pointer group flex-1 md:flex-none border border-border shadow-2xl"
            onClick={() => setCategory(cat.id)}
          >
            <Link href={cat.href} className="absolute inset-0 block w-full h-full">
              {/* Background Image Wrapper */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute min-w-full min-h-full object-cover top-0 max-w-none opacity-60 group-hover:opacity-100"
                  animate={{
                    x: isHovered ? ["0%", "-5%", "0%"] : "0%",
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ 
                    x: { duration: 15, ease: "linear", repeat: Infinity, repeatType: "mirror" },
                    scale: { duration: 0.5 }
                  }}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
              
              <motion.div 
                className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
                animate={{
                  y: isHovered ? -10 : 0
                }}
              >
                <div className="flex flex-col">
                  <span className="text-accent text-xs font-mono tracking-widest uppercase mb-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">Select Category</span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-text drop-shadow-2xl">{cat.title}</h3>
                </div>
                
                <motion.div 
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: isHovered ? 0 : -45, opacity: isHovered ? 1 : 0 }}
                  className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center font-bold shadow-lg"
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
