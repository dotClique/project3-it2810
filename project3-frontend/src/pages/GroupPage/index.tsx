import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer, GroupGrid, FilterGrid, EventsHeader } from "./styled";
import { MenuItem, Pagination, TextField, Button, Box, Typography } from "@mui/material";
import MovieEventComponent from "../../components/MovieEventComponent";
import { useParams, useHistory } from "react-router-dom";
import { GET_MOVIE_GROUP, GET_MOVIE_GROUP_EVENTS } from "../../helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Paths } from "../../helpers/constants";

export default function GroupPage() {
  const [sortBy, setSortBy] = useState<string>("DATE");
  const [searchString, setSearchString] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>(new Date().toISOString());
  const [toDate, setToDate] = useState<string>("9999-12-30T23:59:59.999Z");
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(1);
  let id: string;
  // eslint-disable-next-line prefer-const
  ({ id } = useParams());
  const { data: dataGroup } = useQuery(GET_MOVIE_GROUP, {
    variables: { movieGroupId: String(id) },
    fetchPolicy: "cache-first",
  });
  const history = useHistory();
  const { data: dataEvents } = useQuery(GET_MOVIE_GROUP_EVENTS, {
    variables: {
      movieGroupId: String(id),
      sortBy: sortBy,
      searchString: searchString,
      pageSize: 8,
      fromDate: fromDate,
      page: pageNum,
      toDate: toDate,
    },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    setPageCount(dataEvents ? Math.ceil(dataEvents.movieEventCount / 8) : pageCount);
  }, [dataEvents]);

  console.log(fromDate, toDate);
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography variant={"h3"}>{dataGroup ? dataGroup.movieGroup.name : "error"}</Typography>

        <Typography variant={"body1"} id="Description">
          {dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}
        </Typography>
        <FilterGrid>
          <TextField
            label={"Search for event by title"}
            variant={"outlined"}
            sx={{ gridArea: "search" }}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <TextField
            select
            defaultValue={"DATE"}
            label={"Sort By"}
            color={"primary"}
            sx={{ gridArea: "filterSort" }}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <MenuItem value={"DATE"}>Date</MenuItem>
            <MenuItem value={"TITLE"}>Title</MenuItem>
            <MenuItem value={"LOCATION"}>Location</MenuItem>
          </TextField>
          <TextField
            select
            defaultValue={"4"}
            label={"Time period"}
            sx={{ gridArea: "filterTime" }}
            onChange={(e) => {
              const date = new Date();
              switch (e.target.value as string) {
                case "0":
                  date.setDate(date.getDate() + 7);
                  setToDate(date.toISOString());
                  setFromDate(new Date().toISOString());
                  break;
                case "1":
                  date.setMonth(date.getMonth() + 1);
                  setToDate(date.toISOString());
                  setFromDate(new Date().toISOString());
                  break;
                case "2":
                  date.setFullYear(date.getFullYear() + 1);
                  setToDate(date.toISOString());
                  setFromDate(new Date().toISOString());
                  break;
                case "3":
                  setToDate("9999-12-30T23:59:59.999Z");
                  setFromDate(new Date().toISOString());
                  break;
                default:
                  setToDate("9999-12-30T23:59:59.999Z");
                  setFromDate("0001-01-01T00:00:01.000Z");
              }
            }}
          >
            <MenuItem value={"0"}>Upcoming events 1 week</MenuItem>
            <MenuItem value={"1"}>Upcoming events 1 month</MenuItem>
            <MenuItem value={"2"}>Upcoming events 1 year</MenuItem>
            <MenuItem value={"3"}>All upcoming Events</MenuItem>
            <MenuItem value={"4"}>All</MenuItem>
          </TextField>
        </FilterGrid>
        <EventsHeader>
          <Typography sx={{ gridArea: "title" }}>Event title</Typography>
          <Typography sx={{ gridArea: "description" }}>Description</Typography>
          <Typography sx={{ gridArea: "location" }}>Location</Typography>
          <Typography sx={{ gridArea: "dateTime" }}>Date and Time</Typography>
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
                      key={i}
                    />
                  </Button>
                );
              },
            )}
        </GroupGrid>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
          <Button
            variant={"contained"}
            onClick={() => {
              history.push(Paths.ADD_MOVIE_EVENT + "/" + id);
            }}
          >
            Add New movieevent
          </Button>
          <Button variant={"contained"} color="secondary" onClick={history.goBack}>
            Back
          </Button>
          <Pagination
            count={pageCount}
            page={pageNum}
            onChange={(e, p) => {
              setPageNum(p);
            }}
            color="primary"
          />
        </Box>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
