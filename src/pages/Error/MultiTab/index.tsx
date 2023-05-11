import { Typography } from "@mui/material";
import { Button } from "components";
import React from "react";
import { Container } from "./styles";

const MultiTab: React.FC = () => {
  return (
    <Container>
      <div>
        <Typography
          component="h2"
          variant="h5"
          color="secondary"
          sx={{ pb: 1 }}
        >
          O aplicativo está aberto em outra janela.
        </Typography>
        <Typography>
          Clique em &quot;Usar aqui&quot; para usar o sistema nesta janela.
        </Typography>
        <div className="actions">
          <Button
            variant="outlined"
            onClick={() => {
              window.history.go(-window.history.length);
              window.location.replace("https://vexpenses.com.br/");
            }}
          >
            Fechar
          </Button>
          <Button onClick={() => window.location.reload()}>Usar aqui</Button>
        </div>
      </div>
    </Container>
  );
};

export default MultiTab;
