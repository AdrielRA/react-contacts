/* eslint-disable @typescript-eslint/ban-types */
declare module "react-imask" {
  import Imask from "imask";

  /**
   * Missing some types here, It would be great if someone
   * stepped in.
   */
  type masked<T> = T extends DateConstructor
    ? Imask.MaskedDate
    : T extends NumberConstructor
    ? Imask.MaskedNumber
    : T extends RegExpConstructor
    ? Imask.MaskedRegExp
    : T extends Function
    ? Imask.MaskedFunction
    : Imask.Masked<IMaskInputProps["mask"]>;

  interface InputMask<T extends Imask.AnyMaskedOptions> {
    el: Imask.MaskElement;
    masked: masked<T>;
    mask: T["mask"];
    value: string;
    unmaskedValue: string;
    typedValue: Imask.MaskedTypedValue<T["mask"]>;
    cursorPos: number;
    readonly selectionStart: number;

    alignCursor(): void;
    alignCursorFriendly(): void;
  }

  export interface IMaskInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    mask?: Imask.AnyMaskedOptions["mask"];
    value?: (typeof Imask.InputMask)["prototype"]["value"];
    unmask?: boolean;
    radix?: Imask.MaskedNumber["radix"];
    overwrite?: (typeof Imask.Masked)["prototype"]["overwrite"];
    placeholderChar?: (typeof Imask.MaskedPattern)["prototype"]["placeholderChar"];
    lazy?: (typeof Imask.MaskedPattern)["prototype"]["lazy"];
    definitions?: (typeof Imask.MaskedPattern)["prototype"]["definitions"];
    blocks?: (typeof Imask.MaskedPattern)["prototype"]["blocks"];
    pattern?: string;
    autofix?: boolean;
    thousandsSeparator?: string;
    mapToRadix?: string[];
    scale?: number;
    signed?: boolean;
    normalizeZeros?: boolean;
    min?: number;
    max?: number;
    onAccept?: (
      value: IMaskInputProps["value"],
      input: InputMask<IMaskInputProps["mask"]>,
      e: React.ChangeEvent<HTMLInputElement> | undefined,
    ) => void;
    onComplete?: (
      value: IMaskInputProps["value"],
      input: InputMask<IMaskInputProps["mask"]>,
      e: React.ChangeEvent<HTMLInputElement> | undefined,
    ) => void;
    inputRef?: (el: HTMLInputElement) => void;
    prepare?: (typeof Imask.Masked)["prototype"]["prepare"];
    validate?: (typeof Imask.Masked)["prototype"]["validate"];
    commit?: (typeof Imask.Masked)["prototype"]["commit"];
    format?: (value: Date) => string;
    parse?: (value: string) => Date;
    dispatch?: (typeof Imask.MaskedDynamic)["prototype"]["dispatch"];
  }

  export function IMaskMixin<T, D>(
    Component: React.ComponentType<{ inputRef: React.Ref<D> } & T>,
  ): React.ComponentType<T & IMaskInputProps>;

  export class IMaskInput extends React.Component<IMaskInputProps> {}
}
