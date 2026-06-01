"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  activeLabel: string;
}

export default function Breadcrumbs({ activeLabel }: BreadcrumbsProps) {
  return (
    <div className="bg-cream">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-2 md:pb-4 flex items-center space-x-2 text-[13px] font-body text-[#7A9E7E] font-medium text-left">
        <Link href="/" className="hover:text-espresso transition-colors cursor-target">
          Home
        </Link>
        <span className="text-terracotta text-sm select-none font-extrabold">›</span>
        <span className="text-espresso/70 font-semibold">{activeLabel}</span>
      </nav>
    </div>
  );
}
