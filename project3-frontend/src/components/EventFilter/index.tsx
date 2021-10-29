import { MenuItem, TextField } from "@mui/material";

import { GroupGrid, FilterGrid, EventsHeader } from "./styled";

type Props = {
  setSearchString: (s: string) => void;
  setSortBy: (n: number) => void;
  setToDate: (d: string) => void;
  setFromDate: (d: string) => void;
};

export default function EventFilter(props: Props) {
  return (
    <FilterGrid>
      <TextField
        label={"Search for event by title"}
        variant={"outlined"}
        sx={{ gridArea: "search" }}
        onChange={(e) => {
          props.setSearchString(e.target.value);
        }}
      />
      <TextField
        select
        defaultValue={"DATE"}
        label={"Sort By"}
        color={"primary"}
        sx={{ gridArea: "filterSort" }}
        onChange={(e) => {
          props.setSortBy(e.target.value);
        }}
      >
        <MenuItem value={"DATE"}>Date</MenuItem>
        <MenuItem value={"TITLE"}>Title</MenuItem>
        <MenuItem value={"LOCATION"}>Location</MenuItem>
      </TextField>
      <TextField
        select
        defaultValue={"4"}
        label={"Time period"}
        sx={{ gridArea: "filterTime" }}
        onChange={(e) => {
          const date = new Date();
          switch (e.target.value as string) {
            case "0":
              date.setDate(date.getDate() + 7);
              props.setToDate(date.toISOString());
              props.setFromDate(new Date().toISOString());
              break;
            case "1":
              date.setMonth(date.getMonth() + 1);
              props.setToDate(date.toISOString());
              props.setFromDate(new Date().toISOString());
              break;
            case "2":
              date.setFullYear(date.getFullYear() + 1);
              props.setToDate(date.toISOString());
              props.setFromDate(new Date().toISOString());
              break;
            case "3":
              props.setToDate("9999-12-30T23:59:59.999Z");
              props.setFromDate(new Date().toISOString());
              break;
            default:
              props.setToDate("9999-12-30T23:59:59.999Z");
              props.setFromDate("0001-01-01T00:00:01.000Z");
          }
        }}
      >
        <MenuItem value={"0"}>Upcoming events 1 week</MenuItem>
        <MenuItem value={"1"}>Upcoming events 1 month</MenuItem>
        <MenuItem value={"2"}>Upcoming events 1 year</MenuItem>
        <MenuItem value={"3"}>All upcoming Events</MenuItem>
        <MenuItem value={"4"}>All</MenuItem>
      </TextField>
    </FilterGrid>
  );
}
