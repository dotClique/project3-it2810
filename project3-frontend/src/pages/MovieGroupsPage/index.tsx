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
import {
  GroupAccordion,
  GroupGrid,
  LogOutButton,
  MovieGroupFooter,
  MovieGroupsContainer,
  NewGroupButton,
} from "./styled";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_MOVIE_GROUP,
  GET_COUNT_MOVIE_GROUPS,
  GET_MOVIE_GROUP_NAMES_NOT_FAVORITE,
} from "../../helpers/graphql-queries";

export default function MovieGroupsPage() {
  // This is meant as an example of graphQL use and is to be changed in later versions
  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(GET_COUNT_MOVIE_GROUPS, { fetchPolicy: "network-only" });
  const [notFavoriteGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUP_NAMES_NOT_FAVORITE,
    { fetchPolicy: "network-only" },
  );
  const [createNewGroup, { data: dataNewGroup, loading: loadingNewGroup }] =
    useMutation(CREATE_MOVIE_GROUP);

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
  }, []);

  useEffect(() => {
    if (!loadingCount && dataCount) {
      setCount(Math.ceil(dataCount.movieGroupCount / pageSize));
    }
  }, [loadingCount, dataCount]);

  useEffect(() => {
    if (!loadingGroups && dataGroups) {
    }
  }, [loadingGroups, dataGroups]);

  useEffect(() => {
    if (!loadingNewGroup && dataNewGroup) {
      notFavoriteGroupsQuery({ variables: { alias, page, pageSize } });
      refetchCount();
    }
  }, [loadingNewGroup]);

  useEffect(() => {
    notFavoriteGroupsQuery({ variables: { alias, page, pageSize } });
  }, [page]);

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
                ? dataGroups.movieGroupsNotFavorite.map((item: { name: string }) => (
                    <MovieGroupItem title={item.name} key={item.name} />
                  ))
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
          <LogOutButton color={"secondary"} onClick={() => history.push("/")}>
            Change Alias
          </LogOutButton>
          <Pagination count={count} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
