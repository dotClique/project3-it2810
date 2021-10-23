import { Typography } from "@mui/material";
import AddMovieGroupForm from "../../components/AddMovieGroupForm/";
import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer } from "../CreateMovieEventPage/styled";

export default function AddMovieGroupPage() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Add Movie Group
        </Typography>
        <AddMovieGroupForm />
      </MovieGroupsContainer>
    </PageContainer>
  );
}
