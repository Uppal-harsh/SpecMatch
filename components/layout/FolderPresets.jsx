"use client";
import { useState } from "react";
import { Folder, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function FolderPresets() {
  const [isOpen, setIsOpen] = useState(false);
  const savedPresets = useStore((state) => state.savedPresets);

  return (
    <div className="fixed top-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 bg-card/80 backdrop-blur-md border border-border rounded-xl flex items-center justify-center text-muted hover:text-accent transition-colors shadow-lg"
      >
        <Folder size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card border-r border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl text-text">Saved Presets</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-text transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {savedPresets.length === 0 ? (
                  <p className="text-muted text-center mt-10 font-body">No presets saved yet.</p>
                ) : (
                  savedPresets.map((preset) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={preset.id}
                      className="p-4 rounded-xl border border-border bg-background/50 cursor-pointer hover:border-accent2 transition-colors relative font-body"
                    >
                      <h3 className="font-bold text-text mb-1 text-sm">{preset.title}</h3>
                      <p className="text-muted text-xs mb-2">{preset.details}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted/60">{preset.savedAt}</span>
                        <Link
                          href={`/profile`}
                          onClick={() => setIsOpen(false)}
                          className="text-accent hover:underline"
                        >
                          View
                        </Link>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
