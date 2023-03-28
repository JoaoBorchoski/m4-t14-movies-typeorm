import { Response, Request, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const verifyData =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        const validatedData = schema.parse(req.body);

        req.body = validatedData;

        return next();
    };

export default verifyData;
