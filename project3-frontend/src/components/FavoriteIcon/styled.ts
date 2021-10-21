import { styled } from "@mui/system";

export const IconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.primary.main,
}));
