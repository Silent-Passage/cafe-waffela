import { MapPin, Clock, Navigation, Phone } from "lucide-react";

interface SocialHubProps {
  settings?: any;
  openingHours: any[];
}

export function SocialHub({ settings, openingHours }: SocialHubProps) {
  const dayLabels: Record<string, string> = {
    Monday: "Montag",
    Tuesday: "Dienstag",
    Wednesday: "Mittwoch",
    Thursday: "Donnerstag",
    Friday: "Freitag",
    Saturday: "Samstag",
    Sunday: "Sonntag",
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold font-display mb-8">
            Besuch uns in <span className="text-primary italic">Lustenau</span>
          </h2>

          <div className="space-y-8">
            {/* Adresse */}
            <div className="flex gap-4">
              <MapPin className="text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-[#2D1B0D]">Adresse</h4>
                <p className="text-muted-foreground whitespace-pre-line">
                  {settings?.address || "Neudorfstraße 38\n6890 Lustenau"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-[#2D1B0D] mb-2">
                  Öffnungszeiten
                </h4>
                <div className="text-muted-foreground space-y-2 min-w-[250px]">
                  {openingHours
                    ?.sort((a, b) => (a.id || 0) - (b.id || 0))
                    .map((h) => {
                      // Hier nutzen wir jetzt exakt deine Schema-Namen: open, close, closed
                      const isClosed = h.closed === true;
                      const timeDisplay = isClosed
                        ? "Geschlossen"
                        : `${h.open} - ${h.close}`;

                      return (
                        <div
                          key={h.id}
                          className="flex justify-between border-b border-border/40 pb-1 gap-10"
                        >
                          <span className="font-medium text-[#2D1B0D]">
                            {dayLabels[h.day] || h.day}:
                          </span>
                          <span
                            className={
                              isClosed ? "text-red-500/80 font-medium" : ""
                            }
                          >
                            {timeDisplay}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex gap-6 pt-4">
              <a
                href={settings?.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform"
              >
                <Navigation size={18} /> Route
              </a>
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary font-bold hover:scale-105 transition-transform"
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
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Karte wird geladen...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
