import { Hero } from "@/components/cafe/Hero";
import { MenuHighlights } from "@/components/cafe/MenuHighlights";
import { OrderOnline } from "@/components/cafe/OrderOnline";
import { ReviewSlider } from "@/components/cafe/ReviewSlider";
import { InstagramFeed } from "@/components/cafe/InstagramFeed";
import { SocialHub } from "@/components/cafe/SocialHub";
import { Footer } from "@/components/cafe/Footer";
import { FloatingWhatsApp } from "@/components/cafe/FloatingWhatsApp";
import { SocialProofToast } from "@/components/cafe/SocialProofToast";
import { SchemaMarkup } from "@/components/cafe/SchemaMarkup";
import { db } from "@/lib/db";
import { siteSettingsTable } from "@/lib/db/schema";

export const revalidate = 60;

export default async function HomePage() {
  const [settings] = await db.select().from(siteSettingsTable).limit(1).catch(() => [null]);

  return (
    <>
      <SchemaMarkup />
      <main>
        <Hero tagline={settings?.heroTagline} googleMapsUrl={settings?.googleMapsUrl} />
        <MenuHighlights />
        <OrderOnline
          foodoraUrl={settings?.foodoraUrl}
          lieferandoUrl={settings?.lieferandoUrl}
        />
        <ReviewSlider googleReviewUrl={settings?.googleReviewUrl} />
        <InstagramFeed instagramHandle={settings?.instagramHandle} />
        <SocialHub
          address={settings?.address}
          phone={settings?.phone}
          googleMapsUrl={settings?.googleMapsUrl}
          instagramHandle={settings?.instagramHandle}
        />
        <Footer />
      </main>
      <FloatingWhatsApp whatsappNumber={settings?.whatsappNumber} />
      <SocialProofToast />
    </>
  );
}
