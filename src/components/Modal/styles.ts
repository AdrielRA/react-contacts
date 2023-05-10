import { SxProps, Theme } from "@mui/material";

export const boxStyle: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 2,
  boxShadow: 24,
  outline: "none",
};
