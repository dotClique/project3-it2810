import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.default,
  borderRadius: "0 0 10px 10px",
  width: "100%",
  padding: `0!important`,
}));

export default StyledContainer;
