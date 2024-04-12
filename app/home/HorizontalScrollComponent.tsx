"use client";

import React from "react";
import {
  ScrollMenu,
  VisibilityContext,
  publicApiType,
} from "react-horizontal-scrolling-menu";
import { DragManager } from "@/utils/dragManager";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePreference } from "../../components/providers/PreferenceProvider";
import { themes } from "@/theme";
import chroma from "chroma-js";
import isMobileDevice from "@/utils/getIsMobileDevice";

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
        onMouseMove={handleDrag}>
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

  if (isMobileDevice()) return null

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={visibility.scrollPrev}
      className="left absolute z-50 left-4 top-[76px] xs:top-[112px] h-10 w-10 rounded-full flex items-center justify-center">
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

  if (isMobileDevice()) return null
  
  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={visibility.scrollNext}
      className="right absolute z-50 right-4 top-[112px] h-10 w-10 rounded-full flex items-center justify-center">
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
    <button
      disabled={disabled}
      onClick={() => startTransition(onClick)}
      className={"arrow" + `-${className}`}
      style={{
        cursor: "pointer",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        backgroundColor: chroma(theme.primaryColor).alpha(0.8).hex(),
      }}>
      {children}
    </button>
  );
};
RightArrow.displayName = "RightArrow";

export default HorizontalScrollComponent;
