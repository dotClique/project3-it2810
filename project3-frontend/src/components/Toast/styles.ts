import { StylesType } from "../../helpers/types";
import { ToastColor } from "./types";

const getStyles = (color: ToastColor): StylesType => ({
  paper: {
    minWidth: 300,
    backgroundColor: (theme) => (color ? theme.palette[color].main : theme.palette.warning.main),
  },
  closeButton: {
    position: "absolute",
    right: (theme) => theme.spacing(1),
    color: (theme) => theme.palette.grey[500],
  },
});

export default getStyles;
