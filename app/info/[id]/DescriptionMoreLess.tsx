"use client";

import htmlParse from "html-react-parser";
import ShowMoreText from "react-show-more-text";

function DescriptionMoreLess({ description }: { description: string }) {
  return (
    <ShowMoreText
      lines={5}
      more={
        <span className="cursor-pointer text-accent-foreground">
          ...see more
        </span>
      }
      less={
        <span className="cursor-pointer text-accent-foreground">
          ...see less
        </span>
      }
      className="content-css"
      anchorClass="show-more-less-clickable"
      expanded={false}
      truncatedEndingComponent={"... "}
    >
      {htmlParse(description)}
    </ShowMoreText>
  );
}

export default DescriptionMoreLess;
