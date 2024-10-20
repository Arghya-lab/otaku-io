function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="xs:pl-20">
      <h2 className="py-3 pl-3 text-2xl capitalize">continue watching</h2>
      {children}
    </main>
  );
}

export default Layout;
