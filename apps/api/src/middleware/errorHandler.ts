import { NextFunction, Request, Response } from "express";

export async function notFound(req:Request, res:Response, next:NextFunction) {

    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

export async function errorHandler(error:Error, req:Request, res:Response, next:NextFunction) {
    const status = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status);

    res.json({
      message: error.message,
    });
}