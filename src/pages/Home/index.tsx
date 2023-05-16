import {
  DeleteOutline,
  KeyboardArrowDown,
  KeyboardDoubleArrowDown,
  ModeEditOutline,
  Sort,
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
  useTheme,
} from "@mui/material";
import { AppBar, Button, FilterInput } from "components";
import { useAlert } from "contexts";
import { ContactController } from "controllers";
import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import contactApi from "store/contacts/api";
import { IContactViewModel } from "viewModels";

interface RowProps {
  contact?: IContactViewModel;
  subtitle?: string;
  contacts?: IContactViewModel[];
  handleRemove: (id: IContactViewModel["id"]) => void;
}
const Row: React.FC<RowProps> = ({
  contact,
  contacts,
  subtitle,
  handleRemove,
}: RowProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const buildRow = (c: IContactViewModel) => (
    <TableRow
      key={c.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <Avatar alt={c.name} />
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          minWidth: "15rem",
          maxWidth: "30rem",
        }}
      >
        {c.name}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {c.contactInfo?.[0]?.value ?? "Não informado"}
      </TableCell>
      <TableCell sx={{ minWidth: "20rem" }}>
        {c.addresses?.[0]?.text ?? "Não informado"}
      </TableCell>
      <TableCell>
        <Chip label={c.category ?? "Não informado"} variant="outlined" />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <IconButton
          color="primary"
          size="small"
          title="Visualizar contato"
          onClick={() =>
            navigate("/contact/view", {
              state: {
                contactId: c.id,
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
                contactId: c.id,
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
          onClick={() => handleRemove(c.id)}
        >
          <DeleteOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <React.Fragment>
      {contacts && (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row" colSpan={6}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {subtitle?.toUpperCase()}
            </Avatar>
          </TableCell>
        </TableRow>
      )}
      {contact ? buildRow(contact) : contacts?.map(buildRow)}
    </React.Fragment>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<IContactViewModel[]>();
  const [grouped, setGrouped] = useState<{
    [key: string]: IContactViewModel[];
  }>();
  const confirm = useAlert();

  const theme = useTheme();

  const [filter, setFilter] = useState<{
    term?: string;
    field?: string;
    sort?: "name" | "category";
    order?: "asc" | "desc";
  }>();

  const [groupBy, setGroupBy] = useState<"name" | "category">();

  const queryClient = useQueryClient();

  const [deleteContact] = contactApi.useDeleteContactMutation();

  const {
    data: results,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["contacts", filter, groupBy],
    ({ pageParam = 1 }) =>
      ContactController.getContacts({
        _page: pageParam,
        _limit: 2,
        ...(groupBy ? { sort: groupBy, order: "asc" } : filter),
      }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length === 0 ? undefined : nextPage;
      },
    },
  );

  const groupIt = (key: "name" | "category", array: IContactViewModel[]) => {
    const result: { [key: string]: IContactViewModel[] } = {};

    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      const currentWord = item[key];
      const firstChar = currentWord[0].toLowerCase();
      const innerArr: IContactViewModel[] = [];
      if (result[firstChar] === undefined) {
        innerArr.push(item);
        result[firstChar] = innerArr;
      } else {
        result[firstChar].push(item);
      }
    }
    return Object.keys(result)
      .sort()
      .reduce((obj, key) => {
        obj[key] = result[key];
        return obj;
      }, {} as { [key: string]: IContactViewModel[] });
  };

  const handleProcessTableData = useCallback(() => {
    const data = results?.pages?.flat();
    switch (groupBy) {
      case "name":
        setGrouped(groupIt("name", data ?? []));
        break;
      case "category":
        setGrouped(groupIt("category", data ?? []));
        break;
      default:
        setGrouped(undefined);
        setContacts(data);
        break;
    }
  }, [groupBy, results]);

  useEffect(() => {
    handleProcessTableData();
  }, [handleProcessTableData]);

  const handleRemove = async (id: string) => {
    const res = await confirm.show({
      type: "confirm",
      title: "Excluir contato",
      description: "Tem certeza de que deseja remover este contato?",
    });
    if (res)
      deleteContact(id)
        .then(async () => {
          queryClient.invalidateQueries({ queryKey: ["contacts"] });
          await new Promise((r) => setTimeout(r, 100));
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

  const handleSort = (sort?: "name" | "category") => () =>
    setFilter((prev) => ({
      ...prev,
      sort: prev?.order === "desc" ? undefined : sort,
      order:
        prev?.sort === sort
          ? prev?.order === "asc"
            ? "desc"
            : prev?.order === "desc"
            ? undefined
            : "asc"
          : "asc",
    }));

  const getSortIcon = (key: "name" | "category") =>
    !groupBy ? (
      <IconButton size="small" onClick={handleSort(key)} color="primary">
        {filter?.sort === key ? (
          <KeyboardArrowDown
            sx={{
              transition: "all 0.5s ease-in",
              transform: filter?.order === "asc" ? "rotate(-180deg)" : "",
            }}
          />
        ) : (
          <Sort />
        )}
      </IconButton>
    ) : null;

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <AppBar />
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
        <FilterInput
          sx={{ pt: 1 }}
          onChange={setFilter}
          onGroupBy={setGroupBy}
        />
        <TableContainer sx={{ mt: 2, height: "calc(100vh - 295px)" }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="contact table">
            <TableHead>
              <TableRow
                sx={{
                  th: {
                    backgroundColor: theme.palette.background.paper,
                    whiteSpace: "nowrap",

                    fontWeight: "bold",
                    color: theme.palette.primary.main,

                    "& div": {
                      display: "flex",
                      alignItems: "center",

                      "& button": {
                        ml: 1,
                      },
                    },
                  },
                }}
              >
                <TableCell>#</TableCell>
                <TableCell>Nome{getSortIcon("name")}</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Categoria{getSortIcon("category")}</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
              ) : !grouped ? (
                contacts?.map((contact) => (
                  <Row
                    key={contact.id}
                    contact={contact}
                    handleRemove={handleRemove}
                  />
                ))
              ) : (
                Object.entries(grouped)?.map(([key, contacts], idx) => (
                  <Row
                    subtitle={key}
                    contacts={contacts}
                    key={`${key}-${idx}`}
                    handleRemove={handleRemove}
                  />
                ))
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
