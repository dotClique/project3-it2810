import PageContainer from "../../components/PageContainer";
import { MenuItem, Pagination, TextField, Button, Typography } from "@mui/material";
import MovieEventComponent from "../../components/MovieEventComponent";
import { useParams, useHistory } from "react-router-dom";
import { GET_MOVIE_GROUP, GET_MOVIE_GROUP_EVENTS } from "../../helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Paths } from "../../helpers/constants";
import { useAlias } from "../../helpers/alias";
import FooterButton from "../../components/FooterButton";
import EventTable from "../../components/EventTable";
import EventFilter from "../../components/EventFilter";

export default function GroupPage() {
  const { id } = useParams() as { id: string };
  const { data: dataGroup } = useQuery(GET_MOVIE_GROUP, {
    variables: { movieGroupId: String(id) },
    fetchPolicy: "cache-first",
  });
  const [sortBy, setSortBy] = useState<string>("DATE");
  const [searchString, setSearchString] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("0000-12-30T23:59:59.999Z"); //new Date().toISOString());
  const [toDate, setToDate] = useState<string>("9999-12-30T23:59:59.999Z");

  const history = useHistory();

  return (
    <PageContainer
      title={dataGroup ? dataGroup.movieGroup.name : "error"}
      logoutPossible
      footerElements={
        <>
          <FooterButton
            onClick={() => {
              history.push(Paths.ADD_MOVIE_EVENT + "/" + id);
            }}
            text={"Add New movie event"}
          />
          <FooterButton
            color={"secondary"}
            onClick={() => {
              history.goBack();
            }}
            text={"Back"}
          />
        </>
      }
    >
      <Typography variant={"body1"} id="Description">
        {dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}
      </Typography>
      {/*

      <EventsHeader>
        <Typography sx={{ gridArea: "title" }}>Event title</Typography>
        <Typography sx={{ gridArea: "description" }}>Description</Typography>
        <Typography sx={{ gridArea: "location" }}>Location</Typography>
        <Typography sx={{ gridArea: "dateTime" }}>DateTime</Typography>
        <Typography sx={{ gridArea: "status" }}>Participant</Typography>
      </EventsHeader>
      <GroupGrid>
        {dataEvents &&
          dataEvents.movieEvents.map(
            (
              movieEvent: {
                description: string;
                title: string;
                location: string;
                date: string;
                movieEventId: string;
                userIsParticipant: boolean;
              },
              i: number,
            ) => {
              return (
                <Button
                  key={i}
                  onClick={() => {
                    history.push("/movie/" + movieEvent.movieEventId);
                  }}
                >
                  <MovieEventComponent
                    description={movieEvent.description}
                    title={movieEvent.title}
                    location={movieEvent.location}
                    datetime={movieEvent.date}
                    isParticipant={movieEvent.userIsParticipant}
                    key={i}
                  />
                </Button>
              );
            },
          )}
      </GroupGrid>
      */}
      <EventFilter setSearchString={setSearchString} setSortBy={setSortBy} setToDate={setToDate} setToFrom={setFromDate}
      <EventTable id={id}></EventTable>
    </PageContainer>
  );
}
