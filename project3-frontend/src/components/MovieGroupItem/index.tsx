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
        onClick={() => history.push(`${Paths.MOVIE_GROUP}/${props.id}`)}
        color={"inherit"}
        underline={"none"}
        data-testid={"movieGroupLink"}
      >
        <MovieGroupCardContent>
          <MovieGroupTitle
            aria-label={`Links to ${props.title} movie group page`}
            variant="h5"
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
            }}
            data-testid={"movieGroupTitle"}
          >
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
