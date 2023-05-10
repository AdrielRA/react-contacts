declare module "props" {
  type Props = {
    children: React.ReactNode;
  };

  type AlertOption = {
    key: string;
    show?: true;
    label?: string;
    callback?: () => void;
    variant?: "text" | "contained" | "outlined";
  };

  type AlertProps = {
    title: string;
    closable?: boolean;
    description: string;
  } & (
    | {
        type: "alert";
        timeout?: number;
        subtitle?: string;
        items?: string[];
        option?: { show: false } | Omit<AlertOption, "key">;
      }
    | {
        type: "error";
        timeout?: number;
        cancel?: { show: false } | Omit<AlertOption, "key">;
        retry?: { show: false } | Omit<AlertOption, "key">;
      }
    | {
        type: "confirm";
        cancel?: Omit<AlertOption, ["key", "show"]>;
        ok?: Omit<AlertOption, ["key", "show"]>;
      }
    | {
        type: "options";
        options: ({ show: false } | AlertOption)[];
      }
    | {
        type: "custom";
        children: React.ReactNode;
      }
  );
}
