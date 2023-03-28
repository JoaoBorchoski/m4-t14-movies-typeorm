import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";
import { iMoviePartial, iMovieRepo } from "../interfaces";

const updateMoviesServices = async (payload: iMoviePartial, id: number) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie);

    if (payload.name) {
        if (
            await movieRepo.findOneBy({
                name: payload.name,
            })
        ) {
            throw new AppError("Movie already exists.", 409);
        }
    }
    const oldData = await movieRepo.findOneBy({
        id: id,
    });
    const movie = movieRepo.create({
        ...oldData,
        ...payload,
    });

    return await movieRepo.save(movie);
};

export { updateMoviesServices };
