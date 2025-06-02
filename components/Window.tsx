import * as S from "@/components/Window.styles";
import { useStore } from "@/store/useStore";
import {
  useAnimation,
  useDragControls,
  motion,
  useScroll,
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
  initialX: getRandomRange(-200, 1000),
  scale: getRandomRange(0.5, 5),
});

export const Window = ({
  windowName,
  dragConstraintsRef,
}: {
  windowName: string;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [scrollPer, setScrollPer] = useState<number>(0);
  const [windowAnimating, setWindowAnimating] = useState<boolean>(false);
  const [maximumState, setMaximumState] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);

  // Background3D 설정 메모이제이션
  const background3DConfigs = useMemo(
    () =>
      Array.from({ length: BACKGROUND_3D_COUNT }, (_, index) => ({
        id: `bg3d-${index}`,
        ...generateRandomTransforms(),
      })),
    []
  );

  const {
    windowPositions,
    setWindowPosition,
    removeWindow,
    addSystemCommandHistory,
  } = useStore((state) => state);

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
    const x = matrix.m41;
    const y = matrix.m42;
    setWindowPosition(windowName, { x, y });
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
    addSystemCommandHistory(`${windowName} 종료`);
  };

  // 최대화
  const handleMaximizeWindow = () => {
    if (!maximumState) saveWindowPosition();
    setMaximumState((prev) => !prev);
  };

  const { scrollYProgress } = useScroll({ container: scrollTargetRef });

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
        x: windowPositions[windowName]?.x || 0,
        y: windowPositions[windowName]?.y || 0,
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 350, damping: 40, delay: 0.2 },
      })
      .then(() => {
        setIsInitialMount(false);
      });

    const target = scrollTargetRef.current;
    if (!target) return;

    const handleScroll = () => {
      const percent =
        (target.scrollTop || 0) / (target.scrollHeight - target.clientHeight);
      setScrollPer(Number(percent.toFixed(2)));
    };

    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.Window
      ref={windowRef}
      key={`${windowName}`}
      drag={!windowAnimating}
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
        <S.WindowTitle>{windowName}</S.WindowTitle>
      </S.WindowHeader>

      <motion.div
        style={{
          position: "absolute",
          top: 38,
          left: 0,
          height: "4px",
          backgroundColor: "#27C93F",
          transformOrigin: "0 0",
          width: scrollPer * 100 + "%",
          zIndex: 10,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollPer }}
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
          <DynamicDisplay />
        </Suspense>
      </S.WindowContent>
    </S.Window>
  );
};
