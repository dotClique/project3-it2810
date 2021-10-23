import { styled } from "@mui/system";
import { Card, Link } from "@mui/material";
import MovieGroupItem from "../MovieGroupItem";

export const GroupAndEventContainer = styled(Card)(() => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateAreas: '"group events"',
  position: "relative",
  gridGap: "10px",
}));

export const MovieGroupItemInGrid = styled(MovieGroupItem)(() => ({
  gridArea: "group",
  backgroundColor: "red",
}));

export const CenteredLink = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.contrastText,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));
