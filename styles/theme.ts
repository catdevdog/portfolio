// styles/theme.ts
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#6A1E55", // 주요 액센트 컬러
    secondary: "#A64D79", // 보조 액센트 컬러
    // background: "#1A1A1D", // 페이지 배경 컬러
    background: "#eee", // 페이지 배경 컬러
    text: "#121212", // 기본 텍스트 컬러
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  fontSizes: {
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    cmd: "1.6rem",
  },
  systemFontFamily: "IBMPlexMono",
  borderRadius: "8px", // 기본 모서리 반경
  windowHeader: {
    background: "#222", // 윈도우 헤더 배경색
  },
};
