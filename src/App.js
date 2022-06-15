import { MuiThemeProvider } from "@material-ui/core/styles";
import AppRouter from './routers/AppRouter';

function App() {
  return (
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  );
}

export default App;