import { Router } from "express";
import {
    createMovieController,
    deleteMovieController,
    retriverMoviesController,
    updateMovieController,
} from "../controllers/movies.controllers";
import verifyData from "../middlewares/verifyData.middlewares";
import { verifyId } from "../middlewares/verifyId.middlewares";
import { verifySortAndOrder } from "../middlewares/verifySortAndOrder.middlewares";
import {
    createMovieSchema,
    movieUpdateSchema,
} from "../schemas/movies.schemas";

const moviesRouter: Router = Router();

moviesRouter.post("", verifyData(createMovieSchema), createMovieController);
moviesRouter.get("", verifySortAndOrder, retriverMoviesController);
moviesRouter.patch(
    "/:id",
    verifyId,
    verifyData(movieUpdateSchema),
    updateMovieController
);
moviesRouter.delete("/:id", verifyId, deleteMovieController);

export { moviesRouter };
