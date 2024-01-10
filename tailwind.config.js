import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "425px",
      xs: "640px",
      sm: "800px",
      md: "1000px",
      lg: "1300px",
      xl: "1600px",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        nunito: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xl": "1900px",
        "3xl": "2200px",
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
};
