import {
  DeleteOutline,
  KeyboardDoubleArrowDown,
  ModeEditOutline,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Button, FilterInput } from "components";
import { useAlert } from "contexts";
import { ContactController } from "controllers";
import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import contactApi from "store/contacts/api";
import { selectCount } from "store/contacts/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Home = () => {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const confirm = useAlert();

  const [filter, setFilter] = useState<{
    term?: string;
    field?: string;
  }>();

  const queryClient = useQueryClient();

  const [deleteContact] = contactApi.useDeleteContactMutation();

  const {
    data: results,
    refetch,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["contacts", filter],
    ({ pageParam = 1 }) =>
      ContactController.getContacts({
        _page: pageParam,
        _limit: 20,
        ...filter,
      }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length === 0 ? undefined : nextPage;
      },
    },
  );

  const handleRemove = async (id: number) => {
    const res = await confirm.show({
      type: "confirm",
      title: "Excluir contato",
      description: "Tem certeza de que deseja remover este contato?",
    });
    if (res)
      deleteContact(id)
        .then(async () => {
          queryClient.invalidateQueries({ queryKey: ["contacts"] });
          await confirm.show({
            type: "alert",
            title: "Sucesso!",
            description: "Contato excluído com sucesso",
            timeout: 5000,
          });
        })

        .catch(async () => {
          await confirm.show({
            type: "error",
            title: "Falha ao salvar",
            description: "Não foi possível excluir o contato.",
          });
        });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Grid container sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography
            component="p"
            variant="h4"
            color="primary"
            sx={{ flexGrow: 1 }}
          >
            Contatos
          </Typography>
          <Button
            sx={{ ml: 2, pl: 3, pr: 3 }}
            variant="contained"
            onClick={() => navigate("/contact")}
          >
            Adicionar contato
          </Button>
        </Grid>
        <FilterInput onChange={setFilter} sx={{ pt: 1 }} />
        <TableContainer sx={{ mt: 2, height: "calc(100vh - 235px)" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* eslint-disable-next-line no-constant-condition */}
              {isLoading ? (
                <TableRow sx={{ height: "calc(100vh - 292px)" }}>
                  <TableCell colSpan={6} align="center">
                    <Grid
                      container
                      sx={{
                        flexDirection: "column",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <CircularProgress />
                      <Typography paddingLeft={1} variant="body1" color="text">
                        Carregando lista
                      </Typography>
                      <Typography
                        paddingLeft={1}
                        variant="body2"
                        color="text"
                        sx={{ fontStyle: "italic" }}
                      >
                        Por favor aguarde...
                      </Typography>
                    </Grid>
                  </TableCell>
                </TableRow>
              ) : (
                results?.pages?.map((p) =>
                  p?.map((contact) => (
                    <TableRow
                      key={contact.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Avatar alt={contact.name} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {contact.name}
                      </TableCell>
                      <TableCell>
                        {contact.contactInfo?.[0]?.value ?? "Não informado"}
                      </TableCell>
                      <TableCell>
                        {contact.addresses?.[0]?.street ?? "Não informado"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={contact.category ?? "Não informado"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          size="small"
                          title="Visualizar contato"
                          onClick={() =>
                            navigate("/contact/view", {
                              state: {
                                contactId: contact.id,
                              },
                            })
                          }
                        >
                          <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                          color="primary"
                          size="small"
                          title="Editar contato"
                          onClick={() =>
                            navigate("/contact/edit", {
                              state: {
                                contactId: contact.id,
                              },
                            })
                          }
                        >
                          <ModeEditOutline />
                        </IconButton>
                        <IconButton
                          color="primary"
                          size="small"
                          title="Excluir contato"
                          onClick={() => handleRemove(contact.id)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )),
                )
              )}
              {hasNextPage && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {isFetchingNextPage ? (
                      <Grid item alignItems="center">
                        <CircularProgress size={15} />
                        <Typography
                          paddingLeft={1}
                          variant="caption"
                          color="text"
                          sx={{ fontStyle: "italic" }}
                        >
                          Carregando itens...
                        </Typography>
                      </Grid>
                    ) : (
                      <Button onClick={() => fetchNextPage()} sx={{ px: 2 }}>
                        <KeyboardDoubleArrowDown />
                        <Typography paddingLeft={1} variant="button">
                          Carregar mais...
                        </Typography>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Home;
