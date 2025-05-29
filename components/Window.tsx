import * as S from "@/components/Window.styles";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";

export const Window = ({
  displayName,
  dragConstraintsRef,
}: {
  displayName: string;
  dragConstraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const displayContent =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const dynamicImportPath = `@/components/content/${displayContent}`;

  const DynamicDisplay = useMemo(() => {
    return dynamic(() =>
      import(dynamicImportPath).then((mod) => mod[displayContent])
    );
  }, [displayContent]);

  return (
    <S.Window drag dragConstraints={dragConstraintsRef}>
      <S.WindowHeader>
        <S.WindowTrafficLights>
          <S.WindowTrafficLight color="#FF5F57" />
          <S.WindowTrafficLight color="#FFBD2E" />
          <S.WindowTrafficLight color="#27C93F" />
        </S.WindowTrafficLights>
        <S.WindowTitle>{displayName}</S.WindowTitle>
      </S.WindowHeader>
      <Suspense fallback={<div>Loading...</div>}>
        {DynamicDisplay && <DynamicDisplay />}
      </Suspense>
    </S.Window>
  );
};
