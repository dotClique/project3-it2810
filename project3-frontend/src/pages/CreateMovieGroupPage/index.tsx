import CreateMovieGroupForm from "../../components/CreateMovieGroupForm";
import PageContainer from "../../components/PageContainer";

/**
 * Page to create a movie group.
 */
export default function CreateMovieGroupPage() {
  return (
    <PageContainer title={"Create Movie Group"}>
      <CreateMovieGroupForm />
    </PageContainer>
  );
}
