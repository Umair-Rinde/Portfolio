// tailwind.config.ts or tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 1s ease-out both",
        "slide-in": "slide-in 1s ease-out both",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(29,191,189,0.3)",
          },
          "50%": {
            opacity: "0.5",
            boxShadow: "0 0 30px rgba(29,191,189,0.5)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(10deg)",
          },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
