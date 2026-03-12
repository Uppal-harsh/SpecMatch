"use client";
import React, { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export default function CountUp({ to, duration = 2, suffix = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [to, count, duration]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return <span className="font-mono tabular-nums">{display}{suffix}</span>;
}
