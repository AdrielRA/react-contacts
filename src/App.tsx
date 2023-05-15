import { ThemeProvider as MUITheProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalContext from "contexts";
import moment from "moment";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import Router from "routes";
import { store } from "./store";

moment.locale("pt-br");
const queryClient = new QueryClient();

const App = () => (
  <>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext>
          <Router />
        </GlobalContext>
      </QueryClientProvider>
    </ReduxProvider>
  </>
);

export default App;
