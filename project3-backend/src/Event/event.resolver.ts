import { Resolver, Mutation, Args, Query, ResolveField, Parent, Int } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieEvent } from "./event.model";
import { MovieGroup } from "../Group/group.model";
import { User } from "../User/user.model";

/**
 * Resolves all GraphQL queries related to Movie Events
 */
@Resolver((of) => MovieEvent)
export class MovieEventResolver {

  /**
   * Gets a single movie event based on ID
   * @param movieEventId
   */
  @Query((returns) => MovieEvent)
  async movieEvent(@Args("movieEventId") movieEventId: string): Promise<MovieEvent> {
    return await prisma.movieEvent.findUnique({
      where: {
        movieEventId,
      },
    });
  }

  /**
   * Gets all movie events (with pagination) that contains the searchString in its title.
   * @param pageSize
   * @param page
   * @param searchString
   */
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

  /**
   * Gets the total number of movie events in the database
   */
  @Query((returns) => Int)
  async movieEventCount(): Promise<number> {
    return await prisma.movieEvent.count();
  }

  /**
   * Gets the movie group related to the event
   * @param movieEvent
   */
  @ResolveField(() => [MovieGroup])
  async movieGroup(@Parent() movieEvent) {
    const { movieEventId } = movieEvent;
    return prisma.movieEvent.findUnique({ where: { movieEventId } }).movieGroup();
  }

  /**
   * Gets participants of a movie event
   * @param movieEvent
   */
  @ResolveField(() => [User])
  async participants(@Parent() movieEvent) {
    const { movieEventId } = movieEvent;
    return prisma.movieEvent.findUnique({ where: { movieEventId } }).participants();
  }

  /**
   * Creates a new Movie Event
   * @param title
   * @param description
   * @param date
   * @param location
   * @param movieGroupId
   * @param imageUrl
   */
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
