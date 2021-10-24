import { useLazyQuery } from "@apollo/client";
import { GET_COUNT_MOVIE_GROUPS, GET_MOVIE_GROUPS } from "../../helpers/graphql-queries";
import { useEffect, useState } from "react";

/**
 * Custom hook for getting movie groups with pagination and search
 * @param page index of the current page
 * @param pageSize number of elements pr page
 * @param searchString a part of the elements title
 */
export function useMovieGroups(page: number, pageSize: number, searchString: string) {
  // Gets the total count of posts
  const [fetchCountQuery, { data: dataCount, loading: loadingCount }] = useLazyQuery(
    GET_COUNT_MOVIE_GROUPS,
    { fetchPolicy: "network-only" },
  );

  // Gets one page of movie groups
  const [movieGroupsQuery, { data: dataGroups, loading: loadingGroups }] = useLazyQuery(
    GET_MOVIE_GROUPS,
    { fetchPolicy: "network-only" },
  );

  // The array to store the movie groups in
  const [movieGroups, setMovieGroups] = useState<
    { name: string; movieGroupId: string; userFavorites: { alias: string }[] }[]
  >([]);

  // The total page count
  const [pageCount, setPageCount] = useState(1);

  // Updates the movie group array when finished fetching elements from grapqhl
  useEffect(() => {
    if (dataGroups && !loadingGroups) {
      setMovieGroups(dataGroups.movieGroups);
    }
  }, [dataGroups, loadingGroups]);

  // Updates the total page count when finished fetching element count from graphql
  useEffect(() => {
    if (!loadingCount && dataCount) {
      setPageCount(Math.ceil(dataCount.movieGroupCount / pageSize));
    }
  }, [loadingCount, dataCount, pageSize]);

  // Refetches if page or searchstring changes
  useEffect(() => {
    refetch();
  }, [page, searchString]);

  function refetch() {
    movieGroupsQuery({ variables: { page, pageSize, searchString } });
    fetchCountQuery();
  }

  return { movieGroups, pageCount, refetch };
}
