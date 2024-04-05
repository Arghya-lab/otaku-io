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
        <SideNavbar pathName="/library" />
        {children}
      </div>
    </>
  );
}

export default Layout;
