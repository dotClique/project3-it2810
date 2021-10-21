import PageContainer from "../../components/PageContainer";
import { MovieGroupsContainer, GroupGrid, FilterGrid } from "./styledComponents";
import {
  MenuItem,
  Pagination,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  Button,
} from "@mui/material";
import MovieEvent from "../../components/MovieEvent";

export default function Group() {
  return (
    <PageContainer>
      <MovieGroupsContainer>
        <Button variant={"contained"}>Back</Button>
        <h1>Groupname</h1>
        <br />
        <FilterGrid>
          <TextField label={"Søk på tittel"} variant={"outlined"} sx={{ gridArea: "search" }} />
          <Card variant={"outlined"} sx={{ gridArea: "checkbox" }}>
            <FormControlLabel control={<Checkbox />} label={"Viste filmer"} />
          </Card>
          <Select label={"Sorter på"} sx={{ gridArea: "filterSort" }}>
            <MenuItem>dato</MenuItem>
            <MenuItem>tittel</MenuItem>
            <MenuItem>lokasjon</MenuItem>
          </Select>
          <Select label={"Tidsrom"} sx={{ gridArea: "filterTime" }}>
            <MenuItem>innen en uke</MenuItem>
            <MenuItem>denne måneden</MenuItem>
            <MenuItem>i år</MenuItem>
            <MenuItem>Allerede vist</MenuItem>
          </Select>
        </FilterGrid>
        <Card variant={"outlined"} sx={{ minHeight: "100px", width: "100%" }}>
          <p id="Description">Beskrivelse</p>
        </Card>
        <GroupGrid>
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpgddddddddddddddddddddddddddddddd"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999 03:22"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
          <MovieEvent
            description={
              "http://www.femalefirst.co.uk/image-library/land/500/n/nicolas-cage-in-justice.jpg"
            }
            title={"tuturuu"}
            location={"gløshaugen"}
            datetime={"04.10.1999"}
          />
        </GroupGrid>
        <Pagination count={100} color="primary" />
        <Button variant={"contained"}>Add New movieevent</Button>
      </MovieGroupsContainer>
    </PageContainer>
  );
}
