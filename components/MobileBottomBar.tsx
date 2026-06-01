"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, ShoppingCart, Calendar } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MobileBottomBar() {
  const { setCartOpen, cartCount } = useCart();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[40] h-16 bg-[#2C1810] border-t border-[#F5EDD6]/10 flex md:hidden items-center justify-around shadow-[0_-4px_16px_rgba(44,24,16,0.2)]">
      
      {/* 1. Phone Call */}
      <a
        href="tel:+919772188999"
        className="flex flex-col items-center justify-center w-1/4 h-full text-[#F5EDD6]/80 active:text-white transition-all cursor-target"
        title="Call floor managers"
      >
        <Phone className="w-5 h-5 mb-0.5 shrink-0" />
        <span className="font-math text-[9px] uppercase tracking-wider font-semibold">
          Call
        </span>
      </a>

      {/* 2. WhatsApp Direct */}
      <a
        href="https://wa.me/919772188999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center w-1/4 h-full text-[#F5EDD6]/80 active:text-white transition-all cursor-target"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 mb-0.5 shrink-0" />
        <span className="font-math text-[9px] uppercase tracking-wider font-semibold">
          WhatsApp
        </span>
      </a>

      {/* 3. Open Shopping Cart Drawer */}
      <button
        onClick={() => setCartOpen(true)}
        className="relative flex flex-col items-center justify-center w-1/4 h-full text-[#F5EDD6]/80 active:text-white transition-all cursor-target"
        title="Open Cart Drawer"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 mb-0.5 shrink-0" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-terracotta text-chalk text-[8px] font-math font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#2C1810]">
              {cartCount}
            </span>
          )}
        </div>
        <span className="font-math text-[9px] uppercase tracking-wider font-semibold">
          Order
        </span>
      </button>

      {/* 4. Reserve Page Link */}
      <Link
        href="/reserve"
        className={`flex flex-col items-center justify-center w-1/4 h-full transition-all cursor-target ${
          pathname === "/reserve"
            ? "text-terracotta"
            : "text-[#F5EDD6]/80 active:text-white"
        }`}
        title="Reserve a Table"
      >
        <Calendar className="w-5 h-5 mb-0.5 shrink-0" />
        <span className="font-math text-[9px] uppercase tracking-wider font-semibold">
          Reserve
        </span>
      </Link>

    </div>
  );
}
