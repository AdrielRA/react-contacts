import { yupResolver } from "@hookform/resolvers/yup";
import { Backspace } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { AddressInput, AppBar, TextField } from "components";
import { useAlert } from "contexts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  FieldError,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import * as yup from "yup";

import contactsApi from "store/contacts/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100)
    .required("Informe um nome válido"),
  category: yup
    .string()
    .min(2, "Categoria deve ter pelo menos 2 caracteres")
    .max(32),
  contactInfo: yup.array().of(
    yup.object().shape({
      type: yup.string().required("Selecione um tipo"),
      value: yup.string().when("type", (type, sch) => {
        if (type.includes("")) {
          return sch;
        } else if (type.includes("email")) {
          return sch
            .email("Informe um e-mail válido")
            .required("E-mail deve ser preenchido");
        }

        return sch
          .min(14, "O número deve ter pelo menos 10 caracteres")
          .required("Número deve ser informado");
      }),
    }),
  ),
  addresses: yup.array(),
});

interface IContactPageProps {
  action: "new" | "view" | "edit";
}

type RouteParams = {
  contactId?: string;
};

const ContactPage: React.FC<IContactPageProps> = ({
  action,
}: IContactPageProps) => {
  const routeParams = useLocation()?.state as RouteParams;
  const navigate = useNavigate();
  const confirm = useAlert();

  const [saving, setSaving] = useState(false);
  const [defaultValues] = useState({} as IContact);
  const [newAddress, setNewAddress] = useState<string>();

  const [addContact] = contactsApi.useAddContactMutation();
  const [updateContact] = contactsApi.useUpdateContactMutation();
  const { data: contactData, isLoading } = contactsApi.useGetContactByIdQuery(
    routeParams?.contactId ?? "",
  );

  const addressInputRef = useRef<HTMLInputElement>(null);

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<IContact>({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    fields: infos,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control,
    name: "contactInfo",
  });

  const currentInfos = watch("contactInfo");

  const {
    fields: addresses,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  useEffect(() => {
    if (action !== "new" && contactData) {
      reset(contactData);
    }
  }, [action, contactData, reset]);

  const handleSave = useCallback(
    (data: IContact) => {
      if (saving) return;
      setSaving(true);

      if (action === "edit") {
        updateContact(data)
          .then(async () => {
            await confirm.show({
              type: "alert",
              title: "Sucesso!",
              description: "Os dados do contato foram atualizados.",
              timeout: 5000,
            });
            navigate("/home");
          })
          .catch(async () => {
            await confirm.show({
              type: "error",
              title: "Falha ao atualizar",
              description: "Não foi possível salvar as alterações do contato.",
              timeout: 5000,
            });
          })
          .finally(() => setSaving(false));
      } else
        addContact(data)
          .then(async () => {
            await confirm.show({
              type: "alert",
              title: "Sucesso!",
              description: "Os dados do contato foram salvos.",
              timeout: 5000,
            });
            navigate("/home");
          })
          .catch(async () => {
            await confirm.show({
              type: "error",
              title: "Falha ao salvar",
              description: "Não foi possível salvar os dados do contato.",
            });
          })
          .finally(() => setSaving(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, addContact, navigate, saving, updateContact],
  );

  const getContactMask = (input: string, type: "phone" | "email") => {
    if (type === "email")
      return Array.from({ length: 100 }, () => /^([a-zA-Z0-9-@.])+$/);
    if (input.replace(/\D/g, "").length <= 10) {
      return "(99) 9999-99999";
    } else {
      return "(99) 9 9999-9999";
    }
  };

  const handleChangeAddress = (address?: string) => setNewAddress(address);

  const handleAddAddress = () => {
    if (newAddress) {
      appendAddress({
        id: uuid(),
        text: newAddress,
      });
      setNewAddress(undefined);
      if (addressInputRef.current) addressInputRef.current.value = "";
    }
  };

  return (
    <Container sx={{ display: "flex" }}>
      <AppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
          <Typography
            component="p"
            variant="h4"
            color="primary"
            sx={{ flexGrow: 1, mb: 2 }}
          >
            {action === "edit"
              ? "Editar "
              : action === "view"
              ? "Visualizar "
              : "Novo "}
            contato
          </Typography>
          {action !== "new" && isLoading ? (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 180px)",
              }}
            >
              <CircularProgress />
              <Typography sx={{ pt: 2 }} variant="body1">
                Carregando dados do contato
              </Typography>
              <Typography variant="subtitle2">
                <em>Por favor aguarde...</em>
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => navigate("/home")}
              >
                Cancelar
              </Button>
            </Grid>
          ) : (
            <form onSubmit={handleSubmit(handleSave, console.log)}>
              <Paper sx={{ p: 2, overflow: "auto" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Informações básicas
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <TextField
                          required
                          fullWidth
                          size="small"
                          label="Nome"
                          maxLength={100}
                          onChange={onChange}
                          value={value?.trimStart()}
                          disabled={action === "view"}
                          mask={Array.from(
                            { length: 100 },
                            () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
                          )}
                          placeholder="Digite o nome do contato..."
                          error={isSubmitted && Boolean(errors.name)}
                          helperText={
                            isSubmitted ? errors.name?.message : undefined
                          }
                          {...rest}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <TextField
                          required
                          fullWidth
                          size="small"
                          maxLength={32}
                          label="Categoria"
                          onChange={onChange}
                          value={value?.trimStart()}
                          disabled={action === "view"}
                          placeholder="Digite a categoria..."
                          mask={Array.from(
                            { length: 100 },
                            () => /^([ \u00c0-\u01ffa-zA-Z'-.])+$/,
                          )}
                          error={isSubmitted && Boolean(errors.category)}
                          helperText={
                            isSubmitted ? errors.category?.message : undefined
                          }
                          {...rest}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Dados de contato
                    </Typography>
                  </Grid>
                  {infos?.map((info, idx) => (
                    <Grid key={info?.id} container item spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <FormControl fullWidth disabled={action === "view"}>
                          <InputLabel id="info-type-label">Tipo</InputLabel>
                          <Controller
                            name={`contactInfo.${idx}.type`}
                            control={control}
                            render={({
                              field: { onChange, ...filedProps },
                            }) => (
                              <Select
                                {...filedProps}
                                variant="standard"
                                onChange={(e) => {
                                  setValue(`contactInfo.${idx}.value`, "");
                                  onChange(e);
                                }}
                                size="small"
                                label="Tipo"
                                defaultValue=""
                                labelId="contact-type-label"
                              >
                                <MenuItem value={""} disabled>
                                  <em>Selecione</em>
                                </MenuItem>
                                <MenuItem value="phone">Telefone</MenuItem>
                                <MenuItem value="cell">Celular</MenuItem>
                                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                              </Select>
                            )}
                          />
                          {isSubmitted &&
                            Boolean(errors.contactInfo?.[idx]?.type) && (
                              <FormHelperText error>
                                {isSubmitted
                                  ? (
                                      errors.contactInfo?.[idx]?.type as
                                        | FieldError
                                        | undefined
                                    )?.message
                                  : undefined}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Controller
                          name={`contactInfo.${idx}.value`}
                          control={control}
                          render={({ field: { onChange, value, ...rest } }) => (
                            <TextField
                              fullWidth
                              size="small"
                              label="Contato"
                              maxLength={
                                currentInfos?.[idx]?.type === "email" ? 100 : 16
                              }
                              disabled={
                                (currentInfos?.[idx]?.type ?? "") === "" ||
                                action === "view"
                              }
                              onChange={onChange}
                              value={value?.trimStart()}
                              {...rest}
                              mask={getContactMask(
                                value,
                                currentInfos?.[idx]?.type === "email"
                                  ? "email"
                                  : "phone",
                              )}
                              placeholder="Informe o contato..."
                              endAdornment={
                                action !== "view" &&
                                (infos?.length ?? 0) > 1 ? (
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => removeInfo(idx)}
                                  >
                                    <Backspace />
                                  </IconButton>
                                ) : undefined
                              }
                              error={
                                isSubmitted &&
                                Boolean(errors.contactInfo?.[idx]?.value)
                              }
                              helperText={
                                isSubmitted
                                  ? errors.contactInfo?.[idx]?.value?.message
                                  : undefined
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  {action !== "view" && (
                    <Grid item xs={5.5} sm={4.5} md={3} sx={{ ml: "auto" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() =>
                          appendInfo({
                            id: uuid(),
                            value: "",
                            type: "",
                          })
                        }
                      >
                        Adicionar contato
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      Endereço
                    </Typography>
                  </Grid>
                  {action !== "view" && (
                    <>
                      <Grid item xs={12} sm={12} md={9}>
                        <AddressInput
                          ref={addressInputRef}
                          onChange={handleChangeAddress}
                        />
                      </Grid>
                      <Grid item xs={5.5} sm={4.5} md={3} sx={{ ml: "auto" }}>
                        <Button
                          fullWidth
                          size="small"
                          color="primary"
                          variant="contained"
                          disabled={!newAddress}
                          onClick={handleAddAddress}
                        >
                          Adicionar
                        </Button>
                      </Grid>
                    </>
                  )}

                  {addresses?.map((address, idx) => (
                    <Grid key={address?.id} container item spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          name={`addresses.${idx}.text`}
                          control={control}
                          render={({ field: { onChange, value, ...rest } }) => (
                            <TextField
                              fullWidth
                              size="small"
                              label="Endereço"
                              disabled={action === "view"}
                              onChange={onChange}
                              value={value?.trimStart()}
                              maxLength={255}
                              {...rest}
                              placeholder="Informe o endereço..."
                              endAdornment={
                                action !== "view" &&
                                (addresses?.length ?? 0) > 1 ? (
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => removeAddress(idx)}
                                  >
                                    <Backspace />
                                  </IconButton>
                                ) : undefined
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                  pb: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/home")}
                  >
                    {action === "view" ? "Voltar" : "Cancelar"}
                  </Button>
                </Grid>
                {action !== "view" && (
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Salvar
                    </Button>
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        </Container>
      </Box>
    </Container>
  );
};
export default ContactPage;
