import { Accordion, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const MovieGroupFooter = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  marginTop: "auto",
  marginBottom: theme.spacing(2),
}));

export const AllGroupsButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  width: "100%",
  height: 50,
  marginTop: theme.spacing(2),
}));

export const LogOutButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    position: "static",
    width: "100%",
    height: 50,
  },
  position: "absolute",
  left: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));
