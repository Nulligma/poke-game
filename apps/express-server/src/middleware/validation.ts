import type { NextFunction, Request, Response } from "express";
import { ZodError, type AnyZodObject } from "zod";
import type { CollectionKey } from "../types/database";
import type { DbResponse } from "../types/response";
import { Database } from "../db/db";

type RequestValidators = {
	params?: AnyZodObject;
	body?: AnyZodObject;
	query?: AnyZodObject;
};

export function validateRequest(validators: RequestValidators) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (validators.params) req.params = validators.params.parse(req.params);

			if (validators.body) req.body = validators.body.parse(req.body);

			if (validators.query) req.query = validators.query.parse(req.query);

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(422);
				console.log({ error });
				res.json(error.issues);
				res.end();
			} else throw error;
		}
	};
}

export function validateDB(collectionName: CollectionKey) {
	return (req: Request, res: DbResponse<Response>, next: NextFunction) => {
		Database.Instance.getCollection(collectionName)
			.then((c) => {
				res.locals.collection = c;
				next();
			})
			.catch((e) => next(e));
	};
}
