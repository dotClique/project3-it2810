import MovieGroupItem from "../MovieGroupItem";
import { GroupAndEventContainer, MovieGroupItemInGrid } from "./styled";
import { SxProps } from "@mui/system";
import { List, ListItemButton, ListItemText } from "@mui/material";

type Props = {
  title: string;
  id: string;
  onToggleFavorite?: () => void;
  sx?: SxProps;
  events: { title: string; date: string }[];
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
      <List sx={{ gridArea: "events", backgroundColor: "yellowgreen" }}>
        {props.events.map((item) => (
          <ListItemButton divider>
            <ListItemText inset primary={item.title} secondary={item.date}></ListItemText>
          </ListItemButton>
        ))}
      </List>
    </GroupAndEventContainer>
  );
}
