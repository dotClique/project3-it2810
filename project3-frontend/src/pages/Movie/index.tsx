import PageContainer from "../../components/PageContainer";
import { Typography, Card, TextField } from "@mui/material";
import { MovieGrid, MovieImage, MovieGroupsContainer } from "./styledComponents";

export default function Movie() {
  return (
    <PageContainer>
      <MovieGroupsContainer><MovieGrid>
          <Typography variant="h1" component="h1" style={{width: '100%'}}>
              Ny filmvisning
          </Typography>
          <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxeJ_Lkb8bKMAPDmyTRX-AqJxvSKQu8m4Jfg&usqp=CAU'/>
            <TextField id="tittelfelt" label="Tittel" variant="outlined" style={{width: '100%', height: '100%'}}/>
          <Card variant='outlined' style={{width: '100%', height: '100%'}}>
              <TextField id="stedfelt" label="Sted" variant="outlined" style={{width: '100%', height: '20%'}}/>
              <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxeJ_Lkb8bKMAPDmyTRX-AqJxvSKQu8m4Jfg&usqp=CAU'/>
          </Card>
          <h1>Datetimepicker</h1>
      </MovieGrid>
      </MovieGroupsContainer>
      </PageContainer>
  );
}
