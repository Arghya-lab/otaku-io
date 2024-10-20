function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="xs:pl-20">{children}</main>;
}

export default Layout;
