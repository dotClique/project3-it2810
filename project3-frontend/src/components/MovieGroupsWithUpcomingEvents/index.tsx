import { GroupAndEventContainer, CenteredLink } from "./styled";
import { SxProps } from "@mui/system";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useHistory } from "react-router";

type Props = {
  title: string;
  id: string;
  onToggleFavorite?: () => void;
  sx?: SxProps;
  events: { title: string; date: string; movieEventId: string }[];
};

export default function MovieGroupWithUpcomingEvents(props: Props) {
  const history = useHistory();
  return (
    <GroupAndEventContainer>
      <CenteredLink
        onClick={() => {
          history.push(`/group/${props.id}`);
        }}
      >
        <Typography variant={"h5"}>{props.title}</Typography>
      </CenteredLink>

      <List sx={{ gridArea: "events", margin: 0, padding: 0 }}>
        {props.events.map((item) => (
          <ListItemButton
            key={item.movieEventId}
            divider
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              margin: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemText
              inset
              primary={item.title}
              secondary={item.date}
              secondaryTypographyProps={{ color: "primary.contrastText" }}
            />
          </ListItemButton>
        ))}
      </List>
    </GroupAndEventContainer>
  );
}
