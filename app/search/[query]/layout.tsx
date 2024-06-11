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
      <SideNavbar pathName="/search" />
      <main className="flex flex-row xs:pl-20">{children}</main>
    </>
  );
}

export default Layout;
