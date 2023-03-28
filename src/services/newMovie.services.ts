import { iMoviePayload } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";
import { Repository } from "typeorm";

const createMovieService = async (payload: iMoviePayload): Promise<Movie> => {
    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
    if (await movieRepo.exist({ where: { name: payload.name } })) {
        throw new AppError("Movie already exists.", 409);
    }

    const movie = movieRepo.create(payload);

    await movieRepo.save(movie);

    return movie;
};

export { createMovieService };
