import { GroupAndEventContainer, CenteredLink, MovieGroupBox } from "./styled";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { FavoriteIcon } from "../FavoriteIcon";

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
            variant={"h5"}
            noWrap
            sx={{
              transform: "scale(1.0)",
              "&:hover": {
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.8)",
              },
              transitionDuration: "0.05s",
              width: "100%",
            }}
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

      <List sx={{ gridArea: "events", margin: 0, padding: 0, width: "100%" }}>
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
            onClick={() => {
              history.push(`/movie/${item.movieEventId}`);
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
