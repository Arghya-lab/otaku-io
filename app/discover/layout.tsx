import React, { Suspense } from "react";
import Filter from "./Filter";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row pb-24 pt-24 xs:pb-6 xs:pl-20">
      <Suspense>
        <Filter />
      </Suspense>
      <section className="min-h-svh min-w-full">{children}</section>
    </main>
  );
}

export default layout;
