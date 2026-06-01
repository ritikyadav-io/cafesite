"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoveredType, setHoveredType] = useState<"default" | "link" | "image" | "text">("default");
  const [visible, setVisible] = useState(false);
  
  // Ref to track current hovered type and prevent duplicate state updates
  const hoveredTypeRef = useRef<"default" | "link" | "image" | "text">("default");

  // Position of mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth movement
  const springConfig = { damping: 35, stiffness: 400, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Disable cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      let newType: "default" | "link" | "image" | "text" = "default";

      // Check if target is interactive or links/buttons
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") || 
        target.getAttribute("role") === "button" ||
        target.closest(".cursor-target")
      ) {
        newType = "link";
      } 
      // Expand on images
      else if (
        target.tagName === "IMG" || 
        target.closest("img") ||
        target.closest(".cursor-image-hover")
      ) {
        newType = "image";
      } 
      // Dot on paragraphs and body texts
      else if (
        target.tagName === "P" || 
        target.tagName === "SPAN" || 
        target.tagName === "H1" || 
        target.tagName === "H2" || 
        target.tagName === "H3" || 
        target.tagName === "H4" || 
        target.tagName === "LI"
      ) {
        newType = "text";
      }

      // Only update state when the type changes, avoiding hundreds of redundant renders!
      if (hoveredTypeRef.current !== newType) {
        hoveredTypeRef.current = newType;
        setHoveredType(newType);
      }
    };

    const handleMouseLeaveWindow = () => setVisible(false);
    const handleMouseEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !visible) return null;

  // Variants based on hover target types
  const variants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: "transparent",
      border: "2px solid #D4A843", // Gold glowing ring (radius R)
      boxShadow: "0 0 12px rgba(212, 168, 67, 0.4)",
    },
    link: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(196, 98, 45, 0.15)", // Subtle Terracotta background
      border: "2px solid #C4622D", // Terracotta snap border
      boxShadow: "0 0 16px rgba(196, 98, 45, 0.6)",
    },
    image: {
      width: 90,
      height: 90,
      backgroundColor: "rgba(44, 24, 16, 0.85)", // Espresso background with transparency
      border: "2px solid #D4A843",
      boxShadow: "0 0 20px rgba(212, 168, 67, 0.5)",
    },
    text: {
      width: 8,
      height: 8,
      backgroundColor: "#C4622D", // Orange dot on text
      border: "0px solid transparent",
      boxShadow: "0 0 6px rgba(196, 98, 45, 0.8)",
    }
  };

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={hoveredType}
      variants={variants}
      transition={{ type: "spring", stiffness: 450, damping: 28, mass: 0.2 }}
      className="fixed pointer-events-none z-50 rounded-full flex items-center justify-center overflow-hidden"
    >
      {/* 2πR text appears in image hover state */}
      {hoveredType === "image" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="font-math text-[#F5EDD6] text-xs font-bold"
        >
          2πR
        </motion.span>
      )}
    </motion.div>
  );
}
