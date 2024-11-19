import type { NextFunction, Request, Response } from "express";
import type { WithId } from "mongodb";
import type { Battle } from "../model/battle.model";
import type {
	CreateBattleBody,
	GetBattleParam,
	UpdateBattleBody,
} from "../types/battle/battleRequest.types";
import type {
	CreateBattleResponse,
	GetAllBattleResponse,
} from "../types/battle/battleResponse.types";
import type { BattleQuery } from "../types/battle/battleRequest.types";
import type { DbResponse, MessageResponse } from "../types/response";
import { sanitizeSlug } from "../lib/sanitizer";
import {
	deleteABattle,
	getABattle,
	getBattleList,
	handleDeleteError,
	handleGetError,
	handleInsertError,
	handleUpdateError,
	insertBattle,
	updateABattle,
} from "../service/battle.service";
import { delay } from "../lib/tasks";

type N = Record<never, never>;

export async function findAll(
	req: Request<N, GetAllBattleResponse, N, BattleQuery>,
	res: DbResponse<GetAllBattleResponse>,
	next: NextFunction,
) {
	try {
		await delay(2000);
		const result = await getBattleList(res.locals.collection, req.query);
		res.status(200);
		res.json(result);
	} catch (error) {
		const getError = handleGetError(error);

		res.status(getError.code);
		next(getError.err);
	}
}

export async function getOne(
	req: Request<GetBattleParam>,
	res: Response<WithId<Battle>>,
	next: NextFunction,
) {
	try {
		const result = await getABattle(res.locals.collection, req.params.id);
		res.status(200);
		res.json(result);
	} catch (error) {
		const getError = handleGetError(error);

		res.status(getError.code);
		next(getError.err);
	}
}

export async function create(
	req: Request<N, CreateBattleResponse, CreateBattleBody, N>,
	res: DbResponse<CreateBattleResponse>,
	next: NextFunction,
) {
	try {
		const { userId, encounters,goldEarned,goldSpent } = req.body;
		const battle = {
			userId,
			encounters,
			goldEarned,
			goldSpent,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await insertBattle(res.locals.collection, battle);

		res.status(201);
		res.json(result);
	} catch (error) {
		const insertError = handleInsertError(error);

		res.status(insertError.code);
		next(insertError.err);
	}
}

export async function updateOne(
	req: Request<GetBattleParam, MessageResponse, UpdateBattleBody, N>,
	res: DbResponse<MessageResponse>,
	next: NextFunction,
) {
	try {
		const result = await updateABattle(
			res.locals.collection,
			req.params.id,
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
	req: Request<GetBattleParam, MessageResponse, N, N>,
	res: DbResponse<MessageResponse>,
	next: NextFunction,
) {
	try {
		const result = await deleteABattle(res.locals.collection, req.params.id);

		res.json(result);
	} catch (error) {
		const deleteError = handleDeleteError(error);

		res.status(deleteError.code);
		next(deleteError.err);
	}
}
