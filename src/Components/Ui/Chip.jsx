import PropType from "prop-types";
import { shade } from "../../utils/color";

function Chip({ name, value, color = "#fff" }) {
  if (!name && !value) {
    return <></>;
  }
  return (
    <div
      className="w-fit px-3 py-1 rounded-xl text-slate-100"
      style={{ backgroundColor: shade(color, -1, 0.2) }}>
      {name && (
        <span className="capitalize font-nunito text-lg">{name} : </span>
      )}
      <span className="font-sans">{value}</span>
    </div>
  );
}

Chip.propTypes = {
  name: PropType.string,
  value: PropType.any,
  color: PropType.string,
};

export default Chip;
