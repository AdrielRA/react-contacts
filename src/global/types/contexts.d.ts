declare module "contexts-types" {
  type AppContextProps = {
    online: boolean;
  };

  type AuthContextProps = {
    logged?: boolean;
    signOut: () => void;
    signIn: () => void;
  };

  type ThemeContextProps = {
    theme: import("@mui/material").Theme;
    mode: import("@mui/material").PaletteMode;
    toggleColorMode: () => void;
  };

  type AlertContextProps = {
    show: (
      props: import("props").AlertProps,
    ) => PromiseLike<boolean | undefined>;
  };
}
