import { Instagram } from "lucide-react";

interface InstagramFeedProps {
  instagramHandle?: string | null;
}

export function InstagramFeed({ instagramHandle }: InstagramFeedProps) {
  const handle = instagramHandle?.replace("@", "") ?? "waffela_lustenau";
  const profileUrl = `https://www.instagram.com/${handle}/`;

  return (
    <section className="py-24 bg-card border-y border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-instagram text-white shadow-lg mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <Instagram className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-4">
            #CafeWaffela auf Instagram
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow our sweet journey{" "}
            <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              @{handle}
            </a>
          </p>
        </div>

        <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 text-center border border-border shadow-sm mb-12">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-200 to-orange-300 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
            🧇
          </div>
          <h3 className="text-2xl font-bold text-foreground font-display mb-3">@{handle}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stay up to date with our latest creations, special offers, and sweet moments.
          </p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-instagram text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            <Instagram className="w-6 h-6" />
            Wir auf Instagram folgen
          </a>
        </div>

        <div className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border border-border">
          <h3 className="text-2xl font-bold text-foreground font-display mb-3">Waffela in the Wild 📸</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Snap a pic of your perfect waffle, tag{" "}
            <strong className="text-foreground">@{handle}</strong>, and you might just find yourself featured on our wall of fame!
          </p>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-full bg-white text-foreground border border-border font-bold shadow-sm hover:shadow hover:-translate-y-1 transition-all duration-300"
          >
            Share Your Photo
          </a>
        </div>
      </div>
    </section>
  );
}
