import { Nunito_Sans, Poppins } from "next/font/google";

export const poppins_init = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const nunito_Sans_init = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const poppins = poppins_init.variable;
export const nunito_Sans = nunito_Sans_init.variable;
