import TopNavbar from "@/components/TopNavbar";
import SideNavbar from "@/components/SideNavbar";
import { getUserTheme } from "../layout";
import chroma from "chroma-js";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getUserTheme();

  return (
    <>
      <TopNavbar />
      <div className="h-full relative">
        <SideNavbar pathName="/setting" />
        <main
          className="xs:ml-20 mb-16 xs:mb-0 pt-8 xs:pt-8 pb-4 px-8 xs:px-12 h-full"
          style={{ color: chroma(theme.textColor).alpha(0.8).hex() }}>
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
