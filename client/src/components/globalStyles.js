import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bodyPrimary};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .color-nav {
    background-color: ${({ theme }) => theme.bodyPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.bodySecondary};
    margin-bottom: 3px;
  }

  .form-control {
      background: ${({ theme }) => theme.bodyPrimary};
      color: ${({ theme }) => theme.text};
  }

  .form-control:focus {
    background: ${({ theme }) => theme.bodySecondary};
    color: ${({ theme }) => theme.text};
  }

  /* Track */
    ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bodySecondary}; 
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollHandle}; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollHandle}; 
    }
  `
