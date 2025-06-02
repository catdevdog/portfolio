import * as S from "@/components/Window.styles";
import { useTransform, MotionValue } from "motion/react";

interface BackgroundConfig {
  id: string;
  yRange: [number, number];
  rotateXRange: [number, number];
  rotateYRange: [number, number];
  initialX: number;
  scale: number;
}

interface BackgroundRendererProps {
  config: BackgroundConfig;
  scrollYProgress: MotionValue<number>;
}

export const BackgroundRenderer = ({
  config,
  scrollYProgress,
}: BackgroundRendererProps) => {
  const y = useTransform(scrollYProgress, [0, 1], config.yRange);
  const rotateX = useTransform(scrollYProgress, [0, 1], config.rotateXRange);
  const rotateY = useTransform(scrollYProgress, [0, 1], config.rotateYRange);

  return (
    <S.Background3D
      style={{
        y,
        rotateX,
        rotateY,
        x: config.initialX,
        scale: config.scale,
        zIndex: -Math.floor(Math.random() * 5) - 1, // 랜덤한 z-index로 깊이감 추가
      }}
    >
      <div className="side front" />
      <div className="side left" />
      <div className="side right" />
      <div className="side top" />
      <div className="side bottom" />
      <div className="side back" />
    </S.Background3D>
  );
};
