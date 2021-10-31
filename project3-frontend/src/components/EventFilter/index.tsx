import { MenuItem, TextField } from "@mui/material";

import { FilterGrid } from "./styled";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSearchString: Dispatch<SetStateAction<string>>;
  setToDate: Dispatch<SetStateAction<string>>;
  setFromDate: Dispatch<SetStateAction<string>>;
};

export default function EventFilter(props: Props) {
  return (
    <FilterGrid>
      <TextField
        label={"Search for event by title"}
        variant={"outlined"}
        sx={{ gridArea: "search" }}
        inputProps={{ "data-testid": "textinput" }}
        onChange={(e) => {
          props.setSearchString(e.target.value);
        }}
      />
      <TextField
        select
        defaultValue={"4"}
        label={"Time period"}
        sx={{ gridArea: "filterTime" }}
        inputProps={{ "data-testid": "timeperiod" }}
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
