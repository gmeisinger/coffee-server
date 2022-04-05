import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    scrollbar-color: ${({ theme }) => theme.scrollbar} ${({ theme }) => theme.scrollthumb};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .form-control {
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
  }
  `
