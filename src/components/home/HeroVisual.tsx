"use client";

import { motion } from "framer-motion";

const nodes = [
  { cx: 50, cy: 50, r: 3.2, delay: 0 },
  { cx: 22, cy: 30, r: 2.2, delay: 0.4 },
  { cx: 78, cy: 28, r: 2.2, delay: 0.8 },
  { cx: 18, cy: 70, r: 2, delay: 1.2 },
  { cx: 82, cy: 72, r: 2, delay: 1.6 },
  { cx: 50, cy: 12, r: 1.8, delay: 0.6 },
  { cx: 50, cy: 88, r: 1.8, delay: 1.0 },
];

const links = [
  [50, 50, 22, 30],
  [50, 50, 78, 28],
  [50, 50, 18, 70],
  [50, 50, 82, 72],
  [50, 50, 50, 12],
  [50, 50, 50, 88],
  [22, 30, 50, 12],
  [78, 28, 50, 12],
  [18, 70, 50, 88],
  [82, 72, 50, 88],
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <motion.div
        className="absolute -top-10 -left-10 h-56 w-56 rounded-full bg-coral/25 blur-[80px]"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-6 h-64 w-64 rounded-full bg-teal/20 blur-[90px]"
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full [transform:rotate(0deg)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--border)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="1 2" />
      </motion.svg>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb648" />
            <stop offset="60%" stopColor="#ff7a52" />
            <stop offset="100%" stopColor="#c8451f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9d76" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#35d0c4" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {links.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#linkGrad)"
            strokeWidth="0.35"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: "easeOut" }}
          />
        ))}

        <circle cx="50" cy="50" r="13" fill="url(#coreGrad)" opacity="0.9" />
        <motion.circle
          cx="50"
          cy="50"
          r={9}
          fill="none"
          stroke="#ffe4d1"
          strokeWidth="0.4"
          style={{ transformOrigin: "50px 50px" }}
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {nodes.slice(1).map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={i % 2 === 0 ? "#ff9d76" : "#35d0c4"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
            transition={{
              opacity: { duration: 2.5, repeat: Infinity, delay: n.delay, ease: "easeInOut" },
              scale: { duration: 0.5, delay: n.delay },
            }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <div className="mono-tag rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] text-muted backdrop-blur">
          ResNet-50 ⟷ SWIN-B ⟶ Ensemble
        </div>
      </div>
    </div>
  );
}
