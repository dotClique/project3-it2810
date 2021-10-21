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
    <SolidHeart width={props.width} />
  ) : (
    <OutlinedHeart width={props.width} />
  );
  return <IconContainer onClick={props.onClick}>{icon}</IconContainer>;
}
