import PageContainer from "../../components/PageContainer";
import { TextField, Typography } from "@mui/material";
import { LoginPageContainer, LoginButton, LoginForm } from "./styledComponents";

export default function Home() {
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
          <a href={"/groups"}>
            <LoginButton>Enter</LoginButton>
          </a>
        </LoginForm>
      </LoginPageContainer>
    </PageContainer>
  );
}
