import {
  Backdrop,
  Box,
  Fade,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@mui/material";
import { Props } from "props";
import { boxStyle } from "./styles";

export interface ModalProps extends Omit<MuiModalProps, "children"> {
  onClose?: () => void;
}

const Modal: React.FC<ModalProps & Props> = ({
  sx,
  open,
  onClose,
  children,
  ...props
}: ModalProps & Props) => {
  return (
    <MuiModal
      open={open}
      onClose={() => onClose?.()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...props}
    >
      <Fade in={open}>
        <Box sx={[boxStyle, ...(Array.isArray(sx) ? sx : [sx])]}>
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
