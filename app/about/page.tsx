"use client";

import { motion } from "framer-motion";
import { Coffee, MapPin, Sparkles, BookOpen, Clock, Heart, Users } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

export default function AboutPage() {
  return (
    <div className="relative">
      <Breadcrumbs activeLabel="About Us" />
      <div className="pt-4 pb-20 bg-cream min-h-screen">
      {/* Background Math grid details */}
      <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            The Circumference of Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            About Two Pi R
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Established in 2017, Two Pi R (2πR) Cafe has become Sikar Road and Vidyadhar Nagar's legendary hangout, where ideas start and conversations never end.
          </p>
        </div>

        {/* Section 1: Inception of the Loop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 text-left space-y-5">
            <span className="font-math text-xs tracking-widest text-gold bg-espresso px-3 py-1 rounded-full uppercase font-bold">
              SINCE 2017
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-espresso leading-tight">
              Calculated Hospitality: <br />
              How the Circle Began
            </h2>
            <div className="w-12 h-1 bg-terracotta" />
            
            <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
              Named after mathematics' most elegant formula—the circumference of a circle—Two Pi R (2πR) was founded on the idea of creating a continuous gathering place. A perfect loop where Jaipur's IIT students, local guides, families, and bar hoppers could converge.
            </p>
            
            <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
              From our upstairs bookshelf cafe that opens at 11 AM to the electric energy of our basement bar in Sikar Road Jaipur, we balance the science of spices with high-aesthetic geometric design.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-espresso/15 h-80 md:h-[400px] cursor-image-hover relative">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600"
              alt="Two Pi R Cafe Interior Vidyadhar Nagar Jaipur"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </div>
        </div>

        {/* Section 2: Math Fused with Artistry (Wes Anderson meets Jaipur) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 order-1 lg:order-none rounded-3xl overflow-hidden shadow-xl border border-espresso/15 h-80 md:h-[400px] cursor-image-hover relative">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600"
              alt="Mathematical decor at 2piR Jaipur"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </div>

          <div className="lg:col-span-6 text-left space-y-5">
            <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
              Design Philosophy
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-espresso leading-tight">
              Wes Anderson <br />
              Meets IIT Jaipur
            </h2>
            <div className="w-12 h-1 bg-terracotta" />

            <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
              Our theme is quirky, precise, and visual, not academic. Pi symbols drift slowly upward as ambient art, math posters wrap around mahogany bookshelves, and symmetry guides every structural detail.
            </p>

            <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
              Upstairs offers warmth, coffee aromas, cardamom sweet buns, and cinnamon sweet fries. Downstairs unlocks in the evening with backlit bar displays, dim mood lighting, and chilled drafts from ₹190.
            </p>
          </div>
        </div>

        {/* Section 3: The 3 Core Equations */}
        <div className="bg-chalk rounded-3xl p-8 md:p-12 border border-espresso/10 shadow-lg text-left mb-16 relative">
          {/* Watermark symbol background inside board */}
          <div className="absolute top-6 right-6 font-math text-7xl text-espresso/2 pointer-events-none select-none">
            2πR
          </div>

          <h3 className="font-display text-2xl font-black text-espresso mb-8 border-b border-espresso/10 pb-3">
            Our Core Dining Equations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                <Coffee className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-display text-lg font-bold text-espresso">
                Equation of Flavor
              </h4>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Calculated spices, sourdough pizzas, rich Nutella frappes, and kebabs cooked to exact thermal limits for absolute diner bliss.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                <BookOpen className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-display text-lg font-bold text-espresso">
                Equation of Study
              </h4>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Silent cozy niches, high-speed WiFi, extensive books collections, and massive spacious parking slots for absolute peace of mind.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
                <Sparkles className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-display text-lg font-bold text-espresso">
                Equation of Night
              </h4>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                subterranean basement bar vaults, backlit displays, draft beers from ₹190, acoustic live music, and groups gatherings.
              </p>
            </div>

          </div>
        </div>

        {/* CTA to Reservation */}
        <div className="text-center">
          <Link
            href="/reserve"
            className="inline-flex items-center space-x-2 bg-terracotta text-chalk font-bold px-8 py-3.5 rounded-full hover:bg-terracotta/90 transition-all duration-300 shadow-md cursor-target"
          >
            <span>Book Your Circle Table Today</span>
            <Sparkles className="w-4 h-4 text-gold shrink-0 animate-pulse" />
          </Link>
        </div>

      </div>
      </div>
      <RelatedContent excludePath="/about" />
    </div>
  );
}
