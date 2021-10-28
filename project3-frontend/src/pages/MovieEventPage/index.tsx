import PageContainer from "../../components/PageContainer";
import { Typography, Button, Box, Divider } from "@mui/material";
import { MovieGrid } from "./styled";
import { useParams, useHistory } from "react-router-dom";
import { useMovieEvent } from "./utils";
import MovieEventTextItem from "../../components/MovieEventTextItem";

export default function MovieEventPage() {
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const { isParticipant, movieData, joinEvent, leaveEvent } = useMovieEvent(id);
  return (
    <PageContainer
      title={movieData.title}
      backgroundColor={"secondary"}
      footerElements={
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
      }
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "baseline",
          padding: 3,
        }}
      >
        <Divider flexItem sx={{ width: "100%", margin: 1, borderColor: "primary.main" }} />
        <MovieEventTextItem title={"Description"} body={movieData.description} />
        <Divider sx={{ width: "100%", margin: 1 }} />
        <MovieEventTextItem title={"Location"} body={movieData.location} />

        <Divider sx={{ width: "100%", margin: 1 }} />
        <MovieEventTextItem title={"Date"} body={movieData.date} />
        <Divider sx={{ width: "100%", margin: 1 }} />
        <MovieEventTextItem
          title={"Status"}
          body={
            movieData && isParticipant
              ? "You are a participant of this event"
              : "You are not a participant of this event"
          }
        />
      </Box>
    </PageContainer>
  );
}
