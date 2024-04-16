import Tooltip from "rc-tooltip";
import { JSXElementConstructor, ReactElement } from "react";

function PopupToolTip({
  element,
  name,
}: {
  element: ReactElement<any, string | JSXElementConstructor<any>>;
  name: string;
}) {
  return (
    <Tooltip
      placement="top"
      showArrow={false}
      overlayClassName="bg-opacity-0"
      overlayInnerStyle={{
        background: "#000",
        color: "#fff",
        textTransform: "capitalize",
        border: "transparent",
        borderRadius: "0.25rem",
      }}
      trigger={["hover"]}
      overlay={<span>{name}</span>}>
      {element}
    </Tooltip>
  );
}

export default PopupToolTip;
