import { useLazyQuery, useMutation } from "@apollo/client";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import { useAlias } from "../../helpers/alias";
import { Paths } from "../../helpers/constants";
import { ADD_OR_GET_USER, GET_USER } from "../../helpers/graphql-queries";
import { useErrorToast } from "../../helpers/utils";
import { LoginButton, LoginForm } from "./styled";

export default function Home() {
  const history = useHistory();
  const { alias, setAlias } = useAlias();
  const [aliasField, setAliasField] = useState("");
  const errToast = useErrorToast();

  const [addOrGetUser, { data, loading, error }] = useMutation(ADD_OR_GET_USER, {
    onError: (err) => errToast(err.message),
  });
  const [getUser, { data: userData }] = useLazyQuery(GET_USER);

  function handleClick() {
    if (aliasField) {
      addOrGetUser({ variables: { alias: aliasField } });
    }
  }

  // Fetch data about the user if already logged in
  useEffect(() => {
    if (alias) {
      getUser({ variables: { alias } });
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (alias && userData) {
      if (userData.user.userHasFavorites) {
        history.push(Paths.FAVORITE_GROUPS);
      } else {
        history.push(Paths.MOVIE_GROUPS);
      }
    }
  }, [userData]);

  // Redirect if successfully logged inn
  useEffect(() => {
    if (!loading && data && !error) {
      setAlias(data.createUserOrCheckIfExists.alias);
      if (data.createUserOrCheckIfExists.userHasFavorites) {
        history.push(Paths.FAVORITE_GROUPS);
      } else {
        history.push(Paths.MOVIE_GROUPS);
      }
    }
  }, [loading, history, data, error]);

  return (
    <PageContainer centeredPage>
      <Typography component="h1" variant={"h3"}>
        FilmFlokk
      </Typography>
      <Typography component="h5" variant={"h5"}>
        Welcome to FilmFlokk, a website for sharing the unique joy of watching movies together.
        Please enter an alias before continuing.
      </Typography>
      <LoginForm>
        <TextField
          label="alias"
          id="outlined-basic"
          variant="outlined"
          value={aliasField}
          onChange={(e) => setAliasField(e.target.value)}
          required
        />
        <LoginButton onClick={handleClick}>Enter</LoginButton>
      </LoginForm>
    </PageContainer>
  );
}
