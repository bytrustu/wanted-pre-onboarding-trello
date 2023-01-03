import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: auto;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    touch-action: none;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
