import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const MovieEventCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "3fr 4fr 1.5fr 1.5fr",
  gridTemplateRows: "1fr",
  gridTemplateAreas: '"title description location dateTime"',
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: " 1fr 1fr ",
    gridTemplateRows: " 1fr 1fr",
    gridTemplateAreas: '"title location" "description dateTime"',
  },
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  gridColumnGap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

export const TextData = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  gridColumnGap: "4%",
  justifyContent: "between",
  alignItems: "center",
}));
