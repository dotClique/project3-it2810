import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from "./helpers/themes";
import APITest from "./pages/APITest/index";
import Home from "./pages/Home";
import MovieGroups from "./pages/MovieGroups";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/project3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/groups">
              <MovieGroups />
            </Route>
            <Route exact path="/testapi">
              <APITest />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
