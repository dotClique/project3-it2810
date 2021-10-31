import { Button } from "@mui/material";
import styles from "./styles";

type Props = {
  color?: "primary" | "secondary";
  onClick: () => void;
  text: string;
};
export default function FooterButton({ onClick, text, color = "primary" }: Props) {
  const colorStyle = color === "primary" ? styles.primary : styles.secondary;
  return (
    <Button sx={{ ...styles.button, ...colorStyle }} onClick={onClick} data-testid={"footerbutton"}>
      {text}
    </Button>
  );
}
