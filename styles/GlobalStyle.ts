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
    src: url('/fonts/IntelOneMono-Bold.ttf');
    font-weight: 700;
    font-weight: normal;
    font-style: normal;
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
