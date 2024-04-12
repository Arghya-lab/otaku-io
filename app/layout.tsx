import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { CookiesProvider } from "next-client-cookies/server";
import connectDB from "@/db/db";
import AuthProvider from "@/components/providers/AuthProvider";
import PreferencesProvider from "@/components/providers/PreferenceProvider";
import { themes } from "@/theme";
import Preference from "@/models/Preference";
import { nunito_Sans, poppins } from "@/utils/fonts";
import "./globals.css";

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
  await connectDB();
  const theme = await getUserTheme();

  return (
    <html lang="en" id="App">
      <AuthProvider>
        <CookiesProvider>
          <PreferencesProvider>
            <body
              className={`${poppins} ${nunito_Sans} font-poppins w-full relative`}>
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
