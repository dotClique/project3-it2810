import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer, GroupGrid, FilterGrid } from "./styled";
import {
  MenuItem,
  Pagination,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  Button,
} from "@mui/material";
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

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"} onClick={history.goBack}>
          Back
        </Button>
        <h1>{dataGroup ? dataGroup.movieGroup.name : "error"}</h1>
        <br />
        <FilterGrid>
          <TextField
            label={"Søk på tittel"}
            variant={"outlined"}
            sx={{ gridArea: "search" }}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <Card variant={"outlined"} sx={{ gridArea: "checkbox" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setFromDate(
                      e.target.checked ? "0001-01-01T00:00:01.000Z" : new Date().toISOString(),
                    );
                  }}
                />
              }
              label={"Viste filmer"}
            />
          </Card>
          <Select
            defaultValue={"DATE"}
            label={"Sorter på"}
            sx={{ gridArea: "filterSort" }}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <MenuItem value={"DATE"}>date</MenuItem>
            <MenuItem value={"TITLE"}>title</MenuItem>
            <MenuItem value={"LOCATION"}>location</MenuItem>
          </Select>
          <Select
            defaultValue={"4"}
            label={"Tidsrom"}
            sx={{ gridArea: "filterTime" }}
            onChange={(e) => {
              const date = new Date();
              switch (e.target.value as string) {
                case "0":
                  date.setDate(date.getDate() + 7);
                  setToDate(date.toISOString());
                  break;
                case "1":
                  date.setMonth(date.getMonth() + 1);
                  setToDate(date.toISOString());
                  break;
                case "2":
                  date.setFullYear(date.getFullYear() + 1);
                  setToDate(date.toISOString());
                  break;
                case "3":
                  setToDate(date.toISOString());
                  break;
                default:
                  setToDate("9999-12-30T23:59:59.999Z");
              }
            }}
          >
            <MenuItem value={"0"}>innen en uke</MenuItem>
            <MenuItem value={"1"}> inn en måned</MenuItem>
            <MenuItem value={"2"}>innen ett år</MenuItem>
            <MenuItem value={"3"}>Allerede vist</MenuItem>
            <MenuItem value={"4"}>Alle</MenuItem>
          </Select>
        </FilterGrid>
        <Card variant={"outlined"} sx={{ minHeight: "100px", width: "100%" }}>
          <p id="Description">
            {dataGroup ? dataGroup.movieGroup.description : "Kunne ikke laste inn"}
          </p>
        </Card>
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
        <Pagination
          count={pageCount}
          page={pageNum}
          onChange={(e, p) => {
            setPageNum(p);
          }}
          color="primary"
        />
        <Button
          variant={"contained"}
          onClick={() => {
            history.push(history.location.pathname + Paths.ADD_MOVIE_EVENT);
          }}
        >
          Add New movieevent
        </Button>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
