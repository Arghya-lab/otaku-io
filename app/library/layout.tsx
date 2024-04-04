import TopNavbar from "@/components/TopNavbar";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full relative">
        <TopNavbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
