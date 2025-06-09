import "styled-components";

// styled-components의 DefaultTheme 인터페이스에 theme 타입을 병합
declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark"; // 테마 모드
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      cmd: string; // 추가된 커맨드 폰트 사이즈
    };
    systemFontFamily: string;
    borderRadius: string;
    windowHeader: {
      background: string; // 윈도우 헤더 배경색
    };
    media: {
      mobile: string;
    };
  }
}
