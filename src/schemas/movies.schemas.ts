import { number, z } from "zod";

const createMovieSchema = z.object({
    name: z.string().max(50),
    description: z.string().optional(),
    duration: z.number().min(0, { message: "Number must be greater than 0" }),
    price: z.number().int(),
});

const movieUpdateSchema = createMovieSchema.partial();

export { createMovieSchema, movieUpdateSchema };
