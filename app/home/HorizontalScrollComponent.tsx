"use client";

import { DragManager } from "@/utils/dragManager";
import classNames from "classnames";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { isMobile } from "react-device-detect";
import {
  ScrollMenu,
  VisibilityContext,
  publicApiType,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const HorizontalScrollComponent = ({
  childComponents,
}: {
  childComponents: React.ReactElement[];
}) => {
  const dragState = React.useRef(new DragManager());
  const onMouseDown = React.useCallback(
    () => dragState.current.dragStart,
    [dragState]
  );
  const onMouseUp = React.useCallback(
    () => dragState.current.dragStop,
    [dragState]
  );

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div onMouseLeave={dragState.current.dragStop} className="px-2 xxs:px-4">
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        // onInit={restorePosition}
        // onScroll={savePosition}
        // onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={handleDrag}
      >
        {childComponents}
      </ScrollMenu>
    </div>
  );
};

const LeftArrow = React.memo(() => {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  if (isMobile) return null;

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={visibility.scrollPrev}
      className="left absolute left-4 top-[76px] z-50 flex h-10 w-10 items-center justify-center rounded-full xs:top-[112px]"
    >
      <ChevronLeft strokeWidth={2.75} className="text-accent" />
    </Arrow>
  );
});
LeftArrow.displayName = "LeftArrow";

const RightArrow = React.memo(() => {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", false);

  if (isMobile) return null;

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={visibility.scrollNext}
      className="right absolute right-4 top-[112px] z-50 flex h-10 w-10 items-center justify-center rounded-full"
    >
      <ChevronRight strokeWidth={2.75} className="text-accent" />
    </Arrow>
  );
});

const Arrow = ({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  className?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isPending, startTransition] = React.useTransition();

  return (
    <motion.button
      disabled={disabled}
      onClick={() => startTransition(onClick)}
      className={classNames(
        `arrow-${className}`,
        "cursor-pointer select-none bg-background",
        { "opacity-0": disabled }
      )}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
    >
      {children}
    </motion.button>
  );
};
RightArrow.displayName = "RightArrow";

export default HorizontalScrollComponent;
