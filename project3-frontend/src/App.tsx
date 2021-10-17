import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from "./helpers/themes";
import Home from "./pages/Home";
import { CssBaseline } from "@mui/material";
import MovieGroups from "./pages/MovieGroups";
import Group from "./pages/Group";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/groups">
              <MovieGroups />
            </Route>
            <Route exact path="/group">
              <Group />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
