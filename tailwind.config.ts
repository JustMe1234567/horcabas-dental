import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#062B49",
        "deep-navy": "#04243D",
        dental: "#1598C7",
        "dental-dark": "#0F83AD",
        "light-blue": "#EAF6FB",
        "pale-blue": "#F4FAFD",
        heading: "#0B2F4A",
        body: "#465A66",
        muted: "#6B7C87",
        border: "#DCEAF1",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(6, 43, 73, 0.09)",
      },
    },
  },
  plugins: [],
};

export default config;
