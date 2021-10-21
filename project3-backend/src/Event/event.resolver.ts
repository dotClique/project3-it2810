import { Resolver, Mutation, Args, Query, ResolveField, Parent } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieEvent } from "./event.model";
import { MovieGroup } from "../Group/group.model";
import { User } from "../User/user.model";

@Resolver((of) => MovieEvent)
export class MovieEventResolver {
  @Query((returns) => MovieEvent)
  async movieEvent(@Args("movieEventId") movieEventId: string): Promise<MovieEvent> {
    return await prisma.movieEvent.findUnique({
      where: {
        movieEventId,
      },
    });
  }

  @Query((returns) => [MovieEvent])
  async movieEvents(): Promise<MovieEvent[]> {
    return await prisma.movieEvent.findMany();
  }

  @ResolveField(() => [MovieGroup])
  async movieGroup(@Parent() movieEvent) {
    const { movieEventId } = movieEvent;
    return prisma.movieEvent.findUnique({ where: { movieEventId } }).movieGroup();
  }

  @ResolveField(() => [User])
  async userFavorites(@Parent() movieEvent) {
    const { movieEventId } = movieEvent;
    return prisma.movieEvent.findUnique({ where: { movieEventId } }).participants();
  }

  @Mutation((returns) => MovieEvent)
  async createMovieEvent(
    @Args("title") title: string,
    @Args("description") description: string,
    @Args("date") date: Date,
    @Args("location") location: string,
    @Args("movieGroupId") movieGroupId: string,
    @Args("imageUrl", { defaultValue: "" }) imageUrl?: string,
  ) {
    return prisma.movieEvent.create({
      data: {
        title,
        description,
        date,
        imageUrl,
        location,
        movieGroup: {
          connect: { movieGroupId: movieGroupId },
        },
      },
    });
  }
}
