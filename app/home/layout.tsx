import SideNavbar from "@/components/SideNavbar";
import TopNavbar from "@/components/TopNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavbar />
      <SideNavbar pathName="/home" />
      <main className="pb-16 xs:pb-0 xs:pl-20">{children}</main>
    </>
  );
}
