import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const LoginForm = styled("section")(({ theme }) => ({
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
