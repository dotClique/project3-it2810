import {
  MovieGroupContainer,
  MovieGroupLink,
  MovieGroupCardContent,
  MovieGroupTitle,
} from "./styledComponents";
import { CardContent, Typography } from "@mui/material";

type Props = {
  title: string;
  id?: string;
};
export default function MovieGroup(props: Props) {
  return (
    <MovieGroupContainer>
      <MovieGroupLink href={`/group/${props.id}`} color={"inherit"} underline={"none"}>
        <MovieGroupCardContent>
          <MovieGroupTitle variant="h5" noWrap>
            {props.title}
          </MovieGroupTitle>
        </MovieGroupCardContent>
      </MovieGroupLink>
    </MovieGroupContainer>
  );
}
