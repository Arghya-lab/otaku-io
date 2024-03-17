import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    typography: (theme: any) => ({}),
    screens: {
      xxs: "425px",
      xs: "640px",
      sm: "800px",
      md: "1000px",
      lg: "1300px",
      xl: "1600px",
    },
    fontFamily: {
      poppins: ["var(--font-poppins)"],
      nunito: ["var(--font-nunito)"],
    },
    extend: {
      screens: {
        "2xl": "1900px",
        "3xl": "2200px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
