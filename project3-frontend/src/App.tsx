import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import client from "./helpers/apollo";
import { Paths } from "./helpers/constants";
import theme from "./helpers/themes";
import AddMovieGroupPage from "./pages/AddMovieGroupPage/index";
import AddMoviePage from "./pages/AddMoviePage";
import APITest from "./pages/APITest/index";
import GroupPage from "./pages/GroupPage";
import Home from "./pages/Home";
import MovieGroups from "./pages/MovieGroupsPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <BrowserRouter basename="/project3">
            <Switch>
              <Route exact path={Paths.HOME}>
                <Home />
              </Route>
              <Route exact path={Paths.MOVIE_GROUP}>
                <MovieGroups />
              </Route>
              <Route exact path={Paths.ADD_MOVIE_GROUP}>
                <AddMovieGroupPage />
              </Route>
              <Route exact path="/testapi">
                <APITest />
              </Route>
              <Route exact path={Paths.MOVIE_GROUP}>
                <GroupPage />
              </Route>
              <Route exact path={Paths.MOVIE_EVENT}>
                <MoviePage />
              </Route>
              <Route exact path={Paths.ADD_MOVIE_EVENT}>
                <AddMoviePage />
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
