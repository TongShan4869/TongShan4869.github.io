import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#4EC5D4",
        secondary: "#888888",
      },
      fontFamily: {
        display: ['"Inter Display"', "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: {
        site: "1480px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
      },
      animation: {
        marquee: "marquee 240s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
