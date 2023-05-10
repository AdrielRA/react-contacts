import { Container, Grid, Typography } from "@mui/material";
import { Button } from "components";
import { decrement, increment } from "store/contacts/actions";
import { selectCount } from "store/contacts/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Home = () => {
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <Container>
      <Typography variant="h1">Contatos</Typography>
      <Typography>Contador: {counter}</Typography>
      <Grid container>
        <Grid item xs={6}>
          <Button onClick={handleDecrement} variant="contained" isLoading>
            -
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleIncrement} variant="contained">
            +
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
