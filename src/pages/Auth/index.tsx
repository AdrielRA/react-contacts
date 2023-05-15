import { ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Button, TextField } from "components";
import { useAlert, useAuth } from "contexts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sleep } from "utils/tools";
import { Card, Container, Form } from "./styles";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type AuthInput = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("Informe o e-mail"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve ter pelo menos 8 dígitos"),
});

const Home: React.FC = () => {
  const confirm = useAlert();
  const navigate = useNavigate();
  const { signIn, logged } = useAuth();
  const [loading, setLoading] = useState(false);
  const [defaultValues] = useState<AuthInput>({} as AuthInput);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<AuthInput>({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (logged) navigate("/home");
  }, [navigate, logged]);

  const handleLogin = useCallback(
    async ({ email, password }: AuthInput) => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, signIn],
  );

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
        <Form onSubmit={handleSubmit(handleLogin, console.log)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <TextField
                fullWidth
                size="small"
                type="email"
                value={value}
                label="E-mail"
                onChange={onChange}
                error={isSubmitted && Boolean(errors.email)}
                helperText={isSubmitted ? errors.email?.message : undefined}
                {...rest}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <TextField
                fullWidth
                size="small"
                label="Senha"
                value={value}
                maxLength={32}
                type="password"
                onChange={onChange}
                error={isSubmitted && Boolean(errors.password)}
                helperText={isSubmitted ? errors.password?.message : undefined}
                {...rest}
              />
            )}
          />

          <Button
            sx={{ width: "70%", mt: 2 }}
            type="submit"
            isLoading={loading}
            size="small"
            endIcon={<ChevronRight />}
          >
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Home;
