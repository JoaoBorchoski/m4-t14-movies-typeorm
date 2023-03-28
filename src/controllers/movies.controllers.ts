import { Request, Response } from "express";
import { deleteMovieServices } from "../services/deleteMovie.services";
import { createMovieService } from "../services/newMovie.services";
import { retriverMoviesService } from "../services/retriverMovies.servives";
import { updateMoviesServices } from "../services/updateMovies.services";

const createMovieController = async (req: Request, res: Response) => {
    const movie = await createMovieService(req.body);
    return res.status(201).json(movie);
};

const retriverMoviesController = async (req: Request, res: Response) => {
    const page = +req.query.page!;
    const perPage = +req.query.perPage!;
    const sort = req.query.sort!;
    const oder = req.query.order!;

    const movies = await retriverMoviesService(+page, +perPage, sort, oder);

    const ret = {
        prevPage:
            page == 1
                ? null
                : `http://localhost:3000/movies?page=${
                      page - 1
                  }&perPage=${perPage}`,
        nextPage:
            page * perPage > movies[1]
                ? null
                : `http://localhost:3000/movies?page=${
                      page + 1
                  }&perPage=${perPage}`,
        count: movies[1],
        data: movies[0],
    };

    return res.status(200).json(ret);
};

const updateMovieController = async (req: Request, res: Response) => {
    const updateUser = await updateMoviesServices(req.body, +req.params.id);

    return res.status(200).json(updateUser);
};

const deleteMovieController = async (req: Request, res: Response) => {
    const deleteUser = await deleteMovieServices(+req.params.id);

    return res.status(204).send();
};

export {
    createMovieController,
    retriverMoviesController,
    updateMovieController,
    deleteMovieController,
};
