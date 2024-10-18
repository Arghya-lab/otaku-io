import { Barlow, Poppins } from "next/font/google";

export const poppins_init = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const barlow_init = Barlow({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

export const poppins = poppins_init.variable;
export const barlow = barlow_init.variable;
