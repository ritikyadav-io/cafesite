"use client";

import { motion } from "framer-motion";
import { Phone, ShoppingBag } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <>
      {/* 1. Pulsing Green WhatsApp Floating Chat Button (Bottom-Right) */}
      <div className="fixed bottom-20 md:bottom-8 right-6 z-40">
        <motion.a
          href="https://wa.me/919772188999?text=Hi,%20I'd%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe%20in%20Jaipur!"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          className="relative block w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl border border-white/10 cursor-target"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-2 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

          {/* SVG WhatsApp Icon */}
          <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.002-3.18-2.585-5.77-5.768-5.771zm3.968 8.085c-.18.497-.901.912-1.246.974-.298.053-.687.08-1.787-.367-1.425-.578-2.317-2.03-2.387-2.124-.07-.092-.562-.733-.562-1.393 0-.66.353-.984.478-1.114.126-.13.275-.162.367-.162.091 0 .18 0 .259.004.084.004.196-.032.307.234.113.273.387.941.421 1.012.034.072.057.155.008.252-.049.098-.073.159-.146.244-.073.085-.154.19-.22.253-.073.072-.15.15-.064.298.086.15.38.627.815 1.013.56.499 1.033.653 1.179.727.145.074.229.062.315-.038.086-.1.367-.428.466-.575.099-.146.197-.123.332-.074.134.05.852.402.999.475.148.074.246.11.282.172.036.062.036.363-.144.86z" />
          </svg>
        </motion.a>
      </div>

      {/* 2. Sticky "Call Now" + "Order Online" Bottom Action Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-espresso/15 shadow-[0_-4px_12px_rgba(44,24,16,0.1)] px-4 py-3 flex md:hidden items-center justify-between space-x-3">
        {/* Left Side: Call to Reserve */}
        <a
          href="tel:+919772188999"
          className="flex-1 flex items-center justify-center space-x-2 bg-espresso text-cream font-bold py-3.5 rounded-full text-xs transition-colors hover:bg-espresso/90 shadow-md"
        >
          <Phone className="w-4 h-4 text-gold shrink-0" />
          <span>Call Cafe</span>
        </a>

        {/* Right Side: Order Online */}
        <a
          href="https://www.zomato.com/jaipur/two-pai-r-restaurant-vidhyadhar-nagar/order"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 bg-terracotta text-chalk font-bold py-3.5 rounded-full text-xs transition-colors hover:bg-terracotta/90 shadow-md animate-pulse-slow"
        >
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>Order Online</span>
        </a>
      </div>
    </>
  );
}
