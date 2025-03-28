import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          black: "#333333", // Custom black
          grey: {
            light: "#cccccc", // Light grey
            DEFAULT: "#8c8c8c", // Default grey
            dark: "#4d4d4d", // Dark grey
          },
          white: "#ffffff", // Custom white
        },
      },
      backgroundImage: {
        "gradient-to-b-mirror": "linear-gradient(to bottom, #000000, #404040, #000000)", // Smooth mirror effect
        "gradient-text-reflect":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0))", // Text gradient
      },
      borderRadius: {
        "4xl": "2rem", // Extra rounded corners
      },
      spacing: {
        "header-height": "15rem", // Fixed height for the header
      },
      maskImage: {
        'gradient-linear':
          'linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0))',
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
      },
      boxShadow: {
        // Adding glow effect for border
        glaze: "0 0 20px rgba(255, 255, 255, 0.5)", // Soft white glaze glow
      },
      borderWidth: {
        "1": "1px", // Custom border width
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Use Poppins/Roboto as the main font
        serif: ['Georgia', 'Times New Roman', 'serif'], // Serif for elegance
      },
      fontSize: {
        "2xl": "1.5rem", // Adjusting font sizes for better readability
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem", // Larger for emphasis
      },
      lineHeight: {
        relaxed: "1.75", // Relaxed line-height for easier reading
        snug: "1.375", // Tighter line-height for headings
      },
      letterSpacing: {
        wide: "0.05em", // Adds spacing between letters
        wider: "0.1em", // More spaced out for emphasis
      },
    },
  },
  plugins: [],
} satisfies Config;
