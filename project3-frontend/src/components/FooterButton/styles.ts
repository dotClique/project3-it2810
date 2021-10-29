import { StylesType } from "../../helpers/types";

const styles: StylesType = {
  button: {
    width: "100%",
    height: 50,
  },
  primary: {
    color: "primary.contrastText",
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.light",
    },
  },
  secondary: {
    color: "secondary.contrastText",
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "secondary.light",
    },
  },
};

export default styles;
