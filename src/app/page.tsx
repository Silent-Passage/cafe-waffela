import { Hero } from "@/components/cafe/Hero";
import { MenuHighlights } from "@/components/cafe/MenuHighlights";
import { OrderOnline } from "@/components/cafe/OrderOnline";
import { SocialHub } from "@/components/cafe/SocialHub";
import { InstagramCTA } from "@/components/cafe/InstagramCTA";
import { Footer } from "@/components/cafe/Footer";
import { db } from "@/lib/db";
import { wallOfFameTable } from "@/lib/db/schema/walloffame";
import { SocialProofToast } from "@/components/cafe/SocialProofToast";
import { desc } from "drizzle-orm";
import { getSiteSettings, getMenuItems, getOpeningHours } from "@/lib/db";
import ReviewSlider from "@/components/cafe/ReviewSlider";

export default async function HomePage() {
  const settingsData = await getSiteSettings().catch(() => null);
  const settings = settingsData || ({} as any);
  const menuItems = await getMenuItems().catch(() => []);
  const openingHours = await getOpeningHours().catch(() => []);
  const wallItems = await db
    .select()
    .from(wallOfFameTable)
    .orderBy(desc(wallOfFameTable.id))
    .catch(() => []);

  return (
    <main className="min-h-screen">
      <SocialProofToast />

      <Hero
        tagline={settings?.heroTagline}
        googleMapsUrl={settings?.googleMapsUrl}
      />
      <MenuHighlights items={menuItems} />
      <OrderOnline settings={settings} />
      <ReviewSlider
        items={wallItems}
        googleReviewUrl={settings?.googleMapsUrl}
      />
      <InstagramCTA settings={settings} />
      <SocialHub settings={settings} openingHours={openingHours} />
      <Footer settings={settings} />
    </main>
  );
}
