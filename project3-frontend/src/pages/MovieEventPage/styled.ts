import { styled } from "@mui/system";
import { Card, Paper } from "@mui/material";

export const MovieGrid = styled(Card)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gridGap: 2,
  minHeight: theme.breakpoints.values.sm,
  backgroundColor: theme.palette.secondary.main,
  alignItems: "baseline",
  padding: 20,
  color: "secondary.contrastText",
  marginBottom: theme.spacing(2),
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
