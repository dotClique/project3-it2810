import { Resolver, Mutation, Args, Query, Int, ResolveField, Parent } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieGroup } from "./group.model";
import { MovieEvent } from "../Event/event.model";

@Resolver((of) => MovieGroup)
export class MovieGroupResolver {
  @Query((returns) => MovieGroup)
  async movieGroup(@Args("movieGroupId") movieGroupId: string): Promise<MovieGroup> {
    return await prisma.movieGroup.findUnique({
      where: {
        movieGroupId,
      },
    });
  }

  @Query((returns) => [MovieGroup])
  async movieGroups(): Promise<MovieGroup[]> {
    return await prisma.movieGroup.findMany();
  }

  @ResolveField(() => [MovieEvent])
  async movieEvents(@Parent() movieGroup) {
    const { movieGroupId } = movieGroup;
    return prisma.movieGroup.findUnique({ where: { movieGroupId } }).movieEvents();
  }

  @ResolveField(() => [MovieEvent])
  async userFavorites(@Parent() movieGroup) {
    const { movieGroupId } = movieGroup;
    return prisma.movieGroup.findUnique({ where: { movieGroupId } }).userFavorites();
  }

  @Query((returns) => [MovieGroup])
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
    });
  }

  @Query((returns) => [MovieGroup])
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

  @Mutation((returns) => MovieGroup)
  async createMovieGroup(@Args("name") name: string, @Args("description") description: string) {
    return prisma.movieGroup.create({ data: { name, description } });
  }
}
