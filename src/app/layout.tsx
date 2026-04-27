import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Cafe Waffela – Hausgemachte Waffeln in Lustenau",
  description:
    "Entdecke die besten Waffeln in Lustenau, Vorarlberg. Herzlich, lecker, hausgemacht.",
  keywords: [
    "Cafe Waffela",
    "Waffeln",
    "Lustenau",
    "Vorarlberg",
    "Frühstück",
    "Café",
  ],
  icons: {
    icon: process.env.NEXT_PUBLIC_APP_ICON_URL,
    apple: process.env.NEXT_PUBLIC_APP_ICON_URL,
  },
  openGraph: {
    title: "Cafe Waffela – Hausgemachte Waffeln in Lustenau",
    description: "Entdecke die besten Waffeln in Lustenau, Vorarlberg.",
    type: "website",
    locale: "de_AT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
