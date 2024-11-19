import type { Request, Response, NextFunction } from "express";
import type {
	CreateUserBody,
	GetUserParam,
	UpdateUserBody,
	UserQuery,
} from "../types/user/userRequest.types";
import type {
	CreateUserResponse,
	GetAllUserResponse,
} from "../types/user/userResponse.types";
import type { DbResponse, MessageResponse } from "../types/response";
import { delay } from "../lib/tasks";
import {
	createUser,
	deleteUser,
	getUser,
	getUserList,
	handleInsertError,
	updateUser,
} from "../service/user.service";
import {
	handleDeleteError,
	handleGetError,
	handleUpdateError,
} from "../service/battle.service";
import type { WithId } from "mongodb";
import type { User } from "../model/user.model";

type N = Record<never, never>;

export async function findAll(
	req: Request<N, GetAllUserResponse, N, UserQuery>,
	res: DbResponse<GetAllUserResponse>,
	next: NextFunction,
) {
	try {
		await delay(2000);
		const result = await getUserList(res.locals.collection, req.query);
		res.status(200);
		res.json(result);
	} catch (error) {
		const getError = handleGetError(error);

		res.status(getError.code);
		next(getError.err);
	}
}

export async function getOne(
	req: Request<GetUserParam>,
	res: Response<WithId<User>>,
	next: NextFunction,
) {
	try {
		const result = await getUser(res.locals.collection, req.params.userID);
		res.status(200);
		res.json(result);
	} catch (error) {
		const getError = handleGetError(error);

		res.status(getError.code);
		next(getError.err);
	}
}

export async function create(
	req: Request<N, CreateUserResponse, CreateUserBody, N>,
	res: DbResponse<CreateUserResponse>,
	next: NextFunction,
) {
	try {
		const { accountBalance, email, firstname, lastname, profileImg } = req.body;
		const user = {
			accountBalance,
			email,
			firstname,
			lastname,
			profileImg,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await createUser(res.locals.collection, user);

		res.status(201);
		res.json(result);
	} catch (error) {
		const insertError = handleInsertError(error);

		res.status(insertError.code);
		next(insertError.err);
	}
}

export async function updateOne(
	req: Request<GetUserParam, MessageResponse, UpdateUserBody, N>,
	res: DbResponse<MessageResponse>,
	next: NextFunction,
) {
	try {
		const result = await updateUser(
			res.locals.collection,
			req.params.userID,
			req.body,
		);

		res.json(result);
	} catch (error) {
		const updateError = handleUpdateError(error);

		res.status(updateError.code);
		next(updateError.err);
	}
}

export async function deleteOne(
	req: Request<GetUserParam, MessageResponse, N, N>,
	res: DbResponse<MessageResponse>,
	next: NextFunction,
) {
	try {
		const result = await deleteUser(res.locals.collection, req.params.userID);

		res.json(result);
	} catch (error) {
		const deleteError = handleDeleteError(error);

		res.status(deleteError.code);
		next(deleteError.err);
	}
}
