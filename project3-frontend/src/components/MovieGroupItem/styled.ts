import { styled } from "@mui/system";
import { Card, CardContent, Link, Typography } from "@mui/material";

export const MovieGroupContainer = styled(Card)(() => ({
  width: "100%",
  height: "100%",
  position: "relative",
}));

export const MovieGroupLink = styled(Link)(() => ({
  width: "100%",
  height: "100%",
  cursor: "pointer",
  textTransform: "uppercase",
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

export const MovieGroupTitle = styled(Typography)(() => ({
  width: "100%",
}));
