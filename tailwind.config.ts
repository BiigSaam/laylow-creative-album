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
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainGreen: "#33FF66",
        secondaryBlue: "#081C1A",
        bgColor:"rgb(6, 13, 12)",
        bgColorLighter:"rgba(13,47,43,0.1)",
        bgColorLight:"rgba(13,47,43,0.02)",
      },
      fontFamily: {
        kode: ["var(--font-kode-mono)", "monospace"],
        climate: ["var(--font-climate-crisis)", "sans-serif"],
        msOutline: ["var(--font-ms-outline)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
