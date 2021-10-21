import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {prisma} from "../../../project3-common/src/prisma";
import {Movie} from "./movie.model";

@Resolver(of => Movie)
export class MovieResolver {

    @Query(returns => [Movie])
    async movies(@Args('searchString') searchString: string): Promise<Movie[]> {
        return await prisma.movie.findMany({take: 10, where: {primarytitle: {mode: "insensitive", contains: searchString}}})
    }

}

