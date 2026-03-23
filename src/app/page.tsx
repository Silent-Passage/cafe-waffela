import { Hero } from "@/components/cafe/Hero";
import { MenuHighlights } from "@/components/cafe/MenuHighlights";
import { OrderOnline } from "@/components/cafe/OrderOnline";
import { SocialHub } from "@/components/cafe/SocialHub";
import { InstagramCTA } from "@/components/cafe/InstagramCTA"; // WICHTIG: Mit { }
import { Footer } from "@/components/cafe/Footer";
import { getSiteSettings, getMenuItems, getOpeningHours } from "@/lib/db";

export default async function HomePage() {
  const settingsData = await getSiteSettings().catch(() => null);
  const settings = settingsData || ({} as any);
  const menuItems = await getMenuItems().catch(() => []);
  const openingHours = await getOpeningHours().catch(() => []);

  return (
    <main className="min-h-screen">
      <Hero
        tagline={settings?.heroTagline}
        googleMapsUrl={settings?.googleMapsUrl}
      />

      <MenuHighlights items={menuItems} />

      {/* 1. Hunger? Wir liefern! (Hintergrund: hellgelb) */}
      <OrderOnline />

      {/* 2. Instagram Sektion direkt darunter */}
      <InstagramCTA settings={settings} />

      <SocialHub settings={settings} openingHours={openingHours} />

      <Footer settings={settings} />
    </main>
  );
}
