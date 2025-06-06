import * as S from "@/components/Window.styles";
import { useStore } from "@/store/useStore";
import {
  useAnimation,
  useDragControls,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { BackgroundRenderer } from "./BackgroundRenderer";

// Background3D 개수
const BACKGROUND_3D_COUNT = 3;

// 랜덤 값 생성
const getRandomRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

// 랜덤 설정 생성
const generateRandomTransforms = () => ({
  yRange: [getRandomRange(10, 800), getRandomRange(200, 1500)] as [
    number,
    number
  ],
  rotateXRange: [getRandomRange(-100, 100), getRandomRange(-100, 100)] as [
    number,
    number
  ],
  rotateYRange: [getRandomRange(-100, 100), getRandomRange(-100, 100)] as [
    number,
    number
  ],
  xRange: [getRandomRange(-100, 800), getRandomRange(-100, 1200)] as [
    number,
    number
  ],
  scale: getRandomRange(0.5, 5),
});

type TypeWindowData = {
  name: string;
  state: boolean;
  focus: boolean; // 포커스 상태
};

export const Window = ({
  windowData,
  dragConstraintsRef,
}: {
  windowData: TypeWindowData;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [windowAnimating, setWindowAnimating] = useState<boolean>(false);
  const [maximumState, setMaximumState] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);

  const { scrollYProgress } = useScroll({ container: scrollTargetRef });
  const scrollPer = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const {
    windowPositions,
    setWindowPosition,
    removeWindow,
    addSystemCommandHistory,
  } = useStore((state) => state);

  // Background3D 설정 메모이제이션
  const background3DConfigs = useMemo(
    () =>
      Array.from({ length: BACKGROUND_3D_COUNT }, (_, index) => ({
        id: `bg3d-${index}`,
        ...generateRandomTransforms(),
      })),
    []
  );

  const displayContent =
    windowData.name.charAt(0).toUpperCase() + windowData.name.slice(1);

  const dragControls = useDragControls();
  const animateControls = useAnimation();
  const DynamicDisplay = useMemo(() => {
    if (displayContent === "Profile") {
      return dynamic(
        () =>
          import("@/components/content/Profile").then(
            (mod) => mod[displayContent]
          ),
        { ssr: false }
      );
    }
    if (displayContent === "Project") {
      return dynamic(
        () =>
          import("@/components/content/Project").then(
            (mod) => mod[displayContent]
          ),
        { ssr: false }
      );
    }
    return null;
  }, [displayContent]);

  // window control
  const saveWindowPosition = async () => {
    const style = window.getComputedStyle(windowRef.current!);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const x = matrix.m41;
    const y = matrix.m42;
    setWindowPosition(windowData.name, { x, y });
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
        removeWindow(windowData.name);
      });
    addSystemCommandHistory(`${windowData.name} 종료`);
  };

  // 최대화
  const handleMaximizeWindow = () => {
    if (!maximumState) saveWindowPosition();
    setMaximumState((prev) => !prev);
  };

  /** useEffect */

  // 최대화 상태 변경 애니메이션
  useEffect(() => {
    if (isInitialMount) return;

    setWindowAnimating(true);
    animateControls
      .start({
        x: maximumState ? 0 : windowPositions[windowData.name]?.x || 0,
        y: maximumState ? 0 : windowPositions[windowData.name]?.y || 0,
        width: maximumState ? "100%" : "auto",
        height: maximumState ? "100%" : "auto",
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 40,
        },
        zIndex: maximumState ? 1000 : 1,
      })
      .then(() => {
        setWindowAnimating(false);
      });
  }, [maximumState]);

  // 초기 마운트 애니메이션 + 스크롤 핸들러 등록
  useEffect(() => {
    if (!isInitialMount) return;

    animateControls
      .start({
        x: windowPositions[windowData.name]?.x || 0,
        y: windowPositions[windowData.name]?.y || 0,
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 350, damping: 40, delay: 0.2 },
      })
      .then(() => {
        setIsInitialMount(false);
      });
  }, []);

  return (
    <S.Window
      ref={windowRef}
      key={`${windowData.name}`}
      drag={!windowAnimating}
      dragControls={dragControls}
      dragConstraints={dragConstraintsRef}
      dragElastic={0.2}
      dragListener={false}
      dragMomentum={false}
      id={`window ${windowData.name}`}
      initial={{
        x: windowPositions[windowData.name]?.x || 0,
        y: windowPositions[windowData.name]?.y || 0,
        scale: 0,
        opacity: 0,
      }}
      animate={animateControls}
      onDragEnd={onDragEnd}
      style={{
        zIndex: windowData.focus ? 1000 : 1,
      }}
    >
      <S.WindowHeader
        onPointerDown={(e) => {
          if (!windowAnimating) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleMaximizeWindow();
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
        <S.WindowTitle>{windowData.name}</S.WindowTitle>
      </S.WindowHeader>

      <S.ScrollPercentageBar
        style={{
          scaleX: scrollPer,
          transformOrigin: "0 0",
        }}
        // initial={{ scaleX: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />

      {/* 다중 Background3D 렌더링 */}
      {background3DConfigs.map((config) => (
        <BackgroundRenderer
          key={config.id}
          config={config}
          scrollYProgress={scrollYProgress}
        />
      ))}

      <S.WindowContent ref={scrollTargetRef} $maximized={maximumState}>
        <Suspense fallback={<div>Loading...</div>}>
          {DynamicDisplay && <DynamicDisplay />}
        </Suspense>
      </S.WindowContent>
    </S.Window>
  );
};
