import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        foreground: "#1A1A1A",
        accent: "#2A1363",
        dark: "#0A0A12",
        muted: "#6B6B6B",
        border: "rgba(26, 26, 26, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "fluid-hero": "clamp(2.75rem, 6vw, 6.5rem)",
        "fluid-display": "clamp(2rem, 4vw, 4rem)",
        "fluid-section": "clamp(1.75rem, 3vw, 2.8rem)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "floatY 6s ease-in-out infinite",
        "float-slow": "floatYSlow 9s ease-in-out infinite",
        "float-delayed": "floatY 6s ease-in-out 2s infinite",
        "float-delayed-2": "floatY 6s ease-in-out 4s infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-ring": "spinRingX 12s linear infinite",
        "spin-ring-y": "spinRingY 16s linear infinite",
        "rotate-cube": "rotateCube 18s linear infinite",
        "rotate-cube-r": "rotateCubeReverse 22s linear infinite",
        "spin-diamond": "spinDiamond 14s linear infinite",
        "text-shimmer": "textShimmer 3s linear infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        floatYSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        spinRingX: {
          from: { transform: "rotateX(72deg) rotateZ(0deg)" },
          to: { transform: "rotateX(72deg) rotateZ(360deg)" },
        },
        spinRingY: {
          from: { transform: "rotateY(75deg) rotateX(15deg) rotateZ(0deg)" },
          to: { transform: "rotateY(75deg) rotateX(15deg) rotateZ(360deg)" },
        },
        rotateCube: {
          "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "100%": { transform: "rotateX(360deg) rotateY(720deg)" },
        },
        rotateCubeReverse: {
          "0%": { transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)" },
          "100%": { transform: "rotateX(-360deg) rotateY(-480deg) rotateZ(180deg)" },
        },
        spinDiamond: {
          "0%": { transform: "rotateX(45deg) rotateZ(0deg) rotateY(20deg)" },
          "100%": { transform: "rotateX(45deg) rotateZ(360deg) rotateY(20deg)" },
        },
        textShimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
