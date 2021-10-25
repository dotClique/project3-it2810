import { styled } from "@mui/system";
import { Box, Grid, Paper } from "@mui/material";

export const MovieGroupsContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "100vw",
  width: theme.breakpoints.values.md,
  [theme.breakpoints.down("md")]: {
    maxHeight: "none",
    height: "inherit",
    marginTop: theme.spacing(0),
    padding: "20px 4px 0",
  },
  padding: "20px 5vw 0",
}));

export const FilterGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  gridTemplateColumns: " 2fr 1fr 1fr  ",
  gridTemplateRows: " 1fr ",
  gridTemplateAreas: `"search filterTime filterSort"`,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr 1fr ",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: `"search search" "filterTime filterSort"`,
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
  gridTemplateColumns: "3fr 4fr 1.5fr 1.5fr",
  gridTemplateRows: "1fr",
  gridTemplateAreas: '"title description location dateTime"',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  padding: "0 20px",
  [theme.breakpoints.down("md")]: {
    display: "none",
    gridTemplateColumns: " 1fr 1fr ",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: '"title location" "description dateTime"',
  },
}));
