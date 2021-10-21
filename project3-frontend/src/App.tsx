import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from "./helpers/themes";
import APITest from "./pages/APITest/index";
import Home from "./pages/Home";
import { CssBaseline } from "@mui/material";
import MovieGroups from "./pages/MovieGroupsPage";
import Movie from "./pages/Movie";
import AddMovie from "./pages/AddMovie";
import { ApolloProvider } from "@apollo/client";
import client from "./helpers/apollo";


function App() {
  return (
    <ApolloProvider client={client}>
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
              <Route exact path="/movie">
                <Movie />
              </Route>
              <Route exact path="/addmovie">
                <AddMovie />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
