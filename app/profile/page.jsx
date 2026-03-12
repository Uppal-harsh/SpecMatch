"use client";
import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { User, Share2, Download, Edit2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import Papa from "papaparse";

export default function ProfilePage() {
  const { profile, savedPresets } = useStore();
  const [copiedLink, setCopiedLink] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleShareProfile = () => {
    // Mock copy to clipboard
    navigator.clipboard.writeText(`https://specmatch.vercel.app/profile/${profile.username.replace('@', '')}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportCSV = () => {
    if (savedPresets.length === 0) return;

    const csv = Papa.unparse(savedPresets.map(p => ({
      Title: p.title,
      Details: p.details,
      DateSaved: p.savedAt
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "specmatch_presets.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 pt-24 z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[480px] bg-card/90 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-accent/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header Profile Info */}
        <div className="flex flex-col items-center text-center relative z-10 mb-8">
          <div className="relative mb-4 group cursor-pointer w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-background border-4 border-border flex items-center justify-center text-text font-display text-3xl font-bold shadow-lg overflow-hidden relative duration-300 group-hover:border-accent">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
              {/* Overlay for Edit */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Edit2 size={24} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl font-bold text-text">{profile.name}</h1>
            <button className="text-muted hover:text-accent transition-colors"><Edit2 size={14} /></button>
          </div>

          <span className="font-mono text-sm tracking-wide text-accent2 mb-3">{profile.username}</span>

          <div className="flex items-start gap-2 max-w-[280px]">
            <p className="font-body text-sm text-muted">{profile.bio}</p>
            <button className="text-muted hover:text-accent transition-colors shrink-0 mt-0.5"><Edit2 size={14} /></button>
          </div>
        </div>

        <hr className="border-border/50 my-6" />

        {/* Saved Presets */}
        <div className="relative z-10 mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Saved Presets ({savedPresets.length})</h2>

          <div className="space-y-3">
            {savedPresets.length === 0 ? (
              <div className="text-center py-6 bg-background/50 rounded-xl border border-border border-dashed">
                <p className="text-muted font-body text-sm">No comparisons saved yet.</p>
              </div>
            ) : (
              savedPresets.map((preset) => (
                <div key={preset.id} className="p-4 rounded-2xl bg-background/60 border border-border hover:border-accent/50 transition-colors flex flex-col gap-2 relative group">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-text mb-1 leading-tight">{preset.title}</h3>
                    <button className="text-muted hover:text-accent2 bg-card border border-border p-1.5 rounded-lg transition-colors flex shrink-0">
                      <Share2 size={14} />
                    </button>
                  </div>
                  <p className="font-body text-sm text-muted max-w-[85%]">{preset.details}</p>
                  <div className="text-xs font-mono text-muted/60 mt-1">{preset.savedAt}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-3 relative z-10 mt-auto">
          <button
            onClick={handleShareProfile}
            className="w-full py-3.5 rounded-xl bg-accent text-background font-display font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-md"
          >
            {copiedLink ? <Check size={18} /> : <Copy size={18} />}
            {copiedLink ? "Link Copied!" : "Share My Profile"}
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full py-3.5 rounded-xl bg-background border border-border text-text font-display font-semibold hover:border-accent/50 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export Presets as CSV
          </button>
        </div>
      </motion.div>
    </main>
  );
}
