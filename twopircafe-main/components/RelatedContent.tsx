"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Coffee, Calendar, Image, MessageCircle } from "lucide-react";

interface RelatedContentProps {
  excludePath: string;
}

export default function RelatedContent({ excludePath }: RelatedContentProps) {
  const cards = [
    { href: "/menu", label: "Explore Our Menu", desc: "Discover Jaipur's gourmet flavor formulas.", icon: Coffee },
    { href: "/reserve", label: "Book a Table", desc: "Lock your space in our perfect circle.", icon: Calendar },
    { href: "/gallery", label: "See Gallery", desc: "Browse local math & bar photo aesthetics.", icon: Image },
    { href: "/reviews", label: "Read Reviews", desc: "Hear what 1,390+ verified foodies say.", icon: MessageCircle },
  ];

  // Filter out the current page and slice to 3 cards
  const filteredCards = cards.filter((card) => card.href !== excludePath).slice(0, 3);

  return (
    <section className="py-16 bg-[#FAFAF5] border-t border-espresso/5 text-left font-body relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-display text-2xl font-extrabold text-espresso mb-8">
          You Might Also Like
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-center justify-between p-5 bg-chalk rounded-2xl border border-espresso/10 hover:border-terracotta hover:shadow-lg transition-all duration-300 cursor-target"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center group-hover:bg-terracotta group-hover:text-chalk transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-espresso group-hover:text-terracotta transition-colors">
                      {card.label}
                    </h4>
                    <p className="text-[11px] text-espresso/60 mt-0.5 line-clamp-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-espresso/45 group-hover:text-terracotta group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-3" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
