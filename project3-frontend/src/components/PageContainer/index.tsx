import { ReactNode } from "react";
import StyledContainer from "./styled";

type PageContainerProps = {
  children: ReactNode;
  title?: string;
};

function PageContainer(props: PageContainerProps) {
  return (
    <StyledContainer maxWidth="md">
      {props.title ? <h3>{props.title}</h3> : false}
      {props.children}
    </StyledContainer>
  );
}

export default PageContainer;
