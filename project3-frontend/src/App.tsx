import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import client from "./helpers/apollo";
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
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/groups">
                <MovieGroups />
              </Route>
              <Route exact path="/add-movie-group">
                <AddMovieGroupPage />
              </Route>
              <Route exact path="/testapi">
                <APITest />
              </Route>
              <Route exact path="/group">
                <GroupPage />
              </Route>
              <Route exact path="/movie">
                <MoviePage />
              </Route>
              <Route exact path="/addmovie">
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
