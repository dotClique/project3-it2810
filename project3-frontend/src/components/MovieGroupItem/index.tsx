import { useHistory } from "react-router";
import { FavoriteIcon } from "../FavoriteIcon";
import {
  MovieGroupCardContent,
  MovieGroupContainer,
  MovieGroupLink,
  MovieGroupTitle,
} from "./styled";

type Props = {
  title: string;
  id?: string;
  favorite?: boolean;
};
export default function MovieGroupItem(props: Props) {
  const history = useHistory();
  return (
    <MovieGroupContainer>
      <MovieGroupLink
        onClick={() => history.push(`/group/${props.id}`)}
        color={"inherit"}
        underline={"none"}
      >
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
