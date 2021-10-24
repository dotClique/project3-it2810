import { SearchIcon } from "@heroicons/react/solid";
import { InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import {
  GroupGrid,
  MovieGroupFooter,
  MovieGroupsContainer,
  AllGroupsButton,
  GridHeader,
} from "./styled";
import MovieGroupWithUpcomingEvents from "../../components/MovieGroupsWithUpcomingEvents";
import { LogOutButton } from "../../components/LogOutButton";
import { useFavoriteMovieGroups } from "./utils";
import { useMutation } from "@apollo/client";
import { REMOVE_USER_FROM_MOVIE_GROUP } from "../../helpers/graphql-queries";
import { Paths } from "../../helpers/constants";
import { useAlias } from "../../helpers/alias";

export default function FavoriteMovieGroupsPage() {
  const pageSize = 4;
  const { alias, logout } = useAlias();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [removeUserFromGroup] = useMutation(REMOVE_USER_FROM_MOVIE_GROUP);
  const { movieGroups, pageCount, refetch } = useFavoriteMovieGroups(
    page,
    pageSize,
    alias,
    searchString,
  );

  const history = useHistory();

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
        <GridHeader>
          <Typography variant={"h5"} component={"h5"}>
            Group
          </Typography>
          <Typography variant={"h5"} component={"h5"}>
            Upcoming Events
          </Typography>
        </GridHeader>
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
                onUnFavorite={() => {
                  removeUserFromGroup({
                    variables: { useralias: alias, movieGroupId: item.movieGroupId },
                  }).then(() => refetch());
                }}
              />
            ),
          )}
        </GroupGrid>
        <MovieGroupFooter>
          <AllGroupsButton
            onClick={() => {
              history.push(Paths.MOVIE_GROUPS);
            }}
          >
            Go to all movie groups
          </AllGroupsButton>
          <LogOutButton
            color={"secondary"}
            onClick={() => {
              logout();
              history.push(Paths.HOME);
            }}
          >
            Log out
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
