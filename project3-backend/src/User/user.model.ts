import { ObjectType, Field } from "@nestjs/graphql";
import { MovieGroup } from "../Group/group.model";
import { MovieEvent } from "../Event/event.model";
@ObjectType()
export class User {
  @Field()
  alias: string;

  @Field((type) => [MovieGroup], { nullable: true })
  favorites?: MovieGroup[];

  @Field((type) => [MovieEvent], { nullable: true })
  participates?: MovieEvent[];
}
