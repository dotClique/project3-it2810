import MovieGroupItem from "../MovieGroupItem";
import { GroupAndEventContainer, CenteredLink } from "./styled";
import { SxProps } from "@mui/system";
import { Link, List, ListItemButton, ListItemText, Typography } from "@mui/material";

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
      <CenteredLink>
        <Typography variant={"h5"}>{props.title}</Typography>
      </CenteredLink>

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
