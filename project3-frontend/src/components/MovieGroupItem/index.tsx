import { useHistory } from "react-router";
import { Paths } from "../../helpers/constants";
import { FavoriteIcon } from "../FavoriteIcon";
import {
  MovieGroupCardContent,
  MovieGroupContainer,
  MovieGroupLink,
  MovieGroupTitle,
} from "./styled";
import { SxProps } from "@mui/system";

type Props = {
  title: string;
  id?: string;
  onToggleFavorite?: () => void;
  favorite?: boolean;
  sx?: SxProps;
};
export default function MovieGroupItem(props: Props) {
  const history = useHistory();
  return (
    <MovieGroupContainer sx={props.sx}>
      <MovieGroupLink
        onClick={() => history.push(`${Paths.MOVIE_GROUPS}/${props.id}`)}
        color={"inherit"}
        underline={"none"}
      >
        <MovieGroupCardContent>
          <MovieGroupTitle variant="h5" noWrap>
            {props.title}
          </MovieGroupTitle>
        </MovieGroupCardContent>
      </MovieGroupLink>
      <FavoriteIcon
        width={30}
        isFilled={props.favorite || false}
        onClick={props.onToggleFavorite}
      />
    </MovieGroupContainer>
  );
}
