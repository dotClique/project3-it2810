import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ToastProvider from "./components/Toast/index";
import client from "./helpers/apollo";
import { Paths } from "./helpers/constants";
import theme from "./helpers/themes";
import CreateMovieEventPage from "./pages/CreateMovieEventPage";
import CreateMovieGroupPage from "./pages/CreateMovieGroupPage/index";
import GroupPage from "./pages/GroupPage";
import Home from "./pages/Home";
import MovieEventPage from "./pages/MovieEventPage";
import MovieGroups from "./pages/MovieGroupsPage";
import FavoriteMovieGroupsPage from "./pages/FavoriteMovieGroupsPage";
import LoggedOutRouter from "./components/LoggedOutRouter";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <BrowserRouter basename="/project3">
              <LoggedOutRouter />
              <Switch>
                <Route exact path={Paths.HOME}>
                  <Home />
                </Route>
                <Route exact path={Paths.MOVIE_GROUPS}>
                  <MovieGroups />
                </Route>
                <Route exact path={Paths.ADD_MOVIE_GROUP}>
                  <CreateMovieGroupPage />
                </Route>
                <Route exact path={Paths.FAVORITE_GROUPS}>
                  <FavoriteMovieGroupsPage />
                </Route>
                <Route exact path={Paths.MOVIE_GROUP}>
                  <GroupPage />
                </Route>
                <Route exact path={Paths.MOVIE_EVENT}>
                  <MovieEventPage />
                </Route>
                <Route exact path={Paths.ADD_MOVIE_EVENT}>
                  <CreateMovieEventPage />
                </Route>
              </Switch>
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
