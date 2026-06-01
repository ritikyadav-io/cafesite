import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { blogData } from "@/data/blogData";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate high-performance SEO meta headers for Jaipur regional search organic indexes
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Two Pi R Cafe Jaipur",
    };
  }

  return {
    title: `${post.title} | Two Pi R Cafe Blog`,
    description: post.desc.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.desc,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
      images: [post.image],
    },
  };
}

// Static params generation for Next.js static site generation (SSG) in production
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogData.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="relative bg-cream min-h-screen">
      {/* Breadcrumbs for visual navigation */}
      <Breadcrumbs activeLabel={post.title} />

      {/* Main content body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold text-terracotta hover:underline mb-8 cursor-target group"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Meta Header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center space-x-4 text-xs font-math uppercase tracking-wider text-espresso/50">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-terracotta shrink-0" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-gold shrink-0" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-espresso leading-tight text-balance">
            {post.title}
          </h1>

          <div className="pt-3 border-t border-espresso/10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-espresso/5 flex items-center justify-center text-gold font-math font-bold text-xs border border-espresso/10">
              π
            </div>
            <span className="font-math text-xs text-espresso/60 uppercase tracking-widest font-bold">
              Written by {post.author}
            </span>
          </div>
        </header>

        {/* Feature Hero Cover Photo */}
        <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-espresso/15 mb-12 relative cursor-image-hover group">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
          />
        </div>

        {/* Long-form Article Content */}
        <article 
          className="font-body text-sm sm:text-base text-espresso/80 leading-relaxed text-left space-y-6 prose prose-espresso max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA block */}
        <div className="mt-16 pt-8 border-t border-espresso/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-display text-lg font-bold text-espresso flex items-center">
              <span>Experience Two Pi R Foods</span>
              <Sparkles className="w-4 h-4 text-gold ml-2 shrink-0 animate-pulse" />
            </h4>
            <p className="text-xs text-espresso/60 leading-relaxed font-body">
              Join us in Vidyadhar Nagar, Jaipur for fresh math-themed aesthetics and wood-fired selections.
            </p>
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <Link
              href="/menu"
              className="flex-1 sm:flex-none text-center bg-terracotta text-chalk text-xs font-bold px-6 py-3 rounded-full hover:bg-terracotta/90 transition-colors shadow-md cursor-target"
            >
              Explore Menu
            </Link>
            <Link
              href="/reserve"
              className="flex-1 sm:flex-none text-center bg-espresso text-cream text-xs font-bold px-6 py-3 rounded-full hover:bg-espresso/90 transition-colors shadow-md cursor-target"
            >
              Reserve a Table
            </Link>
          </div>
        </div>

      </div>

      {/* Recommended strip exclusions dynamic */}
      <RelatedContent excludePath="/blog" />
    </div>
  );
}
