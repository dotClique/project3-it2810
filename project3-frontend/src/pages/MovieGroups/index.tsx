import { SearchIcon } from "@heroicons/react/solid";
import {
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import MovieGroup from "../../components/MovieGroup";
import PageContainer from "../../components/PageContainer";
import {
  GroupAccordion,
  GroupGrid,
  LogOutButton,
  MovieGroupFooter,
  MovieGroupsContainer,
  NewGroupButton,
} from "./styledComponents";

export default function MovieGroups() {
  const [expanded, setExpanded] = useState("allMovies");
  const history = useHistory();

  const handleChange = (panel: string) => () => {
    setExpanded(panel);
  };

  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Typography gutterBottom variant={"h3"}>
          Movie Groups
        </Typography>

        <GroupAccordion expanded={expanded === "favorites"} onChange={handleChange("favorites")}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Favorites</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GroupGrid>
              <MovieGroup title={"Marvel"} favorite />
            </GroupGrid>
          </AccordionDetails>
        </GroupAccordion>
        <GroupAccordion expanded={expanded === "allMovies"} onChange={handleChange("allMovies")}>
          <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
            <Typography>All groups</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: "sm" }}>
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
            />
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
              <MovieGroup title={"Marvel"} />
              <MovieGroup title={"Marvel"} />
              <MovieGroup title={"Marvel"} />
              <MovieGroup title={"Marvel"} />
              <MovieGroup title={"Marvel"} />
            </GroupGrid>
          </AccordionDetails>
        </GroupAccordion>
        <MovieGroupFooter>
          <NewGroupButton>Add new movie group</NewGroupButton>
          <LogOutButton color={"secondary"} onClick={() => history.push("/")}>
            Change Alias
          </LogOutButton>
          <Pagination count={100} color="primary" />
        </MovieGroupFooter>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
