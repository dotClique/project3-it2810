import { Button, Card, TextField, Typography } from "@mui/material";
import PageContainer from "../../components/PageContainer";
import { MovieGrid, MovieGroupsContainer } from "./styled";

export default function AddMovieEventPage() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <MovieGrid>
          <Typography variant="h2" component="h2" sx={{ width: "100%" }}>
            Ny filmvisning
          </Typography>
          <TextField
            id="tittelfelt"
            label="Tittel"
            variant="outlined"
            sx={{ width: "100%", height: "100%" }}
          />
          <TextField
            id="Beskrivelsefelt"
            label="Beskrivelse"
            variant="outlined"
            rows={6}
            multiline={true}
            sx={{ width: "100%", height: "100%" }}
          />
          <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
            <TextField
              id="stedfelt"
              label="Sted"
              variant="outlined"
              sx={{ width: "100%", height: "20%" }}
            />
          </Card>
          <TextField
            variant={"outlined"}
            type={"datetime-local"}
            sx={{ width: "100%", height: "100%" }}
          />
        </MovieGrid>
        <Button variant={"contained"} sx={{ margin: "10%, 0" }}>
          Create
        </Button>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
