import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexicore — Agenție Digitală Premium pentru Companii B2B din România",
  description:
    "Nexicore oferă soluții digitale premium pentru companii B2B din România. Website-uri profesionale pentru consultanță financiară, contabilitate, avocatură, construcții și energie.",
  keywords: [
    "website consultanta financiara",
    "website contabilitate",
    "website avocatura",
    "website constructii Romania",
    "agentie digitala Romania",
    "agentie web B2B",
    "website premium Romania",
    "dezvoltare web profesional",
  ],
  authors: [{ name: "Nexicore" }],
  creator: "Nexicore",
  metadataBase: new URL("https://nexicore.ro"),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://nexicore.ro",
    siteName: "Nexicore",
    title: "Nexicore — Agenție Digitală Premium pentru Companii B2B",
    description:
      "Soluții digitale premium pentru companii B2B din România. Consultanță financiară, contabilitate, avocatură, construcții.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexicore — Agenție Digitală Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexicore — Agenție Digitală Premium",
    description:
      "Soluții digitale premium pentru companii B2B din România.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nexicore.ro",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nexicore",
  description:
    "Agenție digitală premium pentru companii B2B din România",
  url: "https://nexicore.ro",
  areaServed: {
    "@type": "Country",
    name: "Romania",
  },
  serviceType: [
    "Web Development",
    "Digital Agency",
    "Website Design",
    "B2B Digital Solutions",
  ],
  knowsLanguage: "ro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased noise-overlay`}
      >
        {children}
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
