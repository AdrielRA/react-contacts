import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`	

* {
  ::-webkit-scrollbar {
      width: 8px;
      background-color: ${({ theme }) => theme.colors.background.light};
      border-radius: 10px;
    }
    ::-webkit-scrollbar:horizontal {
      height: 5px;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-horizontal {
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:horizontal {
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-radius: 10px;
    }
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;;
}`;
