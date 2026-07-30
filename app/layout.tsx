import type { Metadata, Viewport } from "next";
import { Baloo_2, Bevan, Space_Grotesk, Space_Mono } from "next/font/google";
import { site } from "@/lib/site-config";
import "./globals.css";

/* Display for the lime acts — heavy and rounded, matches the wordmark art. */
const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

/* Slab serif for the dark act only. The typeface switch is what makes Act 2
   feel like a different room. */
const bevan = Bevan({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bevan",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Brett, on Robinhood Chain`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Brett on Hood",
    "Brett",
    "Robinhood Chain",
    "Robinhood Chain memecoin",
    "memecoin",
    "Matt Furie",
    "Boys Club",
    "chain 4663",
    "Pepe",
  ],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Brett, on Robinhood Chain`,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — the frog in the suit`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Brett, on Robinhood Chain`,
    description: site.description,
    images: ["/og-image.png"],
    creator: "@bretton_hood",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#C8FD00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${bevan.variable} ${grotesk.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
