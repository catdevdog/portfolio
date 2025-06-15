import * as S from "@/components/Window.styles";
import ICON_CLOSE from "@/public/icons/icon-close.png";
import ICON_MAXIMIZE from "@/public/icons/icon-maximize.png";
import ICON_REFRESH from "@/public/icons/icon-refresh.png";
import { useMobile } from "@/store/useMobile";
import { useStore } from "@/store/useStore";
import {
  useAnimation,
  useDragControls,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { BackgroundRenderer } from "./BackgroundRenderer";

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
  const isMobile = useMobile();
  const windowRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [windowRefreshKey, setWindowRefreshKey] = useState<number>(1);

  const [windowAnimating, setWindowAnimating] = useState<boolean>(false);
  const [maximumState, setMaximumState] = useState<boolean>(false);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);

  const { scrollYProgress } = useScroll({ container: scrollTargetRef });
  const scrollPer = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const {
    windowArr,
    windowPositions,
    setWindowPosition,
    removeWindow,
    addSystemCommandHistory,
  } = useStore((state) => state);

  // Background3D 개수
  const BACKGROUND_3D_COUNT = 4; // 모바일에서는 2개, 데스크탑에서는 4개

  // 랜덤 값 생성
  const getRandomRange = (min: number, max: number): number => {
    if (isMobile) {
      // 모바일에서는 절반
      return Math.random() * ((max - min) / 2) + min;
    }
    return Math.random() * (max - min) + min;
  };

  // 랜덤 설정 생성
  const generateRandomTransforms = () => ({
    xRange: [getRandomRange(-200, 800), getRandomRange(-200, 1200)] as [
      number,
      number
    ],
    yRange: [getRandomRange(-400, 800), getRandomRange(-400, 2000)] as [
      number,
      number
    ],
    rotateXRange: [getRandomRange(-150, 150), getRandomRange(-150, 150)] as [
      number,
      number
    ],
    rotateYRange: [getRandomRange(-150, 150), getRandomRange(-150, 150)] as [
      number,
      number
    ],
    scale: getRandomRange(0.5, 5),
  });

  // Background3D 설정 메모이제이션
  const background3DConfigs = useMemo(
    () =>
      Array.from({ length: BACKGROUND_3D_COUNT }, (_, index) => ({
        id: `bg3d-${index}`,
        ...generateRandomTransforms(),
      })),
    [windowRefreshKey]
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
  }, [displayContent, windowRefreshKey]);

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

  // 창 새로고침
  const handleRefreshWindow = () => {
    setWindowRefreshKey(Number((Math.random() * 1000).toFixed(2))); // 랜덤 키로 새로고침
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
      })
      .then(() => {
        setWindowAnimating(false);
      });
  }, [maximumState]);

  // 초기 마운트 애니메이션 + 스크롤 핸들러 등록
  useEffect(() => {
    if (!isInitialMount) return;

    // 첫 로드드 시 프로필 최대화 상태태로 오픈
    const isFirstLoad =
      windowArr.length === 1 && windowArr[0].name === "Profile";

    animateControls
      .start({
        x: windowPositions[windowData.name]?.x || 0,
        y:
          windowPositions[windowData.name]?.y ||
          (windowArr.map((item) => item.state).length - 1) * 60 ||
          100,
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 350, damping: 40, delay: 0.2 },
      })
      .then(() => {
        setIsInitialMount(false);
        if (isFirstLoad) {
          setMaximumState(true);
        }
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
          >
            <Image src={ICON_CLOSE} alt="창 닫기" width={10} height={10} />
          </S.WindowTrafficLight>
          <S.WindowTrafficLight
            onClick={handleRefreshWindow}
            color="#FFBD2E"
            className="minimize"
          >
            <Image
              src={ICON_REFRESH}
              alt="창 새로고침"
              width={12}
              height={12}
            />
          </S.WindowTrafficLight>
          <S.WindowTrafficLight
            className="maximize"
            color="#27C93F"
            onClick={handleMaximizeWindow}
          >
            <Image src={ICON_MAXIMIZE} alt="창 최대화" width={12} height={12} />
          </S.WindowTrafficLight>
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
