import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate"; // ✅ ES module import

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        glass: {
          primary: "hsl(var(--glass-primary))",
          secondary: "hsl(var(--glass-secondary))",
          tertiary: "hsl(var(--glass-tertiary))",
          border: "hsl(var(--glass-border))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          glow: "hsl(var(--primary-glow))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",

        whatsapp: {
          green: "hsl(var(--whatsapp-green))",
          light: "hsl(var(--whatsapp-light))",
        },
        message: {
          sent: "hsl(var(--message-sent))",
          received: "hsl(var(--message-received))",
        },

        hover: "hsl(var(--hover))",

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glass-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
            backdropFilter: "blur(0px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            backdropFilter: "blur(20px)",
          },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0%)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6)",
          },
        },
        "typing": {
          "0%, 60%, 100%": { transform: "translateY(0px)" },
          "30%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glass-fade-in": "glass-fade-in 0.5s ease",
        "slide-up": "slide-up 0.4s ease",
        "slide-in-left": "slide-in-left 0.3s ease",
        "fade-in": "fade-in 0.3s ease",
        "scale-in": "scale-in 0.2s ease",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typing": "typing 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [animatePlugin], // ✅ FIXED
};

export default config;
