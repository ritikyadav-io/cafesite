"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { menuData } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

export default function MenuPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Map category listings dynamically from the menuData
  const CATEGORY_MAP = [
    { id: "all", name: "📋 All Categories" },
    ...menuData.map((cat) => ({ id: cat.id, name: `${cat.emoji} ${cat.label}` }))
  ];

  // Dynamic search and tag filtering
  const filteredItems = menuData.flatMap((cat) => {
    // If activeCategory is not "all", filter only matching category
    if (activeCategory !== "all" && cat.id !== activeCategory) return [];

    return cat.items
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (cat.label.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
      })
      .map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label, emoji: cat.emoji }));
  });

  return (
    <div className="relative bg-cream min-h-screen">
      {/* Dynamic Breadcrumbs trail below Navbar */}
      <Breadcrumbs activeLabel="Menu" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Formula for culinary delight</span>
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            The Interactive Menu
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Search across our 14 diverse categories. Fresh ingredients, calculated spices, legendary basement drinks, and sweet toasted buns.
          </p>
        </div>

        {/* Search Bar Widget */}
        <div className="max-w-md mx-auto mb-10 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search e.g. Honey Chilli, Dosa, Beer, Brownie..."
            className="w-full px-5 py-4 pl-12 rounded-full border border-espresso/15 bg-chalk text-espresso text-sm shadow-md focus:outline-none focus:border-terracotta transition-all cursor-target"
          />
          <Search className="w-5 h-5 text-espresso/40 absolute left-4.5 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Navigation Categories Tabs (Horizontal Scrolling Marquee-style tab bar) */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide sticky top-[48px] md:top-[68px] max-md:bg-[#FAFAF5] z-30 max-md:py-3 max-md:border-b max-md:border-espresso/10">
          <div className="flex space-x-2 bg-chalk/80 p-1.5 rounded-full border border-espresso/10 backdrop-blur-sm shadow-inner max-md:bg-transparent max-md:border-none max-md:p-0">
            {CATEGORY_MAP.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-display whitespace-nowrap transition-all duration-300 cursor-target h-9 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-terracotta text-chalk shadow"
                      : "bg-[#FAFAF5] text-espresso/70 border border-espresso/10 md:border-none"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Items Showcase */}
        <div className="bg-chalk rounded-3xl p-4 md:p-10 border border-espresso/10 shadow-xl relative max-md:bg-transparent max-md:border-none max-md:shadow-none max-md:p-0">
          {/* Watermark symbol background inside board (Desktop Only) */}
          <div className="absolute bottom-6 right-6 font-math text-7xl text-espresso/2 pointer-events-none select-none hidden md:block">
            2πR
          </div>

          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between py-4 border-b border-espresso/8 md:border-espresso/10 hover:border-terracotta/40 transition-colors group p-2 md:p-0 max-md:bg-white max-md:rounded-2xl max-md:shadow-sm max-md:border-b-0 max-md:mb-2"
                  >
                    {/* Left content: details */}
                    <div className="flex flex-col justify-between flex-grow text-left pr-3">
                      <div>
                        <div className="flex items-start md:items-baseline space-x-2">
                          {/* Green dot for Veg / Red for Non-veg */}
                          <span 
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 select-none font-bold text-[8px] leading-none ${
                              item.isVeg 
                                ? "border-green-600 text-green-600" 
                                : "border-red-600 text-red-600"
                            }`}
                            title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                          >
                            ●
                          </span>
                          <h3 className="font-display text-base font-extrabold text-espresso group-hover:text-terracotta transition-colors duration-300 leading-snug">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[12px] md:text-xs text-espresso/60 leading-relaxed font-body mt-1 max-w-sm line-clamp-2 md:line-clamp-3">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-1.5 flex-wrap gap-y-1">
                          <span className="font-math text-[9px] uppercase tracking-wider text-espresso/45 bg-cream/40 px-2 py-0.5 rounded shrink-0">
                            {item.categoryLabel}
                          </span>
                          
                          {item.isRecommended && (
                            <span className="font-math text-[9px] text-gold font-bold flex items-center shrink-0">
                              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                              <span>Recommended</span>
                            </span>
                          )}

                          {item.isBestSeller && (
                            <span className="font-math text-[9px] text-terracotta font-bold flex items-center shrink-0">
                              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                              <span>Best Seller</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Mobile Price */}
                      <div className="md:hidden mt-2 font-math text-base font-extrabold text-terracotta">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Right side: Desktop Price + Add or Mobile Category Emoji box */}
                    {/* Desktop Right Panel */}
                    <div className="hidden md:flex items-center space-x-4 shrink-0">
                      <span className="font-math text-base font-extrabold text-espresso">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, isVeg: item.isVeg })}
                        className="w-8 h-8 rounded-full border border-espresso/15 flex items-center justify-center bg-chalk hover:bg-terracotta hover:text-chalk transition-all duration-300 text-espresso cursor-target"
                        title={`Add ${item.name} to Cart`}
                      >
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>

                    {/* Mobile Category Emoji box panel */}
                    <div className="flex flex-col items-center shrink-0 w-[80px] md:hidden relative mt-1">
                      <div className="w-[80px] h-[80px] rounded-xl overflow-hidden bg-gold/5 border border-gold/15 flex items-center justify-center text-3xl shadow-inner select-none font-display">
                        {item.emoji || "🍽️"}
                      </div>
                      {/* Floating Add overlay */}
                      <button
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, isVeg: item.isVeg })}
                        className="absolute bottom-[-10px] w-[72px] h-[28px] bg-white border-2 border-terracotta text-terracotta text-xs font-extrabold rounded-lg shadow-md flex items-center justify-center cursor-target active:bg-terracotta active:text-white transition-all font-display"
                      >
                        + Add
                      </button>
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 flex flex-col items-center justify-center space-y-3"
              >
                <div className="text-espresso/35 font-math text-4xl">∑ = 0</div>
                <h3 className="font-display text-lg font-bold text-espresso">
                  No Food Items Found
                </h3>
                <p className="text-xs text-espresso/60 leading-relaxed font-body max-w-sm">
                  We couldn&apos;t find any dish matching your search query. Try another keyword or reset the category.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="bg-espresso text-cream text-xs font-bold px-5 py-2.5 rounded-full hover:bg-espresso/90 cursor-target"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Direct Order Ticker */}
        <div className="mt-16 bg-espresso text-cream p-8 rounded-3xl border border-gold/15 shadow-xl flex flex-col md:flex-row items-center justify-between text-left gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-display text-xl font-bold text-gold">
              Hungry at Vidyadhar Nagar?
            </h4>
            <p className="text-xs text-cream/70 leading-relaxed font-body">
              Order directly via phone or WhatsApp. We deliver fresh multi-cuisine pizza, rolls, starters, and KitKat shakes right to your doorstep. Free delivery within 3km.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => addToCart({ id: "st8", name: "Honey Chilli Potato", price: 199, isVeg: true })}
              className="w-full sm:w-auto bg-[#25D366] text-white font-bold px-6 py-3 rounded-full hover:bg-[#25D366]/90 transition-colors flex items-center justify-center space-x-2 text-xs cursor-target"
            >
              <span>Add Best Seller to Cart</span>
            </button>
            <a
              href="tel:+919772188999"
              className="w-full sm:w-auto text-[#D4A843] border border-[#D4A843]/40 font-bold px-6 py-3 rounded-full hover:bg-[#D4A843] hover:text-[#1A1A2E] transition-all text-center text-xs cursor-target"
            >
              Call +91-97721-88999
            </a>
          </div>
        </div>

      </div>

      {/* Dynamic bottom recommended related content */}
      <RelatedContent excludePath="/menu" />
    </div>
  );
}
