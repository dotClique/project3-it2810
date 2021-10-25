import { Typography } from "@mui/material";
import CreateMovieEventForm from "../../components/CreateMovieEventForm/index";
import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer } from "./styled";
import { useParams } from "react-router-dom";

/**
 * The page to create a movie event in a movie group.
 */
export default function CreateMovieEventPage() {
  const { id } = useParams() as { id: string };
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Create Movie Event
        </Typography>
        <CreateMovieEventForm movieGroupId={id} />
      </MovieGroupsContainer>
    </PageContainer>
  );
}
