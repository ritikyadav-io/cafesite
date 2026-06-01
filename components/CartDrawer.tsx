"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [orderType, setOrderType] = useState<"Dine-In" | "Takeaway" | "Delivery">("Dine-In");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableOrAddress, setTableOrAddress] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (val.length <= 10) {
      setCustomerPhone(val);
      if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
        setPhoneError("Must be a valid 10-digit Indian number starting with 6-9");
      } else {
        setPhoneError("");
      }
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(customerPhone)) {
      alert("Please enter a valid 10-digit Indian mobile number starting with 6-9.");
      return;
    }
    if (orderType === "Dine-In" && !tableOrAddress.trim()) {
      alert("Please enter your Table Number.");
      return;
    }
    if (orderType === "Delivery" && !tableOrAddress.trim()) {
      alert("Please enter your Delivery Address.");
      return;
    }

    // Build the structured WhatsApp order message
    const timestamp = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let itemsStr = "";
    cartItems.forEach((item, index) => {
      itemsStr += `${index + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}\n`;
    });

    const msg = `🍽️ *NEW ORDER — Two Pi R Cafe*
━━━━━━━━━━━━━━━━━━━━
📋 *Order Details:*

${itemsStr}
━━━━━━━━━━━━━━━━━━━━
💰 *Total: ₹${cartTotal}*
🪑 *Type: ${orderType}*
👤 *Name: ${customerName}*
📞 *Phone: +91 ${customerPhone}*
${tableOrAddress ? `📍 *${orderType === "Dine-In" ? "Table No" : "Address"}: ${tableOrAddress}*\n` : ""}🕐 *Time: ${timestamp}*
━━━━━━━━━━━━━━━━━━━━
_Sent via twopircafe.in_`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/919772188999?text=${encodedMsg}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");

    // Clear cart and close drawer
    clearCart();
    setCartOpen(false);

    // Reset form states
    setCustomerName("");
    setCustomerPhone("");
    setTableOrAddress("");
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-body">
        {/* Transparent dark overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="absolute inset-0 bg-espresso/60 backdrop-blur-sm cursor-target"
        />

        {/* Sliding bottom sheet container for mobile */}
        <div className="absolute bottom-0 inset-x-0 max-h-[85vh] flex flex-col pointer-events-none md:hidden z-10">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-full h-full max-h-[85vh] pointer-events-auto flex flex-col bg-cream rounded-t-[24px] shadow-2xl border-t border-espresso/15 overflow-hidden"
          >
            {/* Top Handle Drag Bar Indicator */}
            <div className="w-full flex justify-center py-3 bg-cream shrink-0">
              <div className="w-9 h-1 bg-espresso/20 rounded-full" />
            </div>
            
            {/* Header block */}
            <div className="px-6 pb-4 border-b border-espresso/10 flex items-center justify-between bg-cream text-espresso shrink-0">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                <h2 className="font-display text-lg font-bold tracking-tight text-espresso">
                  Your Order
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-espresso/5 text-espresso cursor-target min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items viewport scrollable panel */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {cartItems.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-espresso/45">
                  <span className="text-4xl">🍽️</span>
                  <p className="font-body font-bold text-[15px] text-espresso/70">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="bg-terracotta text-chalk font-bold text-xs px-6 py-3 rounded-xl hover:bg-terracotta/90 cursor-target min-h-[44px]"
                  >
                    Browse Menu →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-espresso/5 pb-3 last:border-b-0"
                    >
                      {/* Title and Price */}
                      <div className="flex-grow text-left pr-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 text-[8px] font-bold leading-none ${
                              item.isVeg
                                ? "border-green-600 text-green-600"
                                : "border-red-600 text-red-600"
                            }`}
                          >
                            ●
                          </span>
                          <h4 className="font-body text-sm font-bold text-espresso line-clamp-1">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-body text-xs text-terracotta font-semibold block mt-1">
                          ₹{item.price * item.quantity} (₹{item.price} each)
                        </span>
                      </div>

                      {/* Stepper controls */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <div className="flex items-center border border-espresso/15 bg-white rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 rounded-md hover:bg-espresso/5 text-espresso cursor-target min-w-[28px] min-h-[28px] flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-xs font-bold text-espresso px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 rounded-md hover:bg-espresso/5 text-espresso cursor-target min-w-[28px] min-h-[28px] flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-transparent hover:border-red-100 cursor-target min-w-[32px] min-h-[32px] flex items-center justify-center"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-espresso/10 space-y-4 text-left">
                    <h3 className="font-body text-[13px] font-bold uppercase tracking-wider text-espresso/60">
                      Order Type & Information
                    </h3>

                    {/* Order Type Toggle */}
                    <div className="flex space-x-2 bg-espresso/5 p-1 rounded-xl">
                      {(["Dine-In", "Takeaway", "Delivery"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setOrderType(type);
                            setTableOrAddress("");
                          }}
                          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold font-body transition-all cursor-target ${
                            orderType === type
                              ? "bg-terracotta text-chalk shadow"
                              : "text-espresso/70 hover:text-espresso"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Name & Phone side by side on mobile */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col space-y-1">
                        <label className="font-body text-[11px] text-espresso/70 font-semibold">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your Name"
                          className="px-3 py-2.5 rounded-xl border border-espresso/15 bg-white text-espresso text-base focus:outline-none focus:border-terracotta font-body"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="font-body text-[11px] text-espresso/70 font-semibold">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={handlePhoneChange}
                          placeholder="Phone"
                          className="px-3 py-2.5 rounded-xl border border-espresso/15 bg-white text-espresso text-base focus:outline-none focus:border-terracotta font-body"
                        />
                      </div>
                    </div>
                    {phoneError && (
                      <span className="text-[10px] text-red-600 font-bold block">{phoneError}</span>
                    )}

                    {/* Table / Address */}
                    {orderType !== "Takeaway" && (
                      <div className="flex flex-col space-y-1">
                        <label className="font-body text-[11px] text-espresso/70 font-semibold">
                          {orderType === "Dine-In" ? "Table Number *" : "Delivery Address *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={tableOrAddress}
                          onChange={(e) => setTableOrAddress(e.target.value)}
                          placeholder={
                            orderType === "Dine-In"
                              ? "e.g. Table 4"
                              : "e.g. Sector 2, Vidyadhar Nagar, Jaipur"
                          }
                          className="px-3 py-2.5 rounded-xl border border-espresso/15 bg-white text-espresso text-base focus:outline-none focus:border-terracotta font-body"
                        />
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Footer Pricing & CTA for mobile */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-espresso/10 bg-white text-left space-y-3 pb-8 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="font-body font-bold text-espresso text-sm">
                    Subtotal
                  </span>
                  <span className="font-body font-extrabold text-terracotta text-base">
                    ₹{cartTotal}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#25D366]/90 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 text-sm cursor-target min-h-[52px]"
                >
                  <span>Place Order on WhatsApp</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.843.002-2.632-1.02-5.107-2.88-6.968C16.59 1.94 14.12 1.018 11.49 1.018c-5.44 0-9.866 4.408-9.868 9.846-.001 1.704.457 3.366 1.326 4.83L1.87 20.91l5.228-1.371z" />
                  </svg>
                </button>
                
                <p className="text-[10px] text-espresso/50 text-center">
                  You will be redirected to WhatsApp to place your order.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sliding drawer panel container for desktop */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none max-md:hidden z-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="w-screen max-w-md pointer-events-auto"
          >
            <div className="h-full flex flex-col bg-cream shadow-2xl border-l border-espresso/15">
              {/* Header block */}
              <div className="p-6 border-b border-espresso/10 flex items-center justify-between bg-espresso text-cream">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  <h2 className="font-display text-xl font-bold tracking-tight text-gold">
                    Your Order Circle
                  </h2>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-full hover:bg-cream/10 text-cream cursor-target"
                  title="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items listing viewport scrollable panel */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-4 text-espresso/45">
                    <span className="font-math text-5xl">∑ = 0</span>
                    <p className="font-display font-extrabold text-lg text-espresso/60">
                      Your cart is currently empty
                    </p>
                    <p className="text-xs max-w-xs text-center">
                      Not sure what to solve your hunger with? Explore our curated multi-cuisine menu!
                    </p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="bg-terracotta text-chalk font-bold text-xs px-6 py-2.5 rounded-full hover:bg-terracotta/90 cursor-target"
                    >
                      Start Ordering
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-espresso/5 pb-4 last:border-b-0"
                      >
                        {/* Title and Price */}
                        <div className="flex-grow text-left pr-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 text-[8px] font-bold leading-none ${
                                item.isVeg
                                  ? "border-green-600 text-green-600"
                                  : "border-red-600 text-red-600"
                              }`}
                            >
                              ●
                            </span>
                            <h4 className="font-display text-sm font-extrabold text-espresso line-clamp-1">
                              {item.name}
                            </h4>
                          </div>
                          <span className="font-math text-xs text-espresso/60 block mt-1">
                            ₹{item.price} each
                          </span>
                        </div>

                        {/* Stepper + Remove buttons */}
                        <div className="flex items-center space-x-3 shrink-0">
                          <div className="flex items-center border border-espresso/15 bg-chalk rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-md hover:bg-espresso/5 text-espresso cursor-target"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-math text-xs font-bold text-espresso px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-md hover:bg-espresso/5 text-espresso cursor-target"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-lg hover:bg-red-50 text-red-600 border border-transparent hover:border-red-100 cursor-target"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <form onSubmit={handlePlaceOrder} className="pt-6 border-t border-espresso/10 space-y-5 text-left">
                    <h3 className="font-display text-sm font-bold text-espresso mb-3">
                      Order Coordinates
                    </h3>

                    {/* Order Type Toggle */}
                    <div className="flex space-x-2 bg-espresso/5 p-1 rounded-xl">
                      {(["Dine-In", "Takeaway", "Delivery"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setOrderType(type);
                            setTableOrAddress("");
                          }}
                          className={`flex-1 py-2 text-center rounded-lg text-xs font-bold font-display transition-all cursor-target ${
                            orderType === type
                              ? "bg-terracotta text-chalk shadow"
                              : "text-espresso/70 hover:text-espresso"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-math text-[10px] uppercase tracking-wider text-espresso/60 font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="px-3.5 py-2.5 rounded-xl border border-espresso/15 bg-chalk text-espresso text-xs focus:outline-none focus:border-terracotta"
                      />
                    </div>

                    {/* Customer Phone */}
                    <div className="flex flex-col space-y-1">
                      <label className="font-math text-[10px] uppercase tracking-wider text-espresso/60 font-bold">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={handlePhoneChange}
                        placeholder="e.g. 9876543210"
                        className="px-3.5 py-2.5 rounded-xl border border-espresso/15 bg-chalk text-espresso text-xs focus:outline-none focus:border-terracotta"
                      />
                      {phoneError ? (
                        <span className="text-[10px] text-red-600 font-bold">{phoneError}</span>
                      ) : (
                        <span className="text-[9px] text-espresso/45">Must be a valid 10-digit Indian number</span>
                      )}
                    </div>

                    {/* Dynamic Table / Address Input */}
                    {orderType !== "Takeaway" && (
                      <div className="flex flex-col space-y-1">
                        <label className="font-math text-[10px] uppercase tracking-wider text-espresso/60 font-bold">
                          {orderType === "Dine-In" ? "Table Number *" : "Delivery Address *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={tableOrAddress}
                          onChange={(e) => setTableOrAddress(e.target.value)}
                          placeholder={
                            orderType === "Dine-In"
                              ? "e.g. Table 4"
                              : "e.g. Sector 2, Vidyadhar Nagar, Jaipur"
                          }
                          className="px-3.5 py-2.5 rounded-xl border border-espresso/15 bg-chalk text-espresso text-xs focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* Footer pricing and checkouts */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-espresso/10 bg-chalk text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-espresso text-base">
                      Total Spices Sum
                    </span>
                    <span className="font-math font-extrabold text-espresso text-lg">
                      ₹{cartTotal}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#25D366]/90 transition-all duration-300 shadow-md flex items-center justify-center space-x-2 text-sm cursor-target"
                  >
                    <span>Place Order on WhatsApp</span>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.843.002-2.632-1.02-5.107-2.88-6.968C16.59 1.94 14.12 1.018 11.49 1.018c-5.44 0-9.866 4.408-9.868 9.846-.001 1.704.457 3.366 1.326 4.83L1.87 20.91l5.228-1.371z" />
                    </svg>
                  </button>

                  <p className="text-[10px] text-espresso/45 text-center leading-relaxed">
                    You will be redirected to WhatsApp to dispatch your receipt details. We confirm and prepare your fresh dishes instantly!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
