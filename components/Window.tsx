import * as S from "@/components/Window.styles";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useRef } from "react";
import { useDragControls } from "framer-motion";
import { useStore } from "@/store/useStore";

export const Window = ({
  windowName,
  dragConstraintsRef,
}: {
  windowName: string;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const displayContent =
    windowName.charAt(0).toUpperCase() + windowName.slice(1);
  const dynamicImportPath = `@/components/content/${displayContent}`;

  const dragControls = useDragControls();
  const DynamicDisplay = useMemo(() => {
    return dynamic(() =>
      import(dynamicImportPath).then((mod) => mod[displayContent])
    );
  }, [displayContent]);

  const { windowPositions, setWindowPosition, removeWindow } = useStore(
    (state) => state
  );
  const handleCloseWindow = () => {
    const style = window.getComputedStyle(windowRef.current!);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const x = matrix.m41; // translateX
    const y = matrix.m42; // translateY
    setWindowPosition(windowName, {
      x,
      y,
    });
    removeWindow(windowName);
  };

  return (
    <S.Window
      ref={windowRef}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={dragConstraintsRef}
      id={`window ${windowName}`}
      initial={{
        x: windowPositions[windowName]?.x || 0,
        y: windowPositions[windowName]?.y || 0,
      }}
    >
      <S.WindowHeader
        onPointerDown={(event) => {
          // 헤더에서만 드래그 시작
          dragControls.start(event as React.PointerEvent<HTMLDivElement>);
        }}
      >
        <S.WindowTrafficLights>
          <S.WindowTrafficLight color="#FF5F57" onClick={handleCloseWindow} />
          <S.WindowTrafficLight color="#FFBD2E" />
          <S.WindowTrafficLight color="#27C93F" />
        </S.WindowTrafficLights>
        <S.WindowTitle>{windowName}</S.WindowTitle>
      </S.WindowHeader>
      <Suspense fallback={<div>Loading...</div>}>
        {DynamicDisplay && <DynamicDisplay />}
      </Suspense>
    </S.Window>
  );
};
