import { ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button, TextField } from "components";
import { useAlert, useAuth } from "contexts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "utils/tools";
import { Card, Container, Form } from "./styles";

const Home: React.FC = () => {
  const confirm = useAlert();
  const navigate = useNavigate();
  const { signIn, logged } = useAuth();

  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    if (logged) navigate("/home");
  }, [navigate, logged]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

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

    if (email === "user@user.com" && password === "senha forte") {
      await sleep(1000);
      signIn();
    } else {
      await sleep(500);
      setLoading(false);
      await confirm.show({
        type: "error",
        title: "Falha ao logar",
        description: "Verifique o email e a senha e tente novamente.",
        retry: {
          callback: handleLogin,
        },
      });
    }
  };

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
            fullWidth
            size="small"
            type="email"
            name="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            label="Senha"
            maxLength={20}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            sx={{ width: "70%", mt: 2 }}
            type="button"
            isLoading={loading}
            size="small"
            endIcon={<ChevronRight />}
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
