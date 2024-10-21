function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="pb-24 xs:pb-6 xs:pl-20">{children}</main>;
}

export default Layout;
