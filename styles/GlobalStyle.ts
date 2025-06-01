// styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  ${reset}

  @font-face {
    font-family: 'DungGeunMo';
    src: url('/fonts/DungGeunMo.ttf');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'IBMPlexMono';
    src: url('/fonts/IBMPlexMono-Medium.ttf');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'IntelOneMono';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/intelone-mono-font-family-bold.woff2') format('woff2'),
      url('/fonts/IntelOneMono-Bold.woff2') format('woff2');
    font-weight: 700;
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  html, body {
    color: #ffffff;
    background-color: #000000;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
  }
  *:active, *:focus, *:focus-within, *:focus-visible {
    outline: none;
  }
`;
export default GlobalStyle;
