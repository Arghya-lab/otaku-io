import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";
import chroma from "chroma-js";
import { getUserTheme } from "../layout";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getUserTheme();

  return (
    <>
      <TopNavbar />
      <div className="relative h-full">
        <SideNavbar pathName="/setting" />
        <main
          className="mb-16 h-full px-8 pb-4 pt-8 xs:mb-0 xs:ml-20 xs:px-12 xs:pt-8"
          style={{ color: chroma(theme.textColor).alpha(0.8).hex() }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
