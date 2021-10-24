import { styled } from "@mui/system";

export const IconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.primary.main,
  cursor: "pointer",
  transform: "scale(1.0)",
  "&:hover": {
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.8)",
  },
  transitionDuration: "0.05s",
}));
