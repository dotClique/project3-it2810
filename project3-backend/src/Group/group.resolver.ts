import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieEvent } from "../Event/event.model";
import { MovieGroup } from "./group.model";

/**
 * Resolves all GraphQL queries related to MoviePage Groups
 */
@Resolver(() => MovieGroup)
export class MovieGroupResolver {
  /**
   * Gets a particular movie group
   * @param movieGroupId
   */
  @Query(() => MovieGroup)
  async movieGroup(@Args("movieGroupId") movieGroupId: string): Promise<MovieGroup> {
    return await prisma.movieGroup.findUnique({
      where: {
        movieGroupId,
      },
    });
  }

  /**
   * Method to get all movieGroups by page with some filter paramteres.
   * @param pageSize The (optional) pageSize reterned. By default 10.
   * @param page The (optional) page number based on the pageSize, by default 1.
   * @param titleSearchString The (opitonal) search string for the title.
   * @param descriptionSearchString The (optional) search string for the description.
   * @param aliasFavoriteUser The (optional) alias of a user to get only the movieGroups favorited by this user.
   * @param aliasNotFavoriteUser The (optional) alias of a user to get only the movieGroups not favorited by this user.
   * @returns A list ov movieGroups that match the paramters.
   *
   * @remarks The matching of search strings are not case sensitive.
   */
  @Query(() => [MovieGroup])
  async movieGroups(
    @Args("pageSize", { type: () => Int, nullable: true }) pageSize = 10,
    @Args("page", { type: () => Int, nullable: true }) page = 1,
    @Args("titleSearchString", { nullable: true }) titleSearchString?: string,
    @Args("descriptionSearchString", { nullable: true }) descriptionSearchString?: string,
    @Args("aliasFavoriteUser", { nullable: true }) aliasFavoriteUser?: string,
    @Args("aliasNotFavoriteUser", { nullable: true }) aliasNotFavoriteUser?: string,
  ): Promise<MovieGroup[]> {
    // Handle pagination
    const pagination = { take: pageSize, skip: (page - 1) * pageSize };

    // Add filter by the alias of users that have favorited this movieGroup
    const filterByFavorite =
      aliasFavoriteUser !== undefined
        ? { userFavorites: { some: { alias: aliasFavoriteUser } } }
        : {};

    // Add filter by the alias of the users that have not favorited this movieGroup.
    const filterByNotFavorite =
      aliasNotFavoriteUser !== undefined
        ? { userFavorites: { none: { alias: aliasNotFavoriteUser } } }
        : {};

    // The prisma query to get by request.
    return await prisma.movieGroup.findMany({
      where: {
        name: { mode: "insensitive", contains: titleSearchString },
        description: { mode: "insensitive", contains: descriptionSearchString },
        ...filterByFavorite,
        ...filterByNotFavorite,
      },
      ...pagination,
    });
  }

  /**
   * Gets the total number of movie groups
   */
  @Query(() => Int)
  async movieGroupCount(
    @Args("aliasFavoriteUser", { nullable: true }) aliasFavoriteUser?: string,
    @Args("aliasNotFavoriteUser", { nullable: true }) aliasNotFavoriteUser?: string,
  ): Promise<number> {
    if (aliasFavoriteUser)
      return await prisma.movieGroup.count({
        where: { userFavorites: { some: { alias: aliasFavoriteUser } } },
      });
    else if (aliasNotFavoriteUser)
      return await prisma.movieGroup.count({
        where: { userFavorites: { none: { alias: aliasNotFavoriteUser } } },
      });
    return prisma.movieGroup.count();
  }

  /**
   * Gets the movie events related to a movie group
   * @param movieGroup
   * @param take How many events to take
   * @param fromNow If the query only should return future events
   */
  @ResolveField(() => [MovieEvent])
  async movieEvents(
    @Parent() movieGroup,
    @Args("take", { type: () => Int, nullable: true }) take?: number,
    @Args("fromNow", { type: () => Boolean, nullable: true }) fromNow?: boolean,
  ) {
    const { movieGroupId } = movieGroup;
    const filterFromNow = fromNow ? { where: { date: { gte: new Date() } } } : undefined;
    return prisma.movieGroup
      .findUnique({ where: { movieGroupId } })
      .movieEvents({ orderBy: { date: "asc" }, take, ...filterFromNow });
  }

  /**
   * Gets the users who have set a movie group as a favorite
   * @param movieGroup
   */
  @ResolveField(() => [MovieEvent])
  async userFavorites(@Parent() movieGroup) {
    const { movieGroupId } = movieGroup;
    return prisma.movieGroup.findUnique({ where: { movieGroupId } }).userFavorites();
  }

  /**
   * Creates a new movie group
   * @param name
   * @param description
   */
  @Mutation(() => MovieGroup)
  async createMovieGroup(@Args("name") name: string, @Args("description") description: string) {
    return prisma.movieGroup.create({ data: { name, description } });
  }
}
