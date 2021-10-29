import CreateMovieEventForm from "../../components/CreateMovieEventForm/index";
import PageContainer from "../../components/PageContainer";
import { useParams } from "react-router-dom";

/**
 * The page to create a movie event in a movie group.
 */
export default function CreateMovieEventPage() {
  const { id } = useParams() as { id: string };
  return (
    <PageContainer title={"Create Movie Event"}>
      <CreateMovieEventForm movieGroupId={id} />
    </PageContainer>
  );
}
