import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const MovieEventCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: " 7fr 3fr ",
  gridTemplateRows: " 1fr ",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr 1fr ",
    gridTemplateRows: " 1fr",
  },
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  gridColumnGap: "4%",
}));

export const TextData = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: " 1fr 1fr ",
  gridTemplateRows: " 1fr ",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr",
    gridTemplateRows: " 1fr 1fr 1fr ",
  },
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}));

export const MovieImage = styled("img")(({ theme }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  objectFit: "fill",
  backgroundColor: theme.palette.secondary,
  paddingBottom: "2%",
}));
