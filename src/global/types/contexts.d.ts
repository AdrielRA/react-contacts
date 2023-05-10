declare module "contexts-types" {
  type AppContextProps = {
    online: boolean;
  };

  type AuthContextProps = {
    logged?: boolean;
    signOut: () => void;
    signIn: () => void;
  };

  type AlertContextProps = {
    show: (
      props: import("props").AlertProps
    ) => PromiseLike<boolean | undefined>;
  };
}
