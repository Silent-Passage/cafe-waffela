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
    icon: "https://bq4duwnybfphnwpe.public.blob.vercel-storage.com/382973711_215203098057102_832114998054713157_n.png",
    apple:
      "https://bq4duwnybfphnwpe.public.blob.vercel-storage.com/382973711_215203098057102_832114998054713157_n.png",
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
