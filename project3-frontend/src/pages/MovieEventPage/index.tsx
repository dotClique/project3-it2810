import PageContainer from "../../components/PageContainer";
import { Typography, Button, Card, Box, Divider } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styled";
import { useParams, useHistory } from "react-router-dom";
import { useMovieEvent } from "./utils";

export default function MovieEventPage() {
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const { isParticipant, movieData, joinEvent, leaveEvent } = useMovieEvent(id);
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <MovieGrid>
          <Typography color="primary" variant="h3" component="h3" sx={{ width: "100%" }}>
            {movieData.title}
          </Typography>

          <Divider flexItem sx={{ width: "100%", margin: 1, borderColor: "primary.main" }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Description
          </Typography>
          <Typography variant="body1" id="beskrivelse" color="secondary.contrastText">
            {movieData.description}
          </Typography>
          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Location
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Typography variant="body1" component="h4" color="secondary.contrastText">
              {movieData.location}
            </Typography>
          </Box>

          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Date
          </Typography>
          <Typography variant="body1" component="h4" color="secondary.contrastText">
            {movieData.date}
          </Typography>
          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Status
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Typography variant="body1" component="h4" color="secondary.contrastText">
              {movieData && isParticipant
                ? "You are a participant of this event"
                : "You are not a participant of this event"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              marginTop: "auto",
              marginBottom: 2,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant={"contained"}
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </Button>
            {movieData && isParticipant ? (
              <Button
                variant={"contained"}
                onClick={() => {
                  leaveEvent();
                }}
              >
                Leave Event
              </Button>
            ) : (
              <Button
                variant={"contained"}
                onClick={() => {
                  joinEvent();
                }}
              >
                Join Event
              </Button>
            )}
          </Box>
        </MovieGrid>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
