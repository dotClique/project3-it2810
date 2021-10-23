import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

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
