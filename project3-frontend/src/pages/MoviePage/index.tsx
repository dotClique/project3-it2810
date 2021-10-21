import PageContainer from "../../components/PageContainer";
import { Typography, Button, Card } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styled";

export default function MoviePage() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"}>Back</Button>
        <MovieGrid>
          <Card variant="outlined" style={{ width: "100%", height: "100%" }}>
            <Typography variant="h1" component="h1" style={{ width: "100%" }}>
              {" "}
              Tittel
            </Typography>
            <Card variant="outlined" style={{ width: "100%", height: "100%" }}>
              <p id="beskrivelse">Beskrivelse</p>
            </Card>
          </Card>
          <Typography variant="h2" component="h2" style={{ width: "100%" }}>
            {" "}
            Sted
          </Typography>
          <h1>04.10.1999</h1>
          <Button variant={"contained"}>Bli med!</Button>
        </MovieGrid>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
