import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const deleteMovieServices = async (id: number): Promise<void> => {
    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

    const movie = await movieRepo.findOneBy({
        id: id,
    });

    await movieRepo.remove(movie!);
};

export { deleteMovieServices };
