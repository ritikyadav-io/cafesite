"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  MapPin, Star, Sparkles, Navigation, Check, 
  ChevronUp, Calendar, Clock, Users, Coffee, HelpCircle, 
  Heart, MessageCircle, ArrowUpRight, ExternalLink, Phone
} from "lucide-react";
import MenuSection from "@/components/MenuSection";
import { useCart } from "@/context/CartContext";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export default function Home() {
  const { setCartOpen } = useCart();
  const [scrollY, setScrollY] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Form states
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("19:00");
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Validation & Toast states
  const [bookingNameError, setBookingNameError] = useState("");
  const [bookingPhoneError, setBookingPhoneError] = useState("");
  const [bookingDateError, setBookingDateError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setMinDate(new Date().toLocaleDateString('en-CA'));

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    // Animate Rating count counters
    const ratingInterval = setInterval(() => {
      setRatingsCount((prev) => {
        if (prev >= 4.2) {
          clearInterval(ratingInterval);
          return 4.2;
        }
        return parseFloat((prev + 0.1).toFixed(1));
      });
    }, 40);

    const reviewsInterval = setInterval(() => {
      setReviewsCount((prev) => {
        if (prev >= 1395) {
          clearInterval(reviewsInterval);
          return 1395;
        }
        return prev + 35;
      });
    }, 30);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(ratingInterval);
      clearInterval(reviewsInterval);
    };
  }, []);

  const validateBookingForm = () => {
    let isValid = true;

    if (bookingName.trim().length < 2) {
      setBookingNameError("Name must be at least 2 characters");
      isValid = false;
    } else {
      setBookingNameError("");
    }

    const cleanPhone = bookingPhone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setBookingPhoneError("Must be a valid 10-digit Indian mobile number (starts with 6-9)");
      isValid = false;
    } else {
      setBookingPhoneError("");
    }

    if (!bookingDate) {
      setBookingDateError("Please select a date");
      isValid = false;
    } else {
      const selected = new Date(bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setBookingDateError("Date cannot be in the past");
        isValid = false;
      } else {
        setBookingDateError("");
      }
    }

    return isValid;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBookingForm()) {
      return;
    }

    if (partySize > 20) {
      alert("For groups larger than 20 people, please call us directly: +91 97721 88999");
      return;
    }

    // Trigger toast notification
    setToastMessage("Redirecting to WhatsApp to confirm your reservation ✅");
    setTimeout(() => setToastMessage(""), 4000);

    // 1. Post details to local reservations spreadsheet (CSV)
    try {
      await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          phone: bookingPhone,
          date: bookingDate,
          time: bookingTime,
          guests: partySize,
          occasion: "casual",
          requests: specialRequests,
        }),
      });
    } catch (err) {
      console.error("Local CSV booking logging failed:", err);
    }

    // 2. Format WhatsApp reservation message
    const formattedDate = new Date(bookingDate).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const cleanPhone = bookingPhone.replace(/\D/g, "");
    const msg = `🪑 *TABLE RESERVATION REQUEST — Two Pi R Cafe*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${bookingName.trim()}
📞 *Phone:* +91 ${cleanPhone}
📅 *Date:* ${formattedDate}
⏰ *Time:* ${bookingTime}
👥 *Party Size:* ${partySize} ${partySize > 1 ? "people" : "person"}
🎉 *Occasion:* Casual Hangout (Homepage)
🗒️ *Special Requests:* ${specialRequests.trim() || "None"}
━━━━━━━━━━━━━━━━━━━━
_Reservation request sent via twopircafe.in_
_Please confirm availability on WhatsApp._`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/919772188999?text=${encodedMsg}`;

    // Pop Confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#C4622D", "#D4A843", "#F5EDD6", "#2C1810"]
    });

    // 3. Open WhatsApp in new tab
    window.open(waUrl, "_blank");

    // 4. Change form to success state screen
    setBookingSuccess(true);
  };

  const handlePartyStep = (amount: number) => {
    setPartySize((prev) => Math.max(1, Math.min(25, prev + amount)));
  };

  // Back to Top trigger
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollY / (typeof document !== 'undefined' ? (document.documentElement.scrollHeight - window.innerHeight) : 1) }}
        className="fixed top-0 left-0 right-0 h-1 bg-terracotta origin-left z-50 pointer-events-none"
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-espresso text-cream border border-gold/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-bold font-display"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. MOBILE HERO SECTION — ZOMATO RESTAURANT STYLE */}
      <div className="md:hidden p-0 pt-[72px] bg-transparent">
        <div className="bg-white border-b border-espresso/10">
          {/* Cover image card */}
          <div className="w-full h-[135px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600"
              alt="Two Pi R Cafe Jaipur Cover"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 bg-[#2C1810]/70 text-[#F5EDD6] text-[10px] font-math font-bold px-2 py-0.5 rounded-full">
              📍 Vidyadhar Nagar
            </div>
          </div>

          {/* Info card section */}
          <div className="px-4 py-3.5 flex flex-col space-y-2.5 bg-white text-left">
            <div>
              <div className="text-xs font-bold text-terracotta uppercase font-math tracking-wider mb-0.5">
                कैफे टू पाई आर
              </div>
              <h1 className="font-display text-2xl font-black text-espresso leading-tight">
                Two Pi R (2πR) Cafe
              </h1>
              
              {/* Rating row */}
              <div className="flex items-center space-x-2 mt-1.5 font-body text-xs text-espresso/60 flex-wrap">
                <span className="bg-gold text-espresso font-bold px-2 py-0.5 rounded text-[11px] flex items-center shrink-0">
                  ⭐ 4.2
                </span>
                <span>·</span>
                <span>1,395 Google reviews</span>
                <span>·</span>
                <span className="font-semibold text-espresso">₹200–₹1,000</span>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-1.5 mt-2.5 font-body text-xs text-sage font-medium">
                <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                <span>40, Riddhi Siddhi Tower, Sector 5 Rd, Vidyadhar Nagar, Jaipur</span>
              </div>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex items-center space-x-2 py-0.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
              <a
                href="tel:+919772188999"
                className="flex items-center space-x-1 border border-espresso/10 rounded-full py-1.5 px-3 text-[11px] font-bold text-espresso cursor-target shrink-0 bg-chalk/30 hover:bg-espresso hover:text-[#F5EDD6] transition-colors"
              >
                <Phone className="w-3 h-3 text-terracotta shrink-0" />
                <span>Call Cafe</span>
              </a>
              <a
                href="https://wa.me/919772188999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 border border-espresso/10 rounded-full py-1.5 px-3 text-[11px] font-bold text-espresso cursor-target shrink-0 bg-chalk/30 hover:bg-espresso hover:text-[#F5EDD6] transition-colors"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366] shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 border border-espresso/10 rounded-full py-1.5 px-3 text-[11px] font-bold text-espresso cursor-target shrink-0 bg-chalk/30 hover:bg-espresso hover:text-[#F5EDD6] transition-colors"
              >
                <Navigation className="w-3 h-3 text-terracotta shrink-0" />
                <span>Directions</span>
              </a>
            </div>

            {/* Core CTAs */}
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setCartOpen(true)}
                className="flex-1 bg-terracotta hover:bg-terracotta/90 text-chalk font-bold py-3 rounded-xl text-center text-[13px] shadow-md transition-colors cursor-target"
              >
                Order on WhatsApp
              </button>
              <Link
                href="#reserve"
                className="flex-1 border border-espresso text-espresso font-bold py-3 rounded-xl text-center text-[13px] hover:bg-espresso hover:text-cream transition-colors cursor-target"
              >
                Book Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 1. DESKTOP HERO SECTION — IMMERSIVE SPLIT SCREEN */}
      <section className="hidden md:flex min-h-screen relative flex-col justify-center overflow-hidden pt-20">
        {/* Math Grid overlay watermark */}
        <div className="absolute inset-0 opacity-15 pointer-events-none math-grid" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* LEFT SIDE: Stunning Animated Coffee Cup & Floating Math Symbols */}
          <div className="w-full lg:w-[55%] flex justify-center order-1 lg:order-none relative h-[380px] md:h-[480px]">
            {/* Fairy bokeh light circles */}
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-gold/10 blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-36 h-36 rounded-full bg-terracotta/10 blur-2xl animate-pulse" />

            {/* Steaming Coffee Cup Widget */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center bg-chalk/20 backdrop-blur-sm border border-espresso/10 rounded-full shadow-2xl">
              
              {/* Glowing Ambient Outer circle */}
              <div className="absolute inset-4 rounded-full border border-dashed border-espresso/15 animate-[spin_100s_linear_infinite]" />

              {/* Animated Floating Math Symbols */}
              <motion.div
                animate={{ y: [0, -140, 0], x: [0, -20, 20, 0], opacity: [0, 0.7, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute font-math text-3xl font-extrabold text-gold select-none pointer-events-none"
                style={{ top: "35%", left: "45%" }}
              >
                π
              </motion.div>
              <motion.div
                animate={{ y: [0, -170, 0], x: [0, 30, -30, 0], opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 6.5, delay: 1, ease: "easeInOut" }}
                className="absolute font-math text-2xl font-bold text-terracotta select-none pointer-events-none"
                style={{ top: "30%", left: "55%" }}
              >
                ∑
              </motion.div>
              <motion.div
                animate={{ y: [0, -120, 0], x: [0, -30, 15, 0], opacity: [0, 0.6, 0] }}
                transition={{ repeat: Infinity, duration: 7.2, delay: 2, ease: "easeInOut" }}
                className="absolute font-math text-xl font-bold text-sage select-none pointer-events-none"
                style={{ top: "40%", left: "35%" }}
              >
                √
              </motion.div>
              <motion.div
                animate={{ y: [0, -150, 0], x: [0, 20, -10, 0], opacity: [0, 0.75, 0] }}
                transition={{ repeat: Infinity, duration: 9, delay: 3.5, ease: "easeInOut" }}
                className="absolute font-math text-2xl text-gold select-none pointer-events-none"
                style={{ top: "35%", left: "50%" }}
              >
                ∞
              </motion.div>

              {/* Coffee Cup Visual */}
              <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
                {/* SVG Sine Wave Steam rising */}
                <div className="absolute top-[-30px] md:top-[-45px] left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <svg className="w-4 h-16 text-espresso/25" viewBox="0 0 20 100">
                    <motion.path
                      d="M 10 100 Q 0 75 10 50 T 10 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{ d: ["M 10 100 Q 20 75 10 50 T 10 0", "M 10 100 Q 0 75 10 50 T 10 0"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </svg>
                  <svg className="w-4 h-20 text-espresso/15" viewBox="0 0 20 100">
                    <motion.path
                      d="M 10 100 Q 0 75 10 50 T 10 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ d: ["M 10 100 Q 0 75 10 50 T 10 0", "M 10 100 Q 20 75 10 50 T 10 0"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                    />
                  </svg>
                  <svg className="w-4 h-16 text-espresso/25" viewBox="0 0 20 100">
                    <motion.path
                      d="M 10 100 Q 20 75 10 50 T 10 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{ d: ["M 10 100 Q 20 75 10 50 T 10 0", "M 10 100 Q 0 75 10 50 T 10 0"] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                    />
                  </svg>
                </div>

                {/* Cup Body (SVG & CSS 3D shadows) */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-espresso to-ink border-4 border-gold shadow-2xl flex flex-col items-center justify-center">
                  
                  {/* Glowing 2πR engraved on the cup */}
                  <span className="font-display text-2xl md:text-3xl font-extrabold text-[#FAFAF5] tracking-tight drop-shadow-[0_0_12px_rgba(212,168,67,0.7)] animate-pulse">
                    2<span className="text-gold">π</span>R
                  </span>
                  <span className="font-math text-[9px] uppercase tracking-widest text-[#FAFAF5]/50 mt-1">
                    Jaipur's Formula
                  </span>

                  {/* Cup handle (3D arc) */}
                  <div className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 w-10 h-20 rounded-r-full border-r-8 border-y-8 border-gold bg-transparent z-[-1]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Immersive Copy & Action Buttons */}
          <div className="w-full lg:w-[45%] flex flex-col text-left space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="font-math text-xs font-bold tracking-widest text-gold bg-espresso px-3.5 py-1.5 rounded-full uppercase shadow-md">
                📍 Vidyadhar Nagar, Jaipur
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-espresso leading-[1.05] tracking-tight text-balance">
              Where Every <br />
              <span className="text-terracotta relative">
                Sip Solves
                <span className="absolute bottom-1 left-0 w-full h-2 bg-gold/30 rounded-full z-[-1]" />
              </span> <br />
              Something.
            </h1>

            <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
              Welcome to Jaipur's beloved math-meets-bohemian cafe and subterranean bar. Combining geometric precision, sweet toasted buns, legendary spacious parking, and cozy bookshelves in a perfect sensory loop.
            </p>

            {/* Ratings counter badge */}
            <div className="flex items-center space-x-6 py-2 border-y border-espresso/10">
              <div className="flex flex-col">
                <span className="font-display text-4xl font-extrabold text-espresso flex items-center">
                  {ratingsCount.toFixed(1)} <Star className="w-6 h-6 text-gold fill-current ml-1 shrink-0" />
                </span>
                <span className="font-math text-[10px] text-espresso/60 uppercase tracking-widest font-bold mt-0.5">
                  Google Rating
                </span>
              </div>
              <div className="w-px h-10 bg-espresso/20" />
              <div className="flex flex-col">
                <span className="font-display text-4xl font-extrabold text-espresso">
                  {reviewsCount.toLocaleString()}+
                </span>
                <span className="font-math text-[10px] text-espresso/60 uppercase tracking-widest font-bold mt-0.5">
                  Verified Reviews
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="#menu"
                className="w-full sm:w-auto bg-terracotta text-chalk font-bold px-8 py-3.5 rounded-full hover:bg-terracotta/90 transition-all duration-300 shadow-md hover:shadow-lg text-center transform hover:-translate-y-0.5 cursor-target"
              >
                Explore Menu
              </Link>
              <a
                href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-espresso border border-espresso/35 font-bold px-8 py-3.5 rounded-full hover:bg-espresso hover:text-cream transition-all duration-300 text-center flex items-center justify-center space-x-2 cursor-target"
              >
                <Navigation className="w-4 h-4 shrink-0 text-terracotta" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Bobbing Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="pt-6 hidden lg:flex items-center space-x-2 text-xs font-math text-espresso/50 font-semibold"
            >
              <span className="w-5 h-5 rounded-full bg-espresso/5 border border-espresso/15 flex items-center justify-center text-gold font-bold">
                π
              </span>
              <span>Scroll to solve the equation</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. QUICK INFO BAR — RESPONSIVE */}
      {/* Mobile static grid: 2 cols x 4 rows */}
      <section className="md:hidden bg-espresso text-cream py-4 px-4 border-y border-gold/15">
        <div className="grid grid-cols-2 gap-2 text-[12px] font-math font-bold tracking-tight uppercase">
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>⏰</span> <span className="text-[#F5EDD6]">Open Till 11 PM</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>🅿️</span> <span className="text-[#F5EDD6]">Free Parking</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>🍺</span> <span className="text-[#F5EDD6]">Bar on Site</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>💳</span> <span className="text-[#F5EDD6]">UPI & Cards</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>🎵</span> <span className="text-[#F5EDD6]">Live Music</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>🌿</span> <span className="text-[#F5EDD6]">Veg + Non-Veg</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>👨‍👩‍👧</span> <span className="text-[#F5EDD6]">Family Friendly</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#2C1810] border border-gold/10 h-9 rounded-full px-3 justify-center shrink-0">
            <span>🏳️‍🌈</span> <span className="text-[#F5EDD6]">LGBTQ+ Friendly</span>
          </div>
        </div>
      </section>

      {/* Desktop scrolling ticker */}
      <section className="hidden md:block bg-espresso text-cream py-4 relative overflow-hidden z-25 border-y border-gold/15">
        <div className="flex animate-scroll-ticker whitespace-nowrap space-x-8 text-xs font-math font-bold tracking-widest uppercase">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center space-x-8 shrink-0">
              <span className="flex items-center space-x-1">
                <span className="text-gold">⏰</span> <span>Open Daily Until 11 PM</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">🅿️</span> <span>Legendary Free Parking</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">🍺</span> <span>Basement Bar on Site</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">📞</span> <span>+91 97721 88999</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">🌿</span> <span>Veg & Non-Veg Multi-cuisine</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">🎵</span> <span>Live Music Sessions</span>
              </span>
              <span className="text-gold/30">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-gold">💳</span> <span>All Payment Cards Accepted</span>
              </span>
              <span className="text-gold/30">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT / STORY SECTION — EDITORIAL MAGAZINE LAYOUT */}
      <section id="about" className="py-24 bg-cream relative overflow-hidden">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* COLUMN 1: Editorial Text Description */}
            <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
              <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
                Jaipur's Math-Themed Cafe
              </span>
              <h2 className="font-display text-2xl md:text-5xl font-black text-espresso leading-tight">
                A Cafe Built Around <br />
                a Beautiful Equation
              </h2>
              <div className="w-12 h-1 bg-terracotta" />

              <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
                In a neighborhood that needed a gathering place, Two Pi R (2πR) was born. Named after mathematics' most elegant formula — the circumference of a circle — this cafe in Vidyadhar Nagar became Jaipur's favorite spot where ideas, flavors, and people converge in a perfect loop.
              </p>
              
              <p className="text-sm md:text-base text-espresso/80 leading-relaxed font-body">
                Two floors of carefully crafted space: a warm, bookshelf-lined cafe floor upstairs and a vibrant bar in the basement. Mathematical posters on the walls. Sweet fries and sweet buns you won't find anywhere else. Chilli paneer and chicken kebabs that regulars can't stop talking about. And a parking lot so spacious, it's legendary in its own right.
              </p>

              <p className="text-sm md:text-base text-espresso/90 font-bold leading-relaxed font-body italic">
                This isn't just a cafe. It's the center of your circle.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 font-display font-bold text-terracotta hover:text-espresso transition-colors group cursor-target"
                >
                  <span>Our Full Story</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>

            {/* COLUMN 2: 3-Photo Overlapping Collage Grid */}
            <div className="lg:col-span-6 flex justify-center relative h-[280px] md:h-[450px]">
              
              {/* Polaroid 1: The Reading Corner (Bookshelf + fairy lights) */}
              <div className="absolute top-0 left-4 md:left-12 z-20 transform -rotate-6">
                <div className="polaroid w-36 md:w-56">
                  <div className="h-32 md:h-40 overflow-hidden rounded-md bg-espresso/5">
                    <img
                      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop"
                      alt="Cozy reading corner bookshelf at Two Pi R Jaipur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-display text-xs text-espresso text-center mt-3 tracking-wide italic font-bold">
                    "The Reading Corner"
                  </p>
                </div>
              </div>

              {/* Polaroid 2: Formula for Flavor (Food layout) */}
              <div className="absolute bottom-2 right-4 md:right-12 z-25 transform rotate-3">
                <div className="polaroid w-36 md:w-56">
                  <div className="h-32 md:h-40 overflow-hidden rounded-md bg-espresso/5">
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop"
                      alt="Pizza and coffee at Two Pi R Vidyadhar Nagar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-display text-xs text-espresso text-center mt-3 tracking-wide italic font-bold">
                    "Formula for Flavor"
                  </p>
                </div>
              </div>

              {/* Polaroid 3: Made with love in Jaipur (Interior math poster) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 -rotate-2">
                <div className="polaroid w-32 md:w-48 bg-chalk border border-espresso/5 opacity-90">
                  <div className="h-28 md:h-32 overflow-hidden rounded-md bg-espresso/5">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop"
                      alt="Mathematical decorations at Two Pi R Cafe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-display text-xs text-espresso text-center mt-2.5 tracking-wide italic font-bold">
                    "Made with ❤️ in Jaipur"
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. DYNAMIC MENU SECTION */}
      <MenuSection />

      {/* 5. EXPERIENCE & FEATURES SECTION — '2πR = THE COMPLETE PACKAGE' */}
      <section className="py-24 bg-cream relative overflow-hidden">
        {/* Background Dot matrix watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none dot-grid" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
              Everything You Need in One Beautiful Equation
            </span>
            <h2 className="font-display text-2xl md:text-5xl font-black text-espresso mt-2 mb-4">
              2πR = The Complete Experience
            </h2>
            <div className="w-24 h-1 bg-espresso mx-auto" />
          </div>

          {/* Cards 3-column responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <Coffee className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Two Floors of Vibes
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Bright, sunny cafe upstairs lined with bookshelves and natural window lighting. Electric, dim-lit high energy bar scene downstairs. Pick your equation.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Legendary Ample Parking
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Jaipur's most talked-about, massive secure free parking lot right in Vidyadhar Nagar. Seriously — our customers write essays about it in reviews!
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <Users className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Curated Reading Corner
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Cozy bookshelf-lined seating niches and warm wood desks. Bring your laptop, grab an iced latte, and stay as long as your equations need solving.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Bar in the Basement
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Beer starting at ₹190 (600ml), craft cocktails, and curated wines. The basement locks into night bar vibes with backlit displays and glowing design.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Live Music & Soundtracks
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Acoustic guitar evenings, local performance panels, and beautiful live music sessions. Because math simply sounds better with a high-end soundtrack.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-chalk p-5 md:p-8 rounded-2xl border-l-4 border-l-terracotta border-y border-r border-espresso/10 shadow-md transition-shadow hover:shadow-xl flex flex-col items-start text-left cursor-target group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6 border border-gold/10 group-hover:bg-gold group-hover:text-espresso transition-colors duration-300">
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-espresso mb-2 md:mb-3">
                Veg + Non-Veg Diversity
              </h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                A completely verified multi-cuisine spread. Something to fit every single palate in Jaipur — Indian, Chinese, rolls, thin crust pizzas, and pastas.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF CAROUSEL SECTION */}
      <ReviewsCarousel />

      {/* 7. STATS / NUMBERS SECTION — DARK ESPRESSO */}
      <section className="bg-espresso text-cream py-10 md:py-16 relative overflow-hidden border-y border-gold/15">
        <div className="absolute inset-0 opacity-5 pointer-events-none math-grid" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Mobile Layout: 2x2 grid */}
          <div className="grid grid-cols-2 md:hidden border border-gold/10 divide-x divide-y divide-gold/10">
            <div className="flex flex-col items-center text-center p-6">
              <span className="font-display text-3xl font-black text-gold">7+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-1 font-bold">
                Years of Heritage
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-6 border-t-0">
              <span className="font-display text-3xl font-black text-gold">1,395+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-1 font-bold">
                Google Reviews
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <span className="font-display text-3xl font-black text-gold">2</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-1 font-bold">
                Floors (Cafe & Bar)
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <span className="font-display text-3xl font-black text-gold">₹200+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-1 font-bold">
                Starts From
              </span>
            </div>
          </div>

          {/* Desktop Layout: 4 columns inline */}
          <div className="hidden md:grid grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-5xl md:text-6xl font-black text-gold">7+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-2 font-bold">
                Years of Heritage
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-5xl md:text-6xl font-black text-gold">1,395+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-2 font-bold">
                Google Reviews
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-5xl md:text-6xl font-black text-gold">2</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-2 font-bold">
                Floors (Cafe + Bar)
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-5xl md:text-6xl font-black text-gold">₹200+</span>
              <span className="font-math text-[10px] uppercase tracking-widest text-cream/70 mt-2 font-bold">
                Starts From
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. RESERVATION & LOCATION SECTION — DETAILED CONTACT MAP */}
      <section id="reserve" className="py-12 md:py-24 bg-chalk relative overflow-hidden">
        {/* Background circle outline */}
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full border border-espresso/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
              Reserve Your Table
            </span>
            <h2 className="font-display text-2xl md:text-5xl font-black text-espresso mt-2 mb-4 leading-tight">
              Book Your Circle
            </h2>
            <p className="text-xs md:text-base text-espresso/70 leading-relaxed font-body">
              Walk-ins are always welcome. Table reservations are highly recommended for large groups and weekend timings.
            </p>
          </div>

          {/* Mobile Contact Quick Actions: 3 columns */}
          <div className="grid grid-cols-3 gap-2 md:hidden mb-6 text-center">
            <a
              href="tel:+919772188999"
              className="flex flex-col items-center justify-center bg-cream border border-espresso/10 rounded-2xl h-[72px] cursor-target hover:border-terracotta transition-colors"
            >
              <Phone className="w-5 h-5 text-terracotta mb-1 shrink-0" />
              <span className="font-display font-semibold text-[11px] text-espresso leading-none">Call</span>
              <span className="font-math text-[9px] text-espresso/50 mt-0.5">+91 97721</span>
            </a>
            <a
              href="https://wa.me/919772188999?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Two%20Pi%20R%20Cafe!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-cream border border-espresso/10 rounded-2xl h-[72px] cursor-target hover:border-[#25D366] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] mb-1 shrink-0" />
              <span className="font-display font-semibold text-[11px] text-espresso leading-none">WhatsApp</span>
              <span className="font-math text-[9px] text-espresso/50 mt-0.5">Chat</span>
            </a>
            <a
              href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-cream border border-espresso/10 rounded-2xl h-[72px] cursor-target hover:border-terracotta transition-colors"
            >
              <MapPin className="w-5 h-5 text-terracotta mb-1 shrink-0" />
              <span className="font-display font-semibold text-[11px] text-espresso leading-none">Maps</span>
              <span className="font-math text-[9px] text-espresso/50 mt-0.5">Directions</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT SIDE: Interactive Booking Form */}
            <div className="lg:col-span-7 bg-cream p-5 md:p-8 rounded-3xl border border-espresso/10 shadow-lg flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.form 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit} 
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => {
                            setBookingName(e.target.value);
                            if (e.target.value.trim().length >= 2) setBookingNameError("");
                          }}
                          placeholder="e.g. Rahul Sharma"
                          className={`px-4 py-3 rounded-xl border ${
                            bookingNameError ? "border-red-500" : "border-espresso/15"
                          } bg-chalk text-espresso text-base md:text-sm max-md:h-12 focus:outline-none focus:border-terracotta w-full`}
                        />
                        {bookingNameError && (
                          <span className="text-[10px] text-red-600 font-bold mt-1">
                            {bookingNameError}
                          </span>
                        )}
                      </div>
                      
                      {/* Phone */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingPhone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            if (val.length <= 10) {
                              setBookingPhone(val);
                              if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
                                setBookingPhoneError("Must be a valid 10-digit Indian number starting with 6-9");
                              } else {
                                setBookingPhoneError("");
                              }
                            }
                          }}
                          placeholder="98765 43210"
                          className={`px-4 py-3 rounded-xl border ${
                            bookingPhoneError ? "border-red-500" : "border-espresso/15"
                          } bg-chalk text-espresso text-base md:text-sm max-md:h-12 focus:outline-none focus:border-terracotta w-full`}
                        />
                        {bookingPhoneError ? (
                          <span className="text-[10px] text-red-600 font-bold mt-1">
                            {bookingPhoneError}
                          </span>
                        ) : (
                          <span className="text-[9px] text-espresso/45 mt-1">Valid 10-digit Indian mobile starting 6-9</span>
                        )}
                      </div>
                    </div>

                    {/* Responsive Date & Time Stack */}
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
                      <div className="flex max-md:space-x-2 max-md:w-full md:col-span-2 md:grid md:grid-cols-2 md:gap-5">
                        {/* Date */}
                        <div className="flex flex-col space-y-1.5 flex-1 max-md:w-1/2">
                          <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center">
                            <Calendar className="w-3.5 h-3.5 text-terracotta mr-1" />
                            <span>Select Date *</span>
                          </label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            min={minDate}
                            onChange={(e) => {
                              setBookingDate(e.target.value);
                              if (e.target.value) setBookingDateError("");
                            }}
                            className={`px-4 py-3 rounded-xl border ${
                              bookingDateError ? "border-red-500" : "border-espresso/15"
                            } bg-chalk text-espresso text-base md:text-sm max-md:h-12 focus:outline-none focus:border-terracotta w-full`}
                          />
                          {bookingDateError && (
                            <span className="text-[10px] text-red-600 font-bold mt-1">
                              {bookingDateError}
                            </span>
                          )}
                        </div>

                        {/* Time */}
                        <div className="flex flex-col space-y-1.5 flex-1 max-md:w-1/2">
                          <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center">
                            <Clock className="w-3.5 h-3.5 text-terracotta mr-1" />
                            <span>Select Time *</span>
                          </label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-espresso/15 bg-chalk text-espresso text-base md:text-sm max-md:h-12 focus:outline-none focus:border-terracotta cursor-target w-full"
                          >
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">01:00 PM</option>
                            <option value="13:30">01:30 PM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="14:30">02:30 PM</option>
                            <option value="15:00">03:00 PM</option>
                            <option value="15:30">03:30 PM</option>
                            <option value="16:00">04:00 PM</option>
                            <option value="16:30">04:30 PM</option>
                            <option value="17:00">05:00 PM</option>
                            <option value="17:30">05:30 PM</option>
                            <option value="18:00">06:00 PM</option>
                            <option value="18:30">06:30 PM</option>
                            <option value="19:00">07:00 PM</option>
                            <option value="19:30">07:30 PM</option>
                            <option value="20:00">08:00 PM</option>
                            <option value="20:30">08:30 PM</option>
                            <option value="21:00">09:00 PM</option>
                            <option value="21:30">09:30 PM</option>
                            <option value="22:00">10:00 PM</option>
                            <option value="22:30">10:30 PM</option>
                          </select>
                        </div>
                      </div>

                      {/* Party Size Stepper */}
                      <div className="flex flex-col space-y-1.5 w-full md:col-span-1 max-md:items-center max-md:text-center">
                        <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center max-md:justify-center">
                          <Users className="w-3.5 h-3.5 text-terracotta mr-1" />
                          <span>Party Size</span>
                        </label>
                        <div className="flex items-center justify-between border border-espresso/15 bg-chalk rounded-xl px-2 py-1.5 h-12 w-full max-w-[280px] md:max-w-none">
                          <button
                            type="button"
                            onClick={() => handlePartyStep(-1)}
                            className="w-8 h-8 rounded-lg hover:bg-espresso/5 font-bold text-espresso text-lg flex items-center justify-center cursor-target"
                          >
                            -
                          </button>
                          <span className="font-math font-bold text-espresso text-sm">
                            {partySize} {partySize > 1 ? "Guests" : "Guest"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handlePartyStep(1)}
                            className="w-8 h-8 rounded-lg hover:bg-espresso/5 font-bold text-espresso text-lg flex items-center justify-center cursor-target"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Special requests */}
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                          Special Requests & Occasion
                        </label>
                        <span className="text-[10px] text-espresso/45 font-math">
                          {specialRequests.length}/200 chars
                        </span>
                      </div>
                      <textarea
                        value={specialRequests}
                        maxLength={200}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Celebrating a birthday / Request table near bookshelf..."
                        className="px-4 py-3 rounded-xl border border-espresso/15 bg-chalk text-espresso text-base md:text-sm focus:outline-none focus:border-terracotta w-full h-[80px] min-h-[80px] max-h-[100px]"
                      />
                    </div>

                    {/* Stepper helper messages */}
                    {partySize > 20 && (
                      <div className="bg-espresso/5 border border-espresso/10 p-3 rounded-xl text-xs text-espresso leading-relaxed">
                        ⚠️ <strong>Note:</strong> For groups of 20+ guests, we recommend contacting our desk directly at <strong>+91 97721 88999</strong> to arrange customized catering models.
                      </div>
                    )}

                    {/* Confirm CTA */}
                    <button
                      type="submit"
                      className="w-full bg-terracotta text-chalk font-bold h-[52px] flex items-center justify-center rounded-xl hover:bg-terracotta/90 transition-all duration-300 shadow-md text-base md:text-sm cursor-target"
                    >
                      Confirm Table Booking
                    </button>

                    <div className="text-center font-math text-[10px] text-espresso/45">
                      Or dial directly: <a href="tel:+919772188999" className="underline font-bold text-espresso hover:text-terracotta">+91-97721-88999</a>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6"
                  >
                    <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center animate-bounce">
                      <Check className="w-8 h-8 shrink-0" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-espresso mb-2">
                        ✅ Reservation Request Sent!
                      </h2>
                      <p className="text-sm text-espresso/70 leading-relaxed font-body max-w-sm mb-2 font-semibold">
                        We'll confirm your table on WhatsApp shortly.
                      </p>
                      <p className="text-xs text-espresso/50 leading-relaxed font-body max-w-sm">
                        Expected response time: within 30 minutes during business hours.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-2">
                      <button
                        onClick={() => {
                          setBookingSuccess(false);
                          setBookingName("");
                          setBookingPhone("");
                          setBookingDate("");
                          setPartySize(2);
                          setSpecialRequests("");
                        }}
                        className="flex-1 bg-terracotta text-chalk text-xs font-bold py-3.5 px-6 rounded-xl hover:bg-terracotta/90 transition-colors cursor-target text-center font-display"
                      >
                        Make Another Reservation
                      </button>
                      <Link
                        href="/reserve"
                        className="flex-1 bg-espresso text-cream text-xs font-bold py-3.5 px-6 rounded-xl hover:bg-espresso/90 transition-colors cursor-target text-center font-display"
                      >
                        Detailed Reserve Page
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* RIGHT SIDE: Info Cards details (Hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-6 text-left">
              
              {/* Address card */}
              <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/15 flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-espresso mb-1">Our Location</h4>
                  <p className="text-xs text-espresso/70 leading-relaxed font-body">
                    40, Riddhi Siddhi Tower, Sector 5 Rd, Sector 2, Sector 5, Vidyadhar Nagar, Jaipur, Rajasthan 302039
                  </p>
                  <a
                    href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-math font-bold text-terracotta hover:underline mt-2 cursor-target"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Timing hours card */}
              <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/15 flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-espresso mb-1">Hours of Service</h4>
                  <p className="text-xs text-espresso/70 leading-relaxed font-body">
                    Open daily: 11:00 AM – 11:00 PM <br />
                    Basement bar basement active from 06:00 PM onwards.
                  </p>
                </div>
              </div>

              {/* Direct call card */}
              <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/15 flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-espresso mb-1">Quick Contact</h4>
                  <p className="text-xs text-espresso/70 leading-relaxed font-body">
                    Host desk: +91-97721-88999 <br />
                    General: contact@twopircafe.in
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Premium Location Card replacing broken Map embed */}
          <div className="mt-8 lg:mt-16 bg-cream/30 border border-espresso/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-terracotta/5 pointer-events-none" />
            <div className="text-left space-y-3 max-w-2xl z-10">
              <div className="inline-block bg-terracotta/15 text-terracotta text-[10px] font-math font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                📍 Location Coordinates
              </div>
              <h3 className="font-display text-xl md:text-2xl font-black text-espresso">
                Two Pi R Foods, Jaipur
              </h3>
              <p className="font-body text-xs md:text-sm text-espresso/85 leading-relaxed">
                40, Riddhi Siddhi Tower, Sector 5 Rd, Sector 2, Sector 5, Vidyadhar Nagar, Jaipur, Rajasthan 302039
              </p>
              <div className="flex items-center space-x-2 text-[11px] text-espresso/70 font-math">
                <span className="font-bold">Landmark:</span>
                <span>Near Sector 5 Petrol Pump / Riddhi Siddhi Tower</span>
              </div>
            </div>
            
            <a
              href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-espresso text-cream font-bold text-xs md:text-sm px-6 py-3.5 rounded-full hover:bg-espresso/90 shadow-lg flex items-center space-x-2 transition-all cursor-target shrink-0 z-10"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4 text-gold" />
            </a>
          </div>

        </div>
      </section>

      {/* 9. SIMULATED INSTAGRAM FEED — 'FOLLOW THE FORMULA' */}
      <section className="py-20 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold flex items-center justify-center">
              <svg className="w-3.5 h-3.5 mr-1 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Follow the Formula</span>
            </span>
            <h2 className="font-display text-2xl md:text-5xl font-black text-espresso mt-2 mb-3">
              @twopirjaipur
            </h2>
            <p className="text-xs text-espresso/65 font-math uppercase tracking-widest">
              Circumference of community on Instagram
            </p>
          </div>

          {/* 3x3 simulated Instagram grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* Photo 1 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400"
                alt="Nutella Frappe at Two Pi R Cafe Jaipur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>314</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>15</span></span>
              </div>
            </div>

            {/* Photo 2 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400"
                alt="Cheese Burst Pizza at Two Pi R Jaipur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>628</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>22</span></span>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400"
                alt="Steaming hot cappuccino at 2piR Jaipur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>194</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>8</span></span>
              </div>
            </div>

            {/* Photo 4 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400"
                alt="Friends gatherings at Vidyadhar Nagar Cafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>428</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>19</span></span>
              </div>
            </div>

            {/* Photo 5 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=400"
                alt="Basement Bar at Two Pi R Foods"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>512</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>31</span></span>
              </div>
            </div>

            {/* Photo 6 */}
            <div className="relative group aspect-square rounded-2xl overflow-hidden border border-espresso/5 shadow-md cursor-image-hover">
              <img
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400"
                alt="Fudge Brownie ice cream dessert"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-chalk pointer-events-none">
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><Heart className="w-4 h-4 text-terracotta fill-current" /> <span>285</span></span>
                <span className="flex items-center space-x-1.5 font-math text-sm font-bold"><MessageCircle className="w-4 h-4" /> <span>12</span></span>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-espresso text-cream font-bold px-8 py-3.5 rounded-full hover:bg-espresso/90 transition-all duration-300 shadow-md cursor-target"
            >
              <svg className="w-4 h-4 text-[#C4622D] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Follow the Conversation</span>
            </a>
          </div>

        </div>
      </section>

      {/* 10. BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 left-6 z-40 w-12 h-12 rounded-full bg-espresso text-cream border border-gold/20 flex items-center justify-center shadow-2xl hover:bg-terracotta hover:text-chalk transition-all cursor-target"
            title="Back to Top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
