import PageContainer from "../../components/PageContainer";
import { Typography, Button, Card } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styled";
import { GET_MOVIE_EVENT } from "../../helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";

export default function MoviePage() {
  let id: string;
  // eslint-disable-next-line prefer-const
  ({ id } = useParams());
  const { data: dataEvents } = useQuery(GET_MOVIE_EVENT, {
    variables: { movieEventId: String(id) },
    fetchPolicy: "network-only",
  });

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"} onClick={useHistory().goBack}>
          Back
        </Button>
        <MovieGrid>
          <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
            <Typography variant="h1" component="h1" sx={{ width: "100%" }}>
              {" "}
              {dataEvents ? dataEvents.movieEvent.title : " "}
            </Typography>
            <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
              <p id="beskrivelse">
                {dataEvents ? dataEvents.movieEvent.description : "kunne ikke laste inn"}
              </p>
            </Card>
          </Card>
          <Typography variant="h2" component="h2" sx={{ width: "100%" }}>
            {" "}
            {dataEvents ? dataEvents.movieEvent.location : "kunne ikke laste inn"}
          </Typography>
          <h1>{dataEvents ? dataEvents.movieEvent.date : "--.--.----"}</h1>
          <Button variant={"contained"}>Bli med!</Button>
        </MovieGrid>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
