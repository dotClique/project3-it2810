import PageContainer from "../../components/PageContainer";
import { Typography, Card, TextField, Box, Button } from "@mui/material";
import { MovieGrid, MovieImage, MovieGroupsContainer } from "./styledComponents";

export default function AddMovie() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
          <Button variant={"contained"}>Back</Button>
          <MovieGrid>
          <Typography variant="h1" component="h1" style={{width: '100%'}}>
              Ny filmvisning
          </Typography>
          <Box component={"span"} sx={{ height: '100%', width:'100%', p: 2, border: '1px dashed grey' }}>Upload Image</Box>
            <TextField id="tittelfelt" label="Tittel" variant="outlined" style={{width: '100%', height: '100%'}}/>
          <Card variant='outlined' style={{width: '100%', height: '100%'}}>
              <TextField id="stedfelt" label="Sted" variant="outlined" style={{width: '100%', height: '20%'}}/>
              <MovieImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxeJ_Lkb8bKMAPDmyTRX-AqJxvSKQu8m4Jfg&usqp=CAU'/>
          </Card>
          <h1>Datetimepicker</h1>
      </MovieGrid>
          <Button variant={"contained"}>Create</Button>
      </MovieGroupsContainer>
      </PageContainer>
  );
}
