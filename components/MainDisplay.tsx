import * as S from "@/components/MainDisplay.styles";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";

export const MainDisplay = () => {
  const { displayState } = useStore((state) => state);
  const displayName =
    displayState.charAt(0).toUpperCase() + displayState.slice(1);
  const dynamicImportPath = `@/components/display/${displayName}`;

  const DynamicDisplay = useMemo(() => {
    return dynamic(() =>
      import(dynamicImportPath).then((mod) => mod[displayName])
    );
  }, [displayName]);

  return (
    <S.MainDisplay>
      <h1>
        {displayName}-{displayState} Display
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        {DynamicDisplay && displayState.length > 0 && <DynamicDisplay />}
      </Suspense>
    </S.MainDisplay>
  );
};
