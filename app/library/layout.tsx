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
      <div className="h-full relative">
        <SideNavbar pathName="/library" />
      </div>
      {children}
    </>
  );
}

export default Layout;
