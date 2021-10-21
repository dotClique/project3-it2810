import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {prisma} from "../../../project3-common/src/prisma";
import {Movie} from "./movie.model";

@Resolver(of => Movie)
export class MovieResolver {

    @Query(returns => [Movie])
    async movies(): Promise<Movie[]> {
        const response = await prisma.$queryRaw`SELECT * FROM Movie Limit 5` as Movie[]
        return response;
    }

}

