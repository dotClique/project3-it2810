import { User } from "./user.model";
import { Resolver, Mutation, Args, Query, Parent, ResolveField, Int } from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { MovieGroup } from "../Group/group.model";
import { MovieEvent } from "../Event/event.model";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(@Args("alias") alias: string): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        alias: alias,
      },
    });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  @Query(() => Int)
  async userCount(): Promise<number> {
    return await prisma.user.count();
  }

  @ResolveField(() => [MovieGroup])
  async favorites(@Parent() user) {
    const { alias } = user;
    return prisma.user.findUnique({ where: { alias } }).favorites();
  }
  @ResolveField(() => [MovieEvent])
  async participates(@Parent() user) {
    const { alias } = user;
    return prisma.user.findUnique({ where: { alias } }).participates();
  }

  @Mutation(() => User)
  async createUser(@Args("alias") alias: string) {
    return prisma.user.create({ data: { alias } });
  }

  @Mutation(() => User)
  async createUserOrCheckIfExists(@Args("alias") alias: string) {
    const user = await prisma.user.findUnique({
      where: {
        alias: alias,
      },
      include: {
        participates: true,
        favorites: true,
      },
    });
    if (user) {
      return user;
    }
    return prisma.user.create({ data: { alias } });
  }

  @Mutation(() => MovieGroup)
  async addUserToMovieGroup(
    @Args("movieGroupId") movieGroupId: string,
    @Args("useralias") useralias: string,
  ) {
    return prisma.movieGroup.update({
      where: {
        movieGroupId,
      },
      data: { userFavorites: { connect: { alias: useralias } } },
    });
  }

  @Mutation(() => MovieGroup)
  async removeUserFromMovieGroup(
    @Args("movieGroupId") movieGroupId: string,
    @Args("useralias") useralias: string,
  ) {
    return prisma.movieGroup.update({
      where: {
        movieGroupId,
      },
      data: { userFavorites: { disconnect: { alias: useralias } } },
    });
  }

  @Mutation(() => MovieEvent)
  async addUserToEvent(
    @Args("movieEventId") movieEventId: string,
    @Args("useralias") useralias: string,
  ) {
    return prisma.movieEvent.update({
      where: {
        movieEventId,
      },
      data: { participants: { connect: { alias: useralias } } },
    });
  }

  @Mutation(() => MovieEvent)
  async removeUserFromEvent(
      @Args("movieEventId") movieEventId: string,
      @Args("useralias") useralias: string,
  ) {
    return prisma.movieEvent.update({
      where: {
        movieEventId,
      },
      data: { participants: { disconnect: { alias: useralias } } },
    });
  }
}
