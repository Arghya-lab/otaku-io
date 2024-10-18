"use client";

import Link from "next/link";

function ChipBtn({ name }: { name: string; color: string }) {
  return (
    <Link
      href={`/discover?genres=${encodeURIComponent(JSON.stringify([name]))}`}
      className="h-fit w-fit rounded-full border-2 px-2.5 py-1 text-slate-100"
      style={{
        // backgroundColor: isHovered ? shade(color, -2, 0.1).toString() : "unset",
        // // color: isHovered ? shade(color, -2)  : "white",
        // borderColor: isHovered
        //   ? shade(color, 0).toString()
        //   : shade(color, 0, 0.4).toString(),
        transition: "color 0.3s, border-color 0.3s",
      }}
      role="button"
    >
      <span className="text-sm capitalize">{name}</span>
    </Link>
  );
}

export default ChipBtn;
