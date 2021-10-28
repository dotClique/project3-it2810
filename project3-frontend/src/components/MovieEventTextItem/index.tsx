import { Box, Typography } from "@mui/material";

type Props = {
  title: string;
  body: string;
};
export default function MovieEventTextItem(props: Props) {
  return (
    <>
      <Typography variant="h5" color="primary">
        {props.title}
      </Typography>

      <Typography variant="body1" color="secondary.contrastText">
        {props.body}
      </Typography>
    </>
  );
}
