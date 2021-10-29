import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAlias } from "../../helpers/alias";
import {
  ADD_USER_TO_EVENT,
  GET_MOVIE_EVENT,
  REMOVE_USER_FROM_EVENT,
} from "../../helpers/graphql-queries";
import { useErrorToast } from "../../helpers/utils";

export function useMovieEvent(id: string) {
  const { alias } = useAlias();
  const errToast = useErrorToast();
  const { data: dataEvents } = useQuery(GET_MOVIE_EVENT, {
    variables: { movieEventId: String(id), alias },
    onError: (err) => errToast(err.message),
    fetchPolicy: "network-only",
  });

  const [joinEvent, { data: joinData }] = useMutation(ADD_USER_TO_EVENT, {
    onError: (err) => errToast(err.message),
    variables: { movieEventId: String(id), useralias: alias },
  });

  const [leaveEvent, { data: leaveData }] = useMutation(REMOVE_USER_FROM_EVENT, {
    onError: (err) => errToast(err.message),
    variables: { movieEventId: String(id), useralias: alias },
  });

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

  const movieData = dataEvents
    ? dataEvents.movieEvent
    : {
        title: "",
        description: "",
        location: "",
        date: "--.--.----",
      };
  return { isParticipant, movieData, joinEvent, leaveEvent };
}
