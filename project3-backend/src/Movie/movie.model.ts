import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User } from "../User/user.model";
import { MovieEvent } from "../Event/event.model";
@ObjectType()
export class Movie {
  @Field()
  tconst: string;

  @Field()
  primarytitle: string;

  @Field((type) => Int)
  startyear: number;

  @Field()
  genres: string;
}
