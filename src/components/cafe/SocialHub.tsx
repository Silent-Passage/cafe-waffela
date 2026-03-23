import { MapPin, Navigation, Clock, Phone, Instagram } from "lucide-react";

interface SocialHubProps {
  address?: string | null;
  phone?: string | null;
  googleMapsUrl?: string | null;
  instagramHandle?: string | null;
}

export function SocialHub({ address, phone, googleMapsUrl, instagramHandle }: SocialHubProps) {
  const handle = instagramHandle?.replace("@", "") ?? "waffela_lustenau";
  const mapsUrl = googleMapsUrl ?? "https://maps.google.com/?q=Cafe+Waffela+Lustenau";
  const mapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43141.52766026939!2d9.620025178652037!3d47.43389088691522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b09bc5a3d02b5%3A0xc3247c706e2eec02!2s6890%20Lustenau%2C%20Austria!5e0!3m2!1sen!2sus!4v1709841234567!5m2!1sen!2sus";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display mb-6">
              Join the <span className="text-primary italic">Waffela Family</span> 🧇
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              We can&apos;t wait to welcome you to our cozy corner in Lustenau. Come for the waffles, stay for the warmth.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">Location</h4>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {address ?? "Maria-Theresien-Straße 12\n6890 Lustenau, Austria"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">Opening Hours</h4>
                  <p className="text-muted-foreground">Mon - Sun: 09:00 - 18:00<br />Tuesdays closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg">Social</h4>
                  <a
                    href={`https://www.instagram.com/${handle}/`}
                    className="text-primary hover:underline font-medium"
                  >
                    @{handle}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10 bg-muted">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps – Cafe Waffela Lustenau"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-4 w-full justify-center mb-2">
                <span className="h-px w-8 bg-border" />
                As Seen On
                <span className="h-px w-8 bg-border" />
              </div>
              <span className="font-display text-xl text-foreground font-bold">Vorarlberg Food Blog</span>
              <span className="font-display text-xl text-foreground font-bold">Ländle Genuss</span>
              <span className="font-display text-xl text-foreground font-bold">Bregenz Eats</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
