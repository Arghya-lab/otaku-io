"use client";

import { themes } from "@/theme";
import { DragManager } from "@/utils/dragManager";
import isMobileDevice from "@/utils/getIsMobileDevice";
import chroma from "chroma-js";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import {
  ScrollMenu,
  VisibilityContext,
  publicApiType,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { usePreference } from "../../components/providers/PreferenceProvider";

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
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  if (isMobileDevice()) return null;

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={visibility.scrollPrev}
      className="left absolute left-4 top-[76px] z-50 flex h-10 w-10 items-center justify-center rounded-full xs:top-[112px]"
    >
      <ChevronLeft strokeWidth={2.75} color={theme.secondaryColor} />
    </Arrow>
  );
});
LeftArrow.displayName = "LeftArrow";

const RightArrow = React.memo(() => {
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", false);

  if (isMobileDevice()) return null;

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={visibility.scrollNext}
      className="right absolute right-4 top-[112px] z-50 flex h-10 w-10 items-center justify-center rounded-full"
    >
      <ChevronRight strokeWidth={2.75} color={theme.secondaryColor} />
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
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const [_isPending, startTransition] = React.useTransition();

  return (
    <motion.button
      disabled={disabled}
      onClick={() => startTransition(onClick)}
      className={"arrow" + `-${className}`}
      style={{
        cursor: "pointer",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        backgroundColor: chroma(theme.primaryColor).alpha(0.8).hex(),
      }}
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
