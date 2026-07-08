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
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          deep: "#0D1610",
          surface: "#16241B",
          hover: "#22382A",
        },
        stone: {
          grey: "#8C8578",
        },
        river: {
          sand: "#D4A373",
        },
        safety: {
          orange: "#F2542D",
          orangeHover: "#E03E16",
        },
        harness: {
          yellow: "#F2A93B",
        },
        text: {
          offwhite: "#F4F5F4",
          sage: "#A2AAA5",
        }
      },
    },
  },
  plugins: [],
};
export default config;
