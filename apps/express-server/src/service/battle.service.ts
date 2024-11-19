import {
	type Collection,
	MongoServerError,
	ObjectId,
	UpdateFilter,
} from "mongodb";
import type { Battle } from "../model/battle.model";
import type {
	CreateBattleResponse,
	GetAllBattleResponse,
} from "../types/battle/battleResponse.types";
import type { UpdateBattleBody } from "../types/battle/battleRequest.types";
import type { DBC } from "../types/database";
import type { BattleQuery } from "../types/battle/battleRequest.types";
import { convertBattleQueryToFindParams } from "../lib/operator";
import type { ErrorReturn, MessageResponse } from "../types/response";

//#region ----------INSERT-ONE---------------------------
export async function insertBattle(
	db: DBC,
	data: Battle,
): Promise<CreateBattleResponse> {
	const collection = db as Collection<Battle> | undefined;

	if (!collection) {
		throw new Error("Cannot get the battle collection");
	}

	const result = await collection.insertOne(data);

	if (!result.acknowledged) {
		console.error(
			"Not acknowledged while inserting into battles with body: ",
			data,
		);
		throw new Error("Cannot create new battle");
	}

	return {
		_id: result.insertedId,
		userId: data.userId,
	};
}

export function handleInsertError(error: unknown): ErrorReturn {
	let insertError: ErrorReturn;

	if (error instanceof MongoServerError && error.code === 11000) {
		console.error("# Duplicate Data Found:\n", error);

		insertError = {
			err: new Error(
				"Title already exists. Please change the title's first 10 letter",
			),
			code: 406,
		};
	} else if (error instanceof Error) {
		insertError = {
			err: error,
			code: 500,
		};
	} else {
		console.error("# Error in insertion", error);
		insertError = {
			err: new Error("Cannot create new battle "),
			code: 500,
		};
	}

	return insertError;
}
//#endregion

//#region ----------GET-ALL------------------------------
export async function getBattleList(
	db: DBC,
	query: BattleQuery,
): Promise<GetAllBattleResponse> {
	const collection = db as Collection<Battle> | undefined;

	if (!collection) {
		throw new Error("Cannot get the battle collection");
	}

	const [getQuery, getOption] = convertBattleQueryToFindParams(query);

	const res = await collection.find(getQuery, getOption).toArray();

	return res;
}

export function handleGetError(error: unknown): ErrorReturn {
	let getError: ErrorReturn;

	if (error instanceof Error) {
		console.error("# Error in finding", error);
		getError = {
			err: error,
			code: error.name === "not-found" ? 404 : 500,
		};
	} else {
		console.error("# Error in finding", error);
		getError = {
			err: new Error(`Cannot find battle ${error}`),
			code: 500,
		};
	}

	return getError;
}
//#endregion

//#region ----------GET-ONE------------------------------
export async function getABattle(db: DBC, id: string) {
	const collection = db as Collection<Battle> | undefined;

	if (!collection) {
		throw new Error("Cannot get the battle collection");
	}

	const res = await collection.findOne({ _id:new ObjectId(id) });

	if (res == null) {
		const err = new Error(`Cannot find the battle ${id}`);
		err.name = "not-found";
		throw err;
	}

	return res;
}
//#endregion

//#region ----------UPDATE-ONE---------------------------
export async function updateABattle(
	db: DBC,
	id: string,
	update: UpdateBattleBody,
): Promise<MessageResponse> {
	const collection = db as Collection<Battle> | undefined;

	if (!collection) {
		throw new Error("Cannot get the battle collection");
	}

	const result = await collection.updateOne({ _id:new ObjectId(id) }, { $set: update });

	if (!result.acknowledged) {
		console.error("Not acknowledged while updating battle: ", id, update);
		throw new Error("Cannot update battle");
	}

	if (result.matchedCount === 0) {
		const err = new Error(`Cannot find the battle ${id}`);
		err.name = "not-found";
		throw err;
	}

	if (result.modifiedCount === 0) {
		const err = new Error(`Nothing modified for ${id} with ${update}`);
		throw err;
	}

	return { message: "updated successfully" };
}

export function handleUpdateError(error: unknown): ErrorReturn {
	let updateError: ErrorReturn;

	if (error instanceof Error) {
		console.error("# Error in updating", error);
		updateError = {
			err: error,
			code: error.name === "not-found" ? 404 : 500,
		};
	} else {
		console.error("# Error in updating", error);
		updateError = {
			err: new Error(`Cannot update battle ${error}`),
			code: 500,
		};
	}

	return updateError;
}
//#endregion

//#region ----------DELETE-ONE---------------------------
export async function deleteABattle(
	db: DBC,
	id: string,
): Promise<MessageResponse> {
	const collection = db as Collection<Battle> | undefined;

	if (!collection) {
		throw new Error("Cannot get the battle collection");
	}

	const result = await collection.deleteOne({ _id:new ObjectId(id) });

	if (!result.acknowledged) {
		console.error("Not acknowledged while deleting battle: ", id);
		throw new Error("Cannot delete battle");
	}

	if (result.deletedCount === 0) {
		const err = new Error(`Cannot find the battle ${id}`);
		err.name = "not-found";
		throw err;
	}

	return { message: "deleted successfully" };
}

export function handleDeleteError(error: unknown): ErrorReturn {
	let deleteError: ErrorReturn;

	if (error instanceof Error) {
		console.error("# Error in deleting battle", error);
		deleteError = {
			err: error,
			code: error.name === "not-found" ? 404 : 500,
		};
	} else {
		console.error("# Error in deleting", error);
		deleteError = {
			err: new Error(`Cannot delete battle ${error}`),
			code: 500,
		};
	}

	return deleteError;
}
//#endregion
