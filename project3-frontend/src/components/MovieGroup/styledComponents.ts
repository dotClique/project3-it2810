import { styled } from "@mui/system";
import { Card, CardContent, Link, Typography } from "@mui/material";

export const MovieGroupContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",

}));

export const MovieGroupLink = styled(Link)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const MovieGroupCardContent = styled(CardContent)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const MovieGroupTitle = styled(Typography)(({ theme }) => ({
  width: "100%",
}));
