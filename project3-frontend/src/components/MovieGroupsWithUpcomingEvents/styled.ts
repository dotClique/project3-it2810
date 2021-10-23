import { styled } from "@mui/system";
import { Button, Card, Link } from "@mui/material";
import MovieGroupItem from "../MovieGroupItem";

export const GroupAndEventContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridTemplateAreas: '"group events"',
  [theme.breakpoints.down("md")]: {
    gridTemplateRows: "100px auto",
    gridTemplateAreas: '"group group" "events events"',
    gridGap: 0,
  },
  position: "relative",
  gridGap: "10px",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: theme.palette.secondary.main,
}));

export const CenteredLink = styled(Button)(({}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "90%",
  margin: "0 5%",
  gridArea: "group",
}));
