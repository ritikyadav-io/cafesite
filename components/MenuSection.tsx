"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Categories and matching food items
const MENU_CATEGORIES = [
  { id: "popular", name: "★ Popular" },
  { id: "starters", name: "🍢 Starters" },
  { id: "pizza", name: "🍕 Pizza & Pasta" },
  { id: "snacks", name: "🫓 Snacks & Buns" },
  { id: "desserts", name: "🧁 Shakes & Shakes" },
  { id: "drinks", name: "☕ Drinks & Drinks" },
  { id: "bar", name: "🍺 Basement Bar" },
];

const MENU_ITEMS = [
  // Popular Highlight Items
  {
    id: "nutella-frappe",
    category: "popular",
    name: "Nutella Frappe",
    popular: true,
    price: 240,
    desc: "The cafe's signature masterwork — rich premium Nutella blended with double-shot espresso to frozen perfection.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "cheeze-burst",
    category: "popular",
    name: "Cheeze Burst Pizza",
    popular: true,
    price: 360,
    desc: "A legendary four-cheese molten explosion on every single slice. Hand-stretched sourdough base.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "kitkat-shake",
    category: "popular",
    name: "Chocolate KitKat Shake",
    popular: true,
    price: 220,
    desc: "Decadent dessert and rich milkshake merged in one glorious tall cup. Crowned with crispy KitKat bars.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "honey-chilli",
    category: "popular",
    name: "Honey Chilli Potato",
    popular: true,
    price: 180,
    desc: "Impossibly addictive crispy potato fingers glazed in a hot-sweet soy dressing and toasted sesame seeds.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&auto=format&fit=crop",
  },

  // Starters
  {
    id: "chicken-kebabs",
    category: "starters",
    name: "Tandoori Chicken Kebabs",
    popular: true,
    price: 280,
    desc: "Succulent cubes of chicken marinated in mustard oil, home-ground tandoori spices, and hung curd, charred on embers.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "chilli-paneer",
    category: "starters",
    name: "Chilli Paneer Dry",
    popular: false,
    price: 240,
    desc: "Indo-Chinese fusion delight. Wok-tossed paneer chunks with crisp bell peppers, garlic, ginger, and green chillies.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "veg-spring-roll",
    category: "starters",
    name: "Veg Spring Roll",
    popular: false,
    price: 160,
    desc: "Golden-crisp wraps stuffed with julienned vegetables, glass noodles, and five-spice seasoning. Served with hot plum dip.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
  },

  // Pizza & Pasta
  {
    id: "basil-pesto",
    category: "pizza",
    name: "Basil Pesto Pasta",
    popular: true,
    price: 260,
    desc: "Al dente penne folded in a rich emulsion of fresh sweet basil, extra virgin olive oil, toasted pine nuts, and aged parmesan.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "white-alfredo",
    category: "pizza",
    name: "White Alfredo Pasta",
    popular: false,
    price: 260,
    desc: "Luxuriously creamy garlic-infused white sauce coating fresh mushrooms and pasta. A comforting classic.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "margarita",
    category: "pizza",
    name: "Margarita Pizza",
    popular: false,
    price: 290,
    desc: "The classic equation: Tangy San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil, and a drizzle of olive oil.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&auto=format&fit=crop",
  },

  // Snacks & Buns (Science of snacks)
  {
    id: "sweet-fries",
    category: "snacks",
    name: "Two Pi R Sweet Fries",
    popular: true,
    price: 140,
    desc: "Our highly recommended signature sweet-potato fries dusted with a custom mathematical blend of cinnamon, salt, and cayenne.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sweet-buns",
    category: "snacks",
    name: "Math-Posters Sweet Buns",
    popular: true,
    price: 150,
    desc: "Jaipur's famous sweet toasted buns brushed with local desert honey and stuffed with whipped cardamom cream.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
  },

  // Shakes & Desserts
  {
    id: "brownie-ice-cream",
    category: "desserts",
    name: "Fudge Brownie with Ice Cream",
    popular: true,
    price: 190,
    desc: "Warm gooey Belgian chocolate fudge brownie met by a freezing scoop of premium vanilla bean. A perfect thermal loop.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "cold-coffee-cream",
    category: "desserts",
    name: "Cold Coffee with Ice Cream",
    popular: false,
    price: 170,
    desc: "Jaipur summer's ultimate mathematical solution — strong cold brew coffee topped with a massive float of vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop",
  },

  // Drinks (Beverages)
  {
    id: "watermelon-mojito",
    category: "drinks",
    name: "Watermelon Mojito",
    popular: true,
    price: 160,
    desc: "Refreshing Jaipur heat-slayer. Fresh crushed watermelon, muddled mint, limes, sugar cane syrup, and carbonated bubbles.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "virgin-mojito",
    category: "drinks",
    name: "Classic Virgin Mojito",
    popular: false,
    price: 140,
    desc: "Zesty freshly-squeezed lime juice, crushed peppermint sprigs, simple cane syrup, and chilled soda over crushed ice cubes.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop",
  },

  // Basement Bar Menu (Dark/Edgy styles)
  {
    id: "basement-beer",
    category: "bar",
    name: "Chilled Beer (600ml)",
    popular: true,
    price: 190,
    desc: "Frosty, crisp lager served straight from our subterranean bar vault. Perfect companion to our chicken kebabs.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "pi-cocktail",
    category: "bar",
    name: "The Pi-Formula Cocktail",
    popular: true,
    price: 320,
    desc: "BASMENT EXCLUSIVE: A layered fusion of dark rum, orange liqueur, fresh lime, and ginger ale. Serves continuous warmth.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop",
  }
];

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState("popular");
  const { addToCart, setCartOpen } = useCart();

  const filteredItems = activeTab === "popular" 
    ? MENU_ITEMS.filter(item => item.popular)
    : MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-20 bg-chalk relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            The Formula for Great Food
          </span>
          <h2 className="font-display text-2xl md:text-5xl font-black text-espresso mt-2 mb-4 leading-tight">
            Our Mathematical Menu
          </h2>
          <p className="text-sm md:text-base text-espresso/70 leading-relaxed font-body">
            Multi-cuisine food calculated and seasoned to bring out absolute sensory perfection. A culinary equation of Indian spices and Western craft.
          </p>
        </div>

        {/* Tab Navigation (Horizontal Scrollable Pills) */}
        <div className="flex justify-start lg:justify-center overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide sticky top-[48px] md:top-[68px] max-md:bg-[#FAFAF5] z-30 max-md:py-3 max-md:border-b max-md:border-espresso/10">
          <div className="flex space-x-2 bg-cream/30 p-1.5 rounded-full border border-espresso/5 backdrop-blur-sm max-md:bg-transparent max-md:border-none max-md:p-0">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold font-display whitespace-nowrap transition-all duration-300 cursor-target h-9 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-terracotta text-[#FAFAF5] shadow"
                      : "bg-[#FAFAF5] text-espresso/70 border border-espresso/10 md:border-none"
                  }`}
                >
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative w-full transition-all duration-300 md:group md:rounded-2xl md:overflow-hidden md:border md:border-espresso/15 md:shadow-md md:hover:shadow-xl md:bg-cream/20 flex flex-row md:flex-col justify-between p-4 md:p-0 border-b border-espresso/8 md:border-b-0 max-md:bg-transparent ${
                  activeTab === "bar" ? "md:border-ink/20 md:shadow-indigo-900/5 md:bg-ink/5" : ""
                }`}
              >
                {/* Terracotta Top Accent Border (Desktop Only) */}
                <div className={`hidden md:block h-1.5 w-full bg-terracotta transition-all duration-500 group-hover:bg-gold ${
                  activeTab === "bar" ? "bg-indigo-900 group-hover:bg-[#D4A843]" : ""
                }`} />

                {/* Food Image Container (Desktop Only) */}
                <div className="hidden md:block relative h-56 overflow-hidden cursor-image-hover w-full">
                  <motion.img
                    src={item.image}
                    alt={`${item.name} at Two Pi R Cafe Jaipur`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-gold text-espresso text-[10px] font-math font-bold px-2.5 py-1 rounded-full shadow-md">
                      POPULAR ★
                    </div>
                  )}
                  {/* Subtle Terracotta/Ink Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Card Info & Details (Unified for responsive layouts) */}
                <div className="flex flex-col justify-between flex-grow text-left md:p-6 md:h-[230px] pr-3 md:pr-0 pb-1.5 md:pb-0">
                  <div>
                    <div className="flex items-start md:items-baseline justify-between mb-1.5 md:mb-2">
                      <div className="flex items-center space-x-1.5">
                        {/* Green Veg Dot for all items except Chicken Kebabs */}
                        <span 
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 text-[8px] font-bold leading-none ${
                            item.id === "chicken-kebabs" 
                              ? "border-red-600 text-red-600" 
                              : "border-green-600 text-green-600"
                          }`}
                          title={item.id === "chicken-kebabs" ? "Non-Vegetarian" : "Vegetarian"}
                        >
                          ●
                        </span>
                        <h3 className="font-display text-base md:text-xl font-extrabold text-espresso group-hover:text-terracotta transition-colors duration-300 line-clamp-2 leading-snug">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[12px] md:text-xs text-espresso/70 leading-relaxed font-body line-clamp-2 md:line-clamp-3">
                      {item.desc}
                    </p>

                    {/* Mobile Badge indicator */}
                    {item.popular && (
                      <span className="inline-block md:hidden bg-gold/15 text-espresso text-[9px] font-math font-bold px-2 py-0.5 rounded mt-1.5 shrink-0 w-max uppercase tracking-wider">
                        ★ Best Seller
                      </span>
                    )}
                  </div>

                  {/* Add to Order CTA Block */}
                  <div className="pt-2 md:pt-4 border-t border-espresso/10 flex items-center justify-between mt-2 md:mt-0">
                    <span className="font-math text-base font-extrabold text-terracotta md:text-espresso shrink-0">
                      ₹{item.price}
                    </span>
                    
                    {/* Add to Order (Desktop Only) */}
                    <div className="hidden md:flex items-center space-x-1.5 text-xs font-bold text-terracotta hover:text-espresso hover:underline transition-colors cursor-target">
                      <button
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, isVeg: item.id !== "chicken-kebabs" })}
                        className="flex items-center space-x-1.5"
                      >
                        <span>Add to Order</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side Image Block & Stepper Button (Mobile Only) */}
                <div className="flex flex-col items-center shrink-0 w-[80px] md:hidden relative mt-1">
                  <div className="w-[80px] h-[80px] rounded-xl overflow-hidden bg-espresso/5 border border-espresso/10">
                    <img
                      src={item.image}
                      alt={`${item.name} at Two Pi R Cafe`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating + Add overlay CTA */}
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, isVeg: item.id !== "chicken-kebabs" })}
                    className="absolute bottom-[-10px] w-[72px] h-[28px] bg-white border-2 border-terracotta text-terracotta text-xs font-extrabold rounded-lg shadow-md flex items-center justify-center cursor-target active:bg-terracotta active:text-white transition-all font-display"
                  >
                    + Add
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Menu Actions */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-center">
          <Link
            href="/menu"
            className="w-full sm:w-auto bg-terracotta text-chalk font-bold px-8 py-3.5 rounded-full hover:bg-terracotta/90 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-target"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="w-full sm:w-auto text-espresso border border-espresso/35 font-bold px-8 py-3.5 rounded-full hover:bg-espresso hover:text-cream transition-all duration-300 cursor-target text-center"
          >
            Order Online Now
          </button>
        </div>
      </div>
    </section>
  );
}
