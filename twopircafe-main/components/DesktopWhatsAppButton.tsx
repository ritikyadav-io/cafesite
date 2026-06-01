"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesktopWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[40] hidden md:block">
      <div className="relative">
        
        {/* Tooltip on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 15, scale: 0.9 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-espresso text-cream text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xl border border-gold/15 whitespace-nowrap pointer-events-none"
            >
              Chat with us on WhatsApp
              {/* Tooltip Arrow */}
              <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-espresso border-r border-t border-gold/15" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Green Circle */}
        <motion.a
          href="https://wa.me/919772188999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe!"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          className="relative flex w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.45)] border border-white/10 cursor-target z-10"
        >
          {/* Continuous expanding pulsing ring */}
          <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none" />

          {/* WhatsApp Logo SVG */}
          <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.843.002-2.632-1.02-5.107-2.88-6.968C16.59 1.94 14.12 1.018 11.49 1.018c-5.44 0-9.866 4.408-9.868 9.846-.001 1.704.457 3.366 1.326 4.83L1.87 20.91l5.228-1.371z" />
          </svg>
        </motion.a>

      </div>
    </div>
  );
}
