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
      <main className="xs:pl-20 pb-16 xs:pb-0">{children}</main>
    </>
  );
}
