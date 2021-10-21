import { Resolver, Mutation, Args, Query, ResolveField, Parent, Int } from "@nestjs/graphql";
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
  async movieEvents(
    @Args("pageSize", { type: () => Int }) pageSize: number,
    @Args("page", { type: () => Int }) page: number,
    @Args("searchString", { nullable: true }) searchString?: string,
  ): Promise<MovieEvent[]> {
    const pagination = { take: pageSize, skip: (page - 1) * pageSize };
    if (searchString) {
      return await prisma.movieEvent.findMany({
        where: { title: { mode: "insensitive", contains: searchString } },
        ...pagination,
      });
    } else {
      return await prisma.movieEvent.findMany(pagination);
    }
  }

  @Query((returns) => Int)
  async movieEventCount(): Promise<number> {
    return await prisma.movieEvent.count();
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
