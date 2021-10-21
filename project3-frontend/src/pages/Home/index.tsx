import { TextField, Typography } from "@mui/material";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import { LoginButton, LoginForm, LoginPageContainer } from "./styled";
import { ADD_OR_GET_USER } from "../../helpers/graphql-queries";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Home() {
  const history = useHistory();
  const [alias, setAlias] = useState("");
  const [addOrGetUser, { data, loading, error }] = useMutation(ADD_OR_GET_USER);

  function handleClick() {
    addOrGetUser({ variables: { alias } });
  }

  useEffect(() => {
    if (!loading && data && !error) {
      history.push("/groups");
    }
  }, [loading]);
  return (
    <PageContainer>
      <LoginPageContainer>
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
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <LoginButton onClick={handleClick}>Enter</LoginButton>
        </LoginForm>
      </LoginPageContainer>
    </PageContainer>
  );
}
