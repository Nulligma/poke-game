import { type Collection, MongoServerError, ObjectId } from "mongodb";
import type { DBC } from "../types/database";
import type { ErrorReturn, MessageResponse } from "../types/response";
import type {
	UpdateUserBody,
	UserQuery,
} from "../types/user/userRequest.types";
import type {
	CreateUserResponse,
	GetAllUserResponse,
} from "../types/user/userResponse.types";
import type { User } from "../model/user.model";
import { convertUserQueryToFindParams } from "../lib/operator";

export async function getUserList(
	db: DBC,
	query: UserQuery,
): Promise<GetAllUserResponse> {
	const collection = db as Collection<User> | undefined;

	if (!collection) {
		throw new Error("Cannot get the user collection");
	}

	const [getQuery, getOption] = convertUserQueryToFindParams(query);

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
			err: new Error(`Cannot find user ${error}`),
			code: 500,
		};
	}

	return getError;
}

export async function getUser(db: DBC, userID: string) {
	const collection = db as Collection<User> | undefined;

	if (!collection) {
		throw new Error("Cannot get the user collection");
	}

	const _id = new ObjectId(userID);

	const res = await collection.findOne({ _id });

	if (res == null) {
		const err = new Error(`Cannot find the user ${userID}`);
		err.name = "not-found";
		throw err;
	}

	return res;
}

export async function createUser(
	db: DBC,
	data: User,
): Promise<CreateUserResponse> {
	const collection = db as Collection<User> | undefined;

	if (!collection) {
		throw new Error("Cannot get the user collection");
	}

	const result = await collection.insertOne(data);

	if (!result.acknowledged) {
		console.error(
			"Not acknowledged while inserting into user with body: ",
			data,
		);
		throw new Error("Cannot create new user");
	}

	return { _id: result.insertedId, ...data };
}

export function handleInsertError(error: unknown): ErrorReturn {
	let insertError: ErrorReturn;

	if (error instanceof MongoServerError && error.code === 11000) {
		console.error("# Duplicate Data Found:\n", error);

		insertError = {
			err: new Error("User email already exists!"),
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
			err: new Error("Cannot create new user "),
			code: 500,
		};
	}

	return insertError;
}

export async function updateUser(
	db: DBC,
	userId: string,
	update: UpdateUserBody,
): Promise<MessageResponse> {
	const collection = db as Collection<User> | undefined;

	if (!collection) {
		throw new Error("Cannot get the user collection");
	}

	const result = await collection.updateOne(
		{ _id: new ObjectId(userId) },
		{ $set: update },
	);

	if (!result.acknowledged) {
		console.error("Not acknowledged while updating user: ", userId, update);
		throw new Error("Cannot update user");
	}

	if (result.matchedCount === 0) {
		const err = new Error(`Cannot find the user ${userId}`);
		err.name = "not-found";
		throw err;
	}

	if (result.modifiedCount === 0) {
		const err = new Error(`Nothing modified for ${userId} with ${update}`);
		throw err;
	}

	return { message: "updated successfully" };
}

export function handleUpdateError(error: unknown): ErrorReturn {
	let updateError: ErrorReturn;

	if (error instanceof Error) {
		console.error("# Error in updating user", error);
		updateError = {
			err: error,
			code: error.name === "not-found" ? 404 : 500,
		};
	} else {
		console.error("# Error in updating user", error);
		updateError = {
			err: new Error(`Cannot update user ${error}`),
			code: 500,
		};
	}

	return updateError;
}

export async function deleteUser(
	db: DBC,
	userId: string,
): Promise<MessageResponse> {
	const collection = db as Collection<User> | undefined;

	if (!collection) {
		throw new Error("Cannot get the user collection");
	}

	const result = await collection.deleteOne({ _id: new ObjectId(userId) });

	if (!result.acknowledged) {
		console.error("Not acknowledged while deleting user: ", userId);
		throw new Error("Cannot delete user");
	}

	if (result.deletedCount === 0) {
		const err = new Error(`Cannot find the user ${userId}`);
		err.name = "not-found";
		throw err;
	}

	return { message: "deleted successfully" };
}

export function handleDeleteError(error: unknown): ErrorReturn {
	let deleteError: ErrorReturn;

	if (error instanceof Error) {
		console.error("# Error in deleting user", error);
		deleteError = {
			err: error,
			code: error.name === "not-found" ? 404 : 500,
		};
	} else {
		console.error("# Error in deleting", error);
		deleteError = {
			err: new Error(`Cannot delete user ${error}`),
			code: 500,
		};
	}

	return deleteError;
}
