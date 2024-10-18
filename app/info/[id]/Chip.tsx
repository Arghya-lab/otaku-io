import { shade } from "@/utils/color";

function Chip({
  name = "",
  value,
  color = "#fff",
}: {
  name?: string;
  value?: string | number;
  color: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div
      className="w-fit rounded-xl px-3 py-1 text-slate-100"
      style={{ backgroundColor: shade(color, -1, 0.2).toString() }}
    >
      {!!name && (
        <span className="font-barlow text-lg capitalize">{name} : </span>
      )}
      <span className="font-sans">{value}</span>
    </div>
  );
}

export default Chip;
