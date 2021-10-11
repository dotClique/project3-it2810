import { Container, Grid } from "@mui/material";
import { ReactNode } from "react";
import styles from "./styles";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
};

function PageContainer(props: PageContainerProps) {
  return (
    <Grid container sx={styles.background}>
      <Container sx={styles.main} maxWidth="md">
        {props.title ? <h3>{props.title}</h3> : false}
        {props.children}
      </Container>
    </Grid>
  );
}

export default PageContainer;
