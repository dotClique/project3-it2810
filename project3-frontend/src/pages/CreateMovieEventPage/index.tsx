import { Typography } from "@mui/material";
import CreateMovieEventForm from "../../components/CreateMovieEventForm/index";
import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer } from "./styled";

/**
 * The page to create a movie event in a movie group.
 */
export default function CreateMovieEventPage() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Create Movie Event
        </Typography>
        {/* TODO: We need to handle the what movieGroupId is passed in here */}
        <CreateMovieEventForm movieGroupId="ckv2ss5qj0000v5qqnl5h8yf2" />
      </MovieGroupsContainer>
    </PageContainer>
  );
}
