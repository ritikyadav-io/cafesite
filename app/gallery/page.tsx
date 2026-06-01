"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2, ZoomIn } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

// Curated high quality food, interior, and cafe photography from Unsplash
const GALLERY_PHOTOS = [
  {
    id: 1,
    category: "interior",
    title: "Math-Themed Walls",
    desc: "Our upper floor features intricate mathematical formulas, geometric circle diagrams, and chalkboard sketches.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600",
  },
  {
    id: 2,
    category: "vibe",
    title: "The Cozy Reading Corner",
    desc: "Warm Edison bulbs, a curated library of books, and velvet seating. Bring your laptop and stay a while.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600",
  },
  {
    id: 3,
    category: "drinks",
    title: "Signature Nutella Frappe",
    desc: "Crowned with chocolate flakes and freshly whipped vanilla cream. A sweet math formula.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600",
  },
  {
    id: 4,
    category: "pizza",
    title: "Cheeze Burst Pizza Freshly Baked",
    desc: "Our four-cheese blend hand-stretched pizza featuring a perfect visual mozzarella pull.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
  },
  {
    id: 5,
    category: "drinks",
    title: "Chocolate KitKat Shake",
    desc: "Crowned with whole KitKat wafers and thick Belgian chocolate fudge glaze. Absolute heaven.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600",
  },
  {
    id: 6,
    category: "desserts",
    title: "Belgian Fudge Brownie",
    desc: "Hot, gooey chocolate brownie matched by a cold scoop of Madagascar vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600",
  },
  {
    id: 7,
    category: "food",
    title: "Crispy Honey Chilli Potato",
    desc: "Glazed to deep golden perfection. Wok-tossed in sweet soy and roasted white sesame seeds.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600",
  },
  {
    id: 8,
    category: "drinks",
    title: "Muddled Watermelon Mojito",
    desc: "Crushed fresh watermelon, garden mint sprigs, lime wedges, and bubbly cane syrup juice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600",
  },
  {
    id: 9,
    category: "food",
    title: "Charred Chicken Kebabs",
    desc: "Double-ground tandoori spice marinated chicken tenders, grilled on charcoal embers.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=600",
  },
  {
    id: 10,
    category: "bar",
    title: "Basement Bar Display",
    desc: "Dim, moody backlit display featuring premium lagers, cocktails, and vault spirits.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600",
  },
  {
    id: 11,
    category: "interior",
    title: "Subterranean Seating Setup",
    desc: "Industrial fixtures, dark oak high tables, and leather stools in our basement bar.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600",
  },
  {
    id: 12,
    category: "vibe",
    title: "Entrance and Outdoor Signage",
    desc: "Welcoming 2πR glowing circular brass emblem greeting Vidyadhar Nagar patrons.",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=600",
  },
  {
    id: 13,
    category: "desserts",
    title: "Double Waffle Compote",
    desc: "Belgian waffles toasted crisp, drizzled with warm berry compote and dark chocolate threads.",
    image: "https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600",
  },
  {
    id: 14,
    category: "drinks",
    title: "Blue Lagoon Mocktail",
    desc: "Tropical blue curacao, lime soda, and a touch of sweet coconut milk. Fresh breeze.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=600",
  },
  {
    id: 15,
    category: "food",
    title: "Wok Hakka Noodles",
    desc: "Stir-fried vegetables, al dente noodles, and hot pepper oils, wok-tossed high speed.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600",
  },
  {
    id: 16,
    category: "vibe",
    title: "Friends and Conversations",
    desc: "Where circles start and deep late-night conversations simply never end.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
  }
];

const FILTER_TAGS = [
  { id: "all", name: "All Photos" },
  { id: "interior", name: "Architecture" },
  { id: "vibe", name: "Cafe Vibe" },
  { id: "drinks", name: "Shakes & Mojitos" },
  { id: "food", name: "Starters & Food" },
  { id: "pizza", name: "Pizzas" },
  { id: "desserts", name: "Desserts" },
  { id: "bar", name: "Basement Bar" }
];

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeTag === "all"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(photo => photo.category === activeTag);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleShare = (photo: typeof GALLERY_PHOTOS[0]) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: photo.desc,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Copied link to: ${photo.title}`);
    }
  };

  return (
    <div className="relative">
      <Breadcrumbs activeLabel="Gallery" />
      <div className="pt-4 pb-20 bg-cream min-h-screen">
      {/* Background Math watermarks */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full border border-espresso/2 pointer-events-none flex items-center justify-center">
        <span className="font-math text-[120px] text-espresso/2 select-none font-bold">
          π
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            Through the Lens of 2πR
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            Our Sensory Journey
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Flicker of Edison bulbs, math sketch walls, cheese pulls, and high-energy basement drinks. Explore the visual equation of Two Pi R Cafe.
          </p>
        </div>

        {/* Filter Badges navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide justify-start md:justify-center md:flex-wrap gap-2 md:gap-3">
          {FILTER_TAGS.map((tag) => {
            const isSelected = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => {
                  setActiveTag(tag.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-bold font-display shadow-sm hover:shadow transition-all duration-300 cursor-target shrink-0 ${
                  isSelected
                    ? "bg-terracotta text-chalk scale-102"
                    : "bg-chalk text-espresso/80 hover:text-espresso hover:bg-espresso/5 border border-espresso/5"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid layout: 2-cols on mobile, Pinterest masonry on desktop */}
        <div className="grid grid-cols-2 gap-2 md:block md:columns-3 lg:columns-4 md:gap-6 md:space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onClick={() => setLightboxIndex(index)}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden border border-espresso/10 shadow-md hover:shadow-xl transition-all duration-500 bg-chalk cursor-image-hover group ${
                  index === 0 ? "col-span-2 h-[180px] md:h-auto" : "h-[120px] md:h-auto"
                }`}
              >
                {/* Visual Image */}
                <div className="relative overflow-hidden w-full h-full md:h-auto">
                  <img
                    src={photo.image}
                    alt={`${photo.title} at Two Pi R Cafe Jaipur`}
                    className="w-full h-full object-cover md:h-auto md:object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 md:p-5 text-chalk text-left pointer-events-none">
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-chalk/10 border border-chalk/20 flex items-center justify-center text-gold">
                        <ZoomIn className="w-4 h-4 shrink-0" />
                      </div>
                    </div>

                    <div>
                      <span className="font-math text-[9px] uppercase tracking-wider text-gold font-bold">
                        {FILTER_TAGS.find(tag => tag.id === photo.category)?.name || photo.category}
                      </span>
                      <h3 className="font-display text-sm md:text-lg font-bold text-chalk mt-0.5">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 10. LIGHTBOX FULL SCREEN INTERACTIVE MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#1A1A2E]/98 backdrop-blur-md flex flex-col justify-between p-4 md:p-6"
            >
              {/* Overlay grid motif */}
              <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

              {/* Lightbox header row */}
              <div className="relative z-10 flex items-center justify-between text-chalk pt-2">
                <span className="font-math text-[10px] md:text-xs uppercase tracking-widest text-[#D4A843] font-bold">
                  2πR Lens Equation ({lightboxIndex + 1} / {filteredPhotos.length})
                </span>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleShare(filteredPhotos[lightboxIndex])}
                    className="p-2 rounded-full hover:bg-chalk/10 text-chalk cursor-target w-11 h-11 flex items-center justify-center"
                    title="Share Photo Link"
                  >
                    <Share2 className="w-5 h-5 shrink-0" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 rounded-full hover:bg-chalk/10 text-chalk cursor-target w-11 h-11 flex items-center justify-center"
                    title="Close Overlay (Esc)"
                  >
                    <X className="w-6 h-6 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Middle core Row: Chevron arrows and full sized image */}
              <div className="relative z-10 flex-grow flex items-center justify-between gap-4 max-h-[75vh]">
                
                {/* Left chevron */}
                <button
                  onClick={handlePrevLightbox}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-chalk/5 border border-chalk/10 flex items-center justify-center text-chalk hover:bg-chalk/20 transition-all cursor-target shrink-0"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Central Image inside frame */}
                <div className="relative max-w-3xl max-h-full flex items-center justify-center p-2">
                  <motion.img
                    key={lightboxIndex}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={filteredPhotos[lightboxIndex].image}
                    alt={filteredPhotos[lightboxIndex].title}
                    className="max-w-full max-h-[60vh] md:max-h-[65vh] rounded-2xl object-contain shadow-2xl border border-chalk/10"
                  />
                </div>

                {/* Right chevron */}
                <button
                  onClick={handleNextLightbox}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-chalk/5 border border-chalk/10 flex items-center justify-center text-chalk hover:bg-chalk/20 transition-all cursor-target shrink-0"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

              </div>

              {/* Bottom Row description details */}
              <div className="relative z-10 text-center max-w-xl mx-auto pb-4 text-chalk px-4">
                <motion.h3
                  key={"t_" + lightboxIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-display text-lg md:text-2xl font-black text-[#D4A843]"
                >
                  {filteredPhotos[lightboxIndex].title}
                </motion.h3>
                <motion.p
                  key={"d_" + lightboxIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs md:text-sm text-[#FAFAF5]/85 leading-relaxed font-body mt-2"
                >
                  {filteredPhotos[lightboxIndex].desc}
                </motion.p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
      </div>
      <RelatedContent excludePath="/gallery" />
    </div>
  );
}
