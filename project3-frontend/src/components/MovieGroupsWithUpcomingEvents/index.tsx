import { GroupAndEventContainer, CenteredLink, MovieGroupBox } from "./styled";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { FavoriteIcon } from "../FavoriteIcon";
import styles from "./styles";

type Props = {
  title: string;
  id: string;
  onUnFavorite: () => void;
  events: { title: string; date: string; movieEventId: string }[];
};

export default function MovieGroupWithUpcomingEvents(props: Props) {
  const history = useHistory();

  return (
    <GroupAndEventContainer>
      <MovieGroupBox>
        <CenteredLink
          onClick={() => {
            history.push(`/group/${props.id}`);
          }}
        >
          <Typography
            aria-label={`Links to ${props.title} movie group page`}
            variant={"h5"}
            noWrap
            sx={styles.eventTitle}
          >
            {props.title}
          </Typography>
        </CenteredLink>
        <FavoriteIcon
          width={30}
          isFilled
          onClick={() => {
            props.onUnFavorite();
          }}
        />
      </MovieGroupBox>

      <List sx={styles.eventList}>
        {props.events.map((item) => (
          <ListItemButton
            aria-label={`Links to ${item.title} event page`}
            key={item.movieEventId}
            divider
            sx={styles.eventLink}
            onClick={() => {
              history.push(`/movie/${item.movieEventId}`);
            }}
          >
            <ListItemText
              inset
              primary={item.title}
              secondary={item.date.replace("T", " ").replace("Z", "").slice(0, -4)}
              secondaryTypographyProps={{ color: "primary.contrastText" }}
            />
          </ListItemButton>
        ))}
      </List>
    </GroupAndEventContainer>
  );
}
