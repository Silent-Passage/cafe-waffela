import { MapPin, Clock, Instagram, Phone, Navigation } from "lucide-react";

interface SocialHubProps {
  settings?: any;
  openingHours: any[];
}

export function SocialHub({ settings, openingHours }: SocialHubProps) {
  const handle =
    settings?.instagramHandle?.replace("@", "") || "waffela_lustenau";

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold font-display mb-8">
            Besuch uns in <span className="text-primary italic">Lustenau</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="text-primary shrink-0" />
              <div>
                <h4 className="font-bold">Adresse</h4>
                <p className="text-muted-foreground whitespace-pre-line">
                  {settings?.address ||
                    "Maria-Theresien-Straße 12\n6890 Lustenau"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-primary shrink-0" />
              <div>
                <h4 className="font-bold">Öffnungszeiten</h4>
                <div className="text-muted-foreground space-y-1">
                  {openingHours
                    ?.sort((a, b) => (a.id || 0) - (b.id || 0))
                    .map((h) => (
                      <p key={h.id} className="flex justify-between gap-8">
                        <span className="font-medium">{h.day}:</span>{" "}
                        <span>{h.hours}</span>
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex gap-6 pt-4">
              <a
                href={settings?.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold"
              >
                <Navigation size={18} /> Route
              </a>
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary font-bold"
                >
                  <Phone size={18} /> Anrufen
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden h-[450px] shadow-2xl border-4 border-white">
          {settings?.googleMapsEmbedUrl ? (
            <iframe
              src={settings.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted text-muted-foreground">
              Karte wird geladen...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
