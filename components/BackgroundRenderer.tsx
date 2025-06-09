import * as S from "@/components/Window.styles";
import { useTransform, MotionValue } from "motion/react";

interface BackgroundConfig {
  id: string;
  xRange: [number, number];
  yRange: [number, number];
  rotateXRange: [number, number];
  rotateYRange: [number, number];
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
  const x = useTransform(scrollYProgress, [0, 1], config.xRange); // 모바일에서는 x값을 절반으로 줄임
  const y = useTransform(scrollYProgress, [0, 1], config.yRange);
  const rotateX = useTransform(scrollYProgress, [0, 1], config.rotateXRange);
  const rotateY = useTransform(scrollYProgress, [0, 1], config.rotateYRange);
  const scale = config.scale;

  return (
    <S.Background3D
      style={{
        x,
        y,
        rotateX,
        rotateY,
        scale,
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
