"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ExternalLink, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

// Real Google reviews database
const ALL_REVIEWS = [
  {
    stars: 5,
    name: "Harsh Jadon",
    role: "Local Guide",
    text: "Best place for Hangout and small gatherings. Their Chicken kebabs are the best",
    date: "2 weeks ago"
  },
  {
    stars: 5,
    name: "Raftaar United",
    role: "Local Guide",
    text: "One of the Must Visit Cafe in Our Jaipur... Lovely staff. Next level experience.",
    date: "1 month ago"
  },
  {
  stars: 5,
    name: "Patrick",
    role: "Tourist",
    text: "One of the Must Visit Cafe in Our Jaipur... Lovely staff. Next level experience.",
    date: "3 month ago"
  },
  {
    stars: 5,
    name: "Brahmdutt Sharma",
    role: "Local Guide (87 reviews)",
    text: "This Cafe is awesome with its interior and the food they serve. Something special and new for me is sweet Buns and sweet fries. I recommend this place.",
    date: "2 months ago"
  },
  {
    stars: 4,
    name: "Prachi Jodha",
    role: "Local Guide (42 reviews)",
    text: "It has a cool science-maths theme. And being a science student it amazed me a lot. It is very spacious. So you can throw parties as well. It has got 2 seating areas. It has some books too.",
    date: "3 months ago"
  },
  {
    stars: 5,
    name: "Xeta",
    role: "Local Guide (290 reviews)",
    text: "One of the best restaurant in this area. Quality food, economical pricing and best ambience. Services and staff is very good. Beautiful interiors. Ample parking space. It's a complete package.",
    date: "3 months ago"
  },
  {
    stars: 4,
    name: "Himanshu Meena",
    role: "Local Guide (99 reviews)",
    text: "An amazing ambience place with a large sitting space. They serve delicious food with a variety of mojito and shakes. The parking space is so amazing that you never seen before. The theme is mathematical with amazing posters inside.",
    date: "4 months ago"
  },
  {
    stars: 5,
    name: "Aditya",
    role: "Google Reviewer",
    text: "The food is good and the architecture is great. They are humble and polite.",
    date: "5 months ago"
  },
  {
    stars: 4,
    name: "Dr. Ankit Yadav",
    role: "Local Guide",
    text: "Awesome place for hangout with lip smacking food.",
    date: "6 months ago"
  },
  {
    stars: 5,
    name: "Niraj Sharma",
    role: "Local Guide",
    text: "Totally worth visiting. Great vibes on a Tuesday even — it's a great spot to hang out.",
    date: "7 months ago"
  },
  {
    stars: 4,
    name: "Harshita Rao",
    role: "Local Guide",
    text: "The bar has opened up in the basement that is attracting people more than ever. Food taste is amazing. Interiors are good and there is a book shelf also.",
    date: "8 months ago"
  }
];

const RATINGS_BREAKDOWN = [
  { rating: 5, percent: "82%", count: 1143 },
  { rating: 5, percent: "92%", count: 1193},
  { rating: 4.7, percent: "52%", count: 43},
  { rating: 4, percent: "12%", count: 167 },
  { rating: 3, percent: "4%", count: 56 },
  { rating: 2, percent: "1%", count: 14 },
  { rating: 1, percent: "1%", count: 15 }
];

export default function ReviewsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedReviews = isMobile ? ALL_REVIEWS.slice(0, visibleCount) : ALL_REVIEWS;

  return (
    <div className="relative">
      <Breadcrumbs activeLabel="Reviews" />
      <div className="pt-4 pb-20 bg-cream min-h-screen">
      {/* Background Math watermarks */}
      <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            Diner Trust and Proof
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            Diner Reviews
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            We are incredibly proud to feature a 4.2★ Google rating computed from over 1,395+ verified local reviews. Read our circular community stories below.
          </p>
        </div>

        {/* Top Split: Detailed rating board */}
        <div className="bg-chalk rounded-3xl p-6 md:p-10 border border-espresso/10 shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="text-center shrink-0 w-full md:w-auto">
            <span className="font-display text-5xl md:text-7xl font-black text-espresso leading-none">4.2</span>
            <div className="flex justify-center text-gold my-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5.5 h-5.5 fill-current" />
              ))}
            </div>
            <span className="font-math text-xs text-espresso/60 uppercase tracking-widest block font-bold mt-1">
              Based on 1,395 Google reviews
            </span>
          </div>

          <div className="w-full flex-grow max-w-md">
            <h3 className="font-display font-bold text-espresso mb-4 text-left">
              Rating Breakdown (1,395 reviews)
            </h3>
            <div className="space-y-3 font-math text-xs">
              {RATINGS_BREAKDOWN.map((item) => (
                <div key={item.rating} className="flex items-center space-x-3.5">
                  <span className="w-3 text-right font-bold text-espresso">{item.rating}</span>
                  <Star className="w-3.5 h-3.5 text-[#D4A843] fill-current shrink-0" />
                  <div className="flex-1 h-2 bg-espresso/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: item.percent }}
                      className="h-full bg-gold rounded-full"
                    />
                  </div>
                  <span className="w-12 text-right text-espresso/60 font-semibold">{item.count} reviews</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3.5 shrink-0 w-full md:w-auto">
            <a
              href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-espresso text-cream font-bold text-xs px-6 py-3.5 rounded-full hover:bg-espresso/90 shadow-md text-center flex items-center justify-center space-x-2 cursor-target"
            >
              <span>Verify on Google Maps</span>
              <ExternalLink className="w-4 h-4 text-gold shrink-0" />
            </a>
            <a
              href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-espresso border border-espresso/35 font-bold text-xs px-6 py-3.5 rounded-full hover:bg-espresso hover:text-cream transition-all duration-300 text-center flex items-center justify-center space-x-2 cursor-target"
            >
              <MessageSquare className="w-4 h-4 text-terracotta shrink-0" />
              <span>Leave a Review</span>
            </a>
          </div>

        </div>

        {/* Counter active status banner: corrects old closed reviews */}
        <div className="mb-12 bg-espresso/5 border-l-4 border-l-terracotta border-y border-r border-espresso/10 p-5 rounded-2xl flex items-start space-x-3 text-left">
          <AlertCircle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display font-bold text-espresso text-sm">
              We are fully Open Daily until 11 PM!
            </h4>
            <p className="text-xs text-espresso/70 leading-relaxed font-body">
              One outdated internet map posting incorrectly lists us as closed. Rest assured, Two Pi R is <strong>100% open and active daily</strong>. Join us for coffee upstairs or beers downstairs! If in doubt, please call our floor desk directly at <strong>+91-97721-88999</strong>.
            </p>
          </div>
        </div>

        {/* Customer reviews grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* Mobile Load More Button */}
        {isMobile && visibleCount < ALL_REVIEWS.length && (
          <div className="mt-8 flex flex-col items-center space-y-4">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 3, ALL_REVIEWS.length))}
              className="w-full max-w-xs border border-espresso text-espresso font-bold py-3.5 rounded-xl text-center text-sm hover:bg-espresso hover:text-cream transition-colors cursor-target"
            >
              Load More Reviews
            </button>
            <a
              href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta text-xs font-bold hover:underline cursor-target"
            >
              Read All on Google →
            </a>
          </div>
        )}

      </div>
      </div>
      <RelatedContent excludePath="/reviews" />
    </div>
  );
}

// Subcomponent for Expanded Review Card
function ReviewCard({ review, index }: { review: typeof ALL_REVIEWS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = review.text.length > 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-chalk p-5 md:p-8 rounded-2xl md:rounded-3xl border border-espresso/10 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-target group hover:border-terracotta/40 max-md:mb-1"
    >
      <div>
        <div className="flex justify-between items-start mb-2.5 md:mb-3">
          <div className="flex text-gold space-x-0.5">
            {[...Array(review.stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-4.5 md:h-4.5 fill-current" />
            ))}
          </div>
          <span className="font-math text-[10px] text-espresso/40">
            {review.date}
          </span>
        </div>

        <p className="font-display text-base md:text-lg font-bold text-espresso leading-relaxed italic mb-4">
          &quot;{expanded ? review.text : (shouldClamp ? `${review.text.slice(0, 110)}...` : review.text)}&quot;
          {shouldClamp && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-terracotta text-xs font-bold ml-1.5 focus:outline-none inline cursor-target"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-espresso/5 mt-2">
        <div className="text-left">
          <h4 className="font-display text-sm font-extrabold text-espresso leading-tight">
            {review.name}
          </h4>
          {review.role.includes("Local Guide") ? (
            <span className="font-math text-[9px] uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full font-bold inline-block mt-1 shrink-0">
              Local Guide
            </span>
          ) : (
            <span className="font-math text-[9px] uppercase tracking-wider text-gold font-bold inline-block mt-1 shrink-0">
              {review.role}
            </span>
          )}
        </div>

        <div className="w-7 h-7 rounded-full bg-cream flex items-center justify-center border border-espresso/10 shrink-0">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
  );
}
