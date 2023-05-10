import { Typography } from "@mui/material";
import { Button, TextField } from "components";
import { useAlert, useAuth } from "contexts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Form } from "./styles";

const Home: React.FC = () => {
  const { signIn, logged } = useAuth();
  const confirm = useAlert();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      await confirm.show({
        type: "error",
        title: "Falha ao logar",
        description: "Informe um e-mail válido antes de continuar.",
        retry: {
          label: "Ok",
        },
        cancel: {
          show: false,
        },
      });
      return;
    }
    if (!password) {
      await confirm.show({
        type: "error",
        title: "Falha ao logar",
        description: "Senha informada é inválida.",
        retry: {
          label: "Ok",
        },
        cancel: {
          show: false,
        },
      });
      return;
    }

    if (email === "user@user.com" && password === "senha forte") signIn();
    else
      await confirm.show({
        type: "error",
        title: "Falha ao logar",
        description: "Verifique o email e a senha e tente novamente.",
        retry: {
          callback: handleLogin,
        },
      });
  };

  useEffect(() => {
    if (logged) navigate("/home");
  }, [navigate, logged]);

  return (
    <Container>
      <Card>
        <Typography variant="h4" color="primary" sx={{ pb: 2 }}>
          SysContatos
        </Typography>
        <Typography component="strong" fontWeight={500}>
          Login
        </Typography>
        <Typography>Bem-vindo ao sistema!</Typography>
        <Form>
          <TextField
            size="small"
            fullWidth
            type="email"
            name="email"
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            size="small"
            fullWidth
            type="password"
            name="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            sx={{ width: "50%" }}
            type="button"
            variant="contained"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Home;
