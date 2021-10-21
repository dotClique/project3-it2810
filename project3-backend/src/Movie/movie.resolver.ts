import {Resolver, Args, Query, Int} from "@nestjs/graphql";
import { prisma } from "../../../project3-common/src/prisma";
import { Movie } from "./movie.model";

/**
 * Resolves all queries related to the local imdb dataset
 */
@Resolver((of) => Movie)
export class MovieResolver {

  /**
   * Gets movies related to a search string.
   * @param searchString
   * @param maxCount The max number of movies to return
   */
  @Query((returns) => [Movie])
  async movies(@Args("searchString") searchString: string,
               @Args("maxCount", {type: () => Int}) maxCount: number ): Promise<Movie[]> {
    return await prisma.movie.findMany({
      take: maxCount,
      where: { primarytitle: { mode: "insensitive", contains: searchString } },
    });
  }
}
