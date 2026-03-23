import { Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-xl block">Cafe Waffela</span>
              <span className="text-sm text-white/60">Made with ❤️ in Lustenau</span>
            </div>
          </div>

          <div className="text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Cafe Waffela. All rights reserved.</p>
            <div className="mt-2 flex gap-4 justify-center md:justify-end">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Imprint</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
