import PageContainer from "../../components/PageContainer";
import { Typography, Card, TextField, Button } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styledComponents";

export default function AddMovie() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"}>Back</Button>
        <MovieGrid>
          <Typography variant="h2" component="h2" style={{ width: "100%" }}>
            Ny filmvisning
          </Typography>
          <TextField
            id="tittelfelt"
            label="Tittel"
            variant="outlined"
            style={{ width: "100%", height: "100%" }}
          />
          <Card variant="outlined" style={{ width: "100%", height: "100%" }}>
            <TextField
              id="stedfelt"
              label="Sted"
              variant="outlined"
              style={{ width: "100%", height: "20%" }}
            />
          </Card>
          <TextField
            variant={"outlined"}
            type={"datetime-local"}
            style={{ width: "100%", height: "100%" }}
          />
        </MovieGrid>
        <Button variant={"contained"} style={{ margin: "10%, 0" }}>
          Create
        </Button>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
