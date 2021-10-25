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
      <TextData>
        <Typography variant={"h3"}>{props.title}</Typography>
        <Typography variant={"body2"} component={"div"} sx={{ textAlign: "left" }}>
          {description}
        </Typography>
      </TextData>

      <TextData>
        <div>{props.location}</div>
        <div>{props.datetime.replace("T", "\n").replace("Z", "").slice(0, -4)}</div>
      </TextData>
    </MovieEventCard>
  );
}
