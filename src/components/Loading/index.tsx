import { CircularProgress, Grid, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography sx={{ pt: 2 }} variant="body1">
        Carregando a página
      </Typography>
      <Typography variant="subtitle2">
        <em>Por favor aguarde...</em>
      </Typography>
    </Grid>
  );
};

export default Loading;
