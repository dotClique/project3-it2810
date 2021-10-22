import { styled } from "@mui/system";
import { Card } from "@mui/material";
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

export const styledddDiv = styled("div")(() => ({
  backgroundColor: "red",
}));

export const styledddDiv2 = styled("div")(() => ({
  backgroundColor: "red",
}));

export const doubleStyledDiv = styled(styledddDiv)(() => ({
  color: "darkolivegreen",
}));

styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  marginTop: "auto",
  marginBottom: theme.spacing(2),
}));
