import "styled-components";

declare module "styled-components" {
  interface ThemeColor {
    main: string;
    dark: string;
    light: string;
  }

  export interface DefaultTheme {
    title: string;
    colors: {
      text: ThemeColor;
      primary: ThemeColor;
      secondary: ThemeColor;
      background: ThemeColor;
    };
  }
}
