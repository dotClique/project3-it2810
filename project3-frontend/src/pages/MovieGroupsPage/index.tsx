import { SearchIcon } from "@heroicons/react/solid";
import { InputAdornment, Pagination, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import FooterButton from "../../components/FooterButton";
import MovieGroupItem from "../../components/MovieGroupItem";
import PageContainer from "../../components/PageContainer";
import { useAlias } from "../../helpers/alias";
import { Paths } from "../../helpers/constants";
import {
  ADD_USER_TO_MOVIE_GROUP,
  REMOVE_USER_FROM_MOVIE_GROUP
} from "../../helpers/graphql-queries";
import { useCreationForm } from "../../helpers/utils";
import { GroupGrid } from "./styled";
import { useMovieGroups } from "./utils";

export default function MovieGroupsPage() {
  const pageSize = 8;
  const { alias } = useAlias();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const { movieGroups, pageCount, refetch } = useMovieGroups(page, pageSize, searchString);
  const [addUserToGroup] = useCreationForm(ADD_USER_TO_MOVIE_GROUP, refetch);
  const [removeUserFromGroup] = useCreationForm(REMOVE_USER_FROM_MOVIE_GROUP, refetch);
  const history = useHistory();

  return (
    <PageContainer
      title={"Movie Groups"}
      logoutPossible
      footerElements={
        <>
          <FooterButton
            onClick={() => history.push(Paths.ADD_MOVIE_GROUP)}
            text={"Add new movie group"}
          />
          <FooterButton
            onClick={() => history.push(Paths.FAVORITE_GROUPS)}
            text={"Go to favorites"}
          />
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
          />
        </>
      }
    >
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
                const params = { movieGroupId: item.movieGroupId, useralias: alias };
                return isFavorite ? removeUserFromGroup(params) : addUserToGroup(params);
              }}
              favorite={isFavorite}
              id={item.movieGroupId}
            />
          );
        })}
      </GroupGrid>
    </PageContainer>
  );
}
