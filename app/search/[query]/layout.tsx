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
      <SideNavbar pathName="/search" />
      <main className="xs:pl-20 flex flex-row">{children}</main>
    </>
  );
}

export default Layout;
