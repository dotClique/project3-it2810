import { Typography } from "@mui/material";

type Props = {
  title: string;
  body: string;
};
export default function MovieEventTextItem(props: Props) {
  return (
    <>
      <Typography data-testid="title" variant="h5" color="primary">
        {props.title}
      </Typography>

      <Typography variant="body1" data-testid="body" color="secondary.contrastText">
        {props.body}
      </Typography>
    </>
  );
}
