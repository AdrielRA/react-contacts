import {
  IconButton,
  InputAdornment,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React, { useState } from "react";
import InputMask from "react-input-mask";

import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Container } from "./styles";

type TextFieldProps = MuiTextFieldProps & {
  maxLength?: number;
  endAdornment?: React.ReactNode;
  mask?: string | (string | RegExp)[];
  value?: string | number | readonly string[];
  variant?: "standard" | "outlined" | "filled";
  resize?: "none" | "both" | "horizontal" | "vertical";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  id,
  mask,
  rows,
  type,
  value,
  resize,
  onChange,
  maxLength,
  helperText,
  endAdornment,
  variant = "standard",
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
        id={id}
        value={value}
        mask={mask ?? ""}
        maskPlaceholder={null}
        onChange={handleOnChange}
      >
        <TextField
          variant={variant}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {type === "password" ? (
                  <IconButton
                    type="button"
                    size={props.size}
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
