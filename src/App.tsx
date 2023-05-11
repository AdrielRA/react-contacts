import { ThemeProvider as MUITheProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalContext from "contexts";
import moment from "moment";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import Router from "routes";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styles";
import light, { getMuiTheme } from "styles/themes/light";
import { store } from "./store";

moment.locale("pt-br");
const queryClient = new QueryClient();

const App = () => (
  <>
    <MUITheProvider theme={getMuiTheme()}>
      <ThemeProvider theme={light}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <GlobalContext>
              <CssBaseline />
              <GlobalStyle />
              <Router />
            </GlobalContext>
          </QueryClientProvider>
        </ReduxProvider>
      </ThemeProvider>
    </MUITheProvider>
  </>
);

export default App;
