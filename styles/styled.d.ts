import 'styled-components';

// styled-components의 DefaultTheme 인터페이스에 theme 타입을 병합
declare module 'styled-components' {
  export interface DefaultTheme {
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
    };
    borderRadius: string;
  }
}