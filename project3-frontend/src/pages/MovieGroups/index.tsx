import PageContainer from "../../components/PageContainer";
import { Pagination, Typography } from "@mui/material";
import {
  MovieGroupsContainer,
  NewGroupButton,
  MovieGroupFooter,
  HorizontalLine,
  GroupGrid,
} from "./styledComponents";
import MovieGroup from "../../components/MovieGroup";

export default function MovieGroups() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          {" "}
          Movie Groups{" "}
        </Typography>
        <Typography variant={"h6"}> Favorites </Typography>
        <GroupGrid>
          <MovieGroup title={"Marvel"} favorite />
        </GroupGrid>
        <HorizontalLine />
        <Typography variant={"h6"}> All </Typography>
        <GroupGrid>
          <MovieGroup title={"Marvel"} />
          <MovieGroup title={"Sitcoms"} />
          <MovieGroup title={"Action"} />
          <MovieGroup title={"Another"} />
          <MovieGroup title={"Marvel"} />
          <MovieGroup title={"Sitcoms"} />
          <MovieGroup title={"Action"} />
          <MovieGroup title={"Another"} />
          <MovieGroup title={"Marvel"} />
        </GroupGrid>

        <MovieGroupFooter>
          <NewGroupButton>Add new movie group</NewGroupButton>
          <Pagination count={100} color="primary" />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
