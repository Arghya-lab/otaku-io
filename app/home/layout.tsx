export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="pb-16 xs:pb-0 xs:pl-20">{children}</main>;
}
