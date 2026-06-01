"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, CreditCard, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { setCartOpen } = useCart();
  const [linksOpen, setLinksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const socialVariants = {
    hover: {
      y: -6,
      scale: 1.15,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 }
    }
  };

  return (
    <footer className="relative bg-[#1A1A2E] text-[#FAFAF5] pt-8 md:pt-16 pb-24 md:pb-8 overflow-hidden border-t border-[#FAFAF5]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-12">
          {/* COLUMN 1: Brand Info */}
          <div className="flex flex-col space-y-3.5 md:space-y-5">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display text-4xl font-extrabold text-[#D4A843]">
                2<span className="text-[#C4622D] drop-shadow-[0_0_10px_rgba(196,98,45,0.4)]">π</span>R
              </span>
            </Link>
            <p className="font-display text-lg italic text-[#FAFAF5]/90 max-w-sm">
              "Where Circles Begin & Conversations Never End"
            </p>
            <span className="font-math text-xs tracking-wider text-[#D4A843] uppercase font-semibold">
              Jaipur's Favorite Math Cafe Since 2017
            </span>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                className="w-10 h-10 rounded-full bg-[#FAFAF5]/5 border border-[#FAFAF5]/10 flex items-center justify-center hover:border-[#D4A843] hover:text-[#D4A843] transition-colors cursor-target"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                className="w-10 h-10 rounded-full bg-[#FAFAF5]/5 border border-[#FAFAF5]/10 flex items-center justify-center hover:border-[#D4A843] hover:text-[#D4A843] transition-colors cursor-target"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                className="w-10 h-10 rounded-full bg-[#FAFAF5]/5 border border-[#FAFAF5]/10 flex items-center justify-center hover:border-[#D4A843] hover:text-[#D4A843] transition-colors cursor-target"
              >
                <MapPin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/919772188999?text=Hi,%20I'd%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe%20in%20Jaipur!"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                className="w-10 h-10 rounded-full bg-[#FAFAF5]/5 border border-[#FAFAF5]/10 flex items-center justify-center hover:border-[#D4A843] hover:text-[#D4A843] transition-colors cursor-target"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.843.002-2.632-1.02-5.107-2.88-6.968C16.59 1.94 14.12 1.018 11.49 1.018c-5.44 0-9.866 4.408-9.868 9.846-.001 1.704.457 3.366 1.326 4.83L1.87 20.91l5.228-1.371z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="flex flex-col space-y-2 md:space-y-4 border-b border-[#FAFAF5]/10 pb-4 md:border-none md:pb-0">
            <button
              onClick={() => setLinksOpen(!linksOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none md:pointer-events-none"
            >
              <h3 className="font-display text-lg font-bold text-[#D4A843] tracking-wide md:border-b md:border-[#FAFAF5]/10 md:pb-2">
                Quick Navigation
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-[#D4A843] transition-transform duration-300 md:hidden ${
                  linksOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid grid-cols-2 gap-x-3 gap-y-1 text-sm md:grid transition-all duration-300 overflow-hidden ${
                linksOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 md:max-h-none md:opacity-100 max-md:pointer-events-none"
              }`}
            >
              <Link href="/" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Home</Link>
              <Link href="/#about" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Features</Link>
              <Link href="/reserve" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Register</Link>
              <a href="tel:+919772188999" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Contact</a>
              <Link href="/#menu" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Services</Link>
              <a href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Location</a>
              <Link href="/privacy" className="hover:text-[#D4A843] transition-colors py-2 cursor-target min-h-[40px] flex items-center font-medium">Privacy</Link>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="mt-2 text-center text-xs font-bold border border-[#D4A843] text-[#D4A843] py-2 rounded-full hover:bg-[#D4A843] hover:text-[#1A1A2E] transition-all duration-300 cursor-target min-h-[40px]"
            >
              Order on WhatsApp
            </button>
          </div>

          {/* COLUMN 3: Contact & Hours */}
          <div className="flex flex-col space-y-2 md:space-y-4 border-b border-[#FAFAF5]/10 pb-4 md:border-none md:pb-0">
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none md:pointer-events-none"
            >
              <h3 className="font-display text-lg font-bold text-[#D4A843] tracking-wide md:border-b md:border-[#FAFAF5]/10 md:pb-2">
                Contact & Hours
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-[#D4A843] transition-transform duration-300 md:hidden ${
                  contactOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`space-y-3 md:space-y-4 text-sm text-[#FAFAF5]/90 md:block transition-all duration-300 overflow-hidden ${
                contactOpen
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0 md:max-h-none md:opacity-100 max-md:pointer-events-none"
              }`}
            >
              <div className="flex items-start space-x-3 pt-2">
                <MapPin className="w-5 h-5 text-[#C4622D] shrink-0 mt-0.5" />
                <span>
                  40, Riddhi Siddhi Tower, Sector 5 Rd, Vidyadhar Nagar, Jaipur, Rajasthan 302039
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#C4622D] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919772188999" className="hover:text-[#D4A843] font-bold block transition-colors cursor-target min-h-[44px] flex items-center font-body text-[15px]">
                    +91 97721 88999
                  </a>
                  <span className="text-[11px] text-[#FAFAF5]/70 block mt-0.5 font-body">
                    (Tap to call | Tap to WhatsApp below)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 font-body">
                <Clock className="w-5 h-5 text-[#C4622D] shrink-0" />
                <span>Open Daily: Until 11 PM</span>
              </div>
              <div className="flex items-center space-x-3 font-body">
                <CreditCard className="w-5 h-5 text-[#C4622D] shrink-0" />
                <span>Cash · UPI · Cards · NFC</span>
              </div>

              {/* Call-to-actions buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1 py-3 text-xs font-bold bg-[#FAFAF5]/5 border border-[#FAFAF5]/15 hover:border-[#D4A843] rounded-lg transition-colors cursor-target text-center min-h-[44px]"
                >
                  <span>Get Directions →</span>
                </a>
                <button
                  onClick={() => setCartOpen(true)}
                  className="flex items-center justify-center space-x-1 py-3 text-xs font-bold bg-[#25D366] text-white rounded-lg hover:bg-[#25D366]/90 transition-colors cursor-target min-h-[44px]"
                >
                  <span>Order on WhatsApp →</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#FAFAF5]/10 pt-6 md:pt-8 mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAFAF5]/70 font-math">
          <p className="text-center md:text-left mb-4 md:mb-0">
            © 2026 Two Pi R Foods. All rights reserved. | Made with ❤️ & ☕ in Jaipur
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-[#FAFAF5] transition-colors cursor-target">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#FAFAF5] transition-colors cursor-target">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
