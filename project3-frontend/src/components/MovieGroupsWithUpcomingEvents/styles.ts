import { StylesType } from "../../helpers/types";

const styles: StylesType = {
  eventLink: {
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    margin: 1,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "primary.light",
    },
  },
  eventTitle: {
    transform: "scale(1.0)",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "&:active": {
      transform: "scale(0.8)",
    },
    transitionDuration: "0.05s",
    width: "100%",
  },
  eventList: { gridArea: "events", margin: 0, padding: 0, width: "100%" },
};

export default styles;
