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
    },
  },
  plugins: [],
};
export default config;
