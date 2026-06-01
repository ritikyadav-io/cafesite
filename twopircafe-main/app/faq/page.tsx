"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

// Voice Search & AEO Optimized FAQs
const FAQS = [
  {
    q: "What is the best cafe in Vidyadhar Nagar Jaipur?",
    a: "Two Pi R (2πR) is widely regarded as the best cafe in Vidyadhar Nagar, Jaipur, featuring a 4.2★ Google rating with over 1,395+ verified reviews. Our customers praise our multi-cuisine menu, unique mathematical decor, cozy bookshelves, and basement bar."
  },
  {
    q: "Which cafes are open late night in Jaipur?",
    a: "Two Pi R Cafe in Vidyadhar Nagar is open until 11:00 PM every day of the week, making it one of the premier late-night dining and hangout options in north Jaipur. Perfect for late-night coffee, pizza cravings, or basement bar sessions."
  },
  {
    q: "Is there a cafe with a bar in Jaipur?",
    a: "Yes! Two Pi R (2πR) is a unique two-floor concept. The upper floor is a bright, cozy math-themed bookshelf cafe, while the basement houses an electric, premium bar serving chilled beers (starting at ₹190 for 600ml), craft cocktails, and premium spirits."
  },
  {
    q: "Does Two Pi R Cafe have private parking in Jaipur?",
    a: "Absolutely! Two Pi R Cafe is famous for having one of the largest and most spacious free private parking lots in Vidyadhar Nagar, Sikar Road area. Diners never have to worry about finding street parking."
  },
  {
    q: "What are the signature items at Two Pi R Cafe?",
    a: "We are highly famous for our mathematical food creations: the signature Nutella Frappe (coffee masterwork), molten Cheeze Burst Pizza, sweet cardamom toasted Buns, mathematical Sweet Fries, crispy golden Veg Spring Rolls, Honey Chilli Potato, and skewered Chicken Kebabs."
  },
  {
    q: "Is Two Pi R Cafe family-friendly and good for big groups?",
    a: "Yes, Two Pi R is family-friendly and LGBTQ+ friendly. We offer high chairs for toddlers and children. Our spacious layout can easily host gatherings of 15-20+ people on the upper floor, with customized catering available."
  },
  {
    q: "Where is Two Pi R Cafe located in Jaipur?",
    a: "We are located at: 40, Riddhi Siddhi Tower, Sector 5 Road, Sector 2, Vidyadhar Nagar, Jaipur, Rajasthan 302039. We are located near Sikar Road and Vidyadhar Nagar Sector 5 towers."
  },
  {
    q: "How can I book a table reservation at Two Pi R?",
    a: "You can book a table instantly through our interactive reservation form on this website under the 'Reserve' page, or by calling our floor host desk directly at +91-97721-88999."
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative">
      <Breadcrumbs activeLabel="FAQs" />
      <div className="pt-4 pb-20 bg-cream min-h-screen">
      {/* Background Math grids */}
      <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            Solving your queries
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Have questions about timings, basement bar features, legendary parking, or group booking equations? We have solved them all below.
          </p>
        </div>

        {/* Collapsible Accordion Grid panels */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-chalk rounded-2xl border border-espresso/10 shadow-sm overflow-hidden transition-all duration-300 hover:border-terracotta/30"
              >
                {/* Accordion header button trigger */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-target select-none"
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                    <h3 className="font-display text-base md:text-lg font-bold text-espresso">
                      {faq.q}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-cream border border-espresso/10 flex items-center justify-center text-espresso/60"
                  >
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-espresso/5 text-xs md:text-sm text-espresso/75 leading-relaxed font-body text-left pl-14">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call Host Banner */}
        <div className="mt-16 bg-chalk p-8 rounded-3xl border border-espresso/10 shadow-lg flex flex-col md:flex-row items-center justify-between text-left gap-6">
          <div className="space-y-1">
            <h4 className="font-display text-lg font-bold text-espresso">
              Still Have an Unsolved Equation?
            </h4>
            <p className="text-xs text-espresso/65 leading-relaxed font-body">
              Our front host desk is open daily and ready to help you coordinate parties, customized meals, or find Sikar Road directions.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <a
              href="tel:+919772188999"
              className="flex items-center space-x-2 bg-espresso text-cream font-bold text-xs px-5 py-3 rounded-full hover:bg-espresso/90 transition-colors cursor-target"
            >
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>Call +91-97721-88999</span>
            </a>
          </div>
        </div>

      </div>
      </div>
      <RelatedContent excludePath="/faq" />
    </div>
  );
}
