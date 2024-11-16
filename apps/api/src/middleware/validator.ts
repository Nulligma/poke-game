import { NextFunction, query, Request, Response } from 'express';
import * as z from 'zod';

export function validator(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({ params: req.params, body: req.body, query: req.query });
            next();
        } catch (error) {
            const errorMessage = `Validation Error: ${(error as z.ZodError).errors.map(e => e.message).join(', ')}`;
            res.status(400);
            next(new Error(errorMessage));
        }
    }
}