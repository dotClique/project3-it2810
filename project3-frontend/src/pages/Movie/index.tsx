import PageContainer from "../../components/PageContainer";
import { Typography, Card, Button } from "@mui/material";
import { MovieGrid, MovieImage, MovieGroupsContainer } from "./styledComponents";

export default function Movie() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
          <Button variant={"contained"}>Back</Button>
          <MovieGrid>
          <Typography variant="h1" component="h1" style={{width: '100%'}}> Tittel</Typography>
          <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxeJ_Lkb8bKMAPDmyTRX-AqJxvSKQu8m4Jfg&usqp=CAU'/>
          <Card variant='outlined' style={{width: '100%', height: '100%'}}>
              <Typography variant="h2" component="h2" style={{width: '100%'}}> Sted</Typography>
              <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxeJ_Lkb8bKMAPDmyTRX-AqJxvSKQu8m4Jfg&usqp=CAU'/>
          </Card>
          <h1>04.10.1999</h1>
      </MovieGrid>
      </MovieGroupsContainer>
      </PageContainer>
  );
}
