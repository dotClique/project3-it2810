import { useLazyQuery } from "@apollo/client";
import { GET_COUNT_MOVIE_GROUPS, GET_MOVIE_GROUPS } from "../../helpers/graphql-queries";
import { useEffect, useState } from "react";

export function useMovieGroups(
  page: number,
  pageSize: number,
  alias: string,
  searchString: string,
) {
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] = useLazyQuery(
    GET_COUNT_MOVIE_GROUPS,
    { fetchPolicy: "network-only" },
  );

  const [movieGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUPS,
    { fetchPolicy: "network-only" },
  );

  const [movieGroups, setMovieGroups] = useState<
    { name: string; movieGroupId: string; userFavorites: { alias: string }[] }[]
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
  }, [page, alias, searchString]);

  function refetch() {
    movieGroupsQuery({ variables: { page, pageSize, searchString } });
    fetchCountQuery({ variables: { alias } });
  }

  return { movieGroups, pageCount, refetch };
}
