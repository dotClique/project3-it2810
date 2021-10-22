import { Resolver, Mutation, Args, Query, Int, ResolveField, Parent } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieGroup } from "./group.model";
import { MovieEvent } from "../Event/event.model";

/**
 * Resolves all GraphQL queries related to MoviePage Groups
 */
@Resolver((of) => MovieGroup)
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
   * Gets all movie groups (with pagination) based on a searchString
   * @param pageSize
   * @param page
   * @param searchString
   */
  @Query(() => [MovieGroup])
  async movieGroups(
    @Args("pageSize", { type: () => Int }) pageSize: number,
    @Args("page", { type: () => Int }) page: number,
    @Args("searchString", { nullable: true }) searchString?: string,
  ): Promise<MovieGroup[]> {
    const pagination = { take: pageSize, skip: (page - 1) * pageSize };
    if (searchString) {
      return await prisma.movieGroup.findMany({
        where: { name: { mode: "insensitive", contains: searchString } },
        ...pagination,
      });
    } else {
      return await prisma.movieGroup.findMany(pagination);
    }
  }

  /**
   * Gets the total number of movie groups
   */
  @Query(() => Int)
  async movieGroupCount(): Promise<number> {
    return await prisma.movieGroup.count();
  }

  /**
   * Gets the movie events related to a movie group
   * @param movieGroup
   */
  @ResolveField(() => [MovieEvent])
  async movieEvents(@Parent() movieGroup) {
    const { movieGroupId } = movieGroup;
    return prisma.movieGroup.findUnique({ where: { movieGroupId } }).movieEvents();
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
   * Gets all movie groups a particular user has favorited
   * @param alias the alias of the user
   * @param pageSize
   * @param page
   */
  @Query(() => [MovieGroup])
  async movieGroupsFavorite(
    @Args("alias") alias: string,
    @Args("pageSize", { type: () => Int }) pageSize: number,
    @Args("page", { type: () => Int }) page: number,
  ): Promise<MovieGroup[]> {
    return await prisma.movieGroup.findMany({
      where: { userFavorites: { some: { alias } } },
      include: {
        movieEvents: true,
        userFavorites: true,
      },
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  /**
   * Gets all the movie groups a particular user hasn't favorited
   * @param alias the alias of the user
   * @param pageSize
   * @param page
   */
  @Query(() => [MovieGroup])
  async movieGroupsNotFavorite(
    @Args("alias") alias: string,
    @Args("pageSize", { type: () => Int }) pageSize: number,
    @Args("page", { type: () => Int }) page: number,
  ): Promise<MovieGroup[]> {
    return await prisma.movieGroup.findMany({
      where: { userFavorites: { none: { alias } } },
      include: {
        movieEvents: true,
        userFavorites: true,
      },
      take: pageSize,
      skip: pageSize * (page - 1),
    });
  }

  /**
   * Gets the total number of movie groups a user has favorited
   */
  @Query(() => Int)
  async countMovieGroupFavorite(@Args("alias") alias: string): Promise<number> {
    return await prisma.movieGroup.count({ where: { userFavorites: { some: { alias } } } });
  }

  /**
   * Gets the total number of movie groups a user hasn't favorited
   */
  @Query(() => Int)
  async countMovieGroupNotFavorite(@Args("alias") alias: string): Promise<number> {
    return await prisma.movieGroup.count({ where: { userFavorites: { none: { alias } } } });
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
