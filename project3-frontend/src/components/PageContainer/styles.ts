import { StylesType } from "../../helpers/types";

const styles: StylesType = {
  mainContainer: {
    color: "primary.contrastText",
    backgroundColor: "background.default",
    borderRadius: "0 0 10px 10px",
    width: "100%",
    padding: `0!important`,
  },
  centeredMainContentContainer: {
    marginTop: (theme) => `max(calc((100vh - ${theme.breakpoints.values.sm}px) / 2), 0px)`,
    borderRadius: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100vw",
    width: "md",
    justifyContent: "space-evenly",
    padding: { xs: "20px 5vw 0", md: "20px 4px 0" },
    height: (theme) => theme.breakpoints.values.sm,
  },
  mainContentContainer: {
    marginTop: { xs: 0, md: 8 },
    borderRadius: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "100vw",
    minHeight: (theme) => {
      return { md: theme.breakpoints.values.sm };
    },
    width: "md",
    padding: { xs: "20px 5vw 0", md: "20px 4px 0" },
  },
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: "auto",
    paddingTop: 2,
    marginBottom: 2,
    minWidth: 300,
  },
};

export default styles;
