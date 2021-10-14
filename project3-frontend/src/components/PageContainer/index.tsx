import { Container } from "@mui/material";
import { ReactNode } from "react";
import styles from "./styles";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
};

function PageContainer(props: PageContainerProps) {
  return (
    <Container sx={styles.main} maxWidth="md">
      {props.title ? <h3>{props.title}</h3> : false}
      {props.children}
    </Container>
  );
}

export default PageContainer;
