import { SearchIcon } from "@heroicons/react/solid";
import { InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MovieGroupItem from "../../components/MovieGroupItem";
import PageContainer from "../../components/PageContainer";
import {
  FavoritesButton,
  GroupGrid,
  MovieGroupFooter,
  MovieGroupsContainer,
  NewGroupButton,
} from "./styled";
import { useMutation } from "@apollo/client";
import { Paths } from "../../helpers/constants";
import {
  ADD_USER_TO_MOVIE_GROUP,
  REMOVE_USER_FROM_MOVIE_GROUP,
} from "../../helpers/graphql-queries";
import { LogOutButton } from "../../components/LogOutButton";
import { useMovieGroups } from "./utils";

export default function MovieGroupsPage() {
  const pageSize = 8;
  const [alias, setAlias] = useState("");
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");

  const { movieGroups, pageCount, refetch } = useMovieGroups(page, pageSize, searchString);
  const [addUserToGroup] = useMutation(ADD_USER_TO_MOVIE_GROUP);
  const [removeUserFromGroup] = useMutation(REMOVE_USER_FROM_MOVIE_GROUP);
  const history = useHistory();

  useEffect(() => {
    setAlias(localStorage.getItem("alias") || "");
  }, []);

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Movie Groups
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
          {movieGroups.map((item) => {
            const isFavorite = item.userFavorites.some((e) => e.alias === alias);
            return (
              <MovieGroupItem
                title={item.name}
                key={item.movieGroupId}
                onToggleFavorite={() => {
                  let action;
                  if (isFavorite) {
                    action = removeUserFromGroup;
                  } else {
                    action = addUserToGroup;
                  }
                  action({
                    variables: { useralias: alias, movieGroupId: item.movieGroupId },
                  }).then(() => {
                    refetch();
                  });
                }}
                favorite={isFavorite}
                id={item.movieGroupId}
              />
            );
          })}
        </GroupGrid>
        <MovieGroupFooter>
          <NewGroupButton onClick={() => history.push("/addGroup")}>
            Add new movie group
          </NewGroupButton>
          <FavoritesButton onClick={() => history.push("/favoritegroups")}>
            Go to favorites
          </FavoritesButton>
          <LogOutButton color={"secondary"} onClick={() => history.push(Paths.HOME)}>
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
