"use client";
import { useState } from "react";
import { Home, FolderOpen, Cpu, Settings } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DockNav({ onChooseDevice }) {
  const pathname = usePathname();
  // Hide navigation if inside a wizard flow completely? No, "all pages" implies it stays.
  // Actually, wait, maybe hide it on specific screens? The prompt says "all pages".

  const dockItems = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "presets", icon: FolderOpen, label: "Saved Presets", action: "presets" },
    { id: "device", icon: Cpu, label: "Choose Device", action: "device" },
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-md border border-border p-2 rounded-full flex items-center gap-2 shadow-2xl">
        {dockItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.href) {
            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full cursor-pointer transition-colors ${
                    isActive ? "bg-accent text-background" : "text-muted hover:text-text hover:bg-border/50"
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                </motion.div>
              </Link>
            );
          }

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (item.action === "device") onChooseDevice?.();
                // We'll handle 'presets' by opening FolderPresets or a modal later
              }}
              className="p-3 rounded-full cursor-pointer transition-colors text-muted hover:text-text hover:bg-border/50"
              title={item.label}
            >
              <Icon size={20} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
