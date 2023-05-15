import {
  DarkModeOutlined,
  LightModeOutlined,
  PowerSettingsNew,
} from "@mui/icons-material";
import {
  Container,
  Grid,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  useTheme as useMuiTheme,
} from "@mui/material";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as Logo } from "assets/logo.svg";
import { useAuth, useTheme } from "contexts";

function AppBar() {
  const theme = useMuiTheme();
  const { signOut } = useAuth();
  const { mode, toggleColorMode } = useTheme();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <MuiAppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo height={30} fill={theme.palette.primary.main} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <IconButton color="primary" onClick={toggleColorMode}>
                {mode === "light" ? (
                  <DarkModeOutlined />
                ) : (
                  <LightModeOutlined />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <Tooltip title="Sair">
                <IconButton onClick={handleSignOut}>
                  <PowerSettingsNew color="primary" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
export default AppBar;
