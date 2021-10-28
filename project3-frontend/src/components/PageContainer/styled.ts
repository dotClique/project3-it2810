import { Container, ContainerProps, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.default,
  borderRadius: "0 0 10px 10px",
  width: "100%",
  padding: `0!important`,
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

export default StyledContainer;
