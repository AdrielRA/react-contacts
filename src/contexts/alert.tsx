import { Cancel, LabelImportant } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Modal } from "components";
import { AlertContextProps } from "contexts-types";
import { AlertProps, Props } from "props";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

const Alert: React.FC<Props> = ({ children }) => {
  const [payload, setPayload] = useState<AlertProps>({} as AlertProps);
  const [showModal, setShowModal] = useState(false);
  const resolver = useRef<(value?: boolean | PromiseLike<boolean>) => void>();

  const show = (props: AlertProps) => {
    setPayload(props);
    setShowModal(true);

    return new Promise<boolean | undefined>((resolve) => {
      resolver.current = resolve;
    });
  };

  const reset = () => {
    setShowModal(false);
    setTimeout(() => {
      setPayload({} as AlertProps);
    }, 200);
  };

  const handleOption = useCallback(
    (option?: boolean, callback?: () => void) => () => {
      if (callback) setTimeout(callback, 250);
      resolver.current && resolver.current(option);
      reset();
    },
    []
  );

  useEffect(() => {
    let timer: NodeJS.Timer | undefined;
    if (payload.type === "alert" && payload.timeout)
      timer = setTimeout(handleOption(), payload.timeout);

    return () => timer && clearTimeout(timer);
  }, [handleOption, payload]);

  return (
    <AlertContext.Provider value={{ show }}>
      <Modal
        open={showModal}
        onClose={() => payload?.closable !== false && handleOption()()}
      >
        <Grid container justifyContent="space-between">
          <Typography
            variant="h6"
            component="h2"
            color={payload.type === "error" ? "error" : "primary"}
          >
            {payload.title}
          </Typography>
          {payload?.closable !== false && (
            <IconButton size="small" onClick={handleOption()} color="error">
              <Cancel />
            </IconButton>
          )}
        </Grid>
        <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>
          {payload.description}
        </Typography>
        {payload.type === "alert" && payload.subtitle && (
          <Typography color="primary" sx={{ mt: 2, whiteSpace: "pre-line" }}>
            {payload.subtitle}
          </Typography>
        )}
        {payload.type === "alert" && payload.items && (
          <List dense sx={{ maxHeight: "40vh", overflowY: "auto" }}>
            {payload.items.map((item) => (
              <ListItem key={item}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <LabelImportant />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        )}
        {payload.type === "alert" ? (
          payload.option?.show !== false && (
            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ width: 100, whiteSpace: "nowrap" }}
                variant={payload.option?.variant ?? "outlined"}
                onClick={handleOption(false, payload?.option?.callback)}
              >
                {payload.option?.label ?? "Ok"}
              </Button>
            </Grid>
          )
        ) : payload.type === "confirm" ? (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                mt: 2,
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Grid item>
                <Button
                  sx={{ width: 100, whiteSpace: "nowrap" }}
                  variant="outlined"
                  onClick={handleOption(false, payload?.cancel?.callback)}
                >
                  {payload.cancel?.label ?? "Cancelar"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={{ width: 100, whiteSpace: "nowrap" }}
                  variant="contained"
                  onClick={handleOption(true, payload?.ok?.callback)}
                >
                  {payload.ok?.label ?? "Ok"}
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          payload.type === "error" && (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {payload.cancel?.show !== false && (
                  <Grid item>
                    <Button
                      sx={{ width: 100, whiteSpace: "nowrap" }}
                      variant="outlined"
                      onClick={handleOption(false, payload?.cancel?.callback)}
                    >
                      {payload.cancel?.label ?? "Cancelar"}
                    </Button>
                  </Grid>
                )}
                {payload.retry?.show !== false && (
                  <Grid item>
                    <Button
                      sx={{ minWidth: 100, whiteSpace: "nowrap" }}
                      variant="contained"
                      onClick={handleOption(true, payload?.retry?.callback)}
                    >
                      {payload.retry?.label ?? "Tentar novamente"}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </>
          )
        )}
      </Modal>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert: () => AlertContextProps = () => useContext(AlertContext);

export default Alert;
