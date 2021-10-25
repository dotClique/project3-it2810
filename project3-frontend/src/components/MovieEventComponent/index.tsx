import { MovieEventCard, TextData } from "./styled";
import { Typography } from "@mui/material";

type Props = {
  description: string;
  title: string;
  location: string;
  datetime: string;
};

export default function MovieEventComponent(props: Props) {
  let description;
  if (props.description.length > 100) {
    description = props.description.substr(0, 100) + "...";
  } else {
    description = props.description;
  }
  return (
    <MovieEventCard>
      <Typography
        variant={"h5"}
        color={"primary"}
        align={"center"}
        noWrap
        sx={{ gridArea: "title" }}
      >
        {props.title}
      </Typography>
      <Typography
        variant={"body2"}
        component={"div"}
        noWrap
        align={"center"}
        sx={{ gridArea: "description" }}
      >
        {description}
      </Typography>

      <Typography noWrap variant={"body2"} sx={{ gridArea: "location" }}>
        {props.location}
      </Typography>
      <Typography variant={"body2"} sx={{ gridArea: "dateTime" }}>
        {props.datetime.replace("T", "\n").replace("Z", "").slice(0, -4)}
      </Typography>
    </MovieEventCard>
  );
}
