import { SearchIcon } from "@heroicons/react/solid";
import { InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PageContainer from "../../components/PageContainer";
import {
  GroupGrid,
  LogOutButton,
  MovieGroupFooter,
  MovieGroupsContainer,
  AllGroupsButton,
} from "./styled";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_USER_TO_MOVIE_GROUP,
  CREATE_MOVIE_GROUP,
  GET_COUNT_MOVIE_GROUPS_FAVORITE,
  GET_MOVIE_GROUP_FAVORITE,
} from "../../helpers/graphql-queries";
import MovieGroupWithUpcomingEvents from "../../components/MovieGroupsWithUpcomingEvents";
import * as querystring from "querystring";

export default function FavoriteMovieGroupsPage() {
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] = useLazyQuery(
    GET_COUNT_MOVIE_GROUPS_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [favoriteGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUP_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [createNewGroup, { data: dataNewGroup, loading: loadingNewGroup }] =
    useMutation(CREATE_MOVIE_GROUP);

  const [addUserToGroup] = useMutation(ADD_USER_TO_MOVIE_GROUP);

  const [alias, setAlias] = useState("");
  const [expanded, setExpanded] = useState("allMovies");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const pageSize = 6;

  const history = useHistory();

  const handleChange = (panel: string) => () => {
    setExpanded(panel);
  };

  useEffect(() => {
    setAlias(localStorage.getItem("alias") || "");
  }, []);

  useEffect(() => {
    if (!loadingCount && dataCount) {
      setCount(Math.ceil(dataCount.movieGroupCount / pageSize));
    }
  }, [loadingCount, dataCount]);

  useEffect(() => {
    if (!loadingNewGroup && dataNewGroup) {
      favoriteGroupsQuery({ variables: { alias, page, pageSize } });
      fetchCountQuery({ variables: { alias } });
    }
  }, [loadingNewGroup]);

  useEffect(() => {
    if (alias) {
      favoriteGroupsQuery({ variables: { alias, page, pageSize } });
      fetchCountQuery({ variables: { alias } });
    }
  }, [page, alias]);

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
        />
        <GroupGrid>
          {loadingGroups
            ? false
            : dataGroups
            ? dataGroups.movieGroups.map(
                (item: {
                  name: string;
                  movieGroupId: string;
                  movieEvents: { title: string; date: string; movieEventId: string }[];
                }) => (
                  <MovieGroupWithUpcomingEvents
                    title={item.name}
                    key={item.movieGroupId}
                    onToggleFavorite={() => {
                      addUserToGroup({
                        variables: { useralias: alias, movieGroupId: item.movieGroupId },
                      }).then(() => {
                        favoriteGroupsQuery({ variables: { alias, page, pageSize } });
                        fetchCountQuery({ variables: { alias } });
                      });
                    }}
                    id={item.movieGroupId}
                    events={item.movieEvents}
                  />
                ),
              )
            : false}
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
          <Pagination count={count} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
