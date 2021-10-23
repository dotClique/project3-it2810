import { Typography } from "@mui/material";
import CreateMovieGroupForm from "../../components/CreateMovieGroupForm";
import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer } from "../CreateMovieEventPage/styled";

/**
 * Page to create a movie group.
 */
export default function CreateMovieGroupPage() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Create Movie Group
        </Typography>
        <CreateMovieGroupForm />
      </MovieGroupsContainer>
    </PageContainer>
  );
}
