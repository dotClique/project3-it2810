import { TableCell, TableSortLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSortBy: Dispatch<SetStateAction<{ id: string; direction: "asc" | "desc" }>>;
  title: string;
  id: string;
  sortBy: { id: string; direction: "asc" | "desc" };
};
export default function EventTableSortHeader(props: Props) {
  const active = props.sortBy.id === props.id;
  return (
    <TableCell>
      <TableSortLabel
        sx={{
          color: (theme) => {
            return theme.palette.primary.main + "!important";
          },
          "& *": {
            color: (theme) => {
              return theme.palette.primary.main + "!important";
            },
          },
        }}
        active={active}
        direction={active ? props.sortBy.direction : undefined}
        onClick={() => {
          active
            ? props.setSortBy({
                id: props.id,
                direction: props.sortBy.direction === "asc" ? "desc" : "asc",
              })
            : props.setSortBy({ id: props.id, direction: "asc" });
        }}
      >
        {props.title}
      </TableSortLabel>
    </TableCell>
  );
}
