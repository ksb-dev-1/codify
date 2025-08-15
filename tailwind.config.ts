import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary_light: "#eef2ff",
        primary: "#4f46e5",
        primary_dark: "#4338ca",
      },
      borderColor: {
        DEFAULT: "#cbd5e1",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        "inner-strong": "inset 0 0 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
