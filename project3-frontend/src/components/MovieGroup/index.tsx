import {
  MovieGroupContainer,
  MovieGroupLink,
  MovieGroupCardContent,
  MovieGroupTitle,
} from "./styledComponents";
import { FavoriteIcon } from "../FavoriteIcon";

type Props = {
  title: string;
  id?: string;
  favorite?: boolean;
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
      <FavoriteIcon width={30} isFilled={props.favorite || false} />
    </MovieGroupContainer>
  );
}
