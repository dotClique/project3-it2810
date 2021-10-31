import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UserResolver } from "./User/user.resolver";
import { MovieGroupResolver } from "./Group/group.resolver";
import { MovieEventResolver } from "./Event/event.resolver";
import { MovieResolver } from "./Movie/movie.resolver";

// Sets up graphql with the url prefix: "api"
@Module({
  imports: [GraphQLModule.forRoot({ autoSchemaFile: true, path: "api" })],
  providers: [UserResolver, MovieGroupResolver, MovieEventResolver, MovieResolver],
})
export class AppModule {}
