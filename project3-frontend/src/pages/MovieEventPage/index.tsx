import PageContainer from "../../components/PageContainer";
import { Typography, Button, Card, Box, Divider } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styled";
import {
  GET_MOVIE_EVENT,
  ADD_USER_TO_EVENT,
  REMOVE_USER_FROM_EVENT,
} from "../../helpers/graphql-queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieEventPage() {
  const { id } = useParams() as { id: string };
  const history = useHistory();
  const { data: dataEvents } = useQuery(GET_MOVIE_EVENT, {
    variables: { movieEventId: String(id), alias: localStorage.getItem("alias") },
    fetchPolicy: "network-only",
  });

  const [joinEvent, { data: joinData, loading: joinLoading, error: joinError }] = useMutation(
    ADD_USER_TO_EVENT,
    {
      variables: { movieEventId: String(id), useralias: localStorage.getItem("alias") },
    },
  );

  const [leaveEvent, { data: leaveData, loading: leaveLoading, error: leaveError }] = useMutation(
    REMOVE_USER_FROM_EVENT,
    {
      variables: { movieEventId: String(id), useralias: localStorage.getItem("alias") },
    },
  );

  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  useEffect(() => {
    if (dataEvents)
      setIsParticipant(
        dataEvents && dataEvents.movieEvent ? dataEvents.movieEvent.userIsParticipant : [],
      );
  }, [dataEvents]);

  useEffect(() => {
    setIsParticipant(
      leaveData && leaveData.removeUserFromEvent
        ? leaveData.removeUserFromEvent.userIsParticipant
        : isParticipant,
    );
  }, [leaveData]);

  useEffect(() => {
    setIsParticipant(
      joinData && joinData.addUserToEvent
        ? joinData.addUserToEvent.userIsParticipant
        : isParticipant,
    );
  }, [joinData]);

  console.log(isParticipant);
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <MovieGrid>
          <Typography color="primary" variant="h3" component="h3" sx={{ width: "100%" }}>
            {dataEvents ? dataEvents.movieEvent.title : " "}
          </Typography>

          <Divider flexItem sx={{ width: "100%", margin: 1, borderColor: "primary.main" }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Description
          </Typography>
          <Typography variant="body1" id="beskrivelse" color="secondary.contrastText">
            {dataEvents ? dataEvents.movieEvent.description : "kunne ikke laste inn"}
          </Typography>
          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Location
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Typography variant="body1" component="h4" color="secondary.contrastText">
              {dataEvents ? dataEvents.movieEvent.location : "kunne ikke laste inn"}
            </Typography>
          </Box>

          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Date
          </Typography>
          <Typography variant="body1" component="h4" color="secondary.contrastText">
            {dataEvents ? dataEvents.movieEvent.date : "--.--.----"}
          </Typography>
          <Divider sx={{ width: "100%", margin: 1 }} />
          <Typography variant="h5" id="beskrivelse" color="primary">
            Status
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Typography variant="body1" component="h4" color="secondary.contrastText">
              {dataEvents && isParticipant
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
            {dataEvents && isParticipant ? (
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
