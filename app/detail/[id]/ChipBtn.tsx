"use client";

import { shade } from "@/utils/color";
import Link from "next/link";
import { useState } from "react";

function ChipBtn({ name, color = "#fff" }: { name: string; color: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/discover?genres=${encodeURIComponent(JSON.stringify([name]))}`}
      className="h-fit w-fit rounded-full border-2 px-2.5 py-1 text-slate-100"
      style={{
        backgroundColor: isHovered ? shade(color, -2, 0.1).toString() : "unset",
        // color: isHovered ? shade(color, -2)  : "white",
        borderColor: isHovered
          ? shade(color, 0).toString()
          : shade(color, 0, 0.4).toString(),
        transition: "color 0.3s, border-color 0.3s",
      }}
      role="button"
    >
      <span className="text-sm capitalize">{name}</span>
    </Link>
  );
}

export default ChipBtn;
