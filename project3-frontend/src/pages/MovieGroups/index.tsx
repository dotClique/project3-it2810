import PageContainer from "../../components/PageContainer";
import { InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import {
  MovieGroupsContainer,
  NewGroupButton,
  MovieGroupFooter,
  HorizontalLine,
  GroupGrid,
} from "./styledComponents";
import MovieGroup from "../../components/MovieGroup";
import { SearchIcon } from "@heroicons/react/solid";

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
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon width={20} />
              </InputAdornment>
            ),
          }}
          placeholder={"search for groups"}
          sx={{ width: "90%", marginBottom: 1 }}
        ></TextField>
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
