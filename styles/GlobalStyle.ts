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

  html, body {
    color: #ffffff;
    background-color: #000000;
  }
  *:active, *:focus, *:focus-within, *:focus-visible {
    outline: none;
  }
`;
export default GlobalStyle;
