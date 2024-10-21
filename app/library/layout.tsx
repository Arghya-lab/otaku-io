function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pb-24 xs:pb-6 xs:pl-20">
      <h2 className="py-3 pl-3 text-2xl capitalize">library</h2>
      {children}
    </main>
  );
}

export default Layout;
