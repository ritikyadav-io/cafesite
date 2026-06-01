"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from "lucide-react";

// Real Google reviews database
const REVIEWS = [
  {
    id: 1,
    stars: 5,
    name: "Harsh Jadon",
    role: "Local Guide",
    text: "Best place for Hangout and small gatherings. Their Chicken kebabs are the best",
  },
  {
    id: 2,
    stars: 5,
    name: "Raftaar United",
    role: "Local Guide",
    text: "One of the Must Visit Cafe in Our Jaipur... Lovely staff. Next level experience.",
  },
  {
    id: 3,
    stars: 5,
    name: "Brahmdutt Sharma",
    role: "Local Guide (87 reviews)",
    text: "This Cafe is awesome with its interior and the food they serve. Something special and new for me is sweet Buns and sweet fries. I recommend this place.",
  },
  {
    id: 4,
    stars: 4,
    name: "Prachi Jodha",
    role: "Local Guide (42 reviews)",
    text: "It has a cool science-maths theme. And being a science student it amazed me a lot. It is very spacious. So you can throw parties as well. It has got 2 seating areas. It has some books too.",
  },
  {
    id: 5,
    stars: 5,
    name: "Xeta",
    role: "Local Guide (290 reviews)",
    text: "One of the best restaurant in this area. Quality food, economical pricing and best ambience. Services and staff is very good. Beautiful interiors. Ample parking space. It's a complete package.",
  },
  {
    id: 6,
    stars: 4,
    name: "Himanshu Meena",
    role: "Local Guide (99 reviews)",
    text: "An amazing ambience place with a large sitting space. They serve delicious food with a variety of mojito and shakes. The parking space is so amazing that you never seen before. The theme is mathematical with amazing posters inside.",
  },
  {
    id: 7,
    stars: 5,
    name: "Aditya",
    role: "Google Reviewer",
    text: "The food is good and the architecture is great. They are humble and polite.",
  },
  {
    id: 8,
    stars: 4,
    name: "Dr. Ankit Yadav",
    role: "Local Guide",
    text: "Awesome place for hangout with lip smacking food.",
  },
  {
    id: 9,
    stars: 5,
    name: "Niraj Sharma",
    role: "Local Guide",
    text: "Totally worth visiting. Great vibes on a Tuesday even — it's a great spot to hang out.",
  },
  {
    id: 10,
    stars: 4,
    name: "Harshita Rao",
    role: "Local Guide",
    text: "The bar has opened up in the basement that is attracting people more than ever. Food taste is amazing. Interiors are good and there is a book shelf also.",
  }
];

const STAR_BREAKDOWN = [
  { rating: 5, percent: "82%" },
  { rating: 4, percent: "12%" },
  { rating: 3, percent: "4%" },
  { rating: 2, percent: "1%" },
  { rating: 1, percent: "1%" },
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(3);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // 3D Tilt Card Hover Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap tilt angles
    setTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section id="reviews" className="py-20 bg-cream relative overflow-hidden">
      {/* Circle dividing outline accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-espresso/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            1,395 Reasons to Visit
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-espresso mt-2 mb-4">
            Loved by Jaipur
          </h2>
          <p className="text-sm md:text-base text-espresso/70 leading-relaxed font-body">
            Don&apos;t take our mathematical equation for it. Read the formulas of delight submitted by 1,390+ verified local diners.
          </p>
        </div>

        {/* Split Layout: Left Rating Breakdown, Right Swipeable Card or Stacked Mobile View */}
        {isMobile ? (
          <div className="flex flex-col space-y-6 mt-8">
            {/* RATING SUMMARY (top) */}
            <div className="bg-chalk p-6 rounded-3xl border border-espresso/10 shadow-md text-center max-w-md mx-auto w-full">
              <span className="font-display text-5xl font-black text-espresso">4.2</span>
              <div className="flex justify-center text-gold my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5.5 h-5.5 fill-current" />
                ))}
              </div>
              <span className="font-body text-[13px] text-espresso/60 block mt-1">
                Based on 1,395 Google reviews
              </span>
              
              {/* Star Bars */}
              <div className="space-y-2 mt-4 font-math text-xs">
                {STAR_BREAKDOWN.map((item) => (
                  <div key={item.rating} className="flex items-center space-x-2.5">
                    <span className="w-3 text-right font-bold text-espresso">{item.rating}</span>
                    <Star className="w-3.5 h-3.5 text-gold fill-current shrink-0" />
                    <div className="flex-1 h-2 bg-espresso/10 rounded-full overflow-hidden">
                      <div
                        style={{ width: item.percent }}
                        className="h-full bg-terracotta rounded-full"
                      />
                    </div>
                    <span className="w-8 text-right text-espresso/60 font-semibold">{item.percent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEW CARDS (horizontal track) */}
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="min-w-[280px] max-w-[280px] bg-white p-5 rounded-2xl border border-espresso/8 flex flex-col justify-between text-left shadow-sm shrink-0 snap-center"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex text-gold space-x-0.5">
                        {[...Array(review.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-math text-[9px] uppercase tracking-wider text-espresso/45">
                        Google Review
                      </span>
                    </div>
                    <p className="font-body text-[12px] text-espresso/70 leading-relaxed italic line-clamp-4">
                      &quot;{review.text}&quot;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-espresso/5 flex items-center justify-between">
                    <span className="font-body text-[13px] font-bold text-espresso line-clamp-1">{review.name}</span>
                    <span className="font-math text-[9px] text-gold font-bold">
                      {review.role.includes("Local Guide") ? "Local Guide" : "Reviewer"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: Ratings stats & Breakdown */}
            <div className="lg:col-span-4 bg-chalk p-8 rounded-3xl border border-espresso/10 shadow-lg">
              <div className="text-center mb-6">
                <span className="font-display text-6xl font-black text-espresso">4.2</span>
                <div className="flex justify-center text-[#D4A843] my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-math text-xs text-espresso/60 uppercase tracking-widest block mt-1">
                  1,395 Google Reviews
                </span>
              </div>

              {/* Star Bars */}
              <div className="space-y-3 font-math text-xs">
                {STAR_BREAKDOWN.map((item) => (
                  <div key={item.rating} className="flex items-center space-x-2.5">
                    <span className="w-3 text-right font-bold text-espresso">{item.rating}</span>
                    <Star className="w-3.5 h-3.5 text-[#D4A843] fill-current shrink-0" />
                    <div className="flex-1 h-2 bg-espresso/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.percent }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gold rounded-full"
                      />
                    </div>
                    <span className="w-8 text-right text-espresso/60 font-semibold">{item.percent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Autoplay 3D Card Carousel */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-xl h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setIsPaused(true)}
                    initial={{ opacity: 0, x: 50, rotateY: 15 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotateY: 0,
                      transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
                    }}
                    exit={{ opacity: 0, x: -50, rotateY: -15 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 bg-chalk border border-espresso/10 p-8 md:p-10 rounded-[24px] shadow-2xl flex flex-col justify-between select-none cursor-target transition-shadow hover:shadow-indigo-900/5 hover:border-terracotta"
                  >
                    {/* Quotes Icon Background Watermark */}
                    <div className="absolute top-6 right-8 text-espresso/5 font-serif text-[120px] select-none pointer-events-none leading-none font-black">
                      “
                    </div>

                    <div>
                      {/* Stars */}
                      <div className="flex text-gold space-x-0.5 mb-4">
                        {[...Array(REVIEWS[currentIndex].stars)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Star className="w-5 h-5 fill-current" />
                          </motion.span>
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="font-display text-lg md:text-xl font-bold text-espresso leading-relaxed italic line-clamp-4 pr-6">
                        &quot;{REVIEWS[currentIndex].text}&quot;
                      </p>
                    </div>

                    {/* Reviewer Meta Row */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-espresso/5">
                      <div>
                        <h4 className="font-display text-base font-extrabold text-espresso">
                          {REVIEWS[currentIndex].name}
                        </h4>
                        <span className="font-math text-[10px] uppercase tracking-wider text-gold font-bold">
                          {REVIEWS[currentIndex].role}
                        </span>
                      </div>

                      {/* Google G logo bottom right */}
                      <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center border border-espresso/10">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.114 2.78-2.4 4.3l3.7 2.88c2.2-2.03 3.75-5.03 3.75-9.03z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.7-2.88c-1.03.69-2.35 1.11-4.26 1.11-3.27 0-6.04-2.22-7.03-5.22H1.11v2.99C3.1 22.09 7.29 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M4.97 14.1c-.25-.76-.4-1.57-.4-2.4s.15-1.64.4-2.4V6.31H1.11C.4 7.72 0 9.31 0 11s.4 3.28 1.11 4.69l3.86-2.99z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0 7.29 0 3.1 1.91 1.11 4.97l3.86 2.99c.99-3 3.76-5.21 7.03-5.21z"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Dots and Chevron controls */}
              <div className="flex items-center space-x-6 mt-8">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-espresso/25 flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-all duration-300 cursor-target"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-2">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === i ? "w-6 bg-terracotta" : "w-2 bg-espresso/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-espresso/25 flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-all duration-300 cursor-target"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Bottom review widget redirection buttons */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-espresso text-cream font-bold px-8 py-3.5 rounded-full hover:bg-espresso/90 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-target"
          >
            <span>Read All 1,395 Reviews on Google</span>
            <ExternalLink className="w-4 h-4 text-gold" />
          </a>
          <a
            href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-espresso border border-espresso/35 font-bold px-8 py-3.5 rounded-full hover:bg-espresso hover:text-cream transition-all duration-300 flex items-center justify-center space-x-2 cursor-target"
          >
            <MessageSquare className="w-4 h-4 text-terracotta" />
            <span>Write a Google Review</span>
          </a>
        </div>

      </div>
    </section>
  );
}

function MobileReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = review.text.length > 120;
  
  return (
    <div className="bg-white p-4 rounded-2xl border border-espresso/8 flex flex-col justify-between text-left">
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex text-gold space-x-0.5">
            {[...Array(review.stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          {review.role.includes("Local Guide") ? (
            <span className="font-body text-[11px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full font-semibold shrink-0">
              Local Guide
            </span>
          ) : (
            <span className="font-body text-[11px] text-gold font-semibold shrink-0">
              {review.role}
            </span>
          )}
        </div>
        <h4 className="font-body text-[15px] font-bold text-espresso mb-1">
          {review.name}
        </h4>
        <p className="font-body text-[13px] text-espresso/70 leading-relaxed italic">
          &quot;{expanded ? review.text : (shouldClamp ? `${review.text.slice(0, 110)}...` : review.text)}&quot;
          {shouldClamp && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-terracotta text-[13px] font-bold ml-1.5 focus:outline-none inline cursor-target"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
