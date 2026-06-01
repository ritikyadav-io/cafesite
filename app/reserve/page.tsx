"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Calendar, Clock, Users, Check,
  CreditCard, Navigation, Info, AlertCircle
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedContent from "@/components/RelatedContent";

export default function ReservePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("casual");
  const [needHighChair, setNeedHighChair] = useState(false);
  const [requests, setRequests] = useState("");
  const [success, setSuccess] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Inline error states
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dateError, setDateError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Set min date to today's local date in YYYY-MM-DD
    setMinDate(new Date().toLocaleDateString('en-CA'));
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (val.length <= 10) {
      setPhone(val);
      if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
        setPhoneError("Must be a valid 10-digit Indian number starting with 6-9");
      } else {
        setPhoneError("");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Must be a valid 10-digit Indian mobile number (starts with 6-9)");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!date) {
      setDateError("Please select a date");
      isValid = false;
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setDateError("Date cannot be in the past");
        isValid = false;
      } else {
        setDateError("");
      }
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (guests > 20) {
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
          name,
          phone,
          date,
          time,
          guests,
          occasion,
          requests: needHighChair ? `${requests} (Requires High Chair)` : requests,
        }),
      });
    } catch (err) {
      console.error("Local CSV booking logging failed:", err);
    }

    // 2. Format WhatsApp reservation message
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const occasionMap: Record<string, string> = {
      casual: "Casual Hangout",
      birthday: "Birthday Party",
      anniversary: "Anniversary",
      business: "Business Meeting",
      date: "Candlelit Date"
    };

    const finalOccasion = occasionMap[occasion] || occasion;
    const specialReqs = [
      needHighChair ? "Requires High Chair" : "",
      requests.trim() ? requests.trim() : ""
    ].filter(Boolean).join(", ");

    const msg = `🪑 *TABLE RESERVATION REQUEST — Two Pi R Cafe*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name.trim()}
📞 *Phone:* +91 ${phone}
📅 *Date:* ${formattedDate}
⏰ *Time:* ${time}
👥 *Party Size:* ${guests} ${guests > 1 ? "people" : "person"}
🎉 *Occasion:* ${finalOccasion}
🗒️ *Special Requests:* ${specialReqs || "None"}
━━━━━━━━━━━━━━━━━━━━
_Reservation request sent via twopircafe.in_
_Please confirm availability on WhatsApp._`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/919772188999?text=${encodedMsg}`;

    // Pop Interactive Confetti!
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#C4622D", "#D4A843", "#F5EDD6", "#2C1810"]
    });

    // 3. Open WhatsApp in new tab
    window.open(waUrl, "_blank");

    // 4. Change form to success state screen
    setSuccess(true);
  };

  return (
    <div className="relative">
      <Breadcrumbs activeLabel="Reserve" />
      <div className="pt-4 pb-20 bg-cream min-h-screen relative">
      {/* Background Math details */}
      <div className="absolute inset-0 opacity-5 pointer-events-none dot-grid" />

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-math text-xs tracking-widest text-terracotta uppercase font-bold">
            Secure your spot in the loop
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-espresso mt-2 mb-4 leading-none">
            Reserve a Table
          </h1>
          <p className="text-sm text-espresso/70 leading-relaxed font-body">
            Reservations are highly recommended for weekend dinners, big groups, and basement bar parties. For events over 20+ guests, please call us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT SIDE: Multi option Booking Form */}
          <div className="lg:col-span-7 bg-chalk p-8 md:p-10 rounded-3xl border border-espresso/10 shadow-xl flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value.trim().length >= 2) setNameError("");
                        }}
                        placeholder="Rahul Sharma"
                        className={`px-4 py-3 rounded-xl border ${
                          nameError ? "border-red-500" : "border-espresso/15"
                        } bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta`}
                      />
                      {nameError && (
                        <span className="text-[10px] text-red-600 font-bold flex items-center space-x-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{nameError}</span>
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
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="98765 43210"
                        className={`px-4 py-3 rounded-xl border ${
                          phoneError ? "border-red-500" : "border-espresso/15"
                        } bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta`}
                      />
                      {phoneError ? (
                        <span className="text-[10px] text-red-600 font-bold flex items-center space-x-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{phoneError}</span>
                        </span>
                      ) : (
                        <span className="text-[9px] text-espresso/45">Valid 10-digit Indian mobile starting 6-9</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Date */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center">
                        <Calendar className="w-3.5 h-3.5 text-terracotta mr-1 shrink-0" />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={minDate}
                        onChange={(e) => {
                          setDate(e.target.value);
                          if (e.target.value) setDateError("");
                        }}
                        className={`px-4 py-3 rounded-xl border ${
                          dateError ? "border-red-500" : "border-espresso/15"
                        } bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta`}
                      />
                      {dateError && (
                        <span className="text-[10px] text-red-600 font-bold flex items-center space-x-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{dateError}</span>
                        </span>
                      )}
                    </div>

                    {/* Time (Operational 11 AM - 10:30 PM only) */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center">
                        <Clock className="w-3.5 h-3.5 text-terracotta mr-1 shrink-0" />
                        <span>Time Slot</span>
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="px-4 py-3.5 rounded-xl border border-espresso/15 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta cursor-target"
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

                    {/* Stepper (guests limit 1-20) */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold flex items-center">
                        <Users className="w-3.5 h-3.5 text-terracotta mr-1 shrink-0" />
                        <span>Guests Count</span>
                      </label>
                      <div className="flex items-center justify-between border border-espresso/15 bg-cream/10 rounded-xl px-2 py-1.5 h-[46px]">
                        <button
                          type="button"
                          onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg hover:bg-espresso/5 font-bold text-espresso text-lg flex items-center justify-center cursor-target"
                        >
                          -
                        </button>
                        <span className="font-math font-bold text-espresso text-sm">
                          {guests} {guests > 1 ? "Guests" : "Guest"}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests(prev => Math.min(25, prev + 1))}
                          className="w-8 h-8 rounded-lg hover:bg-espresso/5 font-bold text-espresso text-lg flex items-center justify-center cursor-target"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Occasion */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                        Occasion Type
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="px-4 py-3.5 rounded-xl border border-espresso/15 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta cursor-target"
                      >
                        <option value="casual">Casual Hangout</option>
                        <option value="birthday">🎂 Birthday Party</option>
                        <option value="anniversary">❤️ Anniversary</option>
                        <option value="business">💼 Business Meeting</option>
                        <option value="date">🕯️ Candlelit Date</option>
                      </select>
                    </div>

                    {/* High chair */}
                    <div className="flex items-center justify-between border border-espresso/15 bg-cream/10 rounded-xl px-4 h-[46px] mt-6.5">
                      <span className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                        Need High Chair?
                      </span>
                      <input
                        type="checkbox"
                        checked={needHighChair}
                        onChange={(e) => setNeedHighChair(e.target.checked)}
                        className="w-4 h-4 rounded text-terracotta focus:ring-terracotta cursor-target"
                      />
                    </div>
                  </div>

                  {/* Special request with character limit 200 */}
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="font-math text-[11px] uppercase tracking-wider text-espresso/60 font-bold">
                        Special Requests (Optional)
                      </label>
                      <span className="text-[10px] text-espresso/45 font-math">
                        {requests.length}/200 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={requests}
                      maxLength={200}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="e.g. Request bookshelf view, birthday cake setup, one high chair..."
                      className="px-4 py-3 rounded-xl border border-espresso/15 bg-cream/10 text-espresso text-sm focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  {/* High guests warning */}
                  {guests > 20 && (
                    <div className="bg-espresso/5 border border-red-200/40 p-4 rounded-xl text-xs text-espresso leading-relaxed flex items-start space-x-2">
                      <span className="text-red-600 font-bold shrink-0 mt-0.5">⚠️</span>
                      <p>
                        <strong>For groups larger than 20 people:</strong> Please call floor managers at <strong>+91 97721 88999</strong> directly to finalize catering, menu selection, and floor configuration.
                      </p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-terracotta text-chalk font-bold py-4 rounded-xl hover:bg-terracotta/90 transition-all duration-300 shadow-md text-sm cursor-target"
                  >
                    Place Reservation on WhatsApp
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6"
                >
                  <div className="w-16 h-16 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8 shrink-0" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-espresso mb-3">
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
                        setSuccess(false);
                        setName("");
                        setPhone("");
                        setDate("");
                        setGuests(2);
                        setRequests("");
                        setNeedHighChair(false);
                      }}
                      className="flex-1 bg-terracotta text-chalk text-xs font-bold py-3.5 px-6 rounded-xl hover:bg-terracotta/90 transition-colors cursor-target text-center"
                    >
                      Make Another Reservation
                    </button>
                    <Link
                      href="/"
                      className="flex-1 bg-espresso text-cream text-xs font-bold py-3.5 px-6 rounded-xl hover:bg-espresso/90 transition-colors cursor-target text-center"
                    >
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Info detail cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            {/* Quick stats block card */}
            <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm">
              <h3 className="font-display text-xl font-bold text-espresso mb-4 flex items-center">
                <Info className="w-5 h-5 text-terracotta mr-2 shrink-0" />
                <span>The 2πR Details</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start justify-between border-b border-espresso/5 pb-2.5">
                  <span className="font-math font-bold text-espresso/60">Cuisine</span>
                  <span className="font-display font-extrabold text-espresso">Multi-Cuisine (Veg & Non-Veg)</span>
                </div>
                <div className="flex items-start justify-between border-b border-espresso/5 pb-2.5">
                  <span className="font-math font-bold text-espresso/60">Timings</span>
                  <span className="font-display font-extrabold text-espresso">Open Daily Until 11 PM</span>
                </div>
                <div className="flex items-start justify-between border-b border-espresso/5 pb-2.5">
                  <span className="font-math font-bold text-espresso/60">Basement Bar</span>
                  <span className="font-display font-extrabold text-espresso">Active 06:00 PM – 11:00 PM</span>
                </div>
                <div className="flex items-start justify-between border-b border-espresso/5 pb-2.5">
                  <span className="font-math font-bold text-espresso/60">Parking</span>
                  <span className="font-display font-extrabold text-espresso">Massive Free Private Lot</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-math font-bold text-espresso/60">Plus Code</span>
                  <span className="font-math font-extrabold text-espresso">XQCF+5P Jaipur, Rajasthan</span>
                </div>
              </div>
            </div>

            {/* Tap actions contact card */}
            <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm space-y-4">
              <h4 className="font-display text-lg font-bold text-espresso">
                Host Desk Hotline
              </h4>
              <p className="text-xs text-espresso/70 leading-relaxed font-body">
                Need to change or cancel a reservation? Please call our floor managers directly on the hotline:
              </p>
              
              <a
                href="tel:+919772188999"
                className="block text-center font-math font-bold bg-espresso text-cream py-3 rounded-xl hover:bg-espresso/90 transition-colors cursor-target"
              >
                Call Desk: +91-97721-88999
              </a>
            </div>

            {/* Payment options */}
            <div className="bg-chalk p-6 rounded-2xl border border-espresso/10 shadow-sm flex items-start space-x-3.5">
              <CreditCard className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-bold text-espresso mb-1">Accepted Payments</h4>
                <p className="text-xs text-espresso/60 leading-relaxed font-body">
                  UPI payments (GPay, PhonePe, Paytm), credit cards (Visa, MasterCard), Apple/Google Pay NFC, and Cash.
                </p>
                {/* Open in Google Maps */}
                <div className="mt-8 text-center">
                  <a
                    href="https://maps.app.goo.gl/aSDnHyvZP8wMTot2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-espresso text-cream font-bold text-xs px-5 py-3 rounded-full hover:bg-espresso/90 shadow-2xl flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3.5 h-3.5 text-gold" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
      </div>
      <RelatedContent excludePath="/reserve" />
    </div>
  );
}
