"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet } from "styled-components";

/**
 * App Router 환경에서 Styled-Components SSR을 위해
 * 서버 사이드에서 스타일 태그를 수집하고,
 * 최종 HTML <head>에 삽입하는 역할을 수행합니다.
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // ① ServerStyleSheet 인스턴스를 한 번만 생성
  const [styledComponentsStyleSheet] = React.useState(
    () => new ServerStyleSheet()
  );

  // ② useServerInsertedHTML을 통해 서버 사이드에서 HTML이 렌더링될 때 호출
  useServerInsertedHTML(() => {
    // collectStyles로 래핑된 컴포넌트 내부의 스타일을 추출
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // ③ 클라이언트 환경(브라우저)에서는 단순히 children을 렌더
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // ④ 서버 환경에서는 collectStyles로 children을 래핑
  return styledComponentsStyleSheet.collectStyles(
    <React.Fragment>{children}</React.Fragment>
  );
}
