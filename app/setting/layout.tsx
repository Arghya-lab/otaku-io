async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mb-16 h-full px-8 pb-4 pt-8 xs:mb-0 xs:ml-20 xs:px-12 xs:pt-8">
      {children}
    </main>
  );
}

export default Layout;
