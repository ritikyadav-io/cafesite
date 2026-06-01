"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [stage, setStage] = useState(0); // Starts at 0 to match server-render and prevent hydration mismatch
  const [equationText, setEquationText] = useState("");

  useEffect(() => {
    // Check if loader has already run this session to prevent annoying users on subpage clicks
    const hasLoaded = sessionStorage.getItem("two-pi-r-loaded");
    if (hasLoaded) {
      setStage(3);
      try {
        document.documentElement.classList.remove("two-pi-r-loading");
      } catch (e) {}
      return;
    }

    // Sequence of equation typing (speed up)
    const sequence = [
      { text: "2", delay: 150 },
      { text: "2π", delay: 300 },
      { text: "2πR", delay: 450 },
      { text: "2πR =", delay: 600 },
      { text: "2πR = Circumference", delay: 750 }
    ];

    sequence.forEach((item, index) => {
      setTimeout(() => {
        setEquationText(item.text);
        if (index === sequence.length - 1) {
          // Transition to circle drawing
          setTimeout(() => {
            setStage(1);
          }, 400);
        }
      }, item.delay);
    });

    // Fade out and mark session as loaded
    setTimeout(() => {
      setStage(2);
      sessionStorage.setItem("two-pi-r-loaded", "true");
      try {
        document.documentElement.classList.remove("two-pi-r-loading");
      } catch (e) {}
      setTimeout(() => {
        setStage(3);
      }, 400); // Wait for fade transition
    }, 1600);
  }, []);

  if (stage === 3) return null;

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="page-loader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1A2E]"
        >
          {/* Subtle math grid in background */}
          <div className="absolute inset-0 opacity-10 bg-size-40 math-grid" />

          <div className="relative flex flex-col items-center justify-center">
            {/* SVG Circle Drawing */}
            {stage >= 1 && (
              <svg className="w-64 h-64 md:w-80 md:h-80 absolute" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2C1810" />
                    <stop offset="50%" stopColor="#C4622D" />
                    <stop offset="100%" stopColor="#D4A843" />
                  </linearGradient>
                </defs>
                {/* Mathematical Circle Ring Outline */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#D4A843"
                  strokeWidth="1.5"
                  fill="transparent"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                {/* Fill with Coffee Gradient texture */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="url(#coffeeGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </svg>
            )}

            {/* Monospace math text centered */}
            <div className="z-10 font-math text-2xl md:text-3xl font-bold text-[#D4A843] tracking-wider text-center px-4">
              <motion.span
                key={equationText}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                {equationText}
              </motion.span>
              {stage === 0 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-1 inline-block w-2.5 h-6 bg-[#D4A843] align-middle"
                />
              )}
            </div>
            
            {/* Outer Math Formulas Floating Behind */}
            <div className="absolute inset-0 -m-16 md:-m-24 pointer-events-none opacity-20 font-math text-xs text-[#FAFAF5]">
              <span className="absolute top-0 left-0">C = 2πr</span>
              <span className="absolute bottom-0 right-0">A = πr²</span>
              <span className="absolute top-12 right-0">r = d / 2</span>
              <span className="absolute bottom-12 left-0">π ≈ 3.14159</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
