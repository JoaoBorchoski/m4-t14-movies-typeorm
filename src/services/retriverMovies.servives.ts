import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieRepo } from "../interfaces";

const retriverMoviesService = async (
    page: number,
    perPage: number,
    sort: any,
    order: any
) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie);

    const result = await movieRepo.findAndCount({
        order: {
            [sort]: order,
        },
        skip: perPage * (page - 1),
        take: perPage,
    });

    return result;
};

export { retriverMoviesService };
