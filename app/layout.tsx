import AuthProvider from "@/components/providers/AuthProvider";
import PreferencesProvider from "@/components/providers/PreferenceProvider";
// import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import PageContentWrapper from "@/components/PageContentWrapper";
import { ThemeProvider } from "@/components/providers/themeProvider";
import TopNavbar from "@/components/TopNavbar";
import connectDB from "@/db/db";
import { barlow, poppins } from "@/utils/fonts";
import type { Metadata, Viewport } from "next";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();

  return (
    <html lang="en" id="App" className="dark">
      <body className={`${poppins} ${barlow} relative w-full font-poppins`}>
        {/* <ReactQueryProvider> */}
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PreferencesProvider>
              <div className="fixed -z-20 h-screen w-screen bg-cover" />
              <TopNavbar />
              <PageContentWrapper>{children}</PageContentWrapper>
            </PreferencesProvider>
          </ThemeProvider>
        </AuthProvider>
        {/* </ReactQueryProvider> */}
      </body>
    </html>
  );
}
