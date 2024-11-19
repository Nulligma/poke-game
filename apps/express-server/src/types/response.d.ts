import type { Response } from "express";
import type { Collection } from "mongodb";
import type { DBC } from "./database";

export type DbResponse<T> = Response<T> & {
	locals: {
		collection: DBC;
	};
};

export type MessageResponse = {
	message: string;
};

export type ErrorReturn = {
	err: Error;
	code: number;
};
