import PageContainer from "../../components/PageContainer";
import { Typography, Button } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styledComponents";

export default function Movie() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"}>Back</Button>
        <MovieGrid>
          <Typography variant="h1" component="h1" style={{ width: "100%" }}>
            {" "}
            Tittel
          </Typography>
          <Typography variant="h2" component="h2" style={{ width: "100%" }}>
            {" "}
            Sted
          </Typography>
          <h1>04.10.1999</h1>
        </MovieGrid>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
