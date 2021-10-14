import PageContainer from "../../components/PageContainer";
import { Pagination } from "@mui/material";
import {
  MovieGroupsContainer,
  NewGroupButton,
  MovieGroupPagination,
  HorizontalLine,
    GroupGrid
} from "./styledComponents";
import MovieGroup from "../../components/MovieGroup";

export default function MovieGroups() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <NewGroupButton>Add movie group</NewGroupButton>
        <HorizontalLine />
        <GroupGrid>
          <MovieGroup />
        </GroupGrid>
        <MovieGroupPagination count={100} color="primary" />
      </MovieGroupsContainer>
    </PageContainer>
  );
}
