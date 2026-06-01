"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Award, Gavel, Scale, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-cream min-h-screen">
      {/* Background Math grid details */}
      <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold font-math text-terracotta hover:text-espresso transition-colors cursor-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            The Circumference of Mutual Agreement
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-espresso mt-2 mb-4 leading-none">
            Terms of Service
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Last updated: May 26, 2026. These terms govern your engagement with Two Pi R (2πR) Cafe & Bar in Jaipur.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-chalk rounded-3xl p-8 md:p-12 border border-espresso/10 shadow-lg space-y-8 font-body text-espresso/90 text-sm leading-relaxed">
          
          <div className="flex items-start space-x-4 border-b border-espresso/5 pb-6">
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-espresso mb-1">Service Covenant</h2>
              <p className="text-xs text-espresso/70">
                By browsing twopircafe.in or making reservations at our Vidyadhar Nagar cafe or basement bar, you enter a mutual mathematical contract of respect, safety, and epicurean appreciation.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">1</span>
              <span>Reservation Rules (The Allocation Theorem)</span>
            </h3>
            <p>
              To ensure our table allocations behave precisely, we enforce simple reservation variables:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-espresso/80">
              <li><strong>Punctuality Constraint</strong>: Table reservations are held for exactly 15 minutes past the scheduled slots. Past this duration, the reservation is canceled and re-allocated.</li>
              <li><strong>Group Volume Check</strong>: Online reservations are allowed for up to 19 guests. For larger groups (20+), contact the host desk directly at +91-97721-88999.</li>
              <li><strong>Past Dates Ban</strong>: Booking queries for previous calendar dates are automatically blocked by the system's timezone-safe validation filters.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">2</span>
              <span>Subterranean Basement Bar Conduct</span>
            </h3>
            <p>
              Access to our low-ceiling, backlit basement bar requires absolute compliance with Indian alcohol serving statutes:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-espresso/80">
              <li><strong>Age Verification</strong>: Floor managers will perform random verification scans of physical ID credentials for alcohol servings.</li>
              <li><strong>Economic Pricing</strong>: Draft beers start at ₹190 (600ml bottle). Taxes and local state levies are computed strictly under standard restaurant billing variables.</li>
              <li><strong>Conduct Policy</strong>: We maintain a premium, warm, family-friendly atmosphere. Aggressive, unmathematical behavior will result in swift removal.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">3</span>
              <span>Online Orders & Zomato Linkages</span>
            </h3>
            <p>
              Online order delivery services are dispatched via third-party partners. 
              By clicking "Order Online" or "Add to Order", you are redirected directly to our verified Zomato restaurant order listing page. 
              Taxes, delivery times, and cancellation policies are governed under the standard guidelines of Zomato's portal.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">4</span>
              <span>Intellectual Property</span>
            </h3>
            <p>
              The digital experience, including our custom steaming cup SVG paths, custom circular cursor mechanics, original math posters, brand emblems, and regional culinary schemas, are the exclusive property of Two Pi R Foods. Reverse-engineering of these assets is prohibited.
            </p>
          </section>

          <div className="pt-6 border-t border-espresso/5 text-center text-xs text-espresso/50 font-math">
            © 2026 Two Pi R Foods. Governed under judicial frameworks of Jaipur, Rajasthan, India.
          </div>

        </div>

      </div>
    </div>
  );
}
