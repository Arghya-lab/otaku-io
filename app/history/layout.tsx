import TopNavbar from "@/components/TopNavbar";
import SideNavbar from "@/components/SideNavbar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavbar />
      <div className="h-full relative">
        <SideNavbar pathName="/history" />
        <main className="xs:pl-20">{children}</main>
      </div>
    </>
  );
}

export default Layout;
