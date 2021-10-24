import PageContainer from "../../components/PageContainer";
import { Typography, Button, Card } from "@mui/material";
import { MovieGrid, MovieGroupsContainer } from "./styled";
import {
  GET_MOVIE_EVENT,
  ADD_USER_TO_EVENT,
  REMOVE_USER_FROM_EVENT,
} from "../../helpers/graphql-queries";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const [mostrecent, setMostRecent] = useState<number>(0);
  let id: string;
  // eslint-disable-next-line prefer-const
  ({ id } = useParams());
  const { data: dataEvents } = useQuery(GET_MOVIE_EVENT, {
    variables: { movieEventId: String(id) },
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

  const [participants, setParticipants] = useState<[]>([]);
  useEffect(() => {
    switch (mostrecent) {
      case 0:
        setParticipants(
          dataEvents && dataEvents.movieEvent ? dataEvents.movieEvent.participants : [],
        );
        break;
      case 1:
        setParticipants(
          leaveData && leaveData.removeUserFromEvent
            ? leaveData.removeUserFromEvent.participants
            : participants,
        );
        break;
      case 2:
        setParticipants(
          joinData && joinData.addUserToEvent ? joinData.addUserToEvent.participants : participants,
        );
        break;
      default:
        setParticipants(
          dataEvents && dataEvents.movieEvent ? dataEvents.movieEvent.participants : [],
        );
    }
  });
  console.log(participants);
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
          {dataEvents &&
          participants &&
          participants.filter(
            (participant: { alias: string | null }) =>
              participant.alias === localStorage.getItem("alias"),
          ).length > 0 ? (
            <Button
              variant={"contained"}
              onClick={() => {
                leaveEvent();
                setMostRecent(1);
              }}
            >
              Nei, vil ikke
            </Button>
          ) : (
            <Button
              variant={"contained"}
              onClick={() => {
                joinEvent();
                setMostRecent(2);
              }}
            >
              Bli med!
            </Button>
          )}
        </MovieGrid>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
