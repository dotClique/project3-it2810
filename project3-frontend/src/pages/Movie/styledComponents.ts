import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const MovieGrid = styled("div")(() => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "10fr 5fr 5fr 5fr",
  justifyItems: "center",
}));

export const MovieImage = styled("img")(({ theme }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  objectFit: "contain",
  backgroundColor: theme.palette.secondary,
  paddingBottom: "2%",
}));

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
