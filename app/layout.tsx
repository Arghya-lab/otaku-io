import type { Metadata, Viewport } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";
import connectDB, { isMongoConnected } from "@/db/db";
import AuthProvider from "./AuthProvider";
import { themes } from "@/theme";
import PreferencesProvider from "@/app/PreferenceProvider";
import { cookies } from "next/headers";
import { CookiesProvider } from "next-client-cookies/server";
import { getServerSession } from "next-auth";
import Preference from "@/models/Preference";

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

export const metadata: Metadata = {
  title: "Otaku-io",
  description: "Otaku-io: Watch anime for free.",
  manifest: "/manifest.json",
  generator: "Next.js",
  keywords: [
    "Otaku-io",
    "ad free anime app",
    "anime app",
    "anime",
    "anime free",
  ],
  authors: [
    {
      name: "Arghya Lab",
      url: "https://github.com/Arghya-lab",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/logo-512x512.png" },
    { rel: "icon", url: "icons/logo-512x512.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
};

export const getUserTheme = async () => {
  let themeId: undefined | number;

  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (userEmail) {
    const userPreference = await Preference.findOne({
      email: userEmail,
    }).select("themeId");
    themeId = userPreference.themeId;
  }

  let themeCookie = cookies().get("themeId");
  themeId = themeId ? themeId : Number(themeCookie?.value || 1);

  return themes.find((theme) => theme.id === themeId) || themes[0];
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isMongoConnected) await connectDB();
  const theme = await getUserTheme();

  return (
    <html lang="en">
      <AuthProvider>
        <CookiesProvider>
          <PreferencesProvider>
            <body
              id="App"
              className={`${poppins_init.variable} ${nunito_Sans_init.variable} font-poppins w-full relative`}>
              <div
                className="fixed -z-20 w-screen h-screen bg-cover"
                style={{
                  backgroundColor: theme.primaryColor,
                  background: theme.bgImg,
                }}
              />
              {children}
            </body>
          </PreferencesProvider>
        </CookiesProvider>
      </AuthProvider>
    </html>
  );
}
