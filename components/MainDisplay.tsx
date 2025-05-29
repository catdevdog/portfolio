import * as S from "@/components/MainDisplay.styles";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";

export const MainDisplay = ({ displayName }: { displayName: string }) => {
  const displayContent =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const dynamicImportPath = `@/components/content/${displayContent}`;

  const DynamicDisplay = useMemo(() => {
    return dynamic(() =>
      import(dynamicImportPath).then((mod) => mod[displayContent])
    );
  }, [displayContent]);

  return (
    <S.MainDisplay>
      <Suspense fallback={<div>Loading...</div>}>
        {DynamicDisplay && <DynamicDisplay />}
      </Suspense>
    </S.MainDisplay>
  );
};
