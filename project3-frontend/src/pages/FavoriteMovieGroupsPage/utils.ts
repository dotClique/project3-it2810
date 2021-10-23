import { useLazyQuery } from "@apollo/client";
import {
  GET_COUNT_MOVIE_GROUPS_FAVORITE,
  GET_MOVIE_GROUPS_FAVORITE,
} from "../../helpers/graphql-queries";
import { useEffect, useState } from "react";

export function useFavoriteMovieGroups(page: number, pageSize: number, alias: string) {
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] = useLazyQuery(
    GET_COUNT_MOVIE_GROUPS_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [movieGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUPS_FAVORITE,
    { fetchPolicy: "network-only" },
  );

  const [movieGroups, setMovieGroups] = useState<
    {
      name: string;
      movieGroupId: string;
      movieEvents: { title: string; date: string; movieEventId: string }[];
    }[]
  >([]);

  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    if (dataGroups && !loadingGroups) {
      setMovieGroups(dataGroups.movieGroups);
    }
  }, [dataGroups, loadingGroups]);

  useEffect(() => {
    if (!loadingCount && dataCount) {
      setPageCount(Math.ceil(dataCount.movieGroupCount / pageSize));
    }
  }, [loadingCount, dataCount]);

  useEffect(() => {
    if (alias) {
      refetch();
    }
  }, [page, alias]);

  function refetch() {
    movieGroupsQuery({ variables: { alias, page, pageSize } });
    fetchCountQuery({ variables: { alias } });
  }

  return { movieGroups, pageCount, refetch };
}
