import { ObjectType, Field, Int } from "@nestjs/graphql";

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
