import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UserResolver } from "./User/user.resolver";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MovieGroupResolver } from "./Group/group.resolver";
import { MovieEventResolver } from "./Event/event.resolver";
import { MovieResolver } from "./Movie/movie.resolver";

@Module({
  imports: [GraphQLModule.forRoot({ autoSchemaFile: true, path: "api" })],
  controllers: [AppController],
  providers: [AppService, UserResolver, MovieGroupResolver, MovieEventResolver, MovieResolver],
})
export class AppModule {}
