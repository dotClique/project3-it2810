import { HeartIcon as SolidHeart } from "@heroicons/react/solid";
import { HeartIcon as OutlinedHeart } from "@heroicons/react/outline";
import { IconContainer } from "./styledComponents";
type Props = {
  width: number;
  isFilled: boolean;
};

export function FavoriteIcon(props: Props) {
  const icon = props.isFilled ? (
    <SolidHeart width={props.width}></SolidHeart>
  ) : (
    <OutlinedHeart width={props.width}></OutlinedHeart>
  );
  return <IconContainer>{icon}</IconContainer>;
}
