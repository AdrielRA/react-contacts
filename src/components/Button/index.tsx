import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
type ButtonProps = MuiButtonProps & {
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size,
  color,
  endIcon,
  isLoading = false,
  variant = "contained",
  ...props
}) => {
  return (
    <MuiButton
      size={size}
      color={color}
      variant={variant}
      endIcon={
        isLoading ? (
          <CircularProgress
            size={size === "small" ? 14 : size === "large" ? 20 : 18}
            color={variant === "contained" ? "inherit" : color}
          />
        ) : (
          endIcon
        )
      }
      {...props}
    />
  );
};

export default Button;
