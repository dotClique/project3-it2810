import { useLazyQuery, useMutation } from "@apollo/client";
import { SearchIcon } from "@heroicons/react/solid";
import {
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MovieGroupItem from "../../components/MovieGroupItem";
import PageContainer from "../../components/PageContainer";
import { Paths } from "../../helpers/constants";
import {
  ADD_USER_TO_MOVIE_GROUP,
  CREATE_MOVIE_GROUP,
  GET_COUNT_MOVIE_GROUPS_NOT_FAVORITE,
  GET_MOVIE_GROUP_NOT_FAVORITE,
} from "../../helpers/graphql-queries";
import {
  GroupAccordion,
  GroupGrid,
  LogOutButton,
  MovieGroupFooter,
  MovieGroupsContainer,
  NewGroupButton,
} from "./styled";

export default function MovieGroupsPage() {
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  // This is only meant as an example of graphQL use and is to be changed in later versions
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] = useLazyQuery(
    GET_COUNT_MOVIE_GROUPS_NOT_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [notFavoriteGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUP_NOT_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [createNewGroup, { data: dataNewGroup, loading: loadingNewGroup }] =
    useMutation(CREATE_MOVIE_GROUP);

  const [addUserToGroup] = useMutation(ADD_USER_TO_MOVIE_GROUP);

  const [alias, setAlias] = useState("");
  const [expanded, setExpanded] = useState("allMovies");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const pageSize = 3;

  const history = useHistory();

  const handleChange = (panel: string) => () => {
    setExpanded(panel);
  };

  useEffect(() => {
    setAlias(localStorage.getItem("alias") || "");
  }, [setAlias]);

  useEffect(() => {
    if (!loadingCount && dataCount) {
      setCount(Math.ceil(dataCount.countMovieGroupNotFavorite / pageSize));
    }
  }, [loadingCount, dataCount, setCount]);

  useEffect(() => {
    if (!loadingNewGroup && dataNewGroup) {
      notFavoriteGroupsQuery({ variables: { alias, page, pageSize } });
      fetchCountQuery({ variables: { alias } });
    }
  }, [
    loadingNewGroup,
    dataNewGroup,
    notFavoriteGroupsQuery,
    fetchCountQuery,
    alias,
    page,
    pageSize,
  ]);

  useEffect(() => {
    if (alias) {
      notFavoriteGroupsQuery({ variables: { alias, page, pageSize } });
      fetchCountQuery({ variables: { alias } });
    }
  }, [page, alias, pageSize, notFavoriteGroupsQuery, fetchCountQuery]);

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Movie Groups
        </Typography>

        <GroupAccordion expanded={expanded === "favorites"} onChange={handleChange("favorites")}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Favorites</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GroupGrid>
              <MovieGroupItem title={"Marvel"} favorite />
            </GroupGrid>
          </AccordionDetails>
        </GroupAccordion>
        <GroupAccordion expanded={expanded === "allMovies"} onChange={handleChange("allMovies")}>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>All groups</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: "sm" }}>
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
                ? dataGroups.movieGroupsNotFavorite.map(
                    (item: { name: string; movieGroupId: string }) => (
                      <MovieGroupItem
                        title={item.name}
                        key={item.movieGroupId}
                        onToggleFavorite={() => {
                          addUserToGroup({
                            variables: { useralias: alias, movieGroupId: item.movieGroupId },
                          }).then(() => {
                            notFavoriteGroupsQuery({ variables: { alias, page, pageSize } });
                            fetchCountQuery({ variables: { alias } });
                          });
                        }}
                        id={item.movieGroupId}
                      />
                    ),
                  )
                : false}
            </GroupGrid>
          </AccordionDetails>
        </GroupAccordion>
        <MovieGroupFooter>
          <NewGroupButton
            onClick={() => {
              createNewGroup({
                variables: {
                  name: Math.random().toString().substr(2, 8),
                  description: "more test",
                },
              });
            }}
          >
            Add new movie group
          </NewGroupButton>
          <LogOutButton color={"secondary"} onClick={() => history.push(Paths.HOME)}>
            Change Alias
          </LogOutButton>
          <Pagination count={count} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
