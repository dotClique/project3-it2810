import { Table, TableBody, TableHead, TablePagination, TableRow } from "@mui/material";
import { StyledTableCell, HeaderTableCell } from "./styled";
import { useEffect, useState } from "react";
import { useAlias } from "../../helpers/alias";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_GROUP_EVENTS } from "../../helpers/graphql-queries";
import EventTableSortHeader from "../EventTableSortHeader";

type Props = {
  id: string;
  searchString: string;
  fromDate: string;
  toDate: string;
};

export default function EventTable(props: Props) {
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const [sortBy, setSortBy] = useState<{ id: string; direction: "desc" | "asc" }>({
    id: "DATE",
    direction: "desc",
  });

  const { alias } = useAlias();

  const [pageSize, setPageSize] = useState(8);

  const { data: dataEvents } = useQuery(GET_MOVIE_GROUP_EVENTS, {
    variables: {
      movieGroupId: String(props.id),
      sortBy: sortBy.id,
      searchString: props.searchString,
      pageSize,
      fromDate: props.fromDate,
      page,
      toDate: props.toDate,
      alias,
      asc: sortBy.direction === "asc",
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setCount(dataEvents ? dataEvents.movieEventCount : count);
  }, [dataEvents]);
  return (
    <Table
      sx={{ backgroundColor: "secondary.main", color: "secondary.contrastText", borderRadius: 1 }}
    >
      <TableHead sx={{ backgroundColor: "secondary" }}>
        <TableRow sx={{ backgroundColor: "secondary" }}>
          <EventTableSortHeader
            setSortBy={setSortBy}
            sortBy={sortBy}
            id={"TITLE"}
            title={"Event Title"}
          />
          <EventTableSortHeader
            setSortBy={setSortBy}
            sortBy={sortBy}
            id={"DESCRIPTION"}
            title={"Description"}
          />
          <EventTableSortHeader
            setSortBy={setSortBy}
            sortBy={sortBy}
            id={"LOCATION"}
            title={"Location"}
          />
          <EventTableSortHeader
            setSortBy={setSortBy}
            sortBy={sortBy}
            id={"DATE"}
            title={"DateTime"}
          />
          <HeaderTableCell>Participant</HeaderTableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ backgroundColor: "secondary" }}>
        {dataEvents &&
          dataEvents.movieEvents?.map(
            (movieEvent: {
              description: string;
              title: string;
              location: string;
              date: string;
              movieEventId: string;
              userIsParticipant: boolean;
            }) => {
              return (
                <TableRow key={movieEvent.movieEventId}>
                  <StyledTableCell>{movieEvent.title}</StyledTableCell>
                  <StyledTableCell>{movieEvent.description}</StyledTableCell>
                  <StyledTableCell>{movieEvent.location}</StyledTableCell>
                  <StyledTableCell>
                    {movieEvent.date.replace("T", " ").replace("Z", "").slice(0, -4)}
                  </StyledTableCell>
                  <StyledTableCell>{movieEvent.userIsParticipant ? "yes" : "no"}</StyledTableCell>
                </TableRow>
              );
            },
          )}
      </TableBody>

      <TablePagination
        sx={{ color: "secondary.contrastText" }}
        rowsPerPageOptions={[5, 10, 15]}
        count={count}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={(e, v) => {
          setPage(v + 1);
        }}
        onRowsPerPageChange={(e) => {
          setPageSize(parseInt(e.target.value));
        }}
      />
    </Table>
  );
}
