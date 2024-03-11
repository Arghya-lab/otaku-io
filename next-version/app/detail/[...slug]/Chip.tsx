import { shade } from "@/utils/color";

function Chip({
  name = "",
  value,
  color = "#fff",
}: {
  name?: string;
  value: any;
  color: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <div
      className="w-fit px-3 py-1 rounded-xl text-slate-100"
      style={{ backgroundColor: shade(color, -1, 0.2).toString() }}>
      {!!name && (
        <span className="capitalize font-nunito text-lg">{name} : </span>
      )}
      <span className="font-sans">{value}</span>
    </div>
  );
}

export default Chip;
