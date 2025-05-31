import * as S from "@/components/Window.styles";
import { useStore } from "@/store/useStore";
import { animate, useAnimation, useDragControls } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, use, useEffect, useMemo, useRef, useState } from "react";

export const Window = ({
  windowName,
  dragConstraintsRef,
}: {
  windowName: string;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const [windowAnimating, setWindowAnimating] = useState<boolean>(false);
  const [maximumState, setMaximumState] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const { windowPositions, setWindowPosition, removeWindow } = useStore(
    (state) => state
  );
  const displayContent =
    windowName.charAt(0).toUpperCase() + windowName.slice(1);
  const dynamicImportPath = `@/components/content/${displayContent}`;

  const dragControls = useDragControls();
  const animateControls = useAnimation();

  const DynamicDisplay = useMemo(() => {
    return dynamic(() =>
      import(dynamicImportPath).then((mod) => mod[displayContent])
    );
  }, [displayContent]);

  const saveWindowPosition = async () => {
    const style = window.getComputedStyle(windowRef.current!);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const x = matrix.m41; // translateX
    const y = matrix.m42; // translateY
    console.log(`Saving position for ${windowName}: x=${x}, y=${y}`);
    setWindowPosition(windowName, {
      x,
      y,
    });
  };

  // 드래그 완료 시 좌표 저장
  const onDragEnd = () => {
    saveWindowPosition();
  };

  // 창 닫기
  const handleCloseWindow = () => {
    saveWindowPosition();
    animateControls
      .start({
        scale: 0,
        opacity: 0,
        transition: { type: "spring", stiffness: 350, damping: 40 },
      })
      .then(() => {
        removeWindow(windowName);
      });
  };

  // 최대화
  const handleMaximizeWindow = () => {
    if (!maximumState) saveWindowPosition();
    setMaximumState(!maximumState);
  };

  // 초기 마운트 애니메이션
  useEffect(() => {
    if (!isInitialMount) return;

    animateControls
      .start({
        x: windowPositions[windowName]?.x || 0,
        y: windowPositions[windowName]?.y || 0,
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 350, damping: 40, delay: 0.2 },
      })
      .then(() => {
        setIsInitialMount(false);
      });
  }, []);

  // 최대화 상태 변경 애니메이션
  useEffect(() => {
    if (isInitialMount) return;

    setWindowAnimating(true);
    animateControls
      .start({
        x: maximumState ? 0 : windowPositions[windowName]?.x || 0,
        y: maximumState ? 0 : windowPositions[windowName]?.y || 0,
        width: maximumState ? "100%" : "auto",
        height: maximumState ? "100%" : "auto",
        scale: 1, // 항상 1로 유지
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 40,
        },
        zIndex: maximumState ? 1000 : 1, // 최대화 상태에서 z-index 증가
      })
      .then(() => {
        setWindowAnimating(false);
      });
  }, [maximumState]);

  return (
    <S.Window
      ref={windowRef}
      key={`${windowName}`} // 키 변경을 통해 저장된 좌표로 초기화
      drag={!windowAnimating && !maximumState}
      dragControls={dragControls}
      dragConstraints={dragConstraintsRef}
      dragElastic={0.2}
      dragListener={false}
      dragMomentum={false}
      id={`window ${windowName}`}
      initial={{
        x: windowPositions[windowName]?.x || 0,
        y: windowPositions[windowName]?.y || 0,
        scale: 0,
        opacity: 0,
      }}
      animate={animateControls}
      onDragEnd={onDragEnd}
    >
      <S.WindowHeader
        onPointerDown={(e) => {
          if (!windowAnimating) {
            dragControls.start(e);
          }
        }}
      >
        <S.WindowTrafficLightWrap>
          <S.WindowTrafficLight
            color="#FF5F57"
            onClick={handleCloseWindow}
            className="close"
          />
          <S.WindowTrafficLight color="#FFBD2E" className="minimize" />
          <S.WindowTrafficLight
            className="maximize"
            color="#27C93F"
            onClick={handleMaximizeWindow}
          />
        </S.WindowTrafficLightWrap>
        <S.WindowTitle>{windowName}</S.WindowTitle>
      </S.WindowHeader>
      <S.WindowContent>
        <Suspense fallback={<div>Loading...</div>}>
          {DynamicDisplay && <DynamicDisplay />}
        </Suspense>
      </S.WindowContent>
    </S.Window>
  );
};
