import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {prisma} from "../../../project3-common/src/prisma";
import {MovieGroup} from "./group.model";

@Resolver(of => MovieGroup)
export class MovieGroupResolver {
    @Query(returns => MovieGroup)
    async movieGroup(@Args('movieGroupId') movieGroupId: string): Promise<MovieGroup> {
        return await prisma.movieGroup.findUnique({
            where: {
                movieGroupId,
            },
            include: {
                movieEvents: true,
                userFavorites: true
            }
        })
    }

    @Query(returns => [MovieGroup])
    async movieGroups(): Promise<MovieGroup[]> {
        return await prisma.movieGroup.findMany({
            include: {
                movieEvents: true,
                userFavorites: true
            }
        });
    }

    @Mutation(returns => MovieGroup)
    async createMovieGroup(@Args('name') name: string,
                     @Args('description') description: string) {
        return prisma.movieGroup.create({data: {name, description}});
    }


}

