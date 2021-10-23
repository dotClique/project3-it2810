import { SearchIcon } from "@heroicons/react/solid";
import { InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import { GroupGrid, MovieGroupFooter, MovieGroupsContainer, AllGroupsButton } from "./styled";
import MovieGroupWithUpcomingEvents from "../../components/MovieGroupsWithUpcomingEvents";
import { LogOutButton } from "../../components/LogOutButton";
import { useFavoriteMovieGroups } from "./utils";

export default function FavoriteMovieGroupsPage() {
  const pageSize = 6;
  const [alias, setAlias] = useState("");
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");

  const { movieGroups, pageCount } = useFavoriteMovieGroups(page, pageSize, alias, searchString);

  const history = useHistory();

  useEffect(() => {
    setAlias(localStorage.getItem("alias") || "");
  }, []);

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Favorite Movie Groups
        </Typography>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon width={20} />
              </InputAdornment>
            ),
          }}
          placeholder={"search for groups"}
          sx={{ width: "90%", marginBottom: 1 }}
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <GroupGrid>
          {movieGroups.map(
            (item: {
              name: string;
              movieGroupId: string;
              movieEvents: { title: string; date: string; movieEventId: string }[];
            }) => (
              <MovieGroupWithUpcomingEvents
                title={item.name}
                key={item.movieGroupId}
                id={item.movieGroupId}
                events={item.movieEvents}
              />
            ),
          )}
        </GroupGrid>
        <MovieGroupFooter>
          <AllGroupsButton
            onClick={() => {
              history.push("/groups");
            }}
          >
            Go to all movie groups
          </AllGroupsButton>
          <LogOutButton color={"secondary"} onClick={() => history.push("/")}>
            Change Alias
          </LogOutButton>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
          />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
