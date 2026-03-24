import { Coffee, Instagram, Mail, Facebook } from "lucide-react";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer({ settings }: { settings?: any }) {
  const instagramHandle =
    settings?.instagramHandle?.replace("@", "") || "waffela_lustenau";
  const tiktokUrl =
    settings?.tiktokUrl || "https://www.tiktok.com/@cafe.waffela";
  const tiktokHandle = tiktokUrl.split("@")[1] || "cafe.waffela";

  const facebookUrl =
    settings?.facebookUrl ||
    "https://www.facebook.com/profile.php?id=61568617409002";

  const email = settings?.contactEmail || "waffelaa@outlook.com";

  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Logo & Branding */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Coffee className="text-primary-foreground" size={28} />
          </div>
          <div>
            <span className="font-display font-bold text-2xl block">
              {settings?.siteName || "Cafe Waffela"}
            </span>
            <span className="text-sm text-white/50">
              Made with ❤️ in Lustenau
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
            >
              <Instagram size={20} className="text-primary" />
              <span className="text-sm font-medium">@{instagramHandle}</span>
            </a>

            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
            >
              <div className="text-primary">
                <TikTokIcon size={20} />
              </div>
              <span className="text-sm font-medium">{tiktokHandle}</span>
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
            >
              <Facebook size={20} className="text-primary" />
              <span className="text-sm font-medium">Cafe Waffela</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors"
            >
              <Mail size={20} className="text-primary" />
              <span className="text-sm font-medium">{email}</span>
            </a>
          </div>

          <p className="text-white/30 text-xs mt-4 border-t border-white/5 pt-4">
            © {new Date().getFullYear()} {settings?.siteName || "Cafe Waffela"}.
            Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
