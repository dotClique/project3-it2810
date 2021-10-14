import { StylesType } from "../../helpers/types";

const styles: StylesType = {
  main: {
    color: (theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme) => theme.palette.background.default,
    borderRadius: {
      md: "0 0 10px 10px",
    },
    width: "100%",
    padding: `0!important`,
  },
};

export default styles;
