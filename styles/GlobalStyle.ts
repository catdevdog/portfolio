// styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    /* Reset CSS */
    ${reset}
    html, body {
        color: #ffffff;
        background-color: #000000;
    }
`;
export default GlobalStyle;
