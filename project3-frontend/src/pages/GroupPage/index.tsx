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
import { useParams } from "react-router-dom";
import { GET_MOVIE_GROUP, GET_MOVIE_GROUP_EVENTS } from "../../helpers/graphql-queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function GroupPage() {
  const [sortBy, setSortBy] = useState<string>("DATE");
  const [searchString, setSearchString] = useState<string>("");
  let id: string;
  // eslint-disable-next-line prefer-const
  ({ id } = useParams());
  const { data: dataGroup } = useQuery(GET_MOVIE_GROUP, {
    variables: { movieGroupId: String(id) },
    fetchPolicy: "cache-first",
  });

  const { data: dataEvents } = useQuery(GET_MOVIE_GROUP_EVENTS, {
    variables: { movieGroupId: String(id), sortBy: sortBy, searchString: searchString },
    fetchPolicy: "network-only",
  });
  console.log(dataEvents);

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"}>Back</Button>
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
            <FormControlLabel control={<Checkbox />} label={"Viste filmer"} />
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
          <Select label={"Tidsrom"} sx={{ gridArea: "filterTime" }}>
            <MenuItem>innen en uke</MenuItem>
            <MenuItem>denne måneden</MenuItem>
            <MenuItem>i år</MenuItem>
            <MenuItem>Allerede vist</MenuItem>
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
                movieEvent: { description: string; title: string; location: string; date: string },
                i: any,
              ) => {
                return (
                  <MovieEventComponent
                    description={movieEvent.description}
                    title={movieEvent.title}
                    location={movieEvent.location}
                    datetime={movieEvent.date}
                    key={i}
                  />
                );
              },
            )}
        </GroupGrid>
        <Pagination count={100} color="primary" />
        <Button variant={"contained"}>Add New movieevent</Button>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
