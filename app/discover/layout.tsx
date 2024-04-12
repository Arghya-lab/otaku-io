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
        <SideNavbar pathName="/discover" />
        <main className="xs:pl-20 pt-24 flex flex-row">{children}</main>
      </div>
    </>
  );
}

export default Layout;
