import { Instagram, Camera } from "lucide-react";

export function InstagramCTA({ settings }: { settings: any }) {
  const handle = settings?.instagramHandle || "@waffela_lustenau";
  const igUrl = `https://instagram.com/${handle.replace("@", "")}`;

  return (
    <section className="py-24 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#D70F64] font-bold tracking-wider uppercase text-sm">
            <Instagram size={20} /> #CafeWaffela auf Instagram
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight text-[#2D1B0D]">
            Follow our sweet journey <br />
            <span className="text-[#D70F64] italic">{handle}</span> 🧇
          </h2>
          <p className="text-[#2D1B0D]/70 text-lg max-w-md">
            Stay up to date with our latest creations, special offers, and sweet
            moments.
          </p>
          <a
            href={igUrl}
            target="_blank"
            className="inline-block px-10 py-4 rounded-full bg-[#2D1B0D] text-white font-bold text-lg hover:bg-black transition-colors"
          >
            Wir auf Instagram folgen
          </a>
        </div>

        <div className="relative p-10 bg-[#FFF9E5] rounded-[3rem] text-center border-2 border-dashed border-[#D70F64]/20">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Camera size={32} className="text-[#D70F64]" />
          </div>
          <h3 className="text-2xl font-bold font-display italic mb-4 text-[#2D1B0D]">
            Waffela in the Wild 📸
          </h3>
          <p className="text-[#2D1B0D]/70 mb-8">
            Snap a pic of your perfect waffle, tag{" "}
            <span className="font-bold">{handle}</span>, and you might find
            yourself on our wall of fame!
          </p>
          <div className="font-bold text-[#D70F64] tracking-widest uppercase text-sm">
            Share Your Photo
          </div>
        </div>
      </div>
    </section>
  );
}
