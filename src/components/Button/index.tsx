import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { Container } from "./styles";

type ButtonProps = MuiButtonProps & {
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ isLoading, ...props }) => {
  return (
    <Container>
      <MuiButton {...props} endIcon={isLoading ? <CircularProgress /> : null} />
    </Container>
  );
};

export default Button;
