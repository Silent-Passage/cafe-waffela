import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F3",
        foreground: "#2C1A0E",
        card: "#FFFFFF",
        "card-foreground": "#2C1A0E",
        border: "#E5DDD0",
        input: "#E5DDD0",
        ring: "#F5A623",
        primary: {
          DEFAULT: "#F5A623",
          foreground: "#2C1A0E",
        },
        secondary: {
          DEFAULT: "#EDE8DF",
          foreground: "#2C1A0E",
        },
        muted: {
          DEFAULT: "#EDE8DF",
          foreground: "#7A6455",
        },
        accent: {
          DEFAULT: "#E8693C",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "#1C1410",
          foreground: "#F5F0EB",
          border: "#2E1F14",
          accent: "#2A1C14",
          "accent-foreground": "#F5F0EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
