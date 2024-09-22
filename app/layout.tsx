import AuthProvider from "@/components/providers/AuthProvider";
import PreferencesProvider from "@/components/providers/PreferenceProvider";
// import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import PageContentWrapper from "@/components/PageContentWrapper";
import TopNavbar from "@/components/TopNavbar";
import connectDB from "@/db/db";
import Preference from "@/models/Preference";
import { themes } from "@/theme";
import { nunito_Sans, poppins } from "@/utils/fonts";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import { CookiesProvider } from "next-client-cookies/server";
import { cookies } from "next/headers";
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
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
    themeId = userPreference?.themeId;
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
      {/* <ReactQueryProvider> */}
      <AuthProvider>
        <CookiesProvider>
          <PreferencesProvider>
            <body
              className={`${poppins} ${nunito_Sans} relative w-full font-poppins`}
            >
              <div
                className="fixed -z-20 h-screen w-screen bg-cover"
                style={{
                  backgroundColor: theme.primaryColor,
                  background: theme.bgImg,
                }}
              />
              <TopNavbar />
              <PageContentWrapper>{children}</PageContentWrapper>
            </body>
          </PreferencesProvider>
        </CookiesProvider>
      </AuthProvider>
      {/* </ReactQueryProvider> */}
    </html>
  );
}
