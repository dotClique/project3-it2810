import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../User/user.model";
import { MovieEvent } from "../Event/event.model";
@ObjectType()
export class MovieGroup {
  @Field()
  movieGroupId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => [User], { nullable: true })
  userFavorites?: User[];

  @Field((type) => [MovieEvent], { nullable: true })
  movieEvents?: MovieEvent[];
}
