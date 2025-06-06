// styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  ${reset}
  @font-face {
      font-style: normal;
      font-weight: 400;
      font-family: Pretendard-Regular;
      src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  }

  @font-face {
    font-style: normal;
    font-weight: 700;
    font-weight: normal;
    font-family: IntelOneMono;
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/intelone-mono-font-family-bold.woff2') format('woff2'),
      url('/fonts/IntelOneMono-Bold.woff2') format('woff2');
    font-display: swap;
  }

  html, body {
    overflow: hidden;
    height: calc(var(--vh, 1vh) * 100);

    background-color: #000;

    color: #fff;
    max-width: 100vw;
  }

  *:active, *:focus, *:focus-within, *:focus-visible {
    outline: none;
  }
`;
export default GlobalStyle;
