import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavbar />
      <div className="relative h-full">
        <SideNavbar pathName="/history" />
        <main className="xs:pl-20">{children}</main>
      </div>
    </>
  );
}

export default Layout;
