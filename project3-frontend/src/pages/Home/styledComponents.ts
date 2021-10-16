import { styled } from "@mui/system";
import { Button, Paper } from "@mui/material";

export const LoginPageContainer = styled(Paper)(({ theme }) => ({
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
  justifyContent: "space-evenly",
  padding: "0 10vw 0",
}));

export const LoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 25,
  width: theme.breakpoints.values.sm,
  maxWidth: "90vw",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  width: "100%",
  height: 50,
}));
