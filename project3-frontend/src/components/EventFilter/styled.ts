import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";

export const FilterGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  margin: theme.spacing(2),
  gap: theme.spacing(1),
  gridTemplateColumns: " 1fr 1fr  ",
  gridTemplateRows: " 1fr ",
  gridTemplateAreas: `"search filterTime"`,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr ",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: `"search" "filterTime"`,
  },
}));

export const GroupGrid = styled(Grid)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr",
  overflow: "auto",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  "& > *": {
    minHeight: "80px",
  },
}));

export const EventsHeader = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "3fr 4fr 1.5fr 1.5fr 1fr",
  gridTemplateRows: "1fr",
  gridTemplateAreas: '"title description location dateTime status"',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  padding: "0 20px",
  [theme.breakpoints.down("md")]: {
    display: "none",
    gridTemplateColumns: " 1fr 1fr",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: '"title location status" "description dateTime"',
  },
}));
