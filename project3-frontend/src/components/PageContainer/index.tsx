import { ReactNode } from "react";
import styles from "./styles";
import { Box, Container, Paper, Typography } from "@mui/material";
import { LogOutButton } from "../LogOutButton";
import { Paths } from "../../helpers/constants";
import { useHistory } from "react-router";
import { useAlias } from "../../helpers/alias";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
  centeredPage?: boolean;
  logoutPossible?: boolean;
  footerElements?: ReactNode;
};

function PageContainer(props: PageContainerProps) {
  const history = useHistory();
  const { logout } = useAlias();
  return (
    <Container maxWidth="md" sx={styles.mainContainer}>
      <Paper
        component="main"
        sx={props.centeredPage ? styles.centeredMainContentContainer : styles.mainContentContainer}
      >
        {props.title ? (
          <Typography
            color="secondary"
            variant="h3"
            component="h3"
            gutterBottom
            sx={{ width: "100%" }}
          >
            {props.title}
          </Typography>
        ) : (
          false
        )}
        {props.children}
        {props.footerElements ? (
          <Box component={"footer"} sx={styles.footerContainer}>
            {props.logoutPossible ? (
              <LogOutButton
                color={"secondary"}
                onClick={() => {
                  logout();
                  history.push(Paths.HOME);
                }}
              >
                Log out
              </LogOutButton>
            ) : (
              false
            )}
            {props.footerElements}
          </Box>
        ) : (
          false
        )}
      </Paper>
    </Container>
  );
}

export default PageContainer;
