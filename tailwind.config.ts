import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#000000",
        primary: "#21c662",
        // primary: "#deb25a",
        // primary: "#0812d9",
        primary300: "#1d1e29",
        primary900: "#282a2d",
        secondary: "#212121", //#1a1a1a, #19191a

        title: "#ffffff",
        subtitle: "#e2e8f0",
        accent: "#CCCCCC",
        tertiary: "#151030",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;

// #050cdd //blue
// #252734
// #1d1e29
