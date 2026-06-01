"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { blogData } from "@/data/blogData";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

export default function BlogPage() {
  return (
    <div className="relative bg-cream min-h-screen">
      {/* Dynamic Breadcrumbs trail below Navbar */}
      <Breadcrumbs activeLabel="Blog" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>The 2πR Journal</span>
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            Articles & Updates
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Local news, culinary secrets behind our tandoori chicken kebabs and sweet fries, and calculations of lifestyle in Sikar Road north Jaipur.
          </p>
        </div>

        {/* Editorial responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogData.map((post, index) => (
            <motion.article
              key={post.slug}
              whileHover={{ y: -8 }}
              className="bg-chalk rounded-3xl overflow-hidden border border-espresso/10 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-target"
            >
              {/* Post cover photo */}
              <Link href={`/blog/${post.slug}`} className="relative h-56 overflow-hidden cursor-image-hover block">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                />
              </Link>

              {/* Post information details */}
              <div className="p-6 flex-grow flex flex-col justify-between text-left h-[260px]">
                <div>
                  {/* Meta row */}
                  <div className="flex items-center space-x-4 text-[10px] font-math uppercase tracking-wider text-espresso/50 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-terracotta shrink-0" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-espresso line-clamp-2 mb-2.5 hover:text-terracotta transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-espresso/70 leading-relaxed font-body line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                {/* Read Full Article trigger link */}
                <div className="pt-4 border-t border-espresso/5 flex items-center justify-between mt-auto">
                  <span className="font-math text-[10px] text-espresso/45 uppercase tracking-widest font-semibold flex items-center">
                    <User className="w-3 h-3 text-gold mr-1" />
                    <span>{post.author}</span>
                  </span>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-1 text-xs font-bold text-terracotta hover:underline cursor-target"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Recommended related content strip */}
      <RelatedContent excludePath="/blog" />
    </div>
  );
}
