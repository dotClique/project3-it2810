import { StylesType } from "../../helpers/types";

const styles: StylesType = {
  main: {
    color: (theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme) => theme.palette.primary.main,
    paddingBottom: "20px",
    borderRadius: {
      md: "0 0 10px 10px",
    },
  },
  background: {
    backgroundColor: (theme) => theme.palette.background.default,
    width: "100%",
    minHeight: "100vh",
  },
};

export default styles;
