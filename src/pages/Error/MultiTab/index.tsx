import React from "react";
import { Container } from "./styles";

const MultiTab: React.FC = () => {
  return (
    <Container>
      <div>
        <h2>O aplicativo está aberto em outra janela.</h2>
        <p>Clique em &quot;Usar aqui&quot; para usar o sistema nesta janela.</p>
        <div id="actions">
          <button
            onClick={() => {
              window.history.go(-window.history.length);
              window.location.replace("https://vexpenses.com.br/");
            }}
          >
            Fechar
          </button>
          <button onClick={() => window.location.reload()}>Usar aqui</button>
        </div>
      </div>
    </Container>
  );
};

export default MultiTab;
