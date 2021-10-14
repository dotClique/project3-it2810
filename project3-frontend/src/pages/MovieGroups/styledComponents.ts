import { styled } from "@mui/system";
import { Button, Pagination, Paper } from "@mui/material";

export const MovieGroupsContainer = styled(Paper)(({ theme }) => ({
  marginTop: `max(calc((100vh - ${theme.breakpoints.values.md}px) / 2), 0px)`,
  paddingTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  maxHeight: theme.breakpoints.values.md,
  maxWidth: "100vw",
  width: theme.breakpoints.values.md,
  padding: "0 10vw 0",
}));

export const NewGroupButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  width: "100%",
  height: 50,
  marginTop: theme.spacing(2),
}));

export const MovieGroupPagination = styled(Pagination)(({ theme }) => ({
  marginTop: "auto",
  marginBottom: theme.spacing(2),
}));

export const HorizontalLine = styled("hr")(({ theme }) => ({
  width: "100%",
}));

export const GroupGrid = styled("div")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr",
}));
