import type { NextFunction, Request, Response } from "express";

export function notfound(req: Request, res: Response, next: NextFunction) {
	res.status(404);
	throw new Error("url not found");
}

export function errorResponse(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const status = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(status);
	res.json({
		message: err.message,
	});
}
