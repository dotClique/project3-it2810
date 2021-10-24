import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "2em",
  marginBottom: "2em",
}));
