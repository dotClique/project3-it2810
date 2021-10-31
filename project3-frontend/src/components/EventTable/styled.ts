import { styled } from "@mui/system";
import { TableCell, TablePagination, TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));
export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
}));
