function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-row xs:pl-20">{children}</main>;
}

export default Layout;
