import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const verifyId = async (req: Request, res: Response, next: NextFunction) => {
    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
    if (!(await movieRepo.exist({ where: { id: +req.params.id } }))) {
        throw new AppError("Movie not found", 404);
    }

    return next();
};

export { verifyId };
