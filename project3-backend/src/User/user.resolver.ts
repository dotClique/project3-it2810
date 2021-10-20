import {User} from "./user.model";
import {Resolver, Mutation, Args, Query, Float} from '@nestjs/graphql';
import {prisma} from "../../../project3-common/src/prisma";
import {MovieGroup} from "../Group/group.model";
import {MovieEvent} from "../Event/event.model";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => User)
    async user(@Args('alias') alias: string): Promise<User> {
        return await prisma.user.findUnique({
            where: {
                alias: alias,
            },
            include: {
                participates: true,
                favorites: true
            }
        })
    }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await prisma.user.findMany({
            include: {
                participates: true,
                favorites: true
            }
        });
    }

    @Mutation(returns => User)
    async createUser(@Args('alias') alias: string) {
        return prisma.user.create({data: {alias}});
    }


    @Mutation(returns => MovieGroup)
    async addFavorite(@Args('movieGroupId') movieGroupId: string,
                      @Args('useralias') useralias: string) {
        return prisma.movieGroup.update({
            where: {
                movieGroupId,
            },
            data: {userFavorites: {connect: {alias: useralias}}}

        });
    }

    @Mutation(returns => MovieEvent)
    async addEvent(@Args('movieEventId') movieEventId: string,
                   @Args('useralias') useralias: string) {
        return prisma.movieEvent.update({
            where: {
                movieEventId,
            },
            data: {participants: {connect: {alias: useralias}}}

        });
    }
}

