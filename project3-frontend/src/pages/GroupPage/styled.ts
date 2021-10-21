import { styled } from "@mui/system";
import { Paper } from "@mui/material";

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

export const MovieEventGrid = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: " 1fr ",
  gridTemplateRows: "",
}));

export const FilterGrid = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: " 2fr 1fr  1fr 1fr  ",
  gridTemplateRows: " 1fr ",
  gridTemplateAreas: `"search checkbox filterTime filterSort"`,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr 1fr 1fr ",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: `"search search search" "checkbox filterTime filterSort"`,
  },
}));

export const GroupGrid = styled("div")(({ theme }) => ({
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
