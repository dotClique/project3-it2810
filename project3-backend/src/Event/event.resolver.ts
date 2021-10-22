import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieGroup } from "../Group/group.model";
import { User } from "../User/user.model";
import { MovieEvent } from "./event.model";

/**
 * Resolves all GraphQL queries related to MoviePage Events
 */
@Resolver(() => MovieEvent)
export class MovieEventResolver {
  /**
   * Gets a single movie event based on ID
   * @param movieEventId
   */
  @Query(() => MovieEvent)
  async movieEvent(@Args("movieEventId") movieEventId: string): Promise<MovieEvent> {
    return await prisma.movieEvent.findUnique({
      where: {
        movieEventId,
      },
    });
  }

  /**
   * Gets all movie events (with pagination) that contains the searchString in its title.
   * It is also possible to filter the movieEvents on the description text, location, fromDate, toDate.
   * @param pageSize The (optional) size of the page retrieved, by default 10.
   * @param page The (optional) page number of the page (each of given size) to fetch, by default 1.
   * @param movieGroupId The (optional) movieGroupId the movieEvent has to be connected to.
   * @param titleSearchString The (optional) search string for the title of movieEvents.
   * @param descriptionSearchString The (optional) search string for the description of movieEvents.
   * @param locationSearchString The (optional) search string for the location of the movieEvents.
   * @param fromDate The (optional) earliest date the movieEvents can take place.
   * @param toDate The (optional) latest date the movieEvent can take place.
   *
   * @remarks All search strings match with case insensitivity.
   */
  @Query(() => [MovieEvent])
  async movieEvents(
    @Args("pageSize", { type: () => Int, nullable: true }) pageSize = 10,
    @Args("page", { type: () => Int, nullable: true }) page = 1,
    @Args("movieGroupId", { nullable: true }) movieGroupId?: string,
    @Args("titleSearchString", { nullable: true }) titleSearchString?: string,
    @Args("descriptionSearchString", { nullable: true }) descriptionSearchString?: string,
    @Args("location", { nullable: true }) locationSearchString?: string,
    @Args("fromDate", { nullable: true }) fromDate?: Date,
    @Args("toDate", { nullable: true }) toDate?: Date,
  ): Promise<MovieEvent[]> {
    const pagination = { take: pageSize, skip: (page - 1) * pageSize };
    return await prisma.movieEvent.findMany({
      where: {
        title: { mode: "insensitive", contains: titleSearchString },
        movieGroupId,
        description: { mode: "insensitive", contains: descriptionSearchString },
        location: { mode: "insensitive", contains: locationSearchString },
        date: { gte: fromDate, lte: toDate },
      },
      ...pagination,
    });
  }

  /**
   * Gets the total number of movie events in the database
   */
  @Query(() => Int)
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
   * Creates a new MoviePage Event
   * @param title
   * @param description
   * @param date
   * @param location
   * @param movieGroupId
   * @param imageUrl
   */
  @Mutation(() => MovieEvent)
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
