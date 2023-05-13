import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React, { useState } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { Container } from "./styles";

type TextFieldProps = Omit<MuiTextFieldProps, "value"> & {
  mask?: InputMaskProps["mask"];
  maxLength?: number;
  endAdornment?: React.ReactNode;
  maskOptions?: Omit<InputMaskProps, "mask">;
  value?: string | number | readonly string[];
  resize?: "none" | "both" | "horizontal" | "vertical";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  type,
  size,
  mask,
  value,
  resize,
  onBlur,
  disabled,
  onChange,
  maxLength,
  helperText,
  maskOptions,
  endAdornment,
  variant = "standard",
  rows = 1,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [reachMaxLength, setReachMaxLength] = useState(false);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const reachedMaxLength =
      maxLength !== undefined && event.target.value.length >= maxLength;
    setReachMaxLength(reachedMaxLength);
    if (!reachedMaxLength) onChange?.(event);
    else event.target.value = event.target.value.substring(0, maxLength);
  };

  return (
    <Container resize={resize} rows={Number(rows)}>
      <InputMask
        value={value}
        onBlur={onBlur}
        {...maskOptions}
        mask={mask ?? ""}
        disabled={disabled}
        onChange={handleOnChange}
        maskPlaceholder={maskOptions?.maskPlaceholder ?? null}
      >
        <MuiTextField
          variant={variant}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {type === "password" ? (
                  <IconButton
                    type="button"
                    size={size}
                    color={props.color}
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? (
                      <RemoveRedEye color={props.color} />
                    ) : (
                      <VisibilityOff color={props.color} />
                    )}
                  </IconButton>
                ) : (
                  endAdornment
                )}
              </InputAdornment>
            ),
          }}
          size={size}
          rows={rows}
          helperText={
            helperText ||
            (reachMaxLength
              ? `Você atingiu o limite de ${maxLength} caracteres`
              : null)
          }
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...props}
        />
      </InputMask>
    </Container>
  );
};

export default TextField;
