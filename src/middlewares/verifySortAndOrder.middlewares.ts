import { Request, Response, NextFunction } from "express";

const verifySortAndOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const sort =
        req.query.sort === undefined
            ? null
            : req.query.sort!.toString().toLowerCase();
    const order =
        req.query.order === undefined
            ? "ASC"
            : req.query.order!.toString().toUpperCase();
    const perPage = req.query.perPage!;
    const page = req.query.page!;

    if (sort == "price " || "duration") {
        if (order == "ASC" || "DESC") {
            req.query.order = order;
        }
        if (order != "ASC" && order != "DESC") {
            req.query.order = "ASC";
        }
        if (order == undefined) {
            req.query.order = "ASC";
        }
    } else if ((sort != "price " && "duration") || sort == null) {
        req.query.sort = "id";
    }
    if (sort == undefined) {
        req.query.order = "ASC";
    }

    if (sort == undefined) {
        req.query.sort = "id";
    }

    if (+perPage > 0 && +perPage <= 5) {
        req.query.page = perPage;
    } else if (
        +perPage <= 0 ||
        +perPage > 5 ||
        perPage == undefined ||
        perPage == "invalidInput"
    ) {
        req.query.perPage = "5";
    }

    if (+page > 0) {
        req.query.page = page;
    } else if (+page <= 0 || page == undefined || page == "invalidInput") {
        req.query.page = "1";
    }

    return next();
};

export { verifySortAndOrder };
