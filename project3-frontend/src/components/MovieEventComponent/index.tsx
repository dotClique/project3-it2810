import { MovieEventCard } from "./styled";
import { Typography } from "@mui/material";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_GROUP_EVENTS } from "../../helpers/graphql-queries";
import { useEffect, useState } from "react";
import { useAlias } from "../../helpers/alias";

type Props = {
  description: string;
  title: string;
  location: string;
  datetime: string;
  isParticipant: boolean;
};

export default function MovieEventComponent(props: Props) {
  let description = "";
  if (props.description.length > 100) {
    description = props.description.substr(0, 100) + "...";
  } else {
    description = props.description;
  }

  return (
    <MovieEventCard>
      <Typography
        variant={"h5"}
        color={"primary"}
        align={"center"}
        noWrap
        sx={{ gridArea: "title" }}
      >
        {props.title}
      </Typography>
      <Typography
        variant={"body2"}
        component={"div"}
        noWrap
        align={"center"}
        sx={{ gridArea: "description" }}
      >
        {description}
      </Typography>

      <Typography noWrap variant={"body2"} sx={{ gridArea: "location" }}>
        {props.location}
      </Typography>
      <Typography variant={"body2"} sx={{ gridArea: "dateTime" }} data-testid={"eventdatetime"}>
        {props.datetime.replace("T", "\n").replace("Z", "").slice(0, -4)}
      </Typography>
      <Typography
        noWrap
        variant={"body2"}
        sx={{ gridArea: "participation", display: { xs: "none", md: "inherit" } }}
      >
        {props.isParticipant ? <CheckIcon width={"30px"} /> : <XIcon width={"30px"} />}
      </Typography>
    </MovieEventCard>
  );
}
