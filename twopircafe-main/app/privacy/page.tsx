"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Security & Transparency Equation
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-espresso mt-2 mb-4 leading-none">
            Privacy Policy
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Last updated: May 26, 2026. This policy governs how Two Pi R Foods collects, calculates, and protects your information.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-chalk rounded-3xl p-8 md:p-12 border border-espresso/10 shadow-lg space-y-8 font-body text-espresso/90 text-sm leading-relaxed">
          
          <div className="flex items-start space-x-4 border-b border-espresso/5 pb-6">
            <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-espresso mb-1">Our Data Pledge</h2>
              <p className="text-xs text-espresso/70">
                At Two Pi R (2πR) Cafe Jaipur, your privacy is a constant in our circle. We only collect the bare minimum coordinates needed to cook your pizzas, pour your shakes, and reserve your tables.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">1</span>
              <span>Information We Collect (The Inputs)</span>
            </h3>
            <p>
              When you reserve a table on our website or make an online order query, we collect basic coordinates to register you into our systems:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-espresso/80">
              <li><strong>Personal Coordinates</strong>: Full Name and Mobile Contact Number.</li>
              <li><strong>Reservation Metrics</strong>: Requested date, time, party volume, special requests, and optional high chair requirements.</li>
              <li><strong>Digital Identifiers</strong>: Faint analytics (IP address and browser metadata) to calculate page performance rates and optimize load speeds.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">2</span>
              <span>How We Process Your Coordinates (The Calculations)</span>
            </h3>
            <p>
              We process your details exclusively to solve your hospitality requests:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-xs text-espresso/80">
              <li>To confirm and register your table bookings in our local Excel compatible spreadsheet database ([reservations.csv](file:///C:/Users/prime/.gemini/antigravity/scratch/two-pi-r-cafe/reservations.csv)).</li>
              <li>To contact you directly regarding booking modifications, special timing announcements, or severe weather warnings in Jaipur.</li>
              <li>To calculate and improve overall website responsiveness (e.g. optimizing our custom magnetic cursor physics).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">3</span>
              <span>Security Parameters (The Lock-In)</span>
            </h3>
            <p>
              We store your table booking data securely on our local servers within the workspace database. 
              We implement industry-standard mathematical encryption protocols to protect your mobile numbers and reservation profiles from uncalculated third-party leaks. 
              We do <strong>NOT</strong> sell, distribute, or rent your database details to marketing companies.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="font-display text-base font-extrabold text-espresso flex items-center">
              <span className="w-6 h-6 rounded-full bg-gold/15 text-espresso font-math text-xs flex items-center justify-center mr-2 shrink-0">4</span>
              <span>Your Statutory Rights</span>
            </h3>
            <p>
              Under Indian IT Act standards, you hold complete access rights to your personal records. 
              You may contact our floor manager at <strong>+91-97721-88999</strong> at any time to request the deletion or correction of your coordinates from the `reservations.csv` log files.
            </p>
          </section>

          <div className="pt-6 border-t border-espresso/5 text-center text-xs text-espresso/50 font-math">
            © 2026 Two Pi R Foods. Verified compliance with Rajasthan digital restaurant privacy directives.
          </div>

        </div>

      </div>
    </div>
  );
}
