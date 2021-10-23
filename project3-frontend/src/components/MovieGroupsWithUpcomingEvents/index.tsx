import MovieGroupItem from "../MovieGroupItem";
import { GroupAndEventContainer, MovieGroupItemInGrid } from "./styled";
import { SxProps } from "@mui/system";
import { List, ListItemButton, ListItemText } from "@mui/material";

type Props = {
  title: string;
  id: string;
  onToggleFavorite?: () => void;
  sx?: SxProps;
  events: { title: string; date: string; movieEventId: string }[];
};

export default function MovieGroupWithUpcomingEvents(props: Props) {
  return (
    <GroupAndEventContainer>
      <MovieGroupItem
        title={props.title}
        id={props.id}
        onToggleFavorite={props.onToggleFavorite}
        sx={{ gridArea: "group" }}
        favorite
      />
      <List sx={{ gridArea: "events" }}>
        {props.events.map((item) => (
          <ListItemButton
            key={item.movieEventId}
            divider
            sx={{
              backgroundColor: "primary.contrastText",
              color: "primary.main",
              margin: 1,
              borderRadius: 1,
            }}
          >
            <ListItemText
              inset
              primary={item.title}
              secondary={item.date}
              secondaryTypographyProps={{ color: "primary.dark" }}
            />
          </ListItemButton>
        ))}
      </List>
    </GroupAndEventContainer>
  );
}
