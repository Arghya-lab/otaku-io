"use client";

import { usePathname } from "next/navigation";
import SideNavbar from "./SideNavbar";

function PageContentWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathnameMatch = pathname.match(
    /^\/(home|discover|history|library|search|setting)/
  );

  return (
    <div className="relative h-full">
      {pathnameMatch && <SideNavbar pathName={"/" + pathnameMatch[1]} />}
      {children}
    </div>
  );
}

export default PageContentWrapper;
