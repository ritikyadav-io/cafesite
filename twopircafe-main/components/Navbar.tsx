"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_ITEMS = [
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "About Us", href: "/about" },
  { name: "Reserve", href: "/reserve" },
  { name: "FAQs", href: "/faq" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const pathname = usePathname();
  const { setCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar unless mobile menu is open
        if (!mobileMenuOpen) {
          setVisible(false);
        }
      } else {
        setVisible(true); // Scrolling up: show navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const navTranslations = {
    en: {
      menu: "Menu",
      gallery: "Gallery",
      reviews: "Reviews",
      about: "About Us",
      reserve: "Reserve",
      faq: "FAQs",
      blog: "Blog",
      reserveBtn: "Reserve a Table",
      orderBtn: "Order Online",
    },
    hi: {
      menu: "मेन्यू",
      gallery: "गैलरी",
      reviews: "समीक्षाएं",
      about: "हमारे बारे में",
      reserve: "आरक्षण",
      faq: "प्रश्न",
      blog: "ब्लॉग",
      reserveBtn: "टेबल बुक करें",
      orderBtn: "ऑनलाइन ऑर्डर",
    }
  };

  const t = navTranslations[language];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-cream/80 backdrop-blur-md shadow-md border-b border-espresso/10"
            : "py-6 bg-transparent"
        } max-md:py-0 max-md:bg-[#2C1810] max-md:border-b max-md:border-[#F5EDD6]/10 max-md:h-12 max-md:flex max-md:items-center`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo Brand: 2πR in Playfair Display with the π glowing gold */}
          <Link href="/" className="flex items-center space-x-2 cursor-target">
            <span className="font-display text-2xl md:text-3xl font-extrabold text-gold tracking-tight md:text-espresso">
              2
              <span className="text-gold inline-block animate-pulse-slow drop-shadow-[0_0_8px_rgba(212,168,67,0.5)]">
                π
              </span>
              R
            </span>
            <div className="flex flex-col border-l border-espresso/20 max-md:border-[#F5EDD6]/20 pl-2 leading-none">
              <span className="font-math text-[9px] uppercase tracking-widest text-[#F5EDD6]/60 md:text-espresso/60 max-md:text-[8px]">
                Vidyadhar Nagar
              </span>
              <span className="font-display text-[10px] font-semibold text-[#F5EDD6] md:text-espresso max-md:text-[9px]">
                Jaipur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const translationKey = item.name.toLowerCase().replace(" us", "").replace("s", "") as keyof typeof t;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group font-medium text-espresso/90 hover:text-espresso transition-colors text-sm py-1 cursor-target"
                >
                  <span>{t[translationKey] || item.name}</span>
                  {/* Underline Framer motion Layout or slide-effect */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-terracotta origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* CTAs and Lang Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-xs font-math font-semibold bg-espresso/5 hover:bg-espresso/10 text-espresso px-2.5 py-1.5 rounded-full transition-colors cursor-target"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "en" ? "EN" : "हिंदी"}</span>
            </button>

            {/* Order Online */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-xs font-bold text-espresso border border-espresso/30 px-4 py-2.5 rounded-full hover:bg-espresso hover:text-cream transition-all duration-300 cursor-target flex items-center space-x-2"
            >
              <span>{t.orderBtn}</span>
              {cartCount > 0 && (
                <span className="bg-terracotta text-chalk text-[10px] px-2 py-0.5 rounded-full font-math font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reserve Table: terracotta pill CTA */}
            <Link
              href="/reserve"
              className="flex items-center space-x-1 text-xs font-bold bg-terracotta text-chalk px-5 py-2.5 rounded-full hover:bg-terracotta/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-target"
            >
              <span>{t.reserveBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Lang Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-[10px] font-math font-bold bg-[#F5EDD6]/10 text-[#F5EDD6] px-2 py-0.5 rounded-full cursor-target animate-pulse-slow"
            >
              <Globe className="w-3 h-3 text-[#F5EDD6] shrink-0" />
              <span>{language === "en" ? "EN" : "हिंदी"}</span>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#F5EDD6] hover:bg-[#F5EDD6]/5 cursor-target w-9 h-9 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay: Math Grid Background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#2C1810] flex flex-col justify-between lg:hidden text-[#F5EDD6] p-6 pt-20"
          >
            {/* Aesthetic grid overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

            {/* Close Button Top Right */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#F5EDD6] hover:bg-[#F5EDD6]/5 cursor-target w-11 h-11 flex items-center justify-center z-50"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav links stacked vertically */}
            <div className="flex flex-col space-y-2 z-10 overflow-y-auto max-h-[60vh] text-left pt-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const translationKey = item.name.toLowerCase().replace(" us", "").replace("s", "") as keyof typeof t;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center font-display text-lg font-medium h-14 px-4 border-b border-[#F5EDD6]/10 transition-all ${
                      isActive 
                        ? "text-terracotta border-l-4 border-l-terracotta bg-[#F5EDD6]/5" 
                        : "text-[#F5EDD6]"
                    }`}
                  >
                    {t[translationKey] || item.name}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions inside Mobile Overlay */}
            <div className="bg-[#F5EDD6]/5 p-5 border border-[#F5EDD6]/10 rounded-2xl z-10 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCartOpen(true);
                }}
                className="w-full text-center font-bold text-[#F5EDD6] border border-[#F5EDD6]/35 py-3 rounded-full hover:bg-espresso hover:text-cream transition-colors text-sm flex items-center justify-center space-x-2"
              >
                <span>{t.orderBtn}</span>
                {cartCount > 0 && (
                  <span className="bg-terracotta text-chalk text-[10px] px-2 py-0.5 rounded-full font-math font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-bold bg-terracotta text-chalk py-3 rounded-full hover:bg-terracotta/90 transition-colors text-sm flex items-center justify-center space-x-2 shadow-md"
              >
                <span>{t.reserveBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex flex-col items-center space-y-1 pt-2 font-math text-[10px] text-[#F5EDD6]/50">
                <div>📞 +91 97721 88999</div>
                <div>Coordinates: 26.9704621° N, 75.7743409° E</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
