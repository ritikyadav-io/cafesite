import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import MobileBottomBar from "@/components/MobileBottomBar";
import DesktopWhatsAppButton from "@/components/DesktopWhatsAppButton";

// Manrope for all text on the website
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Core SEO configurations targeted for Jaipur regional organic search
export const metadata: Metadata = {
  title: "Two Pi R Cafe Jaipur | Best Cafe in Vidyadhar Nagar | 2πR",
  description: "Two Pi R (2πR) — Jaipur's beloved math-themed cafe in Vidyadhar Nagar. Multi-cuisine menu, bar, live music, free parking. Rating: 4.2★ (1,395 reviews). Open till 11 PM. Call: +91-97721-88999. Book your table today!",
  keywords: [
    "Two Pi R cafe Jaipur",
    "cafe Vidyadhar Nagar Jaipur",
    "best cafe in Jaipur",
    "2pir cafe",
    "math themed cafe Jaipur",
    "cafe near me Jaipur",
    "cafe with bar Jaipur",
    "pizza cafe Jaipur",
    "pasta cafe Jaipur",
    "coffee shop Vidyadhar Nagar",
    "restaurant Jaipur",
    "hangout place Jaipur",
    "cafe with parking Jaipur",
    "Sikar road cafe",
    "top rated cafes in Jaipur near me",
    "best multi cuisine restaurants in Vidyadhar Nagar Jaipur",
    "top cafes in Sikar Road Jaipur",
    "cafes with basement bar Jaipur",
    "Jaipur best restaurants with free parking",
    "Jaipur best tandoori starters and KitKat shakes",
    "affordable basement pub Sikar Road Jaipur",
    "romantic dining places in Vidyadhar Nagar Jaipur",
    "best cafes in Jaipur for birthday celebration",
    "study cafes in Jaipur near me with free wifi",
    "Vidyadhar Nagar top cafes list"
  ],
  alternates: {
    canonical: "https://twopircafe.in",
    languages: {
      "en-IN": "https://twopircafe.in",
      "hi-IN": "https://twopircafe.in/hi",
    },
  },
  openGraph: {
    title: "Two Pi R Cafe | Jaipur's Math-Themed Cafe Experience",
    description: "4.2★ rated cafe with bar, live music & free parking in Vidyadhar Nagar, Jaipur. Open till 11 PM.",
    url: "https://twopircafe.in",
    siteName: "Two Pi R Foods",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Two Pi R Math-Themed Cafe Vidyadhar Nagar Jaipur",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Pi R Cafe Jaipur",
    description: "Jaipur's best math-themed cafe. ★4.2 | 1,395+ reviews | Open till 11 PM",
    images: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur, Rajasthan",
    "geo.position": "26.9704621;75.7743409",
    "ICBM": "26.9704621, 75.7743409",
  },
};

// Rich Structured Data for Restaurant, FAQ list, and Breadcrumbs (Critical Local SEO)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Restaurant", "CafeOrCoffeeShop", "BarOrPub"],
      "@id": "https://twopircafe.in/#restaurant",
      "name": "Two Pi R Foods",
      "alternateName": ["2πR Cafe", "Two Pai R", "कैफे टू पाई आर", "Two Pi R Jaipur"],
      "url": "https://twopircafe.in",
      "telephone": "+919772188999",
      "image": [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "40, Riddhi Siddhi Tower, Sector 5 Rd, Sector 2, Sector 5",
        "addressLocality": "Vidyadhar Nagar",
        "addressRegion": "Rajasthan",
        "postalCode": "302039",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.9704621,
        "longitude": 75.7743409
      },
      "hasMap": "https://maps.app.goo.gl/aSDnHyvZP8wMTot2A",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "11:00",
          "closes": "23:00"
        }
      ],
      "priceRange": "₹₹",
      "servesCuisine": ["Indian", "Continental", "Chinese", "Pizza", "Pasta", "Cafe"],
      "menu": "https://twopircafe.in/menu",
      "acceptsReservations": "True",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, NFC Mobile Payments",
      "currenciesAccepted": "INR",
      "amenityFeature": [
        {"@type": "LocationFeatureSpecification", "name": "Free Parking Lot", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Bar on Site", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Live Music", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Wheelchair Accessible", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Outdoor Seating", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "WiFi", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.2",
        "reviewCount": "1395",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {"@type": "Rating", "ratingValue": "5"},
          "author": {"@type": "Person", "name": "Brahmdutt Sharma"},
          "reviewBody": "This Cafe is awesome with its interior and the food they serve. I really had a great time with friends over here. Something which is special and new for me is sweet Buns and sweet fries. I recommend this place."
        },
        {
          "@type": "Review",
          "reviewRating": {"@type": "Rating", "ratingValue": "5"},
          "author": {"@type": "Person", "name": "Xeta"},
          "reviewBody": "One of the best restaurant in this area. It deserves all stars for its quality food, economical pricing and best of the ambience. Beautiful interiors and decorations. Ample parking space outside. A complete package for hanging out."
        }
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Two+Pai+R+Foods",
        "https://maps.app.goo.gl/aSDnHyvZP8wMTot2A",
        "https://www.zomato.com/jaipur/two-pai-r-restaurant-vidhyadhar-nagar/order"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the timings of Two Pi R Cafe in Jaipur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Two Pi R Cafe in Vidyadhar Nagar, Jaipur is open daily from 11:00 AM to 11:00 PM. Please call +91-97721-88999 to confirm hours on public holidays."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price range at Two Pi R Cafe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The price range at Two Pi R Cafe is ₹200 to ₹1,000 per person, making it affordable for casual hangouts, family dinners, and group gatherings in Jaipur."
          }
        },
        {
          "@type": "Question",
          "name": "Does Two Pi R have parking in Jaipur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Two Pi R Cafe is famous for its large free parking lot in Vidyadhar Nagar, Jaipur. Multiple reviewers specifically highlight the ample parking space."
          }
        },
        {
          "@type": "Question",
          "name": "Does Two Pi R Cafe serve alcohol?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Two Pi R has a bar in the basement that serves beer (starting ₹190 for 600ml), cocktails, and wine. The bar is a separate seating area."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://twopircafe.in"},
        {"@type": "ListItem", "position": 2, "name": "Menu", "item": "https://twopircafe.in/menu"},
        {"@type": "ListItem", "position": 3, "name": "Gallery", "item": "https://twopircafe.in/gallery"},
        {"@type": "ListItem", "position": 4, "name": "Reviews", "item": "https://twopircafe.in/reviews"},
        {"@type": "ListItem", "position": 5, "name": "Reserve", "item": "https://twopircafe.in/reserve"}
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!sessionStorage.getItem("two-pi-r-loaded")) {
                    document.documentElement.classList.add("two-pi-r-loading");
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased selection:bg-terracotta selection:text-chalk">
        <CartProvider>
          {/* Dynamic circular cursor with 2πR magnetic theme */}
          <CustomCursor />

          {/* Math equation drawer page loader */}
          <PageLoader />

          {/* WhatsApp button for desktop and bottom bar for mobile */}
          <DesktopWhatsAppButton />
          <MobileBottomBar />

          {/* Cart sliding drawer overlay */}
          <CartDrawer />

          {/* Site content */}
          <div className="min-h-screen flex flex-col relative z-10 bg-cream">
            <Navbar />
            <main className="flex-grow pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
