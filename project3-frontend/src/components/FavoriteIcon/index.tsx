import { HeartIcon as SolidHeart } from "@heroicons/react/solid";
import { HeartIcon as OutlinedHeart } from "@heroicons/react/outline";
import { IconContainer } from "./styled";
type Props = {
  width: number;
  isFilled: boolean;
  onClick?: () => void;
};

export function FavoriteIcon(props: Props) {
  const icon = props.isFilled ? (
    <SolidHeart
      aria-label={"Button for removing this group's favorite status"}
      width={props.width}
      data-testid={"solidHeart"}
    />
  ) : (
    <OutlinedHeart
      aria-label={"Button for setting this group as a favorite"}
      width={props.width}
      data-testid={"outlinedHeart"}
    />
  );
  return <IconContainer onClick={props.onClick}>{icon}</IconContainer>;
}
