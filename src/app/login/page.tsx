"use client";

import { signIn } from "next-auth/react";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // callbackUrl: "/admin" sorgt dafür, dass du nach dem Login direkt im Dashboard landest
      await signIn("github", { callbackUrl: "/admin" });
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-black italic">
            Cafe <span className="text-primary not-italic">Waffela</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Admin Login
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-4 bg-foreground text-background rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Github size={20} />
          )}
          {isLoading ? "VERBINDET..." : "MIT GITHUB ANMELDEN"}
        </button>

        <div className="space-y-4">
          <p className="text-[10px] text-muted-foreground px-4 leading-relaxed">
            Nur autorisierte Administratoren haben Zugriff auf das Dashboard.
          </p>

          {/* Kleiner technischer Hinweis (optional) */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-[9px] uppercase tracking-tighter text-muted-foreground/40 font-mono">
              Secure Environment • Admin Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
