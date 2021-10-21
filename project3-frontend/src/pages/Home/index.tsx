import { TextField, Typography } from "@mui/material";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import { LoginButton, LoginForm, LoginPageContainer } from "./styled";

export default function Home() {
  const history = useHistory();
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
          <TextField label="alias" id="outlined-basic" variant="outlined" />
          <LoginButton onClick={() => history.push("/groups")}>Enter</LoginButton>
        </LoginForm>
      </LoginPageContainer>
    </PageContainer>
  );
}
